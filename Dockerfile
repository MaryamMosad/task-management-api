FROM node:20.16.0-alpine

WORKDIR ./app


COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm" ,"run" ,"dev"]