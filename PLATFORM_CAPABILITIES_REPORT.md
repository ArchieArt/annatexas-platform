# Town Square Apps — Platform Capabilities Report

**Prepared for:** Aubre' Murphy, Founder — Town Square Apps, LLC (Anna, Texas)
**Purpose:** A single, portfolio-level inventory of every app's build and capabilities — the foundation for the "super-app" consulting vision.
**Status of this document:** AnnaTexas.org section is COMPLETE (audited directly from source). The other four apps have structured placeholders to be filled in from each app's own conversation.

---

## How to read this report

Each app is documented in the same five-part structure so they can be compared side-by-side:
1. **What it is** — the product in one paragraph.
2. **By the numbers** — hard build metrics.
3. **Capability modules** — what it actually does, grouped by function.
4. **Reusable engines** — the parts that could power other apps (the super-app building blocks).
5. **Data assets** — what real data it holds.

---

# APP 1 — AnnaTexas.org  ✅ COMPLETE

### 1. What it is
A hyper-local, vetted digital ecosystem for the City of Anna, Texas. It welcomes new residents, routes them to verified local businesses through a tag-matching engine, runs a token-based lead economy for those businesses, and rolls the whole community's activity up into government-grade dashboards built to be sold to the City as a white-labeled economic-development tool. Live at **annatexas.org**.

### 2. By the numbers
| Metric | Count |
|---|---|
| Total lines of application code | ~39,400 |
| React components | 79 |
| API endpoints | 95 |
| Engine libraries (`lib/`) | 22 |
| Database models | 40 |
| Database enums | 19 |
| Businesses mapped (live data) | 172 |
| New residents welcomed (live data) | 97 |

### 3. Capability modules

**Resident onboarding & the "Four Doors" front door.** A role-aware homepage funnels four audiences (Newcomer, Neighbor, Business, City Leader) into tailored paths. New residents complete an 8-step conversational onboarding wizard that converts answers into categorical tags.

**Smart business matching.** The tag engine routes each resident to businesses whose tags match their stated needs — the core "single source of truth" promise. Powered by `lib/matching.ts`.

**Business directory & lifecycle.** A public directory of 172 Anna businesses, each moving through a lifecycle: PHANTOM (unclaimed call-sheet) → CLAIMED → CERTIFIED (Chamber-verified). Providers get profiles, personalized tiles, digital business cards, and QR/vCard tools.

**Token economy & billing.** Businesses buy tokens (Stripe-backed) to pay per lead, for featured listings, and for ads — the pay-per-value model that keeps money local. Includes token purchase, gifting, and full transaction history.

**"Survey Says!" civic engagement.** Community trivia/surveys where every answer is a real local business or landmark. Reaching a vote threshold declares a winner, awards the matched business tokens + a badge, and generates leads.

**Sierra AI assistant.** A knowledge-grounded LLM assistant (421-line engine) that answers resident questions from a curated, admin-tunable knowledge base — with a separate business-facing mode.

**Government & Chamber analytics.** The "State of Anna" executive briefing plus role-filtered dashboards (City / Chamber / Admin) — the B2G centerpiece. Built on a reusable analytics-container architecture.

**Community & content surface.** Stories & Kind Deeds, a community Welcome Board with intros/replies, a neighbor-waving social graph, a photo gallery, a jobs/help-wanted board, civic issue reporting + civic alerts, care packages / "Welcome Offers," and a full "Anna Life" digital magazine with ad plots and contributor payouts.

### 4. Reusable engines (super-app building blocks)
These are NOT Anna-specific — they are infrastructure pointed at Anna, and could power a client app for any town or business:

- **Analytics Container architecture** (`lib/containers.ts` + `/api/analytics/containers`) — one data source per metric, role-filtered by the viewer's session. THE crown jewel for a per-client reporting product.
- **Audience/Demographics engine** — onboarding questionnaire → tags → `lib/anna-graph.ts` aggregation. Becomes an "audience report" generator.
- **Directory + lifecycle engine** — provider records, categories, PHANTOM→CERTIFIED pipeline. Becomes a "competition/market map" module.
- **Role-based auth & multi-dashboard access control** (`lib/auth.ts` + `middleware.ts`) — 6 roles, isolated dashboards. Reusable for any multi-tenant client tool.
- **Token + Stripe billing spine** (`lib/stripe.ts`) — reusable monetization layer.
- **Sierra AI layer** (`lib/sierra.ts`) — knowledge-base-grounded assistant, re-pointable to any client's content.
- **First-party analytics/event tracking** (`lib/track.ts`) — privacy-first event capture (role, not name).
- **Magazine/content monetization** — ad plots, ledgers, payouts.

