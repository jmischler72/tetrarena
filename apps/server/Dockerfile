FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

COPY apps/server/package.json ./apps/server/package.json
COPY packages/core ./packages/core

RUN npm ci

COPY ./apps/server ./apps/server

RUN npm run build -w ./apps/server

ENV PORT=8080 NODE_ENV=production

EXPOSE 8080

CMD [ "node", "./apps/server" ]
