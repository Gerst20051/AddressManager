# AddressManager

Manage addresses for postcards.

Open [http://hnswave.co/address-manager/](http://hnswave.co/address-manager/) to view it in the browser.

## Backend Instructions

[$]> `cd address-manager`

### Install Dependencies

[$]> `nvm use`

[$]> `npm i`

### Start Docker DynamoDB

[$]> `npm run start:dynamodb` => `docker run --rm -p 8000:8000 dwmkerr/dynamodb -sharedDb`

### Start DynamoDB Admin

[$]> `npm run start:dynamodb:admin` => `DYNAMO_ENDPOINT=http://localhost:8000 dynamodb-admin -p 8001`

### Start Serverless Offline

[$]> `npm start` => `sls offline start`

### Run Linters

[$]> `npm lint` => `eslint app/{*,**/*}.js`

[$]> `npm lint:fix` => `eslint app/{*,**/*}.js --fix`

### Deploy Lambda To AWS

[$]> `npm run deploy` => `serverless deploy`

## Frontend Instructions

[$]> `cd react-address-manager`

### Install Dependencies

[$]> `nvm use`

[$]> `npm i`

### Run Development Server

[$]> `npm start` => `PORT=4000 react-scripts start`

Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

### Run Testing Scripts

[$]> `npm test` => `react-scripts test`

### Run Linters

[$]> `npm lint` => `eslint src/**/*.js`

[$]> `npm lint:fix` => `eslint src/**/*.js --fix`

### Build & Deploy Production

[$]> `npm run build` => `PUBLIC_URL=http://hnswave.co/address-manager/ npm run build`

[$]> `npm run deploy` => `rsync -r -a -v -e ssh --delete build/ droplet:/root/www/address-manager`

### Swagger API Documentation

Open [http://localhost:4000/?swagger](http://localhost:4000/?swagger) to view it in the browser.

Open [http://hnswave.co/address-manager/?swagger](http://hnswave.co/address-manager/?swagger) to view it in the browser.
