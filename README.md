# config

## backend

### go to /backend and create .env file (see .env.example)

```bash
URL="https://url"  #url for dialer config
LOGIN="login"  #login for dialer config
PASSWORD="password"  #password for dialer config

PHONE_NUMBER="111222333"  #your phone number

MONGO_URL="mongodb://root:example@mongo/admin"  #mongo db url (see compose.yaml)
TOKEN_SECRET="your secret token"  #secret token for jwt
```

## frontend

### go to /frontend/src/services/api.service.ts and change your apiUrl. It should point your backend.

```js
export const apiUrl = 'http://localhost:3000/';
```

## Build

```bash
docker  compose  up  --build
```

### now your app should be available on http://localhost:8080
