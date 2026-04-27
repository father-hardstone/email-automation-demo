# Email Automation Demo

A small **serverless-ready** Node.js backend that generates **ready-to-send outreach emails** using **Gemini**.

It reads leads from either:
- a simple JSON file (`leads.json`), or
- an Apollo CSV export (`apollo-contacts-export.csv`)

Then it uses a **template library** (`email-templates.json`) as structured guidance (Gemini can mix/match templates) and returns either:
- **JSON** (`{ subject, body }`), or
- a **simple HTML preview page** for browser testing.

## Features
- **Gemini-powered email generation** (prompt enforces JSON output, CTA, and custom subject)
- **Template library** (`email-templates.json`) with placeholder resolution (e.g. `{{name}}`, `{{field}}`)
- **Mix-and-match templates**: Gemini receives the full library and can blend structure/headers
- **Sequential lead selection**
  - `/generate-email`: picks the next lead from `leads.json` if `leadId` isn’t provided
  - `/generate-email-from-apollo`: picks the next CSV lead with a valid email
- **HTML preview mode** with a “Ready to send email” view + a **Technical log**
  - token usage (when available), timing, chosen tone, recipient mini-profile
  - “sending is a stub” notice (this project does not actually send emails)
- **Deployable on Vercel** as a serverless function

## Tech stack
- Node.js + Express
- `@google/generative-ai` (Gemini)
- `csv-parse` (Apollo CSV parsing)

## Project structure
- `api/index.js`: Vercel serverless entrypoint
- `src/server.js`: local server runner
- `src/app.js`: Express app factory
- `src/routes/`: HTTP routes
- `src/controllers/`: request handlers
- `src/services/`: Gemini + templates + lead loading
- `src/enrich/`: CSV enrichment/parsing
- `src/helpers/`: HTML rendering, random tone, paths, errors

## Setup
1) Install dependencies:

```bash
npm install
```

2) Create `.env` in the repo root and set your API key:

```bash
copy .env.example .env
```

Then edit `.env` and set:
- `GEMINI_API_KEY=...`

## Run locally

```bash
npm run dev
```

## Endpoints

### Health
- `GET /health`

### Generate email (from `leads.json`)
- `GET /generate-email` (supports browser testing via query params)
- `POST /generate-email` (JSON body)

Body/query params (all optional unless noted):
- `leadId`: pick a specific lead by `id` or `email`
  - if omitted, the API picks the **next lead sequentially**
- `templateId`: preferred template id from `email-templates.json`
- `subject`: optional subject hint
- `leadsFile`: defaults to `leads.json`
- `templateFile`: defaults to `template.txt` (optional extra guidance)
- `templatesFile`: defaults to `email-templates.json`
- `stateFile`: defaults to `.lead-state.json` (queue pointer)

### Generate email (from Apollo CSV)
- `GET /generate-email-from-apollo` (supports browser testing via query params)
- `POST /generate-email-from-apollo` (JSON body)

Body/query params:
- `csvFile`: defaults to `apollo-contacts-export.csv`
- `templateId`, `subject`, `templateFile`, `templatesFile`
- `stateFile`: defaults to `.apollo-lead-state.json` (queue pointer)

## Response formats
### JSON (default)
Returns:
- `email.subject`
- `email.body`
- `tone` (randomly chosen per request)
- `insights` (timing, usage, model)
- `selection` (when sequential selection is used)

### HTML preview (browser-friendly)
Add `?format=html` (or send `Accept: text/html`).

Example URLs:
- `http://localhost:3000/generate-email?format=html&templateId=cold_intro_student&subject=Quick%20question`
- `http://localhost:3000/generate-email-from-apollo?format=html&csvFile=apollo-contacts-export.csv&templateId=cold_intro_student`

## Important notes
- **Email sending is a stub**: this project generates email content only (no SMTP/provider integration yet).

## Deploy to Vercel (serverless)
This repo includes `vercel.json` and `api/index.js`.

On Vercel:
- Set **`GEMINI_API_KEY`** in Project → Settings → Environment Variables
- Deploy

Your routes remain the same:
- `GET /health`
- `POST /generate-email`
- `POST /generate-email-from-apollo`

