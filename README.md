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
docker compose up --build
```

### now your app should be available on http://localhost:8080/

# what is changed?

### technical changes

- added typescript to frontend
- changed frontend code to composition api
- added bootstrap
- added babel to backend
- open project in docker

### features

#### authentication

- added login and register

#### settings

- added option to change theme color and language (polish, english, german, chinese)
- if logged added option to add phone numbers
- if logged added option to edit profile and delete account

#### home

- calling is now in modal window
- handling failed, busy, no answered calls
- handling bad number
- added call timer
- if logged added option to select phone numbers from list while selecting phone number to call
- save call history to mongo db
- after call, number of today calls is increased
- prevent inputing letters and special characters to phone number inputs

#### call history

- if logged added option to view call history
- added option to filter call history by status

#### other

- added 404 page when route not found
- visual changes
