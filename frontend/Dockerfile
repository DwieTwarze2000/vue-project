FROM node:18 AS build

WORKDIR /app

COPY . .

RUN npm install && npm run build

FROM node:18 AS prod

WORKDIR /app

COPY --from=build /app/dist /app
COPY --from=build /app/package*.json /app

RUN npm install http-server -g

EXPOSE 30001

CMD ["http-server", "-o", "index.html", "-p", "30001"]