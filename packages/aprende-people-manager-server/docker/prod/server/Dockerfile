# Multi-step dockerfile, first step builds the server, second step runs it.

FROM node:12 as build_container

WORKDIR /opt/server

COPY package*.json ./
COPY prisma ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:12

COPY --from=build_container /opt/server/node_modules ./node_modules
COPY --from=build_container /opt/server/package*.json ./
COPY --from=build_container /opt/server/prisma ./
COPY --from=build_container /opt/server/dist ./dist

EXPOSE 3001
EXPOSE 80

CMD ["yarn", "start:prod"]
