#############
# Serve Nuxt in development mode.

FROM node:20.5.0-alpine@sha256:11087abe911baf2fd7e34192f4598bf7e438239e9914f5b7ecda5fb5a7b1a2dd AS development

COPY ./docker/entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN corepack enable

WORKDIR /srv/app/

VOLUME /srv/.pnpm-store
VOLUME /srv/app

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["pnpm", "run", "dev"]

# Waiting for https://github.com/nuxt/framework/issues/6915
# HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1


########################
# Prepare Nuxt.

FROM node:20.5.0-alpine@sha256:11087abe911baf2fd7e34192f4598bf7e438239e9914f5b7ecda5fb5a7b1a2dd AS prepare

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

COPY ./pnpm-lock.yaml ./

RUN corepack enable && \
    pnpm fetch

COPY ./ ./

RUN pnpm install --offline

########################
# Build Nuxt.

FROM node:20.5.0-alpine@sha256:11087abe911baf2fd7e34192f4598bf7e438239e9914f5b7ecda5fb5a7b1a2dd AS build

ARG NUXT_PUBLIC_STACK_DOMAIN=jonas-thelemann.de
ENV NUXT_PUBLIC_STACK_DOMAIN=${NUXT_PUBLIC_STACK_DOMAIN}

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

ENV NODE_ENV=production
RUN corepack enable && \
    pnpm run build


########################
# Nuxt: lint

FROM node:20.5.0-alpine@sha256:11087abe911baf2fd7e34192f4598bf7e438239e9914f5b7ecda5fb5a7b1a2dd AS lint

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN corepack enable && \
    pnpm run lint


# ########################
# # Nuxt: test (e2e)

# FROM mcr.microsoft.com/playwright:v1.36.2@sha256:11ef7660a29bb886c8bfb1d59e7ebcb1c49fc7c43d116d225b1c8e881b1147a3 AS test-e2e_base

# ARG UNAME=e2e
# ARG UID=1000
# ARG GID=1000

# # The `CI` environment variable must be set for pnpm to run in headless mode
# ENV CI=true
# ENV NODE_ENV=development
# ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

# WORKDIR /srv/app/

# COPY ./docker/entrypoint.sh /usr/local/bin/docker-entrypoint.sh

# RUN corepack enable \
#     # user
#     && groupadd -g $GID -o $UNAME \
#     && useradd -m -l -u $UID -g $GID -o -s /bin/bash $UNAME

# USER $UNAME

# VOLUME /srv/.pnpm-store
# VOLUME /srv/app

# ENTRYPOINT ["docker-entrypoint.sh"]


# ########################
# # Nuxt: test (e2e, preparation)

# FROM mcr.microsoft.com/playwright:v1.36.2@sha256:11ef7660a29bb886c8bfb1d59e7ebcb1c49fc7c43d116d225b1c8e881b1147a3 AS test-e2e-prepare

# # The `CI` environment variable must be set for pnpm to run in headless mode
# ENV CI=true
# ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

# WORKDIR /srv/app/

# RUN corepack enable

# COPY --from=prepare /srv/app/ ./

# RUN pnpm rebuild -r


# ########################
# # Nuxt: test (e2e, development)

# FROM mcr.microsoft.com/playwright:v1.36.2@sha256:11ef7660a29bb886c8bfb1d59e7ebcb1c49fc7c43d116d225b1c8e881b1147a3 AS test-e2e-dev

# # The `CI` environment variable must be set for pnpm to run in headless mode
# ENV CI=true
# ENV NODE_ENV=development

# WORKDIR /srv/app/

# RUN corepack enable

# COPY --from=test-e2e-prepare /srv/app/ ./

# RUN pnpm --dir nuxt run test:e2e:dev


# ########################
# # Nuxt: test (e2e, production)

# FROM mcr.microsoft.com/playwright:v1.36.2@sha256:11ef7660a29bb886c8bfb1d59e7ebcb1c49fc7c43d116d225b1c8e881b1147a3 AS test-e2e-prod

# # The `CI` environment variable must be set for pnpm to run in headless mode
# ENV CI=true

# WORKDIR /srv/app/

# RUN corepack enable

# COPY --from=test-e2e-prepare /srv/app/ ./
# COPY --from=build /srv/app/nuxt/.output /srv/app/nuxt/.output

# # # Do not run in parallel with `test-e2e-dev`
# # COPY --from=test-e2e-dev /srv/app/package.json /tmp/test/package.json

# RUN pnpm --dir nuxt run test:e2e:prod


#######################
# Collect build, lint and test results.

FROM node:20.5.0-alpine@sha256:11087abe911baf2fd7e34192f4598bf7e438239e9914f5b7ecda5fb5a7b1a2dd AS collect

WORKDIR /srv/app/

COPY --from=build /srv/app/.playground/.output ./.output
COPY --from=lint /srv/app/package.json /tmp/lint/package.json
# COPY --from=test-integration-dev /srv/app/package.json /tmp/test/package.json
# COPY --from=test-integration-prod /srv/app/package.json /tmp/test/package.json


# #######################
# # Provide a web server.

# FROM nginx:1.23.4-alpine@sha256:dd2a9179765849767b10e2adde7e10c4ad6b7e4d4846e6b77ec93f080cd2db27 AS production

# WORKDIR /usr/share/nginx/html

# COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# COPY --from=collect /srv/app/.output/public/ ./

# HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost/api/healthcheck || exit 1


#######################
# Provide a web server.
# Requires node (cannot be static) as the server acts as backend too.

FROM node:20.5.0-alpine@sha256:11087abe911baf2fd7e34192f4598bf7e438239e9914f5b7ecda5fb5a7b1a2dd AS production

ENV NODE_ENV=production

# Update and install dependencies.
# - `wget` is required by the healthcheck
RUN apk update \
    && apk add --no-cache \
        wget

WORKDIR /srv/app/

COPY --from=collect /srv/app/ ./

CMD ["node", ".output/server/index.mjs"]
HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3001/api/healthcheck || exit 1
