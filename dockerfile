FROM node:18-alpine

WORKDIR /app

COPY package.json ./

COPY . .

RUN npm install -g npm@9.6.6

RUN npm install

EXPOSE 5555

CMD ["npm","run","start"]