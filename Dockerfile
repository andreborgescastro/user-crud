FROM node:20.11.0

ENV TZ="America/Sao_Paulo"

WORKDIR /usr/src/app

RUN apt-get upgrade -y
RUN apt-get update -y


COPY . .


RUN npm install

RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm", "run","start:prod" ]
