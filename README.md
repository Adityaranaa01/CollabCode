🚀 CollabCode — Frontend

Real-time collaborative coding platform built with a production-grade frontend architecture.

CollabCode is a real-time collaborative coding platform with a modern SaaS-style interface.
This repository contains the Next.js 14 frontend application, responsible for:

Authentication flows

Dashboard and room management UI

Real-time collaboration interface

WebSocket integration

Design system implementation

The backend (Express + Prisma + PostgreSQL + Socket.io) is maintained separately:

👉 Backend Repository:
https://github.com/Adityaranaa01/CollabCode-Backend

✨ Features

Cinematic landing page

Split-layout authentication

Workspace dashboard

Real-time collaboration room

Live presence tracking

Chat panel

Optimistic concurrency integration

Plan-aware UI restrictions

🧱 Tech Stack

Next.js 14 (App Router)

TypeScript

Tailwind CSS

socket.io-client

Lucide React

next/font (Inter + JetBrains Mono)

No UI frameworks.
No component libraries.
No global state libraries.

All UI built from scratch.

🔐 Authentication Integration

The frontend integrates with a JWT-based backend system:

15-minute access tokens (stored in memory)

7-day rotating refresh tokens (HTTP-only cookie)

Automatic refresh on reconnect

Protected route handling via AuthContext

No localStorage token persistence.

⚡ Real-Time Collaboration

Room collaboration uses:

WebSocket connection via Socket.io

Optimistic concurrency model

Version-based conflict detection

Automatic resync on mismatch

Presence tracking

Chat broadcasting

No CRDT used (intentional architectural tradeoff).

🖥️ Pages
Route	Description
/	Marketing landing page
/auth	Login / Signup experience
/dashboard	Room listing & creation
/room/[id]	Real-time collaboration workspace
/not-found	Custom 404 page
🎨 Design System

Custom dark-first design system.

Primary Colors

Background: #050308

Surface: #0d0a14

Primary Purple: #8B5CF6

Accent Dark: #16121f

Typography

UI: Inter

Code: JetBrains Mono

All animations handcrafted (no animation libraries).

📦 Folder Structure
src/
 ├── app/
 ├── components/
 ├── lib/
 │   └── socket/
 ├── context/
 └── styles/
🚀 Getting Started
npm install
npm run dev

Frontend expects backend running at:

NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
