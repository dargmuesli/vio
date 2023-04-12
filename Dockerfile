#############
# Serve Nuxt in development mode.

# Should be the specific version of `node:alpine`.
FROM node:19.9.0-alpine@sha256:0e9961345f0ef2ea3e132990e814a26cb9fa8f89e50abb68751c6bc45ca014c4 AS development

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

# Should be the specific version of `node:slim`.
FROM node:19.9.0-alpine@sha256:0e9961345f0ef2ea3e132990e814a26cb9fa8f89e50abb68751c6bc45ca014c4 AS prepare

WORKDIR /srv/app/

COPY ./pnpm-lock.yaml ./

RUN corepack enable && \
    pnpm fetch

COPY ./ ./

RUN pnpm install --offline

########################
# Build Nuxt.

# Should be the specific version of `node:alpine`.
FROM node:19.9.0-alpine@sha256:0e9961345f0ef2ea3e132990e814a26cb9fa8f89e50abb68751c6bc45ca014c4 AS build

ARG NUXT_PUBLIC_STACK_DOMAIN=jonas-thelemann.de
ENV NUXT_PUBLIC_STACK_DOMAIN=${NUXT_PUBLIC_STACK_DOMAIN}

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

ENV NODE_ENV=production
RUN corepack enable && \
    pnpm run build


########################
# Nuxt: lint

# Should be the specific version of `node:alpine`.
FROM node:19.9.0-alpine@sha256:0e9961345f0ef2ea3e132990e814a26cb9fa8f89e50abb68751c6bc45ca014c4 AS lint

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN corepack enable && \
    pnpm run lint


# ########################
# # Nuxt: test (integration)

# # Should be the specific version of `cypress/included`.
# FROM cypress/included:12.9.0@sha256:61b5e72183aa11f6a88f4789171d8044825706391ca4e08445edf20949a1d9b4 AS test-integration_base

# ARG UNAME=cypress
# ARG UID=1000
# ARG GID=1000

# WORKDIR /srv/app/

# RUN corepack enable \
#     # user
#     && groupadd -g $GID -o $UNAME \
#     && useradd -m -u $UID -g $GID -o -s /bin/bash $UNAME

# # Use the Cypress version installed by pnpm, not as provided by the Docker image.
# COPY --from=prepare --chown=$UNAME /root/.cache/Cypress /root/.cache/Cypress

# USER $UNAME

# VOLUME /srv/app


# ########################
# # Nuxt: test (integration, development)

# # Should be the specific version of `cypress/included`.
# FROM cypress/included:12.9.0@sha256:61b5e72183aa11f6a88f4789171d8044825706391ca4e08445edf20949a1d9b4 AS test-integration-dev

# RUN corepack enable

# WORKDIR /srv/app/

# # Use the Cypress version installed by pnpm, not as provided by the Docker image.
# COPY --from=prepare /root/.cache/Cypress /root/.cache/Cypress
# COPY --from=prepare /srv/app/ ./

# RUN pnpm test:integration:dev


# ########################
# # Nuxt: test (integration, production)

# # Should be the specific version of `cypress/included`.
# FROM cypress/included:12.9.0@sha256:61b5e72183aa11f6a88f4789171d8044825706391ca4e08445edf20949a1d9b4 AS test-integration-prod

# RUN corepack enable

# WORKDIR /srv/app/

# # Use the Cypress version installed by pnpm, not as provided by the Docker image.
# COPY --from=prepare /root/.cache/Cypress /root/.cache/Cypress
# COPY --from=build /srv/app/ /srv/app/
# COPY --from=test-integration-dev /srv/app/package.json /tmp/test/package.json

# RUN pnpm test:integration:prod


#######################
# Collect build, lint and test results.

# Should be the specific version of `node:alpine`.
FROM node:19.9.0-alpine@sha256:0e9961345f0ef2ea3e132990e814a26cb9fa8f89e50abb68751c6bc45ca014c4 AS collect

WORKDIR /srv/app/

COPY --from=build /srv/app/.playground/.output ./.output
COPY --from=lint /srv/app/package.json /tmp/lint/package.json
# COPY --from=test-integration-dev /srv/app/package.json /tmp/test/package.json
# COPY --from=test-integration-prod /srv/app/package.json /tmp/test/package.json


# #######################
# # Provide a web server.

# # Should be the specific version of `nginx:alpine`.
# FROM nginx:1.23.4-alpine@sha256:dd2a9179765849767b10e2adde7e10c4ad6b7e4d4846e6b77ec93f080cd2db27 AS production

# WORKDIR /usr/share/nginx/html

# COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# COPY --from=collect /srv/app/.output/public/ ./

# HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost/api/healthcheck || exit 1


#######################
# Provide a web server.
# Requires node (cannot be static) as the server acts as backend too.

# Should be the specific version of `node:alpine`.
FROM node:19.9.0-alpine@sha256:0e9961345f0ef2ea3e132990e814a26cb9fa8f89e50abb68751c6bc45ca014c4 AS production

ENV NODE_ENV=production

# Update and install dependencies.
# - `wget` is required by the healthcheck
RUN apk update \
    && apk add --no-cache \
        wget

WORKDIR /srv/app/

COPY --from=collect /srv/app/ ./

CMD ["node", ".output/server/index.mjs"]
HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1
