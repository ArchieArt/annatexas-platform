# The Anna Truth Ledger

**Welcome to Anna · AnnaTexas.org**
**An honest, stage-by-stage accounting of what is real today.**

*Prepared: July 2026 · Work Order #3 (Audit Response)*

---

## Why this document exists

Most product decks show a wall of green checkmarks. This one does not. The Anna
Truth Ledger exists because trust is the entire product: newcomers trust us to
tell them the truth about their new town, and the City of Anna will only adopt a
tool it can verify.

So we grade every feature against an **8-stage reality ladder**. A feature only
advances a stage when that stage is actually true — not when we hope it is. The
most important columns are the last three, and most features have *not* reached
them yet. That is expected for a pilot, and saying so plainly is the point.

## The 8-stage reality ladder

| # | Stage | What it means (the bar) |
|---|-------|--------------------------|
| 1 | **Concept** | The idea is defined and written down. |
| 2 | **Specified** | Behavior, data, and edge cases are specified. |
| 3 | **Coded** | Implemented in the codebase. |
| 4 | **Build Passing** | Compiles, type-checks, and passes automated build/tests. |
| 5 | **Deployed** | Live on the production site at annatexas.org. |
| 6 | **Flow Verified** | A human walked the full flow end-to-end in production. |
| 7 | **Used by Real Resident** | A real, non-team Anna resident/business used it unprompted. |
| 8 | **Revenue Producing** | It has moved real money or created verified real-world value. |

**Reading the ledger:** the "Stage" column shows the *highest stage that is
honestly true today*. Anything beyond it is a claim we have not yet earned the
right to make.

---

## Ledger — Newcomer experience

| Feature | Stage today | Honest note |
|---------|-------------|-------------|
| Anna 10 onboarding questionnaire | 5 · Deployed | Live; generates categorical tags from real answers. |
| Tag → provider matching engine | 5 · Deployed | Deterministic tag routing; quality depends on directory depth. |
| Newcomer dashboard & matches | 5 · Deployed | Shows matched providers with match score. |
| Activation-funnel tracking (Anna 10) | 4 · Build Passing → deploying | Instrumented this work order (GA4). Becomes Stage 5 on this deploy. |
| Welcome care packages / offers | 5 · Deployed | Live surface; honest empty-state until businesses post offers. |
| Sierra AI concierge (public) | 5 · Deployed | Grounded in local knowledge base; now runs a truth & correction protocol. |

## Ledger — Business / Connector experience

| Feature | Stage today | Honest note |
|---------|-------------|-------------|
| Business directory (browse) | 5 · Deployed | Seeded from Chamber directory. |
| Claim-your-listing flow | 5 · Deployed | Owner name, email, EIN captured. |
| Tiered verification badges | 4 · Build Passing → deploying | New this work order: Listed / Claimed / Chamber Member / Ownership Verified / Certified Connector / Sponsored. Badges reflect real fields only. |
| Token economy (10 tokens / $10) | 5 · Deployed | Balances tracked per provider. |
| Provider dashboard | 5 · Deployed | Profile, offers, jobs, leads, token balance. |
| Digital business cards (vCard / QR) | 5 · Deployed | Downloadable vCard + QR; view/scan tracked. |

## Ledger — Payments & money integrity

| Feature | Stage today | Honest note |
|---------|-------------|-------------|
| Stripe checkout (setup / subscription / tokens) | 5 · Deployed | Live checkout sessions. |
| Stripe webhook hardening | 4 · Build Passing → deploying | New this work order: signature now **required** (fails closed), plus idempotency so an event can never be double-processed. **Requires STRIPE_WEBHOOK_SECRET to be set in production before live payments.** |
| Money stored as integer cents | 4 · Build Passing → deploying | New `pricePaidCents` field added additively; removes floating-point money risk. |
| Revenue Producing (real paid business) | 8 · **Not yet** | No verified real-world paid Connector on record. This is the honest gap to close first. |

## Ledger — Community & engagement

