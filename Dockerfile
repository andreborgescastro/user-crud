FROM node:20.11.0

ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME

ENV DB_HOST=$DB_HOST
ENV DB_PORT=$DB_PORT
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_NAME=$DB_NAME
ENV TZ="America/Sao_Paulo"

WORKDIR /usr/src/app

RUN apt-get upgrade -y
RUN apt-get update -y


COPY . .


RUN npm install

RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm", "run","start:prod" ]
