# TripCore - The Art of Escape

Hey there! Welcome to TripCore. This is a high-end luxury travel platform built with Next.js, designed to look and feel premium with smooth animations and a minimalist editorial aesthetic.

## How to get this running

Getting started is pretty straightforward. Just follow these steps:

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Setup your environment**:
    Copy `.env.example` to `.env` and add your PostgreSQL database URL:
    ```bash
    cp .env.example .env
    ```

3.  **Sync the database**:
    We use Prisma to keep things simple. Run this to set up your tables:
    ```bash
    npx prisma db push
    ```

4.  **Fire it up**:
    ```bash
    npm run dev
    ```
    Your app should now be running at `http://localhost:3000`.

## Deployment (The easy way)

The easiest way to put this live is using **Vercel**. 

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  Add your `DATABASE_URL` in the environment variables.
4.  Hit Deploy!

## Tech Stack
- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Animations**: GSAP & Framer Motion
- **Database**: Prisma with PostgreSQL
- **Icons**: Lucide React

---
**Version**: 1.0.0
**Author**: [wysh3](https://github.com/wysh3/)
**License**: MIT
