FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# Install Python3, make and g++ needed for node-gyp
RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*

FROM base AS build
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run server build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm run server deploy --prod /prod

FROM base AS production

COPY --from=build /prod /prod

WORKDIR /prod
ENV PORT=8080

EXPOSE 8080
CMD [ "node", "." ]