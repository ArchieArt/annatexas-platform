# Response to Due Diligence

**Prepared for:** Derek — Chief Executive Officer, Best Version Media
**Prepared by:** Our Development Team
**Regarding:** The Welcome to Anna platform ("the Platform")
**Status:** Confidential — shared for evaluation purposes

---

## A note before the answers

Derek,

Thank you for a letter that read less like a checklist and more like a compliment. The depth of your questions tells us you already see what we see: this is not a directory or a Facebook group with better fonts. It is a working, patent-pending operating system for a local economy, built and reduced to practice in one of the fastest-growing cities in America.

We've answered every question below in the order you asked. Where we can speak with certainty — the architecture, the matching engine, the AI editorial pipeline, the intellectual property, the content and revenue mechanics — we've done so plainly and marked what is **[BUILT]** (live and operating today) versus **[PLANNED]** (designed, on the roadmap). Where an honest answer depends on numbers that should only move under a signed NDA — infrastructure cost curves at scale, financial statements, multi-year projections, sponsorship legal terms — we've given you the framework we use and marked the specific figures **[TO BE COMPLETED UNDER NDA]** rather than inventing anything. We suspect you'd trust us less, not more, if we handed you tidy projections we couldn't defend.

One request we'll honor throughout: the underlying build system and vendor relationships that power the Platform are a protected part of our advantage, so we refer to them only as "the Platform" and "our development stack." That's deliberate, and we're happy to walk your technical team through more under NDA.

— The Development Team

---

# PHASE ONE — CORE PLATFORM & TECHNOLOGY

## 1. Architecture & Scalability

**How is the Platform built, and will it hold as we grow?**

The Platform is a modern, server-rendered web application backed by a managed relational database, deployed on managed cloud hosting with a global content delivery layer in front of it. The application layer is stateless, which is the single most important fact for scalability: because no user session lives on any one server, the hosting layer can run more copies of the application in parallel as traffic rises, without any change to the code. Static and cacheable content (images, the magazine, public listings) is served from the edge, so the heaviest, most-viewed assets never touch the database at all. **[BUILT]**

The data layer is a managed relational database. It is the component we watch most closely, because relational databases scale differently than the stateless app layer — you scale them by pooling and reusing connections carefully, by indexing the high-traffic tables correctly, and eventually by separating read traffic from write traffic. We already engineer for this today: the Platform reuses a single database client, batches heavy analytical queries into small sequential groups rather than firing hundreds at once, and matches index types to how each table is actually queried (range indexes for time-series activity, exact-match indexes for tag and category lookups). **[BUILT]**

**Will it hold?** For a single town and for the first cohort of towns, yes — comfortably, on the current architecture. The honest engineering answer is that the growth path has three well-understood stages, and none of them requires a rewrite:

