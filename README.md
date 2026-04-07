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

## Web Interface

Open `http://localhost:3000` in your browser to use the simple email form UI.

## Routes

- `GET /health` -> health check JSON response.
- `GET /mail/verify` -> verifies Nodemailer SMTP configuration and connectivity.
- `GET /` -> simple email sending interface.
- `POST /send-email` -> sends email using JSON body (`receiverEmail`, `subject`, `body`).
- `POST /send-email` -> sends an email using JSON payload.

## SMTP Setup

Set these values in `.env`:

- `SMTP_SERVER`
- `SMTP_PORT`
- `EMAIL_USER`
- `EMAIL_PASS`
- `RECIEVER_EMAIL`

For Gmail, use an App Password (not your normal account password).

## Send Email API

`POST /send-email`

Request JSON:

- `receiverEmail` (or `to`) string
- `subject` string
- `body` string

Example:

```bash
curl -X POST http://localhost:3000/send-email \
   -H "Content-Type: application/json" \
   -d '{
      "receiverEmail": "receiver@example.com",
      "subject": "Hello",
      "body": "This is from Express + Nodemailer"
   }'
```
