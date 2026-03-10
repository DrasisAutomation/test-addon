FROM node:18-alpine

WORKDIR /app

COPY server.js .

RUN npm install express multer cors axios

CMD ["node","server.js"]