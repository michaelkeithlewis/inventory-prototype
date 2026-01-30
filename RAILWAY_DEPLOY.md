# Deploy to Railway (staging)

This app is a Vite + React SPA with client-side routing. Use these steps to deploy to Railway for staging.

## 1. Push your code to GitHub

If the repo isn’t on GitHub yet:

```bash
git remote add origin https://github.com/YOUR_USERNAME/inventory-prototype.git
git add .
git commit -m "Prepare for Railway deploy"
git push -u origin main
```

(Use your repo URL and branch name if different.)

## 2. Create a Railway account and project

1. Go to [railway.app](https://railway.app) and sign in (GitHub is easiest).
2. Click **New Project**.
3. Choose **Deploy from GitHub repo**.
4. Select the `inventory-prototype` repo (or connect GitHub and then select it).
5. Railway will create a new service from that repo.

## 3. Configure build and start

In the Railway dashboard for your service:

1. Open the service → **Settings** (or **Variables** tab).
2. **Build Command** (in Build or Settings):
   - Set to: `npm run build`
   - Or leave blank if Railway infers it from `package.json` (it will run `npm install` and then use the build script).
3. **Start Command** (Root Directory / Start Command):
   - Set to: `npm start`
   - This runs `serve -s dist -l ${PORT:-3000}` so the built app is served with SPA fallback (all routes → `index.html`) and listens on Railway’s `PORT`.

If your dashboard uses **Nixpacks** or a different UI:

- **Build**: `npm run build`
- **Start**: `npm start`

Ensure the **Root Directory** is the repo root (where `package.json` and `vite.config.ts` live).

## 4. Deploy

1. Trigger a deploy: **Deploy** (or push a new commit if you have “Deploy on push” enabled).
2. Wait for the build to finish (build then start).
3. Open the generated URL (e.g. **Settings → Domains → Generate domain** if no domain is set yet).

## 5. Optional: custom domain and env

- **Custom domain**: In the service, go to **Settings → Domains** and add your staging domain; point DNS as Railway instructs.
- **Env vars**: If you add backend or API keys later, set them under **Variables** in the service.

## Troubleshooting

- **Build fails**: Ensure Node version is 20+ (Railway usually provides this). If needed, add a `.nvmrc` with `20` or set `NODE_VERSION` in Variables.
- **Blank page or 404 on refresh**: The start command must serve the SPA with fallback; `npm start` uses `serve -s dist`, which does that.
- **Port**: Railway sets `PORT`; the start script uses it so you don’t need to set it manually.
