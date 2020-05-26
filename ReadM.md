# Pinny News

**Pinny News is a rest API back-end application for a topical news based platform.**

## Installation 

This api requires the following npm packages: 

```   
    "dependencies": {
    "express": "^4.17.1",
    "knex": "^0.21.1",
    "pg": "^8.0.3"
  },
  "devDependencies": {
    "jest": "^25.5.4",
    "jest-sorted": "^1.0.6",
    "supertest": "^4.0.2"
  }, 
  ```

  ```bash to install
  npm install
  ```

## Testing

**Pinny News is fully tested with Jest packages and a test data suit**

To ensure all api connections are working effectively, testing has been implemented across all GET POST PATCH and DELETE functionality. 

To test the API with the full Jest suit:

  ```bash 
  npm run test
  ```


## Migration

**All migrations are built using psql through ther PostgreSQL database management system**

To resest the setup for the database:

  ```bash 
  npm run setup-dbs
  ```

## Hosting

Hosting can be found at the following address?

  ``` 
  https://pinny-news.herokuapp.com/api
  ```

