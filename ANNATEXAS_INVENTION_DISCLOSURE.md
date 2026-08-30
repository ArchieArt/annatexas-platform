# ANNATEXAS.ORG — INVENTION DISCLOSURE
### Technical support document for a provisional patent filing

**Inventor / Owner:** Aubre' Murphy
**Umbrella entity:** Town Square Apps, LLC (Anna, Texas)
**Core platform:** annatexas.org ("Welcome to Anna") + the connected family of apps
**Prepared:** July 2026
**Status of the system:** Built and running ("reduced to practice") — 132 data models, 214 functional endpoints across the platform.

---

## ⚠️ Please read first — what this is and is not

I am not an attorney and this is **not legal advice.** This document is an **invention disclosure** — the plain-English technical description a patent attorney needs from you to draft and file a provisional patent. Think of it as the *raw material*: it inventories what you built, how it works, and why parts of it appear to be new, so your attorney can turn it into formal claims.

**Two things matter enormously and only your attorney can advise on them:**

1. **The one-year clock.** In the U.S., once you publicly disclose, sell, or offer an invention, you generally have **12 months** to file. Your app is already public at annatexas.org. If that public launch has already started the clock, filing soon matters. Tell your attorney the exact date the public site went live.
2. **Patent vs. trade secret vs. copyright vs. trademark.** Not everything below should be *patented*. Some of your most valuable assets (your data, your relationships, your brand names) are better protected as trade secrets, copyrights, or trademarks. Part 4 lays out a layered strategy — but your attorney makes the final call.

**A note on the person who's interested in your app:** the strongest immediate protection is not the patent (that takes time) — it's controlling what you *show* them. See Part 7. Do not give a detailed walkthrough of the mechanisms in Part 2 without a signed NDA in hand.

---

## HOW TO USE THIS DOCUMENT WITH YOUR ATTORNEY

- Hand them this whole file.
- Point them first to **Part 2** (the inventions) and **Part 5** (proof you already built it).
- Ask them: *"Which of these do we file as a provisional now, which do we keep as trade secrets, and has my public launch started the one-year clock?"*
- Give them the **launch date** of annatexas.org and any dates you first showed it to outside parties.

---

# PART 1 — THE BIG PICTURE (Field of the Invention)

**What the system is, in one sentence:** a hyper-local "community operating system" that converts a town's rapid growth into local belonging, local spending, and evidence-based economic development — by vetting local businesses, routing residents to them through a tag-driven matching engine, monetizing those introductions through a token economy, and proving the resulting economic impact back to a city government.

**The problem it solves:** newcomers to a fast-growing town rely on noisy, unverified sources (generic social-media groups, generic search). Local dollars leak to out-of-town providers. City governments have no trustworthy, real-time evidence of what is actually happening in their local economy. Existing tools solve at most one of these; none tie **resident onboarding → verified local matching → paid lead economy → gamified engagement → municipal proof reporting** into a single closed loop.

**The inventive core (the closed loop):**

1. A resident answers a structured questionnaire on arrival.
2. Each answer emits a **categorical tag**.
3. Those tags are matched, by overlap-scoring, to **vetted local businesses** ("Connectors").
4. Businesses **spend tokens** to receive those matched introductions (pay-per-lead).
5. A **gamified community survey** ("Survey Says!") simultaneously drives more verified leads and mints token rewards.
6. Every action is aggregated into an **economic-impact proof engine** that quantifies the local economic development the platform caused — the artifact sold to the city government.
7. The entire chrome is **white-labelable** so any booming town can license it.

No single competitor combines these. The combination is the invention.

---

# PART 2 — THE PROTECTABLE INVENTIONS

Each item below is written as: **What it is → How it works (as actually built) → Why it may be novel → Draft claim seeds.** "Draft claim seeds" are starting language for your attorney, not final claims.

---

## Invention 1 — Tag-Triggered Hyper-Local Routing Engine

**What it is:** a method that turns a newcomer's questionnaire answers into machine-actionable tags and routes them to vetted local businesses by tag-overlap scoring, weighted by a paid tier.

