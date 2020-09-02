FROM node:12

ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

WORKDIR /opt/server

COPY . .

RUN yarn install

EXPOSE 3001

CMD yarn start:debug
