# Multi-step dockerfile, first step builds the server, second step runs it.

FROM node:12 as build_container

WORKDIR /server

COPY package*.json ./
COPY prisma ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:12

COPY --from=build_container /server/node_modules ./node_modules
COPY --from=build_container /server/package*.json ./
COPY --from=build_container /server/dist ./dist

EXPOSE 3000

RUN yarn start:migrations

CMD ["yarn", "start:prod"]