**How it works (as built):**
- A structured onboarding questionnaire stores each question with a fixed `tag` and `category` (e.g. question "Do you need help setting up water service?" → tag `water_setup`, category `housing_utilities`).
- A resident's answers produce a **tag set**.
- The engine loads verified providers and computes, for each, a **match score** = (count of shared tags ÷ size of the newcomer tag set) × 100.
- Paid-tier providers ("CONNECTED"/"PRIORITY") are scored at full weight; free-tier providers are down-weighted (×0.70) so paying businesses surface first — a *monetization-aware ranking*.
- Results are sorted by score and returned as ranked matched introductions.

**Why it may be novel:** the combination of (a) fixed tag emission from a civic onboarding questionnaire, (b) overlap-based match scoring, and (c) a **paid-tier weighting that biases ranking toward businesses who have paid into a token economy** — purpose-built for keeping spend inside a single municipal boundary.

**Draft claim seeds:**
- A computer-implemented method comprising: presenting a structured onboarding questionnaire in which each question is associated with a predefined category tag; deriving a tag set from a user's responses; computing, for each of a plurality of vetted local provider records, a match score as a function of the intersection between the user tag set and the provider's tag set normalized by the size of the user tag set; applying a weighting factor to said match score determined by a paid subscription tier of the provider; and returning a ranked set of provider introductions.
- The method wherein providers of a paid tier receive a higher weighting factor than providers of a free tier.
- The method wherein the provider records are geographically constrained to a single defined municipal boundary.

---

## Invention 2 — Token-Metered Pay-Per-Lead Economy

**What it is:** a closed virtual-currency system in which local businesses purchase tokens and spend them to receive matched resident introductions, with atomic balance enforcement and inter-business gifting.

**How it works (as built):**
- Each business record carries a `tokenBalance`.
- When a matched lead is claimed/delivered, the system verifies `tokenBalance >= lead.tokenCost`; if not, it returns a **402 Payment Required** and the lead is withheld.
- On success it **atomically decrements** the balance by the lead's token cost and records the transaction.
- Tokens are acquired via purchase (`TokenPurchase`) and can be **gifted business-to-business** (1–100 per gift, sender debited / recipient credited atomically, no self-gifting).
- A per-business **token ledger / history** records every debit and credit.

**Why it may be novel:** a per-lead micro-charge model denominated in a closed civic token, combined with **inter-merchant token gifting** and a hard payment-gate that suppresses delivery of the introduction itself when the balance is insufficient.

**Draft claim seeds:**
- A method of metering local business introductions comprising: maintaining a token balance for each business account; upon generation of a matched lead, comparing the token balance to a per-lead token cost; withholding delivery of the lead and returning a payment-required state when the balance is insufficient; and atomically decrementing the balance and recording a ledger entry upon delivery.
- The method further comprising transferring tokens between two business accounts by atomic decrement of a sender and increment of a recipient.

---

## Invention 3 — "Survey Says!" — Gamified Engagement that Mints Leads and Rewards

**What it is:** a community trivia/survey mechanic in which **every answer option is a real local business or landmark**, so that the act of playing simultaneously (a) generates a verified sales lead for a matched business and (b) mints token rewards and civic badges.

**How it works (as built):**
- A survey is posed whose options map to real local businesses.
- When a user's selected option matches a business that holds tokens, the system **auto-generates a lead** for that business (seeded at zero token cost so gameplay itself is free to the player), de-duplicated so one player doesn't spam a business.
- When a survey closes, the winning option's business is declared and **rewarded with 500 tokens plus a persistent "Voted #1 in {category}" badge** appended to its profile awards.
- The result is a self-reinforcing loop: engagement → verified leads → token rewards → more business participation → more surveys.

**Why it may be novel:** gamified civic engagement is not new, but a mechanic where the *answer space is constrained to verified local merchants* and the *gameplay event is the trigger for both lead generation and token/reputation minting* is an unusual, specific combination.

