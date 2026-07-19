FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# Install Python3, make and g++ needed for node-gyp
RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*

FROM base AS build
# devDependencies (rimraf, typescript, tsup) are required to build.
# Force a full install even when NODE_ENV=production is set (e.g. by Coolify),
# which would otherwise make pnpm skip devDependencies.
ENV NODE_ENV=development
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prod=false
RUN pnpm run server build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm run server deploy --prod /prod

FROM base AS production

COPY --from=build /prod /prod

WORKDIR /prod
ENV PORT=8080

EXPOSE 8080
CMD [ "node", "." ]