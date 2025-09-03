# Jewel ML BFF Server (Next.js 15)

Backend-for-Frontend server that handles API calls to Jewel ML recommendation service for the Next.js 15 version.

## Overview

This Express.js server acts as an intermediary between the Next.js 15 frontend and the Jewel ML API, providing:
- API request aggregation for multiple models
- Error handling and response formatting
- CORS configuration for frontend integration

## Configuration

- **Port**: 3004 (configurable via `PORT` environment variable)
- **Jewel ML Integration ID**: `67fd95260740ccc4ec658d03`
- **Base URL**: `https://repersonalize.jewelml.io/c/p`

## API Endpoints

### `GET /health`
Health check endpoint that returns server status.

**Response:**
```json
{
  "status": "ok", 
  "service": "jewel-bff-server-nextjs15"
}
```

### `GET /api/recommendations`
Fetches product recommendations from Jewel ML for specified models.

**Parameters:**
- `item_id` (required): Product ID to get recommendations for
- `models` (required): Comma-separated list of model IDs (L_prod, B_prod, F_prod, T_prod)

**Example:**
```
GET /api/recommendations?item_id=1177646331_multicolor&models=B_prod,L_prod
```

**Response:**
```json
{
  "success": true,
  "item_id": "1177646331_multicolor",
  "models": ["B_prod", "L_prod"],
  "results": [
    {
      "model": "B_prod",
      "data": [...],
      "error": null
    },
    {
      "model": "L_prod", 
      "data": [...],
      "error": null
    }
  ]
}
```

## Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode

## Dependencies

- **express**: Web framework
- **cors**: Cross-origin resource sharing middleware
- **node-fetch**: HTTP client for API requests

## Node.js Compatibility

Requires Node.js >= 18.18.0