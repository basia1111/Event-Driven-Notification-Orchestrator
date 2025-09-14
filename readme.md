
# Event-Driven Notification Orchestrator

**Recruitment Task for Cleeng**

This is a simple backend service for managing user preferences and processing events with DND (Do Not Disturb) logic.

## Installation

Clone the repository:

```bash
git clone https://github.com/basia1111/Event-Driven-Notification-Orchestrator.git
cd Event-Driven-Notification-Orchestrator
````

Inside project folder install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The server will run at `http://localhost:3000`.

## API Endpoints

### Get user preferences

```http
GET /preferences/:userId
```

### Set user preferences

```http
POST /preferences/:userId
```

**Request body example:**

```json
{
  "dnd": {
    "start": "12:00",
    "end": "16:00"
  },
  "eventSettings": {
    "item_shipped": {
      "enabled": true
    },
    "invoice_generated": {
      "enabled": true
    }
  }
}
```

### Emit an event

```http
POST /events
```

**Request body example:**

```json
{
  "eventId": "evt_12345",
  "userId": "1",
  "eventType": "item_shipped",
  "timestamp": "2025-07-28T14:59:00Z"
}
```

The server will respond with a decision based on the user preferences and DND settings.

## Running Tests

To run Jest tests:

```bash
npm test
```

This will run unit tests for DND logic checks.

