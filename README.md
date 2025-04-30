# Qubic Dashboard

A modern, interactive dashboard application built with Next.js, TypeScript, Tailwind CSS, and Radix UI. This project leverages server-side rendering, JWT authentication, form validation, and real-time data fetching.

## 🚀 Features

- Next.js 15 with Turbopack support
- Type-safe forms with React Hook Form + Yup
- Auth using JWT and cookies
- UI built with Tailwind CSS and Radix UI components
- React Query & SWR for efficient data fetching
- Zustand for lightweight global state
- Deployment-ready on Vercel

---

## 🧰 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript
- **UI**: Tailwind CSS, Radix UI
- **Form Validation**: React Hook Form + Yup
- **State Management**: Zustand
- **Data Fetching**: React Query, SWR
- **Auth**: `jsonwebtoken`, `jose`, `js-cookie`
- **Other**: Lucide Icons, ESLint, Turbopack

---

## 📦 Installation

Make sure you have **Node.js 18+** installed.

```bash
git clone https://github.com/your-username/qubic-dashboard.git
cd qubic-dashboard
npm install
```

## 🛠️ Development

Start the development server:

bash
Copy
Edit
npm run dev
Then open <http://localhost:3000> in your browser.

Folder Structure

- app/ – Routing and layouts (Next.js App Router)

- components/ – Reusable UI components

- hooks/ – Custom React hooks

- store/ – Zustand state management

- lib/ – Utilities (e.g. auth, API helpers)

- types/ – TypeScript interfaces and types

- schemas/ – Yup validation schemas

## 🌐 Deployment on Vercel

This project is fully compatible with Vercel. To deploy:

1. Push your code to a GitHub/GitLab/Bitbucket repository.

2. Go to vercel.com and sign in.

3. Click "Add New Project" and import your repository.

4. Vercel will detect the Next.js framework automatically.

5. Set the following environment variables in the Vercel project settings.

# JWT secret for encoding/decoding user tokens

JWT_SECRET=your-secret-key

6. Click Deploy, and Vercel will handle the rest (build, optimize, and deploy your app).
