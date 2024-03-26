FROM node:16-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN --mount=type=secret,id=NODE_AUTH_TOKEN npm config set //npm.pkg.github.com/:_authToken $(cat /run/secrets/NODE_AUTH_TOKEN)

RUN npm ci

RUN rm ~/.npmrc
COPY . .

ENV PORT=8080 NODE_ENV=production

EXPOSE 8080

CMD [ "npm", "run", "start" ]
