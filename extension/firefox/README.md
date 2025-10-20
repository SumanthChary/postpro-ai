# PostPro AI Firefox Companion

A lightweight Firefox browser extension that brings the Post Enhancer and Virality Predictor into a single popup. The UI mirrors the PostPro AI brand and talks directly to your Supabase Edge Functions, so you can enhance drafts or score virality without leaving the tab you are on.

> **Status:** MVP scaffold. Authentication uses Supabase credentials you provide through the extension settings page. Wire it to your production instance before publishing.

## Features

- **Post Enhancer:** Send your draft to the `enhance-post` Edge Function and review the platform-specific rewrites plus optimization tips.
- **Virality Predictor:** Call `analyze-virality` to retrieve the live score, insights, and quick wins.
- **Brand-consistent UI:** Gradient background, rounded cards, and typography inspired by the main product.
- **Quick links:** Jump to the dashboard, billing page, or extension options in one tap.

## Project structure

```
extension/firefox/
├── icons/
│   └── icon.svg           # Shared icon for all sizes (Firefox accepts SVG)
├── manifest.json          # Firefox MV3 manifest
├── popup.html             # Popup markup
├── popup.css              # Popup theme
├── popup.js               # UI logic + Supabase function calls
├── options.html           # Settings page for credentials
├── options.css            # Options styling
├── options.js             # Settings persistence via storage.sync
└── README.md              # You are here
```

## Getting started locally

1. **Configure Supabase values.**
   - Navigate to `about:debugging#/runtime/this-firefox` → “Load Temporary Add-on…” → select `extension/firefox/manifest.json`.
   - Open the extension popup, click **Extension settings**, and enter:
     - `Supabase URL`: `https://YOUR_PROJECT_REF.supabase.co`
     - `Supabase anon key`: public anon key (never the service role key).
     - `User token` *(optional)*: paste the `access_token` from a logged-in PostPro session (grants plan-aware limits).
     - `User ID` *(optional)*:  UUID to log enhancements and enforce quotas.
     - Dashboard / plans URLs (defaults provided).
2. **Try the popup.** Paste a draft, choose tone and category, then click **Enhance Post** or **Predict**.
3. **Update branding or behaviors** in `popup.css` & `popup.js` as needed.

### Recommended improvements before release

- **Authentication flow:** embed Supabase email login or magic link so users do not need to paste tokens manually.
- **Credit / plan gating:** call your `/subscription` endpoint to guard enhancement volume.
- **Analytics:** send usage events to your existing analytics pipeline.
- **Content scripts (optional):** inject quick-action buttons into LinkedIn / X compose boxes.

## Build & packaging

No build step is required—the extension is plain HTML/JS/CSS.

To create a distributable archive:

```bash
cd extension/firefox
zip -r ../postpro-ai-firefox.zip .
```

This `.zip` is what you will upload to Firefox Add-ons (AMO).

## Publishing checklist (Firefox Add-ons)

1. **Create a Firefox Add-ons account** at [addons.mozilla.org](https://addons.mozilla.org/).
2. **Prepare listing assets:** title, 2–3 screenshots (1280×800), promotional copy, privacy policy URL, support link.
3. **Run the automated linter**: upload the `.zip`; fix any warnings the reviewer highlights.
4. **Fill in metadata:** category (Productivity), summary, detailed description, initial version number (`0.1.0` → follow semver).
5. **Submit for review** and respond to reviewer questions (they often ask about remote code execution and privacy).
6. **Once approved**, the listing goes live. Keep the version numbers in `manifest.json` and AMO in sync when you ship updates.

## Security & privacy notes

- Store only the anon key and optional session token in `browser.storage.sync`; Firefox encrypts sync storage but users can inspect their own values.
- Never ship the Supabase service key. For billing/plan checks, expose a REST endpoint that validates the user token and returns current entitlements.
- Provide a clear privacy statement in your AMO listing describing how the extension uses Supabase and any data stored.

## Theming quick reference

Brand colors live in `popup.css` and `options.css`: primary `#396BFF`, secondary `#6C5CE7`, background gradients that match the website hero.

---

Need inline schedulers or more automation? Add them as separate modules (content scripts or additional popups) and load them through the same manifest. Let’s keep this MVP focused on enhancing and scoring posts.
