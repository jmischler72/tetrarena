FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# Install Python3, make and g++ needed for node-gyp
RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm run server i --config.dedupe-peer-dependents=false --frozen-lockfile
RUN pnpm run server build
RUN pnpm run server deploy --prod /prod/server

FROM base AS server
COPY --from=build /prod/server /prod/server
WORKDIR /prod/server
ENV PORT=8080

EXPOSE 8080
CMD [ "node", "." ]