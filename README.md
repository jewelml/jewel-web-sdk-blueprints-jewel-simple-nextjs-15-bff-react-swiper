# Jewel Simple Next.js 15 + BFF + React Swiper

A complete implementation of the Jewel ML recommendation system using an intermediate server to interact with Jewel ML APIs, Next.js 15 with Server-Side Rendering and React Swiper carousels.

## Architecture

This example demonstrates a BFF (Backend for frontend) pattern with:
- **Frontend**: Next.js 15 application with App Router and SSR
- **Backend**: Express.js BFF server handling Jewel ML API calls
- **UI**: React Swiper carousels for product recommendations
- **API Integration**: Jewel ML recommendation service

## Features

- 🎠 Interactive product carousels with Swiper v11
- 🔄 Multi-model recommendation support (You May Like, Similar Items, etc.)
- 🖥️ Server-Side Rendering for better SEO and performance  
- 🌐 Backend-for-Frontend architecture separating concerns
- 📱 Responsive design with navigation controls
- 🔍 Model selection with multiselect dropdown
- 📊 Raw API response viewer for debugging
- ⚡ Next.js 15 with App Router and TypeScript
- 🚀 Turbopack for faster development builds

## Getting Started

### Prerequisites
- Node.js >= 18.18.0
- npm >= 9.0.0

### Installation & Setup

1. Install dependencies for both server and Next.js:
```bash
npm run dev
```

This will automatically:
- Install server dependencies
- Install Next.js dependencies  
- Start the BFF server on port 3004
- Start the Next.js app on port 3005

### Manual Setup

If you prefer to run components separately:

1. **Install server dependencies:**
```bash
cd server && npm install
```

2. **Install Next.js dependencies:**
```bash
cd nextjs && npm install  
```

3. **Start the BFF server:**
```bash
cd server && npm start
```

4. **Start the Next.js application:**
```bash
cd nextjs && npm run dev:port
```

## Project Structure

```
jewel-simple-nextjs-15-bff-react-swiper/
├── server/                 # Express.js BFF server
│   ├── server.js          # Main server file with API endpoints
│   ├── package.json       # Server dependencies
│   └── README.md          # Server documentation
├── nextjs/                # Next.js 15 application  
│   ├── src/
│   │   ├── app/
│   │   │   └── page.tsx   # Main page with SSR (App Router)
│   │   ├── components/
│   │   │   ├── ProductCarousel.tsx        # Swiper carousel component
│   │   │   ├── ClientProductCarousel.tsx  # Client wrapper for SSR
│   │   │   └── SearchControls.tsx         # Model selection controls
│   │   └── types/
│   │       └── index.ts   # TypeScript type definitions
│   └── package.json       # Frontend dependencies
├── package.json           # Project scripts and workspace config
└── README.md              # This file
```

## Available Scripts

- `npm run dev` - Start both server and Next.js (recommended)
- `npm run dev:server` - Start only the BFF server
- `npm run dev:nextjs` - Start only the Next.js app
- `npm run server:install` - Install server dependencies
- `npm run nextjs:install` - Install Next.js dependencies
- `npm run server:start` - Start server in production mode
- `npm run nextjs:start` - Start Next.js on port 3005
- `npm run build` - Build Next.js for production

## API Integration

The BFF server (`server/server.js`) handles all Jewel ML API communication:
- Aggregates multiple model requests
- Provides unified error handling
- Formats responses for frontend consumption
- Runs on port 3004

The Next.js 15 application fetches data via Server-Side Rendering from the BFF server instead of directly calling the Jewel ML API.

## Model Types

Available recommendation models:
- **L_prod** - You May Like
- **B_prod** - Similar Items  
- **F_prod** - Frequently Bought Together
- **T_prod** - Top Sellers

## Next.js 15 Features

This version leverages the latest Next.js 15 features:
- **App Router**: Modern routing with layouts and nested routes
- **Server Components**: Server-side rendering by default
- **TypeScript**: Full type safety throughout the application
- **Turbopack**: Fast bundler for development (experimental)

## Client-Side Components

Due to Swiper requiring browser APIs, the carousel is rendered client-side using:
- `'use client'` directive for client components
- Dynamic imports with SSR disabled for Swiper components
- Client wrapper components to maintain SSR for the main page

## Ports

- **BFF Server**: http://localhost:3004
- **Next.js App**: http://localhost:3005  
- **Health Check**: http://localhost:3004/health