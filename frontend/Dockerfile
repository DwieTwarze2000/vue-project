FROM node:18-alpine3.19 as build

WORKDIR /app

COPY package*.json ./

RUN npm install && npm run build

FROM nginx:1.21.3-alpine

COPY --from=0 /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]