**Draft claim seeds:**
- A method comprising: presenting a survey whose selectable options each correspond to a verified local business record; upon receipt of a selection corresponding to a business account holding a positive token balance, automatically generating a lead record associated with that business; and upon closure of the survey, incrementing the token balance of the business associated with the most-selected option and appending a reputation badge to that business's record.

---

## Invention 4 — Unified Economic-Impact Proof Engine (the B2G artifact)

**What it is:** a read-only aggregation layer that rolls the platform's entire activity into a defensible, exportable proof of the local economic development the platform *caused* — designed as the deliverable that sells the platform to a city government.

**How it works (as built):**
- An admin-gated endpoint aggregates, over all-time and trailing-30-day windows: **businesses opened** (excluding seed/phantom listings so the number is honest), **jobs created**, **job applications started** (labeled a *proxy* until true apply-tracking exists), **products sold** with local dollars and creator earnings, and **events created**.
- It adds a supporting funnel (residents onboarded, members, matched introductions delivered, care packages, survey responses, AI-assistant questions) and a **money band** (local sales, creator earnings, token/business investment, total local dollars moved).
- Each metric ships with a **"how this is counted" methodology note**, and the whole report exports to CSV for a pitch deck.
- Engineering note: the counts are batched to respect the platform's database connection ceiling — a practical detail worth capturing.

**Why it may be novel:** an integrated civic platform that **instruments its own resident/business/commerce activity and renders it as a municipality-facing economic-development proof** — with explicit honesty labeling (seed exclusion, proxy flags, methodology notes) — is a specific, unusual system-level claim, especially as the monetization endpoint (the city white-label sale).

**Draft claim seeds:**
- A method of generating a municipal economic-impact report comprising: aggregating, from a single hyper-local platform, counts of verified businesses activated, jobs posted, commerce transactions and community events over configurable time windows; excluding non-genuine seed records from said counts; annotating each aggregate with a provenance/methodology descriptor; and exporting the aggregated report in a structured format.

---

## Invention 5 — Env-Driven White-Label Multi-Town Civic Engine with Inheritance

**What it is:** a configuration engine that lets the same civic platform be re-skinned and re-grounded for any town, where a **master town's shared value propositions automatically propagate to child towns** unless a child overrides them.

**How it works (as built):**
- A `TownConfig` structure holds each town's slug, names, tagline, brand wordmarks, and civic facts (county, ZIP, city website/phone, utility portal, police non-emergency line).
- The active town is environment-selected (`NEXT_PUBLIC_TOWN`), so the live flagship (Anna) is never disturbed when another town is provisioned.
- A `TownDoor` data model plus an admin "Town Doors control room" lets an operator create new towns; a **master town** holds `sharedValueProps`, and each child town **inherits** those props unless it sets `inheritShared=false` and supplies its own — so "change it in the master → it updates in every town."
- Seeded proof towns (Princeton, Melissa, Van Alstyne) demonstrate the reuse with real civic data.

**Why it may be novel:** a multi-tenant civic-platform templating system with a **master→child value-proposition inheritance model driven by real municipal fact fields**, packaged as a licensable government product.

**Draft claim seeds:**
- A multi-tenant civic platform comprising a registry of town configuration records each defining branding and municipal fact fields; a designated master record holding shared value-proposition data; and a resolver that composes each town's presentation by inheriting the master's shared data unless the town record specifies an override, wherein the active town is selected at deployment time by an environment parameter without modifying other tenants.

---

## Invention 6 — Single-Identity Multi-Role Dashboard with a Graduated Verification Ladder

**What it is:** one login that carries multiple *verified* community roles (Resident, Business, Nonprofit, Press, Council, EDC, etc.), each earned through a five-step verification ladder, surfaced as a role-tabbed dashboard with an "acting as" context indicator.

**How it works (as built):**
- A `UserRoleAssignment` links a user to a `CommunityRole`, each with a `VerificationLevel`: **SELF_DECLARED → OWNERSHIP_VERIFIED → EDITORIALLY_APPROVED → INSTITUTIONALLY_CONFIRMED → PRIVILEGED_ADMIN.**
- Users request a role, attach proof (`proofUrl`/`proofNote`), and request a level-up to a target tier; an admin reviews and approves/denies with a note.
- Each role carries its own workspace profile (Json) and gates access to different tools; consequential actions surface an "acting as: [role]" context.