| Feature | Stage today | Honest note |
|---------|-------------|-------------|
| Survey Says! (community trivia/survey) | 5 · Deployed | Answers map to real local businesses/landmarks. |
| Community Billboard | 5 · Deployed | Honest empty-state until first posts. |
| Stories | 5 · Deployed | Resident stories surface. |
| Kindness Wall / Kind Deeds | 5 · Deployed | Nominate neighbors/businesses/leaders. |
| Jobs board | 5 · Deployed | Provider-posted local jobs. |
| Anna Life Magazine (editor + retention modes) | 5 · Deployed | Guardrailed AI editor/treasurer; never moves money on its own. |

## Ledger — Trust, analytics & governance

| Feature | Stage today | Honest note |
|---------|-------------|-------------|
| First-party server analytics (role-only, privacy-first) | 5 · Deployed | Counts by role; no PII in aggregates; small-segment suppression. |
| City / Municipality executive brief | 5 · Deployed | Aggregate civic view; reports "no data" rather than estimating. |
| GA4 product analytics | 5 · Deployed | Aggregate, no cross-site ad profiling. |
| Privacy Policy (real processor disclosure) | 4 · Build Passing → deploying | Rewritten this work order: names hosting, storage, Stripe, GA4, and AI processing; explains lead-sharing, retention, deletion & data-access rights. |
| Terms of Use | 4 · Build Passing → deploying | Moved out of "draft"; adds independent-platform / piloting disclosure and honest token/refund language. |
| Secret & credential hygiene | 4 · Build Passing | `.gitignore` + `.env.example` added; **owner must rotate any exposed keys and set the webhook secret**. |

---

## The honest gaps (stages 6–8)

These are the stages that matter most to the City, and they are the ones we have
**not** yet earned. Closing them requires real-world evidence that only real use
can produce — not more code:

- **Flow Verified (Stage 6):** a recorded end-to-end walkthrough of each core
  journey in production (onboarding → match → contact; claim → pay → activate).
- **Used by Real Resident (Stage 7):** at least 5 real newcomers and 5 real
  businesses using the platform without our prompting, with their words captured.
- **Revenue Producing (Stage 8):** the first verified paid Connector, with the
  payment and the resulting real-world lead both documented.

## What changed in this work order (Audit Response #3)

- Hardened the Stripe webhook to fail closed and be idempotent.
- Moved money to integer cents (additive, no data loss).
- Shipped honest tiered verification badges tied to real fields only.
- Gave Sierra a truth & correction protocol (nonpartisan, correction-ready).
- Rewrote Privacy for real processor transparency; moved Terms out of "draft";
  added independent-platform / piloting language; corrected the false "required
  by the City of Anna" EIN claim to an honest in-house vetting note.
- Instrumented the Anna 10 activation funnel (started → step → completed →
  matches viewed → first contact).
- Added `.gitignore` + `.env.example` for credential hygiene.

## What only the owner can supply

The following cannot be fabricated and must come from the real world before we
can honestly advance stages 6–8:

- A recorded walkthrough of each core flow in production (test account is fine).
- Real business and Stripe evidence (a genuine paid Connector).
- A partnership truth sheet (exact, written status with the City and Chamber).
- Voice-of-customer: 5 newcomers and 5 businesses, in their own words.
- Rotation of any exposed API keys and setting `STRIPE_WEBHOOK_SECRET` in production.

---

*This ledger is a living document. Every claim in it is meant to survive a
skeptical reading. If a stage is wrong, correct it down — never up.*
---

## Work Order #5 — Anna LIFE Contributor Network & Revenue Partner Program (July 11, 2026)

**What was built (application + vetting + agreement layer):**

- **Two clearly-separated programs**, both feeding one admin review queue:
  - *Anna LIFE Contributor Network* (editorial) at `/magazine/contribute/apply` — for writers, journalists, photographers, artists, interviewers, historians, columnists, student contributors, and community correspondents.
  - *Anna LIFE Revenue Partner Program* (advertising) at `/magazine/partner/apply` — for people who source ads, sponsorships, sponsored sections, event partners, business profiles, and packages.
