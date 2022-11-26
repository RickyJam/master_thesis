# dopo usare alpine
FROM node:19

WORKDIR /app/node_server

COPY server.js package*.json /app/node_server/
COPY /src /app/node_server/src

RUN yarn install --production

EXPOSE 3000

CMD ["node", "server.js"]