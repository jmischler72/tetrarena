# First build
FROM node:14 as build

ENV PORT 8080

WORKDIR /usr/src/app
COPY package*.json ./

RUN --mount=type=secret,id=NODE_AUTH_TOKEN npm config set //npm.pkg.github.com/:_authToken $(cat /run/secrets/NODE_AUTH_TOKEN) && \
    npm ci

COPY test .

RUN npm run build

# Second build
FROM node:14
WORKDIR /usr/src/app

COPY --from=build /usr/src/app /usr/src/app

CMD [ "npm", "run", "start" ]
EXPOSE 8080