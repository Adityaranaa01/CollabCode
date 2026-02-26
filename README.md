# 🚀 CollabCode

> Real-time collaborative coding workspace built with a production-grade frontend architecture.

CollabCode is a cinematic, developer-focused UI scaffold for a real-time collaborative coding platform.
Built with modern frontend tooling and structured like a real SaaS product.

This project focuses purely on **design system engineering, component architecture, and production-ready UI structure** — no backend or API logic included.

---

## ✨ Preview

* Cinematic marketing landing page
* Split-layout authentication experience
* Workspace-style dashboard
* Real-time collaboration room UI (editor + chat + terminal)
* Fully custom design system
* Dark-first product experience

---

## 🧱 Tech Stack

* **Next.js 14** (App Router)
* **TypeScript**
* **Tailwind CSS**
* **Lucide React**
* **next/font (Inter + JetBrains Mono)**

No UI libraries.
No component frameworks.
No backend.

Everything is built from scratch.

---

## 🎯 Project Goals

This project was built to:

* Practice production-level frontend architecture
* Translate high-fidelity design into scalable code
* Implement reusable UI systems
* Build a realistic SaaS-style product interface
* Strengthen design-to-engineering workflow

---

## 🖥️ Pages Included

| Route        | Description                               |
| ------------ | ----------------------------------------- |
| `/`          | Cinematic landing page with animated hero |
| `/auth`      | Split-layout login/signup experience      |
| `/dashboard` | Workspace dashboard with room cards       |
| `/room`      | Real-time collaboration room UI           |
| `/not-found` | Custom 404 experience                     |

---

## 🎨 Design System

Custom theme extracted and implemented manually.

**Primary Colors**

* Background: `#050308`
* Surface: `#0d0a14`
* Primary Purple: `#8B5CF6`
* Accent Dark: `#16121f`

**Typography**

* UI Font: Inter
* Code Font: JetBrains Mono

**Animations**

* Cursor blink
* Pulse-dot
* Float
* Fade-up
* Typing dots

No third-party animation libraries were used.

---

## 🧩 Component Architecture

Reusable components include:

* `Logo`
* `Navbar`
* `Footer`
* `GlassCard`
* `RoomCard`
* `CreateRoomModal`
* `CodeEditor`
* `ChatPanel`
* `ParticipantsList`

All components are fully typed and isolated.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Then open:

```
http://localhost:3000
```

---

## 📦 Folder Structure

```
src/
 ├── app/
 │   ├── page.tsx
 │   ├── auth/
 │   ├── dashboard/
 │   ├── room/
 │   ├── not-found.tsx
 │   └── layout.tsx
 ├── components/
 ├── styles/
 └── tailwind.config.ts
```

---

## 🔮 Future Scope

Planned next steps:

* WebSocket-based real-time sync
* Collaborative cursor presence
* Room persistence
* Authentication (OAuth)
* Code execution sandbox
* Role-based permissions

---

## 📌 Status

UI scaffold complete.
Backend integration planned.

---


---

