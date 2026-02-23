# API Reference

Base URL: `/api`

## Health
- `GET /health`

## Auth (Basic)
- `POST /auth/signup`
  - body: `{ "name": "string", "email": "string", "password": "string" }`
  - response: `{ user, token }`
- `POST /auth/login`
  - body: `{ "email": "string", "password": "string" }`
  - response: `{ user, token }`

## Events
- `POST /events`
  - header: `x-user-id: <user_uuid>`
  - body:
  ```json
  {
    "title": "string",
    "location": "string",
    "event_date": "YYYY-MM-DD",
    "attendance_count": 0,
    "energy_kwh": 0,
    "travel_km": 0,
    "catering_meals": 0,
    "waste_kg": 0
  }
  ```
- `GET /events/:eventId`
  - response: `{ title, location, event_date, total_co2, breakdown }`
- `GET /events/:eventId/report?format=csv|pdf`
  - downloads emission report file
  - default format: `csv`
