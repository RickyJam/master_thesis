FROM node:19-alpine

WORKDIR /app/node_server

COPY server.js package*.json /app/node_server/
COPY /src /app/node_server/src

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]