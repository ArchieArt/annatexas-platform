# Sierra Network Stress Test — One-Week Launch Readiness
### Response & Surgical Audit — annatexas.org

**Prepared by:** The Development Team
**Date:** July 2026
**Scope:** Full audit of the live production tree at `welcome_to_anna/nextjs_space` (the questionnaire's reference paths pointed to an older unzipped copy; every finding below was verified against the **live** code that is actually deployed).

**How to read the status tags**

- **[BUILT]** — exists and works in the live app today.
- **[PARTIAL]** — real and working, but with a named gap to close.
- **[GAP]** — not built; needs work this sprint.
- **[DECISION]** — a choice only Aubre' can make.
- **[VERIFY]** — needs a live end-to-end test before we call it done.

**One honest caveat up front:** this is a written audit of the code as it stands today. Nothing in the app was changed to produce it, and it has not been human- or attorney-reviewed. Where the questionnaire's premise didn't match the live code, I say so plainly rather than agreeing to be agreeable.

---

## The bottom line first

The scary parts are mostly already built and honest. Across the whole system there is exactly **one true launch-blocker** (a payment webhook), **one honesty fix** (a dashboard that shows sample numbers when data is empty), and a handful of "light-up-the-tile" decisions about which *coming-next* modules are worth turning on this week.

| # | Item | Status | Sprint priority |
|---|------|--------|-----------------|
| 3.1 | `invoice.payment_succeeded` webhook not handled | **[GAP]** | **MUST-FIX #1** |
| 2.2 | Municipality dashboard shows demo numbers when empty | **[GAP]** | **MUST-FIX #2** |
| 1.1 | Two Ask-Sierra surfaces — one grounded, one canned | **[PARTIAL]** | Should-do |
| 1.1 | Knowledge sync has no scheduled run | **[GAP]** | Should-do |
| 1.4 | Nonprofit role has no dedicated Square | **[GAP]** | Should-do |
| 3.3 | Unsold ad frames / house content | **[DECISION→BUILD]** | Should-do (already decided) |
| 2.1 | "Coming next" modules per role | **[DECISION]** | Pick a few |
| 4.2 | SILO Reports integration | **[PARTIAL/stub]** | Fast-follow |

Everything else audited — payment security, 100%-artist art ledger, the human editorial gate, token/lead accounting, role access control, and the economic-impact engine — is **already built and honest**.

---

## Section 1 — Sierra Agent Network Readiness

### 1.1 Ask Sierra (public-facing assistant) — [PARTIAL]

**The questionnaire's premise is only half true.** There are actually **two different Sierra surfaces** in the live app, and they behave differently:

- **The homepage "Ask Sierra" widget** (`components/ask-sierra-widget.tsx`) calls `/api/sierra/ask` → `askSierra()` in `lib/sierra.ts`. This path **is** knowledge-grounded and AI-backed: it loads the live knowledge base from the **`SierraKnowledge`** model (`getKnowledgeBase()`), builds a context, and calls the reasoning engine, with a self-healing retry and a safe fallback. This is real, and it's live.
- **The `/hey-anna` full page and the business version** (`app/api/hey-anna/route.ts`, `app/api/hey-anna-business/route.ts`) are the older **keyword/phrase router** with canned answers that the questionnaire describes. They record only `SIERRA_QUESTION` analytics by topic and are **not** grounded.

**The gap:** we have a great grounded engine and a separate canned one, and they're not unified. A visitor gets a smart answer on the homepage and a scripted one on `/hey-anna`.

**Desired state for launch:** point the `/hey-anna` page (and the business page) at the same `askSierra()` engine, keeping the keyword router only as an instant fallback when the reasoning engine is unreachable. This is a small, contained change — swap the fetch target and pass the role flag.

> **Also (real gap):** the knowledge base is compiled by `scripts/daily-sierra-sync.ts`, but there is **no scheduled job** running it (no cron directory exists). Today it only refreshes when someone triggers `/api/sierra/sync` by hand, so Sierra's grounding can go stale. Recommend a scheduled daily sync — I can set that up.

**Files:** `app/api/hey-anna/route.ts`, `lib/sierra.ts` (`askSierra`, `getKnowledgeBase`), `components/ask-sierra-widget.tsx`, `scripts/daily-sierra-sync.ts`.

### 1.2 MonaSierra (arts & culture / artist portal) — [BUILT], one [VERIFY]

The artist portal is one of the most complete parts of the app. Every artist module in the registry is `live: true` — profile, gallery, orders, leads, academy, opportunities, analytics, magazine, earnings, campaigns.

**`ArtLedgerEntry` is actively populated and auditable — [BUILT].** On every art checkout (`app/api/arts/checkout/route.ts`), the app writes one ledger row per item with a full money breakdown (print cost, artist markup, processing, buyer-paid, **net-to-artist**), and it calls `assertZeroCommission()` so the platform can never skim — the **100%-to-artist** promise is enforced in code, not just in copy. Grant management for the Anna Arts Council lives in the **Ophelia Grant Station** at `/grants` (also live).

**The one [VERIFY]:** ledger rows are written at `PENDING` on checkout. Before launch we should confirm the row flips to a settled state when payment actually clears (see the webhook item in 3.1 — art payments should settle the same reliable way token payments do).

**Files:** `app/arts/studio/**`, `lib/arts/**`, `app/api/arts/checkout/route.ts`.

### 1.3 Sierra Grace (magazine editor & AI journalists) — [BUILT — a strength]

This was audited in depth for the prior questionnaire and it holds up. **Nothing publishes itself.** The AI stages (`lib/magazine/production/sierra.ts`) only ever return structured findings (PASS / ADVISORY / NEEDS_HUMAN / BLOCKED). The release gate (`release-gate.ts`) makes a named human holding the **publisher role** the final actor — "AI may never override" — and an emergency override needs two people plus a written reason and an audit record. `SierraEditorialThread` is used on the admin production pages (`app/dashboard/admin/production/generations/...`) to hold the human-oversight conversation.

**Immediate step (not a code gap):** confirm a real, named person is assigned the publisher role for the Anna tenant so the final-approval seat is filled at launch.

### 1.4 Sierra Joy (nonprofit arm) — [PARTIAL / GAP]

The pieces exist: the `NONPROFIT` role is real, there are nonprofit routes (`app/nonprofit`, `app/api/nonprofit/orgs`, `app/api/nonprofit/admin`), and grants (Ophelia) are live at `/grants`.

**The gap:** there is **no dedicated nonprofit Square**. `lib/anna-square/presets.ts` has presets for admin, artist, business, city, chamber, council, and EDC — but **not** nonprofit, and `NONPROFIT` isn't mapped in `access.ts` (`BASE_ROLE_SQUARES`). So a verified nonprofit can reach nonprofit pages by URL, but has no home Square in the switcher tying grants, volunteer opportunities, and their org profile together.

**Desired state for launch:** add a Nonprofit Square preset (8 tiles pointing at the nonprofit routes + grants that already exist) and map the role in `access.ts`. This is mostly configuration — it reuses pages that are already built.

### 1.5 Sierra EDC — [PARTIAL by design]

Two EDC modules are live (`business-pipeline`, `edc-incentives`); six are honestly marked "coming next" (`sites-properties`, `workforce`, `market-intel`, `business-retention`, `edc-projects`, `edc-reports`). The economic-impact backend (`app/api/admin/economic-impact/route.ts`) is **real and honest** — it computes five headline metrics live, excludes seed/phantom listings, and attaches plain-English "this is an honest proxy" notes. It is **on-demand**, not scheduled.

**Recommendation for the one-week sprint:** don't try to light up all six. The highest-value, lowest-effort tile to enable for a City/EDC demo is **`edc-reports`**, pointed at the economic-impact engine that already exists — it turns work you've *already built* into a visible board-ready deliverable. Leave the rest as honest "coming next."

### 1.6 Sierra Valor (Mayor) & Sierra City Manager — [PARTIAL], one [GAP]

City modules `community-briefing` and `city-command` are live (Citynest + the municipal command center). `plans-projects`, `public-record`, `community-life`, and `city-comms` are "coming next." The `CityDirective` and `CityTask` models exist and back the Citynest directive→task flow.

**The real integrity gap is 2.2** (below): `app/api/municipality/stats/route.ts` shows **sample numbers** when live data is empty. That must be fixed before any City official sees the dashboard — a city buyer must never be shown invented figures.

### 1.7 Sierra Mailroom — [BUILT], reliability [VERIFY]

The `communications` module is live (`/dashboard/admin/mailroom`), and the `Notification` model exists. The private admin Rolodex/CRM ("The Mailroom") is built.

**[VERIFY] before launch:** confirm the actual send path — email notifications go out through the platform's notification service, and any custom-domain sender address only activates after the app is deployed on that domain. In-app messaging and push are not separate channels yet; if you want those, name it and we'll scope it.

---

## Section 2 — Multi-Role Dashboard Robustness

### 2.1 Live vs. "coming next" audit — [BUILT registry, DECISION needed]

Good news first: the registry (`lib/anna-square/module-registry.ts`) is **honest by design**. A tile marked `live: false` renders as "Coming next" instead of linking to a dead page — so no user ever hits a broken route. Here's the exact live/coming-next count per Square today:

| Square | Live now | Coming next |
|--------|----------|-------------|
| **Artist** | all 8 core (+ earnings, campaigns) | — (most complete) |
| **Business** | 5 of 8 | leads-matches, deals, business-analytics |
| **Admin** | 4 of 8 | verification, approvals, trust-safety, system-health |
| **City** | 4 of 8 | plans-projects, public-record, community-life, city-comms |
| **EDC** | 2 of 8 | sites-properties, workforce, market-intel, business-retention, edc-projects, edc-reports |
| **Chamber** | 2 of 8 | referrals, sponsorships, welcome-anna, campaigns, comms, impact |
| **Council** | 2 of 8 | agendas, plans, decisions, district-residents, fiscal, comms |
| **Nonprofit** | *(no Square yet — see 1.4)* | — |

**My recommended "top few to light up" for a trustworthy launch (highest value, lowest effort):**

- **Business → `leads-matches`** — buyers pay for leads; this tile should show them. Highest revenue-trust value.
- **EDC → `edc-reports`** — wire to the economic-impact engine that already exists.
- **Nonprofit Square** — stand up the preset (1.4) so nonprofits have a home.

Everything else can stay honestly "coming next." A few real, working tiles beat many half-working ones.

### 2.2 Data integrity in dashboards — [GAP, MUST-FIX #2]

**Confirmed exactly as the questionnaire suspected.** `app/api/municipality/stats/route.ts` returns hardcoded sample arrays for `monthlyGrowth`, `surveyBreakdown`, and `categoryBreakdown` whenever the live query comes back empty. That means a City dashboard could silently show invented growth numbers. **This is the most dangerous honesty risk in the app** and must be fixed: return empty arrays (and let the UI show a clean empty state) instead of sample data. The `metrics` block in the same file is real — only the three chart fallbacks are the problem.

**I audited the other dashboard endpoints too, and the news is good:** the fallbacks in `citynest/overview`, `edc/overview`, and `roles/briefing` are only for the **AI narrative summary text** when the reasoning engine is unreachable — they are clearly flagged `grounded: false`, and the underlying **numbers** in those endpoints are real from the database. The economic-impact and admin-command endpoints use real data with honest "proxy" notes. So **municipality/stats is the one real offender.**

### 2.3 Role access & permissions — [BUILT — sound design]

The access model is layered and safe. `lib/anna-square/access.ts` is a **view-gate on the navigation shell only** — seeing a Square never grants access to the page behind it. Every destination route keeps its own auth guard, and `middleware.ts` blocks guests from `/dashboard`, `/admin`, `/my-anna`, `/edc`, etc., with role-based redirects. Verified role assignments (`UserRoleAssignment`, status `VERIFIED`) unlock the matching Square, and the code **fails closed** on any lookup error.

**One item to close alongside 1.4:** because there's no nonprofit Square, verified nonprofits fall through the switcher. Adding that preset also tidies this. No unauthorized-access vulnerability was found in the audit — the design correctly separates "what you can see in the menu" from "what the page lets you do."

---

## Section 3 — Monetization & Payer Trust (Deep Dive)

### 3.1 Stripe webhook completeness — [GAP, MUST-FIX #1]

`app/api/stripe/webhook/route.ts` is well-built where it exists: it requires a valid signature, is idempotent via the `WebhookEvent` model (no double-crediting), and handles **`checkout.session.completed`** (grants tokens, and settles magazine ad orders tagged `anna_life_ad`), **`customer.subscription.updated`**, and **`customer.subscription.deleted`**.

**The blocker:** **`invoice.payment_succeeded` is not handled anywhere.** That's the event Stripe fires on **monthly subscription renewals**. Today, a recurring subscriber (Growth, Dominate, or a legacy tier) gets **charged** each month but is **not re-granted** their monthly tokens. Left unfixed, your most loyal paying customers quietly stop getting what they pay for — the fastest way to lose payer trust.

**Fix:** add an `invoice.payment_succeeded` branch in `processEvent()` — skip the very first invoice (the signup, already handled by checkout), look the subscriber up by their subscription id, increment their token package, and write a `TokenPurchase` record for the audit trail. Then confirm the Stripe Dashboard endpoint is actually subscribed to that event.

**Also [VERIFY]:** art-marketplace payments (`ArtLedgerEntry`) currently write `PENDING` at checkout — confirm they settle on payment the same reliable way (either via this webhook or the verify-on-return path).

### 3.2 Token & lead flow — [BUILT — auditable]

This end-to-end flow is solid. Token packages are bought via `app/api/stripe/checkout/route.ts` and granted by the webhook, every purchase writes a `TokenPurchase` row, and `Provider.totalLeads` / `totalConverted` are updated in the **real** flows: `+1 totalLeads` on each matched provider at onboarding (`app/api/onboarding/route.ts`, `onboarding/deep`), `+1 totalLeads` on survey-driven lead-gen (`surveys/[id]/vote`), and `+1 totalConverted` when a lead converts (`app/api/leads/route.ts`). Balances are traceable and auditable. The only accuracy dependency is fixing the renewal webhook in 3.1 so subscription token top-ups also land.

### 3.3 Ad sales & magazine population — [BUILT flow], [DECISION→BUILD] house content

The self-serve FRAME flow is real and live (this was wired to real Stripe checkout in the last magazine build): a buyer selects a frame, the app places a hold, opens Stripe checkout, settles on return **and** via the webhook backstop (double-settle-safe), then the creative goes through file-safety and human proof approval before it locks into the issue. Ads confer **no** editorial benefit — that rule is enforced in `lib/magazine/production/ads.ts`.

**What's genuinely not built:** there is **no automated fill-rate calculation** and **no house-content auto-fill** for unsold frames (I searched `ads.ts`, `provision.ts`, `blocks.ts` — only a stray comment references a filler role). This matches your recent decision. Per your instruction, unsold frames should auto-fill on rotation with your own free house ads — **Town Square Apps (triageapps.org), Slidersss.org, Anna Arts Council donations, a "Sponsors — with appreciation" thank-you, and scan-to-open QR codes** (business profile / artist portal) — carrying no editorial weight, purely so the magazine never looks empty. Ready to build this on your go.

---

## Section 4 — Data Funnels & Content Population

### 4.1 Data funnel audit — [MOSTLY BUILT]

Most funnels reliably write into the database and surface on dashboards. Quick status:

| Funnel | Status |
|--------|--------|
| Newcomer questionnaire / onboarding → matches | **[BUILT]** (writes profile, fires match leads) |
| Business profiles / claims / listings | **[BUILT]** |
| Welcome Offers / deals | **[BUILT]** (data model + provider flow) |
| Jobs board | **[BUILT]** |
| Stories & Kind Deeds | **[BUILT]** (submit + moderation) |
| Survey Says! (community-authored + write-in) | **[BUILT]** |
| Ask-Sierra questions (topic analytics) | **[BUILT]** |
| Artist pages / artwork / art orders | **[BUILT]** (+ art ledger) |
| Events / calendar | **[PARTIAL]** — aggregation/scraping is the parked deals-events vision |
| Crowdfunding | **[GAP/PLANNED]** — model-level, not a live resident flow |
| Grants manager | **[BUILT]** (Ophelia at /grants) |

**For the sprint,** no funnel is broken in a way that blocks launch. The two "coming" items (events aggregation, crowdfunding) are planned features, not regressions — I recommend leaving them honestly labeled rather than rushing them in a week.

### 4.2 SILO Reports integration — [PARTIAL / stub]

**SILO Reports is a separate application (siloreport.org), not a module inside this app.** In the live code there is **no** `app/api/silo/**` and **no** `components/business-profile/silo-reports.tsx`. What exists are honest partnership **placeholders**: `components/town-square-command.tsx` explicitly labels its SILO panels "*This panel goes live once the SILO Report feed is connected. Sample grades shown.*", and `components/provider/realtor-apps.tsx` links out to siloreport.org.

**Desired state:** treat SILO as a **fast-follow partnership integration**, not a launch item. When you're ready, we define the feed contract (what SILO returns per business), add a real `app/api/silo` endpoint, and swap the placeholder panels for live grades. It is correctly **not** faking data today, which is the right call.

---

## Recommended one-week sprint order

1. **Fix the renewal webhook (3.1)** — the only true launch-blocker. Subscribers must get their monthly tokens.
2. **Kill the demo-data fallback in municipality/stats (2.2)** — no invented numbers in front of the City. Ever.
3. **Unify Ask Sierra + schedule the knowledge sync (1.1)** — every Sierra surface knowledge-grounded, kept fresh daily.
4. **Stand up the Nonprofit Square (1.4)** — reuses pages that already exist; gives nonprofits a home.
5. **Build the house-ad fallback for unsold frames (3.3)** — your decided list, on rotation.
6. **Light up a few high-value tiles (2.1):** Business → leads-matches, EDC → edc-reports.
7. **Fast-follows (after launch):** SILO feed (4.2), events aggregation & crowdfunding (4.1), remaining "coming next" modules.

Items 1–2 are the real must-fixes. Items 3–6 are all small-to-medium and self-contained. None of this requires rebuilding anything — the foundation is genuinely strong.

---

*Prepared by The Development Team for Aubre' Murphy. This is an engineering readiness audit of the current codebase, not a legal or financial certification. No application code was changed to produce this document.*
