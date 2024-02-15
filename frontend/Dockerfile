FROM node:18 AS build

WORKDIR /app

COPY . .

RUN npm install && npm run build

FROM node:18 AS prod

WORKDIR /prodApp

COPY --from=build /app/dist /prodApp
COPY --from=build /app/package*.json /prodApp

RUN npm i -g http-server 

EXPOSE 30001

CMD ["http-server", "-o", "index.html", "-p", "30001"]