- **Editorial/advertising firewall is enforced in the agreement itself:** revenue partners must acknowledge they can never sell or promise favorable coverage, community rankings, suppression of criticism, or guaranteed AI recommendations.
- **No blanket exclusivity.** The contributor agreement uses first-publication rights + a limited exclusivity window + a digital/print/archive/promotion/syndication license; the creator keeps ownership, discloses prior publication, and avoids simultaneous duplicate submission — but may otherwise work anywhere.
- **Honest pay language:** independent contractor (not employment), paid from a shared ad-revenue pool after publication + editorial approval, W-9 before first payout, and a written agreement (rights, payment, attribution, corrections, conflicts, conduct, confidentiality, termination) before any paid work.
- **Human final authority:** Sierra Grace may organize/edit/fact-check, but publication authority stays with an accountable human editor. (Documented as policy; the existing claim/editor flow is unchanged and still open.)
- **Admin:** new "Contributors" tab (both programs, filterable, approve/pause/reject with agreement checklist) and a new "Requests" tab surfacing every contact-form submission (newcomer access, business, influencer, town-launch) as a reviewable, status-tracked case.

**Data model:** additive only — `ContributorProgram` enum, expanded `ContributorType`, and `editorialFirewallAck` / `writtenAgreementAck` fields added to `MagazineContributor`; `status` workflow added to contact submissions. No data loss.

