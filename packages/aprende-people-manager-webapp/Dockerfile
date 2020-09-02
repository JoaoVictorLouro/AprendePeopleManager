FROM node:12

ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

WORKDIR /opt/webapp

COPY . .

RUN yarn install

EXPOSE 3000

CMD yarn start
