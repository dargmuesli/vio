# syntax=docker/dockerfile:1

#############
# Create base image.

FROM oven/bun:1.3.9-alpine AS base-image

ENV CI=true

WORKDIR /srv/app/

RUN --mount=type=cache,id=apk-cache,target=/var/cache/apk \
    apk add --repository=https://dl-cdn.alpinelinux.org/alpine/edge/testing \
      mkcert


#############
# Serve Nuxt in development mode.

FROM base-image AS development

ENV CI=false

RUN mkdir \
        /srv/.bun/install/cache \
        /srv/app/node_modules \
    && chown node:node \
        /srv/.bun/install/cache \
        /srv/app/node_modules

COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

VOLUME /srv/.bun/install/cache
VOLUME /srv/app
VOLUME /srv/app/node_modules

USER node

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["bun", "run", "--cwd", "src", "dev", "--host", "0.0.0.0"]
EXPOSE 3000

# TODO: support healthcheck while starting (https://github.com/nuxt/framework/issues/6915)
# HEALTHCHECK --interval=10s --start-period=60s CMD wget -O /dev/null https://app.localhost:3000/api/healthcheck || exit 1


########################
# Prepare Nuxt.

FROM base-image AS prepare

COPY ./ ./

RUN --mount=type=cache,id=bun-store,target=/root/.bun/install/cache \
    bun install --frozen-lockfile


########################
# Build for Node deployment.

FROM prepare AS build-node

ENV NODE_ENV=production
RUN bun run --cwd src build:node


########################
# Build for static deployment.

FROM prepare AS build-static

ARG NUXT_PUBLIC_I18N_BASE_URL=https://app.localhost:3002
ENV NUXT_PUBLIC_I18N_BASE_URL=${NUXT_PUBLIC_I18N_BASE_URL}

ENV NODE_ENV=production
RUN bun run --cwd src build:static


########################
# Nuxt: lint

FROM prepare AS lint

RUN bun run lint


# ########################
# # Nuxt: test (unit)

# FROM prepare AS test-unit

# RUN bun --workspaces run test


########################
# Nuxt: test (e2e, base-image)

FROM mcr.microsoft.com/playwright:v1.58.2 AS test-e2e-base-image

ENV CI=true
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

WORKDIR /srv/app/

RUN apt update && apt install mkcert


########################
# Nuxt: test (e2e)

FROM test-e2e-base-image AS test-e2e_development

ARG USER_NAME=e2e
ARG USER_ID=1000
ARG GROUP_ID=1000

RUN groupadd -g $GROUP_ID -o $USER_NAME \
    && useradd -m -l -u $USER_ID -g $GROUP_ID -o -s /bin/bash $USER_NAME \
    && mkdir \
        /srv/.bun/install/cache \
        /srv/app/node_modules \
    && chown $USER_ID:$GROUP_ID \
        /srv/.bun/install/cache \
        /srv/app/node_modules

COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

USER $USER_NAME

VOLUME /srv/.bun/install/cache
VOLUME /srv/app
VOLUME /srv/app/node_modules

ENTRYPOINT ["docker-entrypoint.sh"]


########################
# Nuxt: test (e2e, preparation)

FROM test-e2e-base-image AS test-e2e-prepare

COPY --from=prepare /srv/app/ ./


# ########################
# # Nuxt: test (e2e, development)

# FROM test-e2e-prepare AS test-e2e-dev

# # a rebuild is necessary because the node image we're pulling dependencies from uses alpine linux while here we use debian
# RUN bun --workspaces rebuild

# ENV NODE_ENV=development

# RUN bun run --cwd tests test:e2e:server:dev


########################
# Nuxt: test (e2e, node)

FROM test-e2e-prepare AS test-e2e-node

COPY --from=build-node /srv/app/src/playground/.output ./src/playground/.output

RUN bun run --cwd tests test:e2e:server:node


########################
# Nuxt: test (e2e, static)

FROM test-e2e-prepare AS test-e2e-static

COPY --from=build-static /srv/app/src/playground/.output/public ./src/playground/.output/public

RUN bun run --cwd tests test:e2e:server:static


#######################
# Collect build, lint and test results.

FROM base-image AS collect

# COPY --from=build-node --chown=node /srv/app/src/.output ./.output
COPY --from=build-node --chown=node /srv/app/src/package.json ./package.json
# COPY --from=build-static /srv/app/src/.output/public ./.output/public
COPY --from=build-static /srv/app/package.json /dev/null
COPY --from=lint /srv/app/package.json /dev/null
# COPY --from=test-unit /srv/app/package.json /dev/null
# COPY --from=test-e2e-dev /srv/app/package.json /dev/null
COPY --from=test-e2e-node /srv/app/package.json /dev/null
COPY --from=test-e2e-static /srv/app/package.json /dev/null


# #######################
# # Provide a web server.

# FROM nginx:1.25.2-alpine AS production

# WORKDIR /usr/share/nginx/html

# COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# COPY --from=collect /srv/app/.output/public/ ./

# HEALTHCHECK --interval=10s CMD wget -O /dev/null https://app.localhost:3000/api/healthcheck || exit 1
# EXPOSE 3000
# LABEL org.opencontainers.image.source="https://github.com/dargmuesli/vio"
# LABEL org.opencontainers.image.description="A Nuxt layer."


# #######################
# # Provide a web server.
# # Requires node (cannot be static) as the server acts as backend too.

# FROM collect AS production

# ENV NODE_ENV=production

# # Update dependencies.
# RUN apk update \
#     && apk upgrade --no-cache

# ENTRYPOINT ["bun"]
# CMD ["run", "start:node"]
# HEALTHCHECK --interval=10s CMD wget -O /dev/null https://app.localhost:3000/api/healthcheck || exit 1
# EXPOSE 3000
# LABEL org.opencontainers.image.source="https://github.com/dargmuesli/vio"
# LABEL org.opencontainers.image.description="A Nuxt layer."
