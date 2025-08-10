
# Omni AI — Backend (Full Starter)
Serverless backend for Omni AI (Vercel). Endpoints:
- `POST /api/chat` — `{ prompt, lang }` -> `{ answer }` (EN/AR, CORS enabled)
- `GET /api/health` — health probe
- `GET /api/version` — version

## Deploy (Vercel)
1) Create a GitHub repo and upload these files to the root.
2) In Vercel: **Import Git Repository** -> select your repo -> Framework: **Other** -> Deploy.
3) Your URL: `https://<project>.vercel.app`

## Test
```
curl https://<project>.vercel.app/api/health
curl -X POST -H "Content-Type: application/json"   https://<project>.vercel.app/api/chat   -d '{"prompt":"What does GPI do?","lang":"en"}'
```

## Connect Frontend
Open your site with:
`https://<your-tiiny>.tiiny.site/?api=https://<project>.vercel.app`

> This is a starter "KB seed". We will swap `/api/chat` logic to the full RAG pipeline later.
