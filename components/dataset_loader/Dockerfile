FROM node:19-alpine

WORKDIR /app/dataset_loader

COPY loader.js package*.json /app/dataset_loader/
COPY /src /app/dataset_loader/src

RUN npm install

CMD ["node", "loader.js"]