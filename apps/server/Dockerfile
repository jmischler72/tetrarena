FROM node:20-slim AS base

RUN npm install -g pnpm

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run server deploy --prod /prod/apps/server

FROM base AS server
COPY --from=build /prod/apps/server /prod/apps/server
COPY --from=build /usr/src/app/package.json /prod/package.json
WORKDIR /prod/server
ENV PORT=8080

EXPOSE 8080
CMD [ "pnpm", "run", "start" ]