### 5. Data assets
172 vetted Anna businesses (30 Chamber-certified, 138 warm call-sheet leads), including a strong base of veteran-owned, woman-owned, and SBA 8(a) minority-owned federal contractors; 97 onboarded residents with demographic tags; survey/response data across 26 community questions; community stories, civic reports, and magazine content.

---

# APP 2 — SiloReport.org  ⬜ TO BE COMPILED (from the SiloReport conversation)

### 1. What it is
Small-business website scanner and agency white-label / reseller intelligence tool. AI guide JULIETTE; SuperAdmin OPHELIA. Produces honest, evidence-based website + security assessments and targets the IT/web-dev agencies behind client sites.

### 2. By the numbers
*To be filled from the SiloReport conversation (components, API routes, models, lines of code).*

### 3. Capability modules
- Website/security scanning pipeline (headers, hosting, domain age, e-commerce detection, suggestions).
- Agency lead-capture (parses site-footer attribution to link fleets of client domains to one agency).
- Multi-tenant agency dashboard with per-domain security grades.
- Command/Enterprise pricing tiers + white-label trust badges.
- OPHELIA outreach sequences.
- **Business intelligence data** — the scan dataset (this is the SiloReport + demographics feed the super-app wants).

### 4. Reusable engines
*To be filled — likely: the scan/crawl engine, the agency-graph linker, the grading model, OPHELIA's LLM layer.*

### 5. Data assets
Nationwide scanned-business dataset (name, domain, industry tags, contact data, tech stack, security posture). Note: this is a WIDE dataset, not Anna-scoped — valuable for competition/market intelligence, not for local directory imports.

---

# APP 3 — AnnaArtPro.org  ⬜ TO BE COMPILED (from its own conversation)

### 1. What it is
*One-paragraph product description to be added from the AnnaArtPro conversation.*

### 2–5.
*Build metrics, capability modules, reusable engines, and data assets to be compiled from source in that app's conversation.*

---

# APP 4 — AnnaConnect.art (aka annaconnect.org)  ⬜ TO BE COMPILED (from its own conversation)

### 1. What it is
*One-paragraph product description to be added from the AnnaConnect conversation.*

### 2–5.
*Build metrics, capability modules, reusable engines, and data assets to be compiled from source in that app's conversation.*

---

# APP 5 — Slidersss.org  ⬜ TO BE COMPILED (from its own conversation)

### 1. What it is
*One-paragraph product description to be added from the Slidersss conversation. (Note: has a locked, owner-approved "Comet" brand kit.)*

### 2–5.
*Build metrics, capability modules, reusable engines, and data assets to be compiled from source in that app's conversation.*

---

# THE SUPER-APP VISION — how these combine

**The goal:** one mega-power consulting app that ingests SiloReport's market/competition intelligence + AnnaTexas's demographic/audience reporting, and helps spec the right custom app for each new client.

**What already exists to build it from:**
- **Audience reports** ← AnnaTexas onboarding tags + Anna Graph aggregation engine.
- **Competition reports** ← SiloReport scan dataset + AnnaTexas directory/lifecycle engine.
- **Client-facing reporting UI** ← AnnaTexas Analytics Container architecture (the "State of Anna" briefing, generalized per client).
- **Billing & accounts** ← the token + Stripe spine and role-based auth.
- **AI advisory** ← Sierra / JULIETTE / OPHELIA LLM layers, re-pointed to a consulting knowledge base.

**The honest build path:** the super-app should be its OWN new project (not bolted onto any live app), and can be wired to SHARE the databases of AnnaTexas and SiloReport so their data flows in live. This report is the blueprint that carries the reusable engines forward so the super-app doesn't start from zero.

---

*Generated from a direct source audit of AnnaTexas.org. To complete APPs 2–5, open each app's conversation from the app management console and run the same audit; paste the results into the matching section above.*
