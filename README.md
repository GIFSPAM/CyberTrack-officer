# CyberTrack Officer Portal

Internal monitoring and case registration dashboard for the Cybercrime Police Station, Palakkad (Kerala Police). Built using a modern React, TanStack, and Supabase stack.

---

## Technical Stack

- **Framework:** React 19 + TanStack Start (SPA mode enabled)
- **Routing & State:** TanStack Router + TanStack Query
- **Backend/Database:** Supabase (PostgreSQL) + RLS policies
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts
- **PDF Generation:** jsPDF + html2canvas

---

## Features

- **Streamlined Case Entry:** Officers can register complaints quickly. Complainant name and phone are optional (allowing anonymous case input). The Case ID is automatically generated.
- **Cascading Category/Location Deletion:** Deleting a classification category or location automatically re-assigns existing cases to the default `"Other"` category/location (ID `1`), preventing database dependency conflicts.
- **Filter-Aware CSV Exports:** Generate and download custom CSV spreadsheets of cases on both the *All Cases* and *Analysis* pages matching any active search, date, location, or amount filters.
- **Analytical PDF Reports:** Generate clean, printable PDF summaries of station metrics and statistics.

---

## Local Development

### 1. Configure Environment Variables
Create a `.env.local` file in the root directory and add your Supabase credentials:

```bash
# .env.local
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
VITE_SUPABASE_SERVICE_KEY=your-service-secret-key
```

### 2. Install and Run
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portal.

---

## Database Setup

Run the SQL queries in `supabase-rls-setup.sql` within your **Supabase Dashboard → SQL Editor** to initialize the database tables, default officer account, default category/location fallbacks, and Row-Level Security (RLS) policies.

- **Default Admin Account:**
  - **Username:** `CCPSP`
  - **Password:** `Admin@1234`

---

## GitHub Pages Static Hosting

This project is configured to build as a static Single Page Application (SPA) for GitHub Pages. 

### 1. Build and Publish
To manually build and deploy the application to your repository's `gh-pages` branch, execute the following command:

```bash
export GITHUB_REPOSITORY=cybertrackccpspkd-blip/CyberTrack-officer
npm run build
cd .output/public
git init
git checkout -B gh-pages
git add .
git commit -m "deploy: publish static site to GitHub Pages"
git remote add origin https://github.com/cybertrackccpspkd-blip/CyberTrack-officer.git
git push -f origin gh-pages
```

### 2. Configure GitHub Settings
Once the files are pushed to the `gh-pages` branch:
1. Open the repository on GitHub.
2. Go to **Settings** (top tab).
3. Select **Pages** (in the left sidebar under *Code and automation*).
4. Under **Build and deployment** → **Source**, ensure **Deploy from a branch** is selected.
5. Under **Branch**, select **`gh-pages`** and folder **`/ (root)`**.
6. Click **Save**.
