# JWT Authentication System with Session Management - MERN Stack

This repository contains a JWT (JSON Web Token) Authentication System developed using the MERN Stack (MongoDB, Express, React, Node.js). The system focuses on session management, access token, and refresh token mechanisms with an expiration time of 30 seconds and 3 minutes, respectively. Additionally, it provides features like password reset, email verification, and silent authentication with access token renewal. The primary aim of this project is to delve into the details of JWT and authentication, emphasizing session management.

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
