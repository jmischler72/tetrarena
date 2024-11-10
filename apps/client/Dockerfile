FROM node:20-alpine AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# Install Python3, make and g++ needed for node-gyp
RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*

COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm client install --frozen-lockfile
RUN pnpm run client build

FROM node:20-alpine AS production

COPY --from=build /app/apps/client/build /prod/build
COPY --from=build /app/apps/client/node_modules /prod/node_modules/
COPY --from=build /app/apps/client/package.json /prod/.

USER node
WORKDIR /prod

ENV PORT=80
ENV NODE_ENV=production

EXPOSE 80
CMD [ "node", "build" ]