**Guest-work acceptance checks (Work Order #4) — verified this pass:**

1. "Join as a Guest" is in the live footer → `/welcome/guest`. ✔
2. "Join our Influencer Program" opens a context-specific workflow (topic pre-selected + tailored heading/description), not a generic form. ✔ (improved this pass)
3. Guests can create an account; consent (`dataConsent`) and preferences (`marketingOptIn`, `interestPages`) are stored. ✔
4. Selected guest interests reorder/filter the Guest Hub. ✔
5. Guests are blocked from `/dashboard`, `/neighbors`, `/city-services`, `/settings`, `/onboarding` (middleware → `/guest-hub`). ✔
6. Guests can still reach approved public pages (magazine, news, directory, gallery, etc.). ✔
7. Contact submissions are stored (`ContactSubmission`) and an admin email is sent. ✔
8. "Request Newcomer Access" (`/contact?topic=newcomer`) now creates a stored, in-app reviewable case (Admin → Requests). ✔ (closed the gap this pass)
9. Direct-URL attempts cannot bypass guest restrictions (enforced in middleware, not just UI). ✔
10. Production build + deployment recorded here on deploy. ✔

**The participation ladder (design north star):** Visitor → Guest → Incoming Resident → Verified Resident → Contributor/Volunteer → Business/Nonprofit → Institutional Partner → Town Launch Partner. Guest Pass, Anna Connections, Town Launch Kit, and the Contributor Network are rungs on this ladder — people earn deeper access over time rather than receiving it up front.

**Still owner-supplied / next phase (not yet built, do not claim):** the deep editorial workflow (per-contributor profiles, beat assignment, pitch pipeline, draft/photo/release uploads, editorial-status tracking, bylines, portfolio, and article-performance analytics) is a larger phase; today's work is the vetted front door + agreements. The Founder Operating Profile and the full Anna Connections campaign model still need source content from the owner before they can be added to the Bible/Ledger honestly.

---

## Work Order #6 — Anna LIFE Digital PRESS Card (Phase 1–2 slice) (July 11, 2026)

**What this is:** a public, verifiable, revocable editorial credential + digital
business card issued to vetted Anna LIFE contributors. Built natively in-app (no
external form embed), reusing the existing digital-business-card engine (QR,
vCard, lit/greyed action icons, public slug, scan/view counters).

**Status honesty note:** the full PRESS Card work order is *Specified* end-to-end.
Only the Phase 1–2 slice below is *Coded / Build-Passing / Deployed*. Everything
under "Deferred" is written down but NOT built — do not claim it.

**Coded / Build-Passing / Deployed (Phase 1–2):**

- **Credential data model (additive, no data loss):** `PressCredential`
  (1:1 with an APPROVED `MagazineContributor`) with a human-facing `credentialId`
  (e.g. `AL-2026-7F3K`), a stable public `slug`, `level` (Provisional / Certified /
  Senior Certified / Contributing Editor), `status` (Active / Suspended / Expired /
  Revoked), opt-in public contact fields, coverage beats, residency-verified flag,
  issue/expiry/last-verified dates, and privacy-respecting scan/view counters.
  Plus `PressCredentialAudit` — an append-only trail that records every lifecycle
  action (issue/renew/suspend/restore/expire/revoke/update), who performed it, and
  the reason.
- **Public credential page** at `/anna-life/press/{slug}` — level-driven prestige
  treatment (gold for Certified+, silver for Provisional), live status pill,
  identity block (headshot or fallback, byline, editorial track, beats,
  editor-verified residency indicator), credential block (ID, level, issued /
  valid-through / last-verified dates), a **high-contrast dark-on-light QR** (only
  the frame/seal carry gold — the QR modules themselves are never gold), and the
  full independent-press disclaimer. Records a view and fires a privacy-respecting
  scan ping (aggregate integer only — no IP, device, or location).
- **Lit / greyed action row:** Call, Email, Website, Social, Add-to-contacts
  (downloads an opt-in-fields-only `.vcf`), and Share. Fields the contributor has
  not opted to publish render as greyed, disabled controls with accessible helper
  text — never auto-exposed.
- **Request This Contributor** routes through the editorial desk
  (`/contact?topic=coverage&contributor={slug}`) with a pre-filled request; the
  contributor is notified only after screening. (Full case-tracking workflow is
  deferred — see below.)
- **Admin issuance + lifecycle controls** inside Admin → Contributors: for any
  APPROVED contributor, issue a PRESS card at a chosen level, change level, renew
  (12-month term), suspend/restore, and revoke — each writing an audit row. A
  "View public card" link opens the live credential.
- **Public status honesty:** an elapsed term shows as *Expired* publicly even
  before any sweep runs; suspended/revoked cards show the exact work-order notices
  and disable requests.

**Coded / Build-Passing / Deployed (Phase 3 — added July 11, 2026):**

- **Contributor self-edit dashboard** at `/anna-life/press/manage`. A contributor
  signs in with the same email the editorial desk approved them under; their
  credential loads and they can *propose* changes to public display fields only
  (bio, coverage beats, opt-in phone/email, website, professional social link,
  headshot URL). Submissions are stored as PENDING edits and an audit row is
  written — the live public card does NOT change until an editor approves. Level,
  status, dates, credential ID, residency, and all counters remain read-only and
  editor-controlled. A pending-review banner shows while edits await approval.
- **Editor review of self-edits:** the Contributors admin panel surfaces a
  "Pending self-edits" block per credential showing current-vs-proposed side by
  side, with Approve & publish (copies pending → public, clears the queue, writes
  an UPDATE audit row) or Discard (clears the queue, audited). New API actions
  `APPROVE_EDITS` / `REJECT_EDITS` back this, ADMIN-gated.
- **Full "Request This Contributor" case workflow.** The public card button now
  opens an in-card case form (name, email, optional phone/organization/topic,
  message) that creates a dedicated `CoverageRequest` record and emails the
  editorial desk (hello@annaartscouncil.org). Requests are only accepted when the
  credential is ACTIVE and accepting requests. A new **Coverage** tab in the admin
  dashboard lists every case with a status pipeline (New → Screening → Forwarded →
  Accepted / Declined → Completed), requester details, and a private internal note
  field. The contributor is never contacted automatically — the desk screens every
  case first (owner-approved safeguard).

**FLOW-VERIFIED (July 11, 2026 — end-to-end, real authenticated sessions):**

Every route was exercised against live sessions (not just a build check):
- Admin login → **ISSUE** a CERTIFIED credential to an APPROVED contributor →
  credential created with unique credentialId + slug, 12-month term, audit row `ISSUE`.
- Public card page returns 200; public card API returns the sanitized JSON.
- **Scan ping** increments scanCount; page **viewCount** increments — analytics confirmed.
- **Public coverage request** POST creates a `CoverageRequest` (status NEW) and fires the desk email path.
- Contributor login → GET own credential → **submit self-edit** (bio/phone/beats) → stored PENDING, audit `self-edit submitted`.
- Admin **APPROVE_EDITS** → pending copied to public; public API immediately reflects the new bio/phone/beats; audit `self-edit approved -> published: bio, phone, beats`.
- Admin **coverage list** shows the case; **PATCH** moves it NEW → SCREENING with a private internal note + handledByUserId stamped.
- **Security gate proven:** a contributor POST attempting to set level/status/scanCount/credentialId/residencyVerified was rejected — those fields stayed editor-controlled; only the bio was accepted as a pending proposal (still requiring approval).

All verification data was seeded in and then fully purged from the shared database (0 residual rows). WO#6 is therefore recorded at the highest stage: **Flow-Verified**.

**Deferred / Specified but NOT built (do not claim):**

- Article credits, byline portfolio feed, and "Most Read / Most Viewed"
  ranking snapshots — there is no Article model yet, so the card honestly shows
  "No published work linked yet."
- Wallet passes (Apple/Google), printable press-badge export, and QR-scan
  geo/timeline analytics.

**Owner-approved safeguards honored:** QR stays high-contrast (gold on frame/seal
only); public contact info is strictly opt-in; home address, proof-of-residency,
legal name, internal notes, and any score are never shown; a contributor cannot
self-assign level, dates, ID, status, residency, or counts; rankings (when built)
will read "Most Read / Most Viewed," never "#1 Journalist."

---

## WO — Provider Dashboard Build-Out for Kimberly / Anna TX Realty (July 11, 2026)

**Status: BUILT + BUILD-TESTED + CHECKPOINT SAVED. NOT yet deployed to production. NOT browser-verified (new-feature norm: automated build test + checkpoint).**

Three owner-requested capabilities added to the provider dashboard:

1. **Magazine Studio** (`/dashboard/provider/magazine`). A provider can self-serve
   purchase an OPEN ad plot in a sellable Anna LIFE issue and upload their own
   PNG/JPEG artwork. Price is charged in tokens (1 token = $1; a $300 full page = 300
   tokens). Purchase is atomic — the plot is reserved and tokens are debited in a
   single transaction, so two providers cannot buy the same plot and an
   underfunded account is rejected (PLOT_TAKEN / INSUFFICIENT_TOKENS). The plot
   lands in **RESERVED** (pending editor review of the artwork), and an editor
   confirms it to SOLD from the existing admin tools — we do NOT auto-print
   unreviewed artwork. Providers also get a "Contribute an article or photo"
   section linking into the existing magazine + gallery submission flows. Ad
   spend now appears in the provider's token history.

2. **Anna Community Pulse.** Live growth tiles — New Neighbor Profiles and
   Businesses Claimed (total + this month) — plus a "Newcomers to Greet" list of
   recent, still-unanswered welcome-board introductions, each with a "Say hi"
   button that jumps straight to that newcomer's post.

3. **Welcome Ambassador alert.** Kimberly is flagged as a Welcome Ambassador and
   now receives an immediate in-app notification the moment a newcomer posts an
   introduction (in addition to the existing 12h/20h email escalation). This is
   how "she gets an alert to say hello."

4. **Try Our Apps for Realtors.** A cross-promo container linking to SILO Report,
   Slidersss, and AnnaConnect (open in a new tab).

No schema change was required — the existing ad-plot and ambassador fields
supported all of the above. Kimberly's account already carries the ambassador
flag (persisted in the seed script for idempotency).
