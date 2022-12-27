FROM node:19-alpine

WORKDIR /app/users_loader

COPY users_loader.js package*.json /app/users_loader/
COPY /src /app/users_loader/src

RUN npm install

CMD ["node", "users_loader.js"]