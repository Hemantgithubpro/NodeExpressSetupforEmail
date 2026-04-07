# NodeExpressSetup

Basic Node.js + Express server scaffold.

## Setup

1. Install dependencies:
   npm install
2. Create env file:
   cp .env.example .env

## Run

npm run start

Server starts at `http://localhost:3000` by default.

## Routes

- `GET /health` -> health check JSON response.
- `GET /mail/verify` -> verifies Nodemailer SMTP configuration and connectivity.

## SMTP Setup

Set these values in `.env`:

- `SMTP_SERVER`
- `SMTP_PORT`
- `EMAIL_USER`
- `EMAIL_PASS`
- `RECIEVER_EMAIL`

For Gmail, use an App Password (not your normal account password).
