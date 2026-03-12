# 🎯 CAZR — Hunt the Best Price

AI-powered price comparison for Amazon, Walmart & Best Buy USA.
Bilingual: English & Spanish.

---

## 🚀 Deploy to Internet FREE (Render)

### Step 1 — Get your Anthropic API Key
1. Go to https://console.anthropic.com
2. Sign up (free)
3. Go to **API Keys** → **Create Key**
4. Copy your key (starts with `sk-ant-...`)
5. Add $5–$10 credit in Billing

### Step 2 — Upload to GitHub
1. Create account at https://github.com
2. Create new repo named `cazr`
3. Upload all files (EXCEPT `.env`)

### Step 3 — Deploy on Render (free tier)
1. Go to https://render.com → sign up
2. Click **New → Web Service**
3. Connect your GitHub repo
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add **Environment Variable:**
   - `ANTHROPIC_API_KEY` = your key
6. Click **Deploy** 🎉

Your app will be live at: `https://cazr-XXXX.onrender.com`

---

## 💻 Run Locally

```bash
npm install
cp .env.example .env   # add your API key in .env
npm start
# Open http://localhost:3000
```

---

## 📁 Structure

```
cazr/
├── server.js           ← Secure backend (API key never exposed)
├── package.json
├── .env.example
├── .gitignore
└── public/
    └── index.html      ← Full bilingual app (ES/EN)
```

---

## 💰 API Cost Estimate

Using Claude Haiku 4.5 (~$0.002 per search):

| Monthly searches | Estimated cost |
|-----------------|----------------|
| 500             | ~$1            |
| 5,000           | ~$5–$10        |
| 50,000          | ~$50–$100      |
