

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## 1.Step: Installation

```bash
$ npm install
```

## 2.Step: Setting up .env
```bash 
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER="user"
DATABASE_PASSWORD="your_password"
DATABASE_NAME="db_name"

```

## 3.Step: Running the app

```bash
$ npm run start
```
## 4.Step: Create the Required Tables in PostgresSQL

```bash
  -- Users table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- WalletAddress table
CREATE TABLE WalletAddress (
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    address VARCHAR(100) NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id)
);
```


## For API Documentation and Reference:
http://localhost:3000/api
( check your local server instance)
after running the development server
