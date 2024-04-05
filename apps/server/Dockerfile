FROM node:20-slim AS base

RUN npm install -g pnpm

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run server deploy --prod /prod/server

FROM base AS server
COPY --from=build /prod/server /prod/server
WORKDIR /prod/server
ENV PORT=8080

EXPOSE 8080
CMD [ "pnpm", "run", "start" ]