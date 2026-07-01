# Phụ Kiện Công Nghệ - E-Commerce Store

Welcome to the **Phụ Kiện Công Nghệ** (Tech Accessories) repository! This project is a highly scalable, modern e-commerce platform built from the ground up to deliver speed, security, and a premium user experience.

## 🛠 Tech Stack
This project uses a full-stack Monorepo structure managed by Turborepo.

**Frontend (`/web`)**
- [Next.js 16](https://nextjs.org) (App Router & Turbopack)
- [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [Redux Toolkit](https://redux-toolkit.js.org) (State Management)

**Backend (`/api`)**
- [NestJS](https://nestjs.com) (Node.js Framework)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com) (Database)
- [Swagger](https://swagger.io) (API Documentation)
- [Passport](https://www.passportjs.org/) (JWT & Google OAuth2 Authentication)

## ✨ Core Features
- **Modern UI/UX**: Clean, responsive, and accessible interfaces built with Tailwind and Shadcn. Custom color palettes for both Light and Dark modes.
- **Multilingual Support**: Built-in support for multiple languages (Vietnamese & English).
- **Product Categories**: Structured navigation for `Tai nghe`, `Sạc & Pin`, `Ốp lưng & Kính`, and `Bàn phím & Chuột`.
- **Admin Dashboard**: Role-based access control allowing administrators to manage categories, messages, and store inventory.
- **SEO Optimized**: Dynamic metadata, JSON-LD structured data, and automated sitemaps.
- *Note: Payment Gateway (Stripe) and Email services (Resend) have been bypassed/disabled in this version for simpler local testing and cash-on-delivery flows.*

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- `pnpm` package manager
- A MongoDB Cluster URI (e.g., MongoDB Atlas)

### 2. Environment Setup
Create a `.env` file in the `/api` directory:
```env
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES=30d
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/YourDB
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:3001
PORT=3001
DEFAULT_LOCALE=vi
```

Create a `.env` file in the `/web` directory:
```env
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_URL=http://localhost:3001
NEXT_PUBLIC_NAME="Phụ Kiện Công Nghệ"
NEXT_PUBLIC_CURRENCY=VND
```

### 3. Installation & Running
At the root of the project, install all dependencies and start the development servers:
```bash
pnpm install
pnpm dev
```
- **Web App**: `http://localhost:3000`
- **Backend API**: `http://localhost:3001`
- **Swagger Docs**: `http://localhost:3001/api`

## 👑 Admin Access Setup
Since there is no default seed script, follow these steps to create an admin account:
1. Start the application and go to `http://localhost:3000/signup`.
2. Register a new user account normally.
3. Open your MongoDB GUI (like MongoDB Compass) and connect to your database.
4. Locate the `users` collection, find your newly created account, and change the `role` field from `"user"` to `"admin"`.
5. Refresh the website. You will now see the **Admin** menu in your profile dropdown.

## 📂 Project Structure
```
├── api/          # NestJS Backend API
├── web/          # Next.js Frontend Application
├── packages/     # Shared packages (ESLint, TS configs)
└── turbo.json    # Turborepo configuration
```
