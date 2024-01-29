# First build
FROM node:18-alpine

ENV PORT 8080

WORKDIR /usr/src/app
COPY package*.json ./

RUN --mount=type=secret,id=NODE_AUTH_TOKEN npm config set //npm.pkg.github.com/:_authToken $(cat /run/secrets/NODE_AUTH_TOKEN)

RUN npm ci

RUN rm ~/.npmrc
COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start" ]
