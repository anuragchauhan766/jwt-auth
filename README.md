# JWT Authentication System with Session Management - MERN Stack

This repository contains a JWT (JSON Web Token) Authentication System developed using the MERN Stack (MongoDB, Express, React, Node.js). The system focuses on session management, access token, and refresh token mechanisms with an expiration time of 30 seconds and 2 minutes, respectively. Additionally, it provides features like password reset, email verification, and silent authentication with access token renewal. The primary aim of this project is to delve into the details of JWT and authentication, emphasizing session management.

## Table of Content

1. [Introduction](#introduction)
2. [Features](#features)
3. [Requirements](#requirements)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Usage](#usage)
7. [API Endpoints](#api-endpoints)
8. [Contributing](#contributing)
9. [License](#license)

## Introduction

This JWT Authentication System serves as a backend-focused project to demonstrate the workings of JWT and session management in a MERN application. JSON Web Tokens are used to authenticate users and maintain their sessions securely. The system implements access and refresh tokens, each with different expiration times, to achieve improved security and usability.

> ### Note

> For development and project showcase, the expiration time of tokens is kept short
>
> - Access token: 30 seconds
> - Refresh token: 2 minutes
> - reset password token: 3 minutes
> - account Activation token: 30 minutes

You can change these according to your needs

## Features

1. User registration with Email verification
2. User login with email and password
3. Password reset functionality with email confirmation.
4. Access token renewal (Silent Authentication)
5. Secure Session Management with Token Expiration
6. Protected Account route with Token authentication

## Requirements

- [Nodejs](https://nodejs.org/en) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)
- [mongodb](https://www.mongodb.com/)

## Installation

1. Clone this repository on your local machine

```bash
git clone https://github.com/anuragchauhan766/jwt-auth.git
```

1. Install dependencies by running

```bash
pnpm i -r
```

## Configuration

Before running the application, you need to configure some settings.

### Create a .env file from env.example in the API root folder and set the following environment variables:

```env
DATABASE="Your mongodb connection URL "
ACCESS_TOKEN_SECRET_KEY=' secret key'
REFRESH_TOKEN_SECRET_KEY='secret key'
RESET_PASSWORD_SECRET_KEY='secret key'
ACTIVATION_SECRET_KEY='secret key'
SEND_IN_BLUE_EMAIL_SERVICE_API_KEY="send in blue API key"
SEND_IN_BLUE_USERNAME="sendinblue username"
SEND_IN_BLUE_PASSWORD="send in blue password"
NODEMAIL_EMAIL_FROM="email for sending mails to user"
CLIENT_BASE_URL="http://localhost:5173"
```

Make sure to replace the key's value with an actual value, You can generate **secret keys** with crypto as follows:

1. run node command

```bash
node
```

1. Now generate a random string with given command

```bash
require("crypto").randomBytes(64).toString("hex")
```

#### create .env file from env.example in the **client** root folder with following variables:

```
VITE_API_BASE_URL="http://localhost:3000"
```

## Usage

To start the application, run the following command from the project root:

### - backend

```bash
cd api && pnpm dev
```

### - frontend

```bash
cd client && pnpm dev
```

The backend will be available at http://localhost:3000
Frontend will be available at http://localhost:5173

## API Endpoints

The API provides the following endpoints:

- `POST api/auth/signin`: Singin and get access token and refresh token
- `POST api/auth/signup`: Register new User with email verification
- `POST api/auth/forgotpassword`: Send mail for password reset link
- `POST api/auth/resetpassword`: reset password
- `POST api/auth/send-verification-mail`: send account verification mail
- `GET api/auth/verifyemail`: verify the user mail with token
- `GET api/auth/refresh`: refresh(renew) the access token
- `GET api/auth/signout`: signout the User
- `GET api/user`: get the user details

## Contributing

Contributions to this project are welcome. Please fork the repository, make your changes, and submit a pull request. For major changes, please open an issue first to discuss the proposed changes.

## License

This project is licensed under the MIT License.
