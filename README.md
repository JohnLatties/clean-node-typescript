# clean-node-typescript
This solution works and three steps:

### 1 - Web Scraping service:
  It extracts data from a car web site and a database persists.

### 2 -  API:
Provides routes for client to:
  * list all car branding with your cars
* Create a refinancing proposal
* Get a proposal
* Create a refinancing contract
* Get a contract
* To sign a contract
* Get all contracts signed

### 3 - Web
User interface that allows accessing data through calls to the API.

![Easy car Demo](demo/demo.gif)

----

# Tests

```shell
 cd server
 npm install
 npm run test
```

# Run 

## Web Scraping
```shell
 cd server
 npm install
 npm run dev:scraping
```

## API
```shell
 cd server
 npm install
 npm run dev:api
```

## WEB
```shell
 cd client
 npm install
 npm start
```