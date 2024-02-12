# PROJEKT ZALICZENIOWY - PAWEŁ BIŃKOWSKI I WERONIKA RYBIŃSKA

## DZIAŁANIE APLIKACJI

Aplikacja umożliwia wykonywanie połączeń telefonicznych do numerów zdefiniowanych w jej bazie danych, co może utrudnić testowanie tej funkcjonalności, jednakże istnieje możliwość zadzwonienia na mój numer: 514-541-201. Umożliwia ona również połączenie z bazą danych, co pozwala na założenie nowego konta użytkownika oraz zalogowanie się. Po zalogowaniu użytkownik ma możliwość dodania nowych numerów telefonów w ustawieniach, które później można wybrać przy próbie wykonania połączenia. W sekcji ustawień dostępne są także opcje zmiany języka oraz motywu aplikacji. Dodatkowo, aplikacja oferuje dostęp do historii połączeń.

Po wprowadzeniu numeru, aplikacja inicjuje połączenie zarówno z wybranym numerem, jak i z konsultantem. Gdy połączenie zostanie zaakceptowane przez obie strony, na ekranie pojawi się licznik czasu trwania rozmowy. Wszystkie połączenia, w tym te nieodebrane, są rejestrowane i wyświetlane w historii połączeń.

![image](https://github.com/DwieTwarze2000/vue-project/assets/48262070/012475ea-ad25-4d28-8769-34960d1905e9)

Aby założyć konto, należy na stronie głównej wybrać opcję "Stwórz konto", następnie wprowadzić login, hasło oraz dowolny numer telefonu, który zostanie dodany do listy dostępnych numerów podczas inicjowania połączenia.

![image](https://github.com/DwieTwarze2000/vue-project/assets/48262070/27c8abd7-fcc4-42a4-a786-7865bb544164)

Testowanie aplikacji rozpoczyna się od utworzenia konta, a następnie zalogowania się na nie. Jeśli proces logowania zakończy się powodzeniem, oznacza to, że aplikacja działa prawidłowo.


## uruchomienie

## backend

### należy przejść do zakładki /backend i następnie uzupełnić plik .env (w przypadku kubernetesa dane będą brane z backend-secretmap.yml). W mailu podaliśmy nasz login i hasło.

.env-example
```bash
LOGIN="login"  #login do dialera (konsultant) - 
PASSWORD="password"  #hasło do dialera (konsultant)

MONGO_URL="mongodb://mongo/admin"  #mongo db url
TOKEN_SECRET="your secret token"  #secret token dla jwt. (Klucz do szyfrowania, może to być dowolny string)
```

## frontend

### w przypadku fontendu w katalogu /frontend/src/services/api.service.ts należy ustawić odpowiedni apiUrl który powinien wskazywać na backend. W przypadku dockera i kubernetesa jest on ustawiony tak że nie trzeba go zmieniać.

```js
export const apiUrl = 'http://localhost:30001/';
```

## docker 

Kontenery:
- frontent
- backend
- mongo - baza danych mongodb

użycie dockera
```
docker compose up --build
```
aplikacja powinna być dostępna pod adresem http://localhost:30001/


## kubernetes
* backend-secretmap.yml  config dialera i mongo
* backend.yml - definiuje deployment aplikacji backendowej, wskazując na obrazy Docker, skalowanie i inne opcje konfiguracyjne.
* backend-service.yml - określa usługę Kubernetes dla backendu, która umożliwia komunikację i dostęp do podów backendowych.
* frontend.yml -  definiuje deployment aplikacji frontendowej, wskazując na obrazy Docker, skalowanie i inne opcje konfiguracyjne.
* frontend-service.yml  - określa usługę Kubernetes dla frontendu, która umożliwia komunikację i dostęp do podów frontendowych.
* mongo-config.yml - zawiera konfigurację dla instancji MongoDB, taką jak parametry konfiguracyjne bazy danych.
* mongo-service.yml - definiuje usługę Kubernetes dla MongoDB, umożliwiając komunikację i dostęp do instancji MongoDB.
* mongo-statefulset.yml - opisuje StatefulSet dla MongoDB, zarządzając wdrożeniem bazy danych oraz przechowywaniem danych.

## uruchomienie

```
kubectl apply -f kubernetes/mongo-config.yml
kubectl apply -f kubernetes/mongo-statefulset.yml
kubectl apply -f kubernetes/mongo-service.yml

kubectl apply -f kubernetes/backend-secretmap.yml
kubectl apply -f kubernetes/backend.yml
kubectl apply -f kubernetes/backend-service.yml

kubectl apply -f kubernetes/frontend.yml
kubectl apply -f kubernetes/frontend-service.yml
```
aplikacja powinna być dostępna pod adresem http://localhost:30001/ 