- **Stage 1 (today → early multi-town):** current architecture, vertical headroom on the database, edge caching doing the heavy lifting.
- **Stage 2 (many towns):** add read replicas so public browsing traffic never competes with write traffic, and move the largest analytical aggregations to a scheduled/pre-computed cadence instead of on-demand.
- **Stage 3 (regional/national):** partition data by town (each town's data is already logically isolated by our multi-tenant layer, described in Section 5), which lets the database scale close to linearly because towns don't share hot rows.

The reason we can be calm about this is that the multi-tenant design (Claim 6 of our filing) already isolates each town's data by tenant. Sharding by town later is an operational step, not an architectural one.

## 2. Infrastructure Cost at Scale

**What happens to our infrastructure bill at 5x, 10x, 50x?**

Here is the honest shape of the answer, and then the honest gap.

The **shape**: our cost does **not** rise linearly with users, because the majority of what users consume — magazine pages, business listings, images, the public Anna Square — is cacheable and served from the edge at near-zero marginal cost. The cost that *does* rise is driven by three things: (1) database size and query load, (2) AI/LLM usage in the editorial and matching pipeline, and (3) file storage for uploaded ads, artwork, and photos. Of these, LLM usage is the most variable and the one we meter most deliberately, because it is tied to content generation and verification volume rather than raw pageviews.

A realistic rule of thumb we design against:

- **5x traffic:** largely absorbed by the edge cache and existing database headroom; cost rises well below 5x — most of the increase is storage and a modest LLM increase.
- **10x traffic:** the point where we add read replicas and pre-compute the heaviest analytics; cost steps up but stays sub-linear.
- **50x traffic:** the point where per-town partitioning and committed-use/reserved capacity pricing come into play, which typically *lowers* unit cost per town even as the total bill grows.

The **gap**: putting real dollar figures on those three curves depends on our current committed-use pricing, our actual LLM spend per issue, and current storage rates — all of which are live commercial terms. We will share the actual per-user and per-town cost model, with real invoices behind it, under NDA.

> **[TO BE COMPLETED UNDER NDA]** — Current monthly infrastructure cost; cost per active town; modeled cost at 5x / 10x / 50x with unit economics.

## 3. Data Management & Database

**Schema, integrity, and backups.**

The database is a managed relational database, which gives us transactional integrity (ACID) out of the box — critical for the parts of the Platform that touch money and leads, where a half-completed operation would be unacceptable. **[BUILT]**

The schema is organized around a clear domain model rather than a pile of loosely related tables. The core entities are: verified **members** (with a single identity that can carry multiple community roles), **businesses/providers** (with earned ranking and category/tag assignments), **residents' tag profiles** (generated from onboarding questionnaires), the **token ledger** (every token credit and debit is an immutable ledger entry, not a mutable balance field), **lead records** (each intro generated by the matching engine or survey), **content/editorial records** (submissions, drafts, published stories, the magazine), and the **multi-tenant town configuration** layer that sits above all of it. **[BUILT]**

Two integrity choices are worth calling out because they matter for an acquirer:

- **The token economy is ledger-based.** We never simply overwrite a balance. Every token movement is a recorded entry, and balances are derived. This means the entire economy is auditable end to end — you can reconstruct exactly how any business spent or earned every token. **[BUILT]**
- **Real vs. seeded data is separated at the record level.** Placeholder/seed records are flagged and are systematically excluded from our economic-impact reporting, so the numbers we report to a city are genuine activity, not inflated by demo data. **[BUILT]**

**Backups & recovery:** the Platform runs on a managed database service with automated backups and point-in-time recovery, plus a versioned checkpoint system for the application itself, so both the code and the data can be restored to a prior known-good state. The specific retention windows and recovery-time objectives are operational details we'll confirm with your technical team; we treat them as a formal part of the NDA package rather than marketing claims.

> **[TO BE COMPLETED UNDER NDA]** — Exact backup retention window, RPO/RTO targets, and disaster-recovery runbook.

## 4. AI Agent Architecture

**How are the AI agents deployed, overseen, and trained?**

This is the part we're proudest of, so let us be precise about what is real.

The AI layer is a **supervised, multi-agent editorial and matching pipeline** — not a single chatbot, and not an autonomous system that publishes on its own. Sierra Grace is the editor-in-chief persona and public face. Behind her, the pipeline is a sequence of specialized agents, each of which owns exactly one stage and hands off to the next. In plain terms, the named agents in the swarm map to these governed functions: **[BUILT]**

1. **Triage / Truth-Gate** (silent) — runs a safety and sensitivity checklist on every submission, flags anything involving minors, grief, or undisclosed promotion, and routes sensitive pieces to a human queue before anything else happens.
2. **Rubric Scorer** (silent) — scores each piece on a fixed internal rubric (heart, belonging, voice, grace, service). The score is stored but **never shown to the writer** — a deliberate design choice so contributors get encouragement, not a grade.
3. **The Coach** (public-facing) — returns warm, structured feedback in a fixed "glow → grow → go" order, capped so a new writer is never overwhelmed.
4. **Voice-Drift Guard** (silent) — checks that the Coach's suggested edits stay in the writer's own vocabulary. The system rewrites its *own* suggestion rather than overwriting the writer's sentence — it protects the human voice.
5. **Verifier** (silent) — fact-checks names, dates, and landmarks against the local business directory and the web, and produces a list of verified business mentions.
6. **Liquidity** (post-approval only) — once a human approves, it generates the "at a glance" summary, pull-quotes, and social captions **from the approved text only.**

**Oversight — the single most important sentence in this section:** *nothing sends itself.* Every consequential action — publishing a story, generating a business lead from a mention — requires human approval. The AI recommends; a person decides. This is enforced in the workflow, not just in policy. **[BUILT]**

**How the agents connect to the business model:** the Verifier's output is what bridges publishing to revenue. When a story mentions a verified local business and a human approves that story, the Verifier's confirmed mentions become lead records for those businesses — which flows into the token-metered lead economy (Section 8). This is the mechanism covered in our patent filing. **[BUILT]**

**Training & control:** the agents are not trained on customer data in the machine-learning sense. Each agent runs on a governed prompt/instruction set that we version and control, pointed at curated, cited knowledge (for example, our arts-advisory agent only answers from a vetted knowledge shelf and always cites its source, and says "I don't have a vetted answer" rather than guessing). This gives us three things acquirers care about: predictable behavior, an audit trail, and the ability to update an agent's behavior without retraining a model. **[BUILT]**

A transparency note we hold as non-negotiable: every AI correspondent carries a visible disclosure that it is a transparent AI persona managed by a human editorial team. We never pass AI writing off as a human reporter.

## 5. Uniqueness & Defensibility (Patent Pending)

**What exactly is protected, and how do you defend it?**

We have a **filed provisional patent application** with the platform "reduced to practice as a deployed, operational platform" — meaning we are not patenting an idea on a napkin; we are protecting a system that already runs. The filing describes six core inventions, and they compound on each other, which is the real moat:

1. **A membership-verified contribution model** that gates participation and establishes *earned* business ranking (you can't buy your way to the top; you earn standing).
2. **A tag-driven local matching engine** — the heart of it. Residents answer questionnaires that generate categorical tags; businesses carry tags; the engine ranks providers by tag overlap, weights paid tiers, and — critically — **restricts results to the municipal boundary.** This is what keeps the local economy local. (Claim 1–2.)
3. **Token-metered lead delivery** — leads are released against a token balance with an atomic decrement and a ledger entry, so the pay-per-lead economy is exact and auditable. (Claim 3.)
4. **A gamified survey subsystem** where the answer options are *real local businesses*, so playing the game generates qualified leads and rewards the most-selected business. (Claim 4.)
5. **An economic-impact aggregation engine** that excludes non-genuine records and annotates every figure with its methodology — built specifically so a city can trust the numbers. (Claim 5.)
6. **A multi-tenant configuration and inheritance layer** — child towns inherit a master configuration unless they override it, and the active town is chosen at deploy time. This is what makes the white-label-to-cities endgame real rather than aspirational. (Claim 6.)

Additional filed claims cover single-identity multi-role verification (one account, many verified roles, each with its own verification level — Claim 7), locality verification that restricts contribution to verified in-boundary members (Claim 8), and a **municipal command center** that monitors community activity against configurable thresholds, emits civic early-warning signals, and generates a governing-body report with an automated narrative constrained to municipal metrics (Claim 10). That last one is the bridge to selling the Platform to the City itself.

**How we defend it:** (a) the filed provisional establishes priority; (b) the most sensitive mechanics — exact scoring weights, thresholds, and the development stack — are held as **trade secrets** with a formal trade-secret schedule, not published; (c) the network effect is its own defense — a competitor can copy a feature, but they cannot copy the verified local membership base, the boots-on-the-ground vetting through the Chamber, or the accumulated economic-impact data that makes the city pitch credible. The patent protects the mechanism; the local moat protects the market.

---

# PHASE TWO — CONTENT & USER EXPERIENCE

## 6. Content Ingestion, Curation & Moderation

**Where does content come from, and how do you keep it clean?**

Content enters the Platform through three doors, and all three pass through the same safety layer:

- **Business/provider content** — vetted at the source. Connectors are legitimate local businesses sourced and verified against the Anna Chamber of Commerce directory before they ever get a profile. Verification happens before publication, not after a complaint. **[BUILT]**
- **Resident/community content** — story submissions and survey write-ins flow through the supervised editorial pipeline in Section 4, including the automated Truth-Gate and a human approval step. **[BUILT]**
- **AI-assisted content** — drafted by the editorial pipeline, always human-approved, always disclosed as AI. **[BUILT]**

**Moderation is layered, not a single filter:** a fast keyword-and-sentiment pass catches the obvious cases instantly, and an LLM-based classifier handles nuance (a survey write-in that is technically clean but inappropriate in tone, for example). Anything the automated layer is unsure about is escalated to a human queue. The guiding rule is that automation *narrows the human's work*, it doesn't replace the human's judgment. **[BUILT]**

## 7. User Roles, Personalization & Privacy

**Who are the users, how is their experience personalized, and how is their data protected?**

**Roles:** the Platform runs on a single-identity, multi-role model (Claim 7). One person has one login and can hold several verified roles — Resident, Newcomer, Provider/Business, Nonprofit, Press, and civic roles like Chamber, EDC, City, plus Admin. Each role carries its own independent verification level on an ordered ladder (self-declared → ownership-verified → editorially approved → institutionally confirmed → privileged admin), and what a person can do is gated by the verification level of the role they're currently acting as. A visible "acting as" indicator appears before consequential actions. **[BUILT]**

**Personalization** is the tag engine working for the resident instead of the business. A newcomer completes onboarding questionnaires; their answers generate tags; those tags instantly route them to matching Connectors, relevant events, and content — the same mechanism that powers lead-matching, pointed at the resident's benefit. **[BUILT]**

**Privacy:** data access is enforced server-side on every request that touches personal data — the server checks the session and the acting role, and returns nothing a user isn't entitled to. Personal data is not exposed through public endpoints; leads are released to businesses through the metered, consented flow, not by exposing a resident's raw contact list. Personal identity is never sold. We treat privacy as an access-control problem enforced in code, which is the only place it can actually be enforced. **[BUILT]**

## 8. The Magazine Engine

**How does the magazine auto-populate — roughly 30 stories and 50 photos per issue — and stay high quality?**

The magazine is not laid out by hand each month, and it is not fully automated either. It is a **production pipeline with a human editor-in-chief at the top.** Here is the flow: **[BUILT / PLANNED where noted]**

1. **Sourcing** — stories come from three streams that already exist: community submissions through the dedicated submission door, the AI correspondent desk (a set of transparent, generationally-framed AI correspondents managed by Sierra Grace), and a daily article process that researches real local subjects on a rotating set of beats and saves them as *pending approval*. **[BUILT]**
2. **Editorial pass** — every piece runs the Section 4 pipeline (truth-gate → rubric → coach → verify).
3. **Flat-plan assembly** — the production system arranges approved stories into an issue layout (a "flat plan"), balancing beats so an issue isn't all one flavor. **[BUILT]**
4. **Photography** — photos come from verified local sources and contributor uploads, attached to stories with proper attribution. Reaching a consistent ~50-photo issue at scale is where our roadmap and your print expertise obviously intersect. **[BUILT for sourcing/attachment; PLANNED for full-volume automation]**
5. **Human sign-off** — the editor reviews the assembled issue before anything is final. *Nothing sends itself* applies to the whole magazine, not just individual stories.

The reason the quality holds at volume is the rubric-and-coach layer: it raises the floor on community submissions (a nervous first-time writer gets coached to publishable) rather than lowering the bar to fill pages. The 30-stories/50-photos target is a production-capacity conversation, and it is precisely the conversation where a partner who prints 49 million copies a year makes us dramatically stronger.

---

# PHASE THREE — REVENUE & MONETIZATION

## 9. The Advertising Platform

**The self-serve ad flow — click to select, upload the creative, pay — targeting roughly \$33,000 per issue.**

The advertising model is built on the token economy, which is the mechanism that makes self-serve ad buying and pay-per-lead both work off the same rail. **[BUILT for token economy + lead economy; ad-slot self-serve upload flow PLANNED/partially built — see below]**

- **Token economy:** businesses purchase tokens (in one embodiment, 10 tokens for \$10) and spend them on featured listings, ads, and pay-per-lead matches. Every purchase and spend is a ledger entry, so a business — and a city — can see exactly what advertising delivered. **[BUILT]**
- **Pay-per-lead:** the highest-intent ad product on the Platform isn't a banner, it's a *lead*. The matching engine and the survey game both generate qualified, in-boundary leads that are delivered against a token balance. This is the differentiated revenue line most local-media businesses can't offer. **[BUILT]**
- **Self-serve display ads:** the roadmap you described — click an available slot/issue, upload a PNG/JPEG/PDF creative, pay, and go live — is the natural front end on top of the existing token rail and file-upload infrastructure (uploads already go to secure cloud storage). The creative-upload-and-place flow for magazine display slots is the piece we'd prioritize and scope with you, because your print operation defines the real slot inventory. **[PLANNED — built on existing rails]**

**On the \$33,000-per-issue target:** we can speak to the *mechanism* with confidence — token pricing, lead pricing, featured-listing pricing, and display-slot inventory are all levers we control. The *specific* rate card that adds up to \$33k per issue depends on slot count, print run, and market pricing that we should set with you, and on real sell-through data. We won't pretend a number here.

> **[TO BE COMPLETED UNDER NDA / WITH PARTNER]** — Ad rate card, slot inventory per issue, token-to-ad conversion pricing, and the model that reaches the \$33,000/issue target.

## 10. Sponsorship & Crowdfunding

**Community sponsorship and crowdfunding — structure and legality.**

The Platform already has the civic and nonprofit scaffolding this rides on: a nonprofit workspace with a verification ladder, mission cards, and a grants cockpit are built. Sponsorship and crowdfunding sit naturally on top: local sponsors underwrite content, events, or newcomer programs; residents and businesses back community campaigns. The token ledger gives every dollar an auditable trail, which is exactly what sponsors and grant-makers ask for. **[BUILT for nonprofit/grants scaffolding; sponsorship/crowdfunding productization PLANNED]**

**On legality — the honest answer:** crowdfunding and community sponsorship carry real regulatory questions (money transmission, charitable solicitation registration by state, tax treatment, platform-vs-fiduciary status) that vary by jurisdiction and that we will not hand-wave. Our approach is to run these flows through established, compliant payment and fundraising rails rather than becoming a money transmitter ourselves, and to have the specific structure reviewed by counsel before launch. We'd want your and our legal teams aligned on this before it goes live.

> **[TO BE COMPLETED UNDER NDA / WITH COUNSEL]** — Sponsorship tiers and pricing; crowdfunding structure, payment rail, and state-by-state compliance approach.

## 11. Financial Projections

**1-year, 3-year, 5-year projections.**

This is the section where we most owe you honesty over polish. We can show you the **revenue architecture** with confidence — it has four distinct lines that don't cannibalize each other:

1. **Connector setup fees** (one-time profile setup per business — in one embodiment \$150).
2. **Token/advertising revenue** (recurring, usage-based).
3. **Pay-per-lead revenue** (recurring, high-intent).
4. **White-label licensing to municipalities and chambers** (the scalable, high-margin line — the endgame).

What we will **not** do is present you fabricated three- and five-year projections. Real projections require our current active-business count, actual token sell-through, setup-fee conversion rate, and churn — live operating figures that belong under NDA and behind real books. We'd rather show you the model and the actuals together and let you pressure-test them.

> **[TO BE COMPLETED UNDER NDA]** — Trailing revenue and unit economics; 1/3/5-year projections by revenue line; CAC, LTV, and per-town payback; the white-label licensing price model.

---

# PHASE FOUR — OPERATIONS & EXPANSION

## 12. Operations, Team, Expansion & Risk

**Operational processes, team, replicability, and risk.**

**Operational processes:** the day-to-day loop is largely instrumented already. Business assistance runs a full intake → consent → triage → assign → referral → outcome loop; the editorial pipeline runs the submission-to-publication loop; the token ledger runs the money loop; and an analytics layer tracks a defined activation funnel so we can see where residents and businesses drop off. The design philosophy throughout is *automation narrows the work, humans make the calls.* **[BUILT]**

**Team:** the Platform was designed to run lean precisely because so much of the operational load is carried by the supervised agent pipeline and self-serve flows. The founder-led team and its current composition are best discussed directly, and staffing-to-scale is exactly the kind of plan a partnership with you would reshape.

> **[TO BE COMPLETED BY AUBRE' / UNDER NDA]** — Current team structure and roles; staffing plan at each growth stage.

**Expansion & replicability — this is the strongest card in the deck.** Because the multi-tenant layer (Claim 6) is already built, standing up a new town is a *configuration* exercise, not a rebuild: a child town inherits the master configuration and overrides only what's local. We have already proven this with a second town configured as a proof-of-concept beyond Anna. That is the difference between "we could expand" and "the expansion mechanism is built and demonstrated." The go-to-market for each new town is the same repeatable motion: partner with the local chamber for vetted businesses, onboard newcomers through the questionnaire, and — the endgame — license the whole thing to the city as its own economic-development tool, backed by the municipal command center's real impact reporting. **[BUILT]**

**Risk assessment — candidly:**

- **Key-person concentration.** The Platform is founder-driven. Mitigation: documentation, the versioned checkpoint system, and a partnership that adds bench depth.
- **Single-market proof.** Deep proof in one city; the second-town proof-of-concept de-risks this, but multi-market revenue proof is still ahead. This is precisely where a national partner accelerates us.
- **Data-scale cost curve.** Addressed in Sections 1–2; sub-linear by design, but the real dollar curve is validated under NDA.
- **Regulatory (crowdfunding/payments).** Addressed in Section 10; handled via compliant rails and counsel, not shortcuts.
- **Platform/vendor dependency.** We rely on a managed development and hosting stack (kept confidential as part of our advantage). Mitigation: the data and content are portable and backed up independently of any one vendor.

---

## Closing

Derek, the through-line of every answer above is the same: the hard part is already built and running. The matching engine, the token economy, the supervised AI editorial pipeline, the multi-tenant expansion layer, and the municipal command center are not slides — they're a filed patent and a live platform in a real city. The places we've left blanks are the places where honesty demanded it: real financials, real infrastructure costs at scale, real legal structures. Those we'll open fully under NDA, with the actuals behind them.

What we don't have yet — national print muscle, distribution, and the balance sheet to expand fast — is precisely what you have. That's not a gap in the business; it's the shape of the partnership.

We're ready for the next conversation, and for your technical team to go as deep as they'd like.

With genuine respect,

**— The Development Team**

---

*Confidential. This document is provided for evaluation and contains forward-looking statements and figures marked for completion under NDA. Bracketed placeholders indicate figures to be provided with supporting documentation under a signed non-disclosure agreement. Nothing herein constitutes a warranty, offer, or binding commitment.*