**Why it may be novel:** a civic identity model where **one human accumulates multiple independently-verified community roles on a graduated trust ladder**, and platform capabilities are gated by the *verification level of the specific active role* rather than by a single account-level permission.

**Draft claim seeds:**
- A method comprising: associating a single user account with a plurality of role assignments, each role assignment having an independent verification level selected from an ordered ladder; gating access to platform capabilities based on the verification level of the currently-active role; and providing a level-up workflow in which a user submits proof to advance a specific role's verification level subject to reviewer approval.

---

## Invention 7 — AI Editorial Pipeline that Converts Verified Story Mentions into Paid Leads

**What it is:** a multi-agent AI editorial system for a community magazine that, on approval of an article, **extracts verified business mentions and converts them into Connector leads** — bridging editorial content to the token economy.

**How it works (as built):**
- "Sierra Grace" is a six-stage pipeline: **Triage/Truth-gate → Rubric scorer (internal-only scores) → Coach (public GLOW→GROW→GO feedback) → Voice-drift guard → Verifier (fact-checks names/dates/landmarks against the local directory) → Liquidity (post-approval summaries/pull-quotes).**
- The Verifier produces a `businessMentions[]` list; after human approval, verified mentions become leads for those businesses.
- Rubric scores are stored but **never shown** to writers; writers see only coaching language. A per-writer growth log tracks improvement over time.
- "Nothing sends itself" — the AI recommends; a human editor publishes.

**Why it may be novel:** an editorial-AI pipeline whose **output is not just an edited article but a set of monetizable, verified local-business leads**, with a strict internal-score/external-coaching separation and a fact-verification step grounded in the platform's own business directory.

**Draft claim seeds:**
- A method comprising: processing a submitted article through a sequence of automated agents including a fact-verification agent that matches named entities against a local business directory to produce a set of verified business mentions; upon human approval of the article, generating lead records for the businesses corresponding to said verified mentions; and presenting to the author coaching feedback derived from, but not disclosing, an internal rubric score.

---

## Invention 8 — Zero-Commission Local Commerce with a Four-Bucket Auditable Split

**What it is:** a marketplace payment model in which the platform takes **0% of the creator's markup**, and every buyer payment is deterministically split into four named, auditable buckets.

**How it works (as built):**
- Every payment divides into: **(1) production/print cost → the fabricator, (2) creator earnings (markup) → the creator at 100%, (3) shipping → carrier pass-through, (4) sales tax → the state.**
- Payment-processing fees are never skimmed from the creator; a selectable **processing model** (platform-absorbed / buyer-paid / hybrid) determines who covers them.
- The same pure calculation runs on both server (ledger writes) and client (live price preview), guaranteeing the buyer preview equals the recorded split.
- The platform earns from subscriptions/tokens/sponsors instead of creator commissions.

**Why it may be novel:** a commerce ledger that **contractually guarantees zero platform commission on creator markup** and enforces it through a deterministic four-bucket split shared identically by client preview and server ledger, with an explicit processing-fee-allocation model.

**Draft claim seeds:**
- A method comprising: computing, from a single shared deterministic function executed on both a client for preview and a server for settlement, a division of a buyer payment into a production-cost bucket, a creator-earnings bucket comprising the entire markup, a shipping bucket, and a tax bucket; and allocating payment-processing fees to a party determined by a configurable processing model without reducing the creator-earnings bucket.

---

## Invention 9 — Honest Theme-Overlap Grant Matching ("Ophelia")

**What it is:** a grant-to-project matching method that scores by shared themes and **explicitly refuses to predict win probability**, presenting match strength only as "where to look first."

**How it works (as built):**
- Both projects and grants carry theme tags. Match strength = (shared themes ÷ project themes) × 100, with a plain-language reason string.
- The system deliberately labels the score as theme overlap, *not* a prediction of winning — an honesty constraint baked into the algorithm and its output copy.

