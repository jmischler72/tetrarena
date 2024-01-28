# First build
FROM node:18-alpine

ENV PORT 8080

WORKDIR /usr/src/app
COPY package*.json ./
COPY .npmrc ~/.npmrc

RUN --mount=type=secret,id=NODE_AUTH_TOKEN npm config set //npm.pkg.github.com/:_authToken $(cat /run/secrets/NODE_AUTH_TOKEN)
RUN echo "@jmischler72:registry=https://npm.pkg.github.com/" >> ~/.npmrc
RUN cat ~/.npmrc

RUN npm ci

RUN rm ~/.npmrc
COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start" ]
