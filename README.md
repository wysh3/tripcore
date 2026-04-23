# TripCore - The Art of Escape

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwysh3%2Ftripcore-app&env=DATABASE_URL,NEXTAUTH_SECRET&project-name=tripcore-app&repository-name=tripcore-app)

Hey there! Welcome to TripCore. This is a high-end luxury travel platform built with Next.js, designed to look and feel premium with smooth animations and a minimalist editorial aesthetic.

## 🚀 Quick Start

1.  **Clone & Install**:
    ```bash
    git clone https://github.com/wysh3/tripcore-app.git
    cd tripcore-app
    npm install
    ```

2.  **Database (Supabase)**:
    - Create a free project on [Supabase](https://supabase.com/).
    - Go to **Project Settings > Database**.
    - Copy the **Connection String** (use the one for Prisma/Direct connection).
    - Add it to your `.env` as `DATABASE_URL`.

3.  **Setup DB**:
    ```bash
    npx prisma db push
    ```

4.  **Run**:
    ```bash
    npm run dev
    ```

## 🌍 Deployment

The easiest way to go live:

1.  Click the **Deploy to Vercel** button above.
2.  Connect your GitHub.
3.  Paste your **Supabase Connection String** into the `DATABASE_URL` variable.
4.  Add any random string to `NEXTAUTH_SECRET`.
5.  Done! Vercel handles the rest.

## Tech Stack
- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Animations**: GSAP & Framer Motion
- **Database**: Prisma with PostgreSQL
- **Icons**: Lucide React

---
**Version**: 1.0.0 | **Author**: [wysh3](https://github.com/wysh3/) | **License**: MIT


