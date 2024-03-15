FROM node:20.11.0

ARG HOST
ARG PORT
ARG USERNAME
ARG PASSWORD
ARG DATABASE

ENV HOST=$HOST
ENV PORT=$PORT
ENV USERNAME=$USERNAME
ENV PASSWORD=$PASSWORD
ENV DATABASE=$DATABASE
ENV TZ="America/Sao_Paulo"

WORKDIR /usr/src/app

RUN apt-get upgrade -y
RUN apt-get update -y


COPY . .


RUN npm install

RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm", "run","start:prod" ]
