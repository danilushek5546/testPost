FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 6000

RUN npm run db:migrate:up

ENTRYPOINT ["ng", "serve", "-H", "0.0.0.0"]

CMD [ "node", "dist/index.js" ]