**Why it may be novel:** less likely to be independently patentable than Items 1–8, but worth disclosing as part of the integrated system; the notable feature is the **built-in non-prediction honesty constraint** paired with a transparent shared-tag rationale.

---

## Invention 10 — City-Manager Command Center with Signal-Threshold Early Warning and One-Click Council Packet

**What it is:** a municipal operations cockpit that turns the platform's own in-app data into (a) an **agent-swarm** that drafts department tasks, (b) a **civic early-warning** system driven by real signal thresholds, (c) a **decision/what-if simulator**, and (d) a **one-click, press-ready council packet PDF**.

**How it works (as built):**
- Early warning fires from real in-app thresholds (recurring issue categories over 30 days, issues aging past 21 days, overdue cases, high-priority open tasks, economic leakage, undelivered leads) — with clearly-labeled "not connected yet" seams for external city systems (never faked).
- The council-packet generator computes real trailing-30-day municipal metrics, drafts an AI executive summary **grounded only in those real numbers**, and renders a print-ready PDF asynchronously.
- A decision simulator runs option trade-offs under a codified civic-leadership doctrine.

**Why it may be novel:** a municipal dashboard that **derives early-warning signals and an auto-drafted governing-body report from a consumer-facing civic app's own activity data**, with a strict no-fabrication rule and labeled integration seams.

**Draft claim seeds:**
- A method comprising: monitoring activity records of a hyper-local community platform against a plurality of configurable thresholds to emit civic early-warning signals; and generating a governing-body report by computing municipal metrics over a time window and composing an automated narrative constrained to said computed metrics, rendered as a distributable document.

---

## The unifying "system" claim (most important)

Beyond the individual pieces, your attorney will likely want one **overarching system claim** tying the loop together — because the *combination* is your strongest position:

> A hyper-local civic platform comprising: an onboarding engine that emits category tags from resident responses; a matching engine that ranks vetted local businesses by tag overlap weighted by a paid tier; a token economy that meters delivery of matched introductions; a gamified survey subsystem that generates leads and mints token rewards from verified-business answer options; an aggregation engine that reports the resulting local economic activity to a municipal authority; and a multi-tenant configuration layer enabling the platform to be re-instantiated for additional municipalities by inheritance from a master configuration.

---

# PART 3 — THE APP FAMILY (everything that points to annatexas.org)

Your attorney should know the platform is an **umbrella architecture**, because the connections and the shared "assistant hierarchy" are themselves part of what's distinctive.

**Umbrella:** Town Square Apps, LLC — with a tiered AI-assistant hierarchy: one top-level SuperAdmin assistant (**Ophelia**) over the whole fleet, and a distinct NATO-phonetic-named assistant per app (Sierra = Anna, Victor = Slidersss, Indigo = AnnaConnect/AnnaArtPro, Juliette = SiloReport, Echo = Warpainters).

**Apps in the family and how they relate to annatexas.org:**

- **annatexas.org — "Welcome to Anna"** — the civic super-hub; the flagship containing Inventions 1–10.
- **Anna LIFE Magazine** — a **multi-tenant magazine production OS** inside the hub (flatplan frames, contributor house, provenance tracking, privacy-preserving payout profiles that store only the last four digits of tax/bank identifiers, ad inventory, AI "storm-run" generation). This is a large protectable system in its own right.
- **AnnaArtPro / Anna Arts Academy** — artist "career-in-a-box": auto-generated artist pages, tiered price caps, the zero-commission commerce split (Invention 8), competitions.
- **AnnaConnect.art** — marketplace + room analyzer + public-art map.
- **Slidersss** — tutorial/plan-builder app (separate locked brand).
- **SiloReport.org** — an **agency white-label security-reseller** model (footer-attribution lead harvesting, multi-tenant agency fleet dashboard, one-click header-fix generation). *Note: SiloReport is a separate venture/conversation; flag it to your attorney as a possibly-separate filing.*
- **Citynest** — the city-manager command center (Invention 10).
- **Ophelia Grant Station** — grant matching + funding cockpit (Invention 9).
- **EDC / Opportunity Center** — economic-development case pipeline (intake → consent → triage → assign → referral → outcome → brief).

**What to tell your attorney about the family:** the flagship (annatexas.org) and its arts/magazine/city modules likely belong in **one filing** (they share the loop and data model). SiloReport is a **different market and mechanism** and may warrant its own filing. Slidersss and AnnaConnect are more likely trade-secret/copyright/trademark plays than patents.

---

# PART 4 — WHAT TO PROTECT, AND HOW (the layered strategy)

Not everything is a patent. Use all four tools:

#### Patents (utility / provisional) — for the *methods and systems*
Best fit for **Inventions 1–8 and 10**, and especially the **unifying system claim**. These are processes and system architectures — exactly what utility patents cover. File the provisional to lock your priority date while you keep building.

#### Trade secrets — for the things a patent would *expose*
A patent is a public teaching document. Some assets are worth more kept secret than published:
- Your **vetted business directory and the relationships behind it** (the Chamber-alternative data).
- Your **exact tag taxonomy / question-to-tag mappings** and score weightings.
- Your **AI agent prompts and rubric weightings** (Sierra/Ophelia doctrines).
- Your **civic contacts and B2G pipeline.**
Protect these with NDAs, access controls, and "confidential" labeling — do **not** put them in the patent unless your attorney advises it's necessary to support a claim.

#### Copyright — automatic, but register the important ones
Your **source code**, your **written content** (Anna LIFE articles, course material, the Liquitex-style technique sheets), your **UI designs**, and your **artwork** are copyrighted the moment they're fixed. Registering the code and key creative works strengthens your hand against a copier.

#### Trademarks — for the names and brand
**"Welcome to Anna," "Anna LIFE," "Survey Says!" (check availability — it echoes a famous game-show mark), "Town Square Apps," "Ophelia," "Sierra Grace,"** logos and taglines. Trademarks stop a competitor from trading on your name even if they build different code.

**Bottom line for your attorney:** *File a provisional on the method/system inventions; keep the directory, taxonomy, and AI prompts as trade secrets; register copyright on the code and flagship content; and clear/file the key trademarks.*

---

# PART 5 — EVIDENCE OF REDUCTION TO PRACTICE

This matters: you didn't just describe these ideas — you **built and ran** them. That strengthens everything.

- **132 distinct data models** in the production schema (a measure of system depth), including the specific models named throughout Part 2: `Provider`, `Lead`, `TokenPurchase`, `TokenGift`, `Survey`, `SurveyResponse`, `UserRoleAssignment` (+ `VerificationLevel` ladder), `TownDoor`, `ArtOrder`/`ArtOrderItem`/`ArtLedgerEntry`, `ContributorPayoutProfile` (privacy-preserving), `SierraEditorialThread`, `CityDirective`/`CityTask`, and ~120 more.
- **214 functional server endpoints**, grouped across magazine (30), arts (20), EDC (18), providers (13), admin (13), roles (9), Citynest (9), opportunity-center (7), Sierra (6), and many more.
- **Named mechanism files** implementing the claims: `lib/matching.ts` (Invention 1), `app/api/leads/route.ts` + `app/api/tokens/gift/route.ts` (Invention 2), `app/api/surveys/[id]/vote/route.ts` (Invention 3), `app/api/admin/economic-impact/route.ts` (Invention 4), `lib/town-config.ts` + `lib/town-doors.ts` + `TownDoor` model (Invention 5), `UserRoleAssignment` + `lib/roles.ts` (Invention 6), `lib/sierra.ts` + magazine models (Invention 7), `lib/arts/money-model.ts` (Invention 8), `lib/grant-match.ts` (Invention 9), `lib/citynest.ts` (Invention 10).
- **A running, publicly-deployed system** at annatexas.org, plus seeded proof-of-concept second towns (Princeton, Melissa, Van Alstyne).

