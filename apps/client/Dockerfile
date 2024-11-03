FROM node:20-alpine AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm client install --frozen-lockfile
RUN pnpm run client build

FROM node:20-alpine AS production

COPY --from=build /app/apps/client/build /prod/build
COPY --from=build /app/apps/client/node_modules /prod/node_modules/
COPY --from=build /app/apps/client/package.json /prod/.

WORKDIR /prod
USER node

ENV PORT=80
ENV NODE_ENV=production

EXPOSE 80
CMD [ "node", "build" ]