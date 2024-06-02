# 🍎 How to Run This Server ? 🍎

### A clear instructions on how to run the application locally.

## Live Link :

```bash
https://lost-found-server.vercel.app/
```

### How to Run Locally ? Flow Instruction

Clone the project frist

```bash
 https://github.com/RonyMiah/lost-found-server.git
```

Go to the project directory

```bash
  cd lost-found-server
```

### Install dependencies

```bash
  npm install or yarn add
```

### Start the server as dev

```bash
  npm run start:dev or yarn start:dev
```

### Start the server as production

```bash
  npm run start
```

### Build

```bash
  npm run build
```

## Environment Variables

If you run this project, you will need to add the following environment variables to your root directory .env file

`DATABASE_URL="postgresql://(yourdatabaseName):(Password)@localhost:5432/(projectName)?schema=public"`

`NODE_ENV = "development"`

`PORT = 8000 `

`JWT_SECRET = Your Jwt Secret`

`JWT_EXPIRE = "1d"`

`JWT_REFRESH_SEECRET = Your Refresh Secret`

`JWT_REFRESH_EXPIRE = "30d"`
`RESET_PASS_SECRET = Your Reset Passs secret"`
`RESET_PASS_EXPIRE = "5m"`
`RESET_PASS_LINK = "http://localhost:3000/reset-password"`
`NODE_MAILER_EMAIL = your node mailer email`
`NODE_MAILER_PASS =  your node mailer password`
`CLOUD_NAME =  your cloudinary name`
`CLOUD_API_KEY = your cloudinary api_key`
`CLOUD_API_SECRET = your cloudinary api_secret_key`

## 🚀 Thanks EveryOne Have a good day.