**For the provisional, keep and date your evidence:** dated screenshots of each feature, this disclosure, your source-control history, and the launch date. Your attorney may attach code excerpts and screenshots as figures.

---

# PART 6 — PROVISIONAL FILING CHECKLIST

Bring these to your attorney (or have ready if self-filing a provisional):

- [ ] **Inventor name(s)** and whether the LLC or you personally will own it (assignment).
- [ ] **Public-launch date** of annatexas.org and any dates you demoed it to outside parties (the one-year clock).
- [ ] **This disclosure document.**
- [ ] **Dated screenshots** of each of the ten inventions in action.
- [ ] **A drawing/flow diagram of the loop** (Part 1, step 1→7) — provisionals allow informal drawings.
- [ ] **Representative code excerpts** for the named mechanism files (your attorney decides how much to include).
- [ ] **List of the app family** (Part 3) so nothing is accidentally left out of scope.
- [ ] **A decision, per invention,** on patent vs. trade secret (Part 4) — so you don't publicly disclose a trade secret in the filing.
- [ ] **Trademark wishlist** (Part 4) for a parallel clearance search.

**Reminder:** a provisional is not examined and doesn't become a patent by itself — it holds your **priority date for 12 months**, during which you must file the full (non-provisional) utility application. Put that deadline on your calendar the day you file.

---

# PART 7 — PROTECTING IT *RIGHT NOW* FROM THE INTERESTED PARTY

The patent is your long game. Here is the short game, starting today:

#### 1. NDA before any deep demo.
Do not walk this person through the mechanisms in Part 2 without a **signed mutual non-disclosure agreement**. A patent pending doesn't stop someone from copying what you *showed* them before you filed — an NDA creates a contractual duty. Your attorney can send a one-page NDA fast.

#### 2. Show outcomes, not mechanics.
In any pitch, show *what the platform achieves* (the economic-impact report, the polished resident experience) — not the tag taxonomy, the scoring weights, or the agent prompts. Those are your trade secrets.

#### 3. Mark everything.
Add "Patent Pending" to the site and decks **the day you file the provisional.** Put "© 2026 Town Square Apps, LLC" and "Confidential" on any document you share.

#### 4. Keep the crown-jewel data private.
Your vetted directory, your civic relationships, and your city pipeline are things a copier **cannot** easily reproduce. Guard access to them harder than the code.

#### 5. Document the timeline.
Save dated proof that you built each feature (source history, screenshots, this file). If anyone ever claims your idea, your build history is your evidence of who was first.

#### 6. Don't over-share in writing.
Assume any detailed spec you email could travel. Keep the deepest "how" verbal, under NDA, or in trade-secret storage.

---

## ONE-PARAGRAPH SUMMARY FOR YOUR ATTORNEY

> Aubre' Murphy (Town Square Apps, LLC) has built and publicly deployed a hyper-local civic "community operating system" (annatexas.org) that closes a loop no competitor combines: a tag-emitting resident onboarding questionnaire feeds a paid-tier-weighted local-business matching engine; matched introductions are metered by a closed token economy with inter-merchant gifting; a gamified survey subsystem mints both verified leads and token/reputation rewards from verified-business answer options; all activity is aggregated into a municipality-facing economic-impact proof report; and the entire platform is white-labelable to other towns by master→child configuration inheritance. Supporting inventions include a single-identity multi-role graduated-verification model, an AI editorial pipeline that converts verified story mentions into paid leads, a zero-commission four-bucket commerce ledger, and a city-manager command center that derives early-warning signals and an auto-drafted council packet from the platform's own data. The system is reduced to practice (132 data models, 214 endpoints, live deployment, and a seeded second-town proof). We seek advice on: (1) whether the public launch date has started the §102 one-year clock; (2) scope of a provisional covering the unifying system claim plus Inventions 1–8 and 10; (3) which elements to withhold as trade secrets; and (4) parallel trademark clearance for the brand names.

---

*Prepared as a technical invention disclosure to support a provisional patent filing. Not legal advice. Please review with a licensed patent attorney before filing or disclosing to third parties.*
