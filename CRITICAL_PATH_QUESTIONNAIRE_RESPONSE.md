# Critical Path Questionnaire — Response

**Re:** One-Week Sprint to Launch — technical & operational readiness
**Prepared by:** Our Development Team
**Audit basis:** Live source tree at the current project root (not the unzipped copy the questionnaire referenced). Every claim below was verified by reading the actual file named.
**Legend:** **[BUILT]** = live and verified in code · **[GAP]** = real missing piece, needs a fix · **[DECISION]** = business call for Aubre' · **[VERIFY]** = claim in the questionnaire we could not confirm in code.

---

## How to read this

We audited every file the questionnaire named. The headline is good news: the hard, trust-sensitive machinery — payment security, editorial human-gates, the transparent creator pool, the honest economic-impact engine — is **built and verified**. There is **one true revenue gap** (subscription-renewal token top-ups), a **short list of nice-to-have trackers**, one **business decision** (the promo date), and a couple of items where the questionnaire's description didn't match what's actually in the code, which we flag honestly rather than paper over.

**The only launch-blocking item we found is Section 1, Item 2 (the `invoice.payment_succeeded` webhook).** Everything else is either already done or safe to launch without.

---

# Section 1 — Monetization & Payer Trust

## 1.1 Tax ID (EIN) Requirement Enforcement — **[BUILT]**

**Verified state:** The EIN requirement is enforced **and** clearly communicated *before* a purchase — not as a surprise error.

- **Server enforcement:** `app/api/stripe/checkout/route.ts` looks up the provider and returns a 400 with a clear message ("Tax ID (EIN) is required before purchasing…") if `provider.taxId` is missing. No checkout session is ever created without it.
- **Up-front UI communication:** `components/token-shop-content.tsx` checks `hasTaxId` on load (via `/api/providers/me`) and, if missing, opens a dedicated Tax-ID modal *before* checkout. The modal explains **why** in plain, trust-building language: *"We use your EIN to confirm you're a legitimate, locally-registered business so leads stay inside Anna. It is stored securely, never shared, and never sold. (This is our own vetting step — it is not a City of Anna government requirement.)"* It saves through `/api/providers/update-tax-id`.
- **Claim flows also require it:** `components/claim-directory-content.tsx` and `components/provider-detail-content.tsx` both mark Tax ID / EIN as a required field on the claim form.

**Assessment:** No changes needed for launch. One optional polish: a freshly self-signed provider who never claimed a listing first encounters the EIN at their first token purchase (via the modal) rather than at signup — this is acceptable and arguably better UX. If desired we could also surface it in `components/provider-setup.tsx`.

## 1.2 Stripe Webhook Configuration — **[GAP] — the one launch-blocker**

**Verified state of `app/api/stripe/webhook/route.ts`:** the endpoint is genuinely hardened — signature is required (fails closed if `STRIPE_WEBHOOK_SECRET` is unset), and every event id is recorded in `WebhookEvent` before processing so replays can't double-credit. Handled events:

| Event | Handled? | What it does |
|---|---|---|
| `checkout.session.completed` | ✅ | Credits tokens, sets tier, records `TokenPurchase`, activates card add-ons, settles ANNA LIFE ad orders |
| `customer.subscription.updated` | ✅ | Syncs renewal date + cancel state for card add-ons and lead/token subs |
| `customer.subscription.deleted` | ✅ | Reverts card add-on to free; reverts lead/token sub to FREE tier |
| **`invoice.payment_succeeded`** | ❌ **MISSING** | **Nothing.** Not handled anywhere in `app/` or `lib/` (verified by search) |

**Why this matters for revenue:** monthly token grants for the recurring plans (Growth = 150 tokens/mo, Dominate = 600 tokens/mo, and legacy Connected/Priority) are credited **only** on the initial `checkout.session.completed`. On each **subsequent monthly renewal**, Stripe fires `invoice.payment_succeeded` — which we don't listen for — so **renewing subscribers are charged but are not re-granted their monthly tokens.** That is a payer-trust and revenue-integrity issue the moment the first renewal cycle hits.

**Fix (small, contained):** add an `else if (eventType === 'invoice.payment_succeeded')` branch in `processEvent()` in `app/api/stripe/webhook/route.ts` that (a) ignores the first invoice (already handled by checkout) via `billing_reason === 'subscription_create'`, (b) looks up the provider by `stripeSubId` / `cardAddonSubId`, (c) increments the correct monthly token package, and (d) writes a `TokenPurchase` ledger row. The idempotency guard already in place will prevent double-credit. **Also confirm the Stripe Dashboard endpoint is subscribed to `invoice.payment_succeeded`.**

> **Recommend: fix this in the sprint.** It's the only item we'd call blocking.

## 1.3 July Launch Special Extension — **[DECISION]**

**Verified state of `lib/promo.ts`:** the Starter Claim fee is $49 (reg. $150) until `SETUP_PROMO_END = 2026-08-01T04:59:59Z` (i.e. July 31, 2026, 11:59:59 PM Central). `isSetupPromoActive()`, `currentSetupFee()`, and `currentSetupFeeCents()` all read that one date, and both checkout (`app/api/stripe/checkout/route.ts`) and the pricing UI use them — so display and billing can never drift.

**This is a pure business decision, not an engineering problem.** To extend, change **one line** — the `SETUP_PROMO_END` date (and optionally `SETUP_PROMO_ENDS_TEXT` / `SETUP_PROMO_LABEL`). Everything else updates automatically.

> **Needs from Aubre':** the new end date and label text (e.g. "Founding Member Special — Ends Aug 31"). Give us those two values and it's a two-minute change.

---

# Section 2 — Branding & User Experience

## 2.1 Multi-Town White-Label Configuration — **[BUILT]**

**Verified state of `lib/town-config.ts`:** the engine is sound. `ACTIVE_TOWN` is driven by `NEXT_PUBLIC_TOWN` (defaults to `anna`), so the live site is never accidentally re-skinned. Anna's config is complete and correct (product name, wordmark, magazine name, real civic facts). A verified Princeton proof-of-concept town is already defined. `app/layout.tsx` reads `getActiveTown()` for dynamic titles/metadata.

**Hardcoded-value honesty check:** the file itself states that this layer centralizes **presentation/config only** and that full per-town **data** isolation is a deliberate later migration. That's the right call and does **not** affect Anna's own launch. We did find scattered hardcoded brand strings in the chrome (e.g. an `"AnnaTexas.org"` aria-label in `components/footer.tsx`) that should be swapped to `getActiveTown().domainLabel` **before a second town goes live** — but for Anna these are correct as written, so **not a launch blocker.**

> **Assessment:** ready for Anna launch. The "swap remaining hardcoded strings to the town config" task belongs to the *first real second-town* sprint, not this one.

## 2.2 Missing Analytics Events — **[MOSTLY BUILT] — 2 worth adding this sprint**

**Verified against `ANALYTICS_AUDIT.md`, `lib/track.ts`, `lib/analytics.ts`:** the platform runs two streams — a privacy-first first-party event stream (`AnalyticsEvent` via `lib/track.ts`, the source of truth for dashboards) and GA4 mirroring (`lib/analytics.ts`). **15 of 19** event types are actively emitted; **14 of 16** funnel stages are already detectable with no new code.

The five events the questionnaire names, ranked for a one-week sprint:

| Event | Priority for sprint | Where to add the tracker |
|---|---|---|
| **`DASHBOARD_VIEW`** | **Add now** — it's the only missing funnel stage (16) and a core engagement/trust signal | Fire `recordEvent` on load of `app/dashboard/provider/page.tsx` (and admin/city dashboards) |
| **`LOGIN`** | **Add now** — needed for any "number of log-ins" metric; today only `User.lastActive` exists (last-seen, not a tally) | Emit in the NextAuth sign-in callback in `lib/auth.ts` |
| `OFFER_REDEMPTION` | Later — enum exists, no emitter | Wire into the offer/care-package redemption path when that flow matures |
| `EVENT_RSVP` | Later — enum exists, no emitter | Wire into the event RSVP action |
| `VOLUNTEER_SIGNUP` | Later — enum exists, no emitter | Wire into `/volunteer` signup submit |

> **Recommend:** add `DASHBOARD_VIEW` and `LOGIN` this sprint (both tiny). The other three can follow as those features get real usage — measuring them empty adds noise, not insight.

## 2.3 User Onboarding & Data Consent — **[BUILT & COMPLIANT]**

**Verified state:** `User.dataConsent` defaults to `false` in the schema (opt-in, not opt-out). `components/onboarding-wizard.tsx` has a dedicated **"Privacy & Consent"** step (a `consent`-type question) with an explicit checkbox; the value is sent to `/api/onboarding`. The signup route (`app/api/signup/route.ts`) also records it, and users can manage/withdraw it later in `components/settings-content.tsx`. The consent copy is clear and trust-forward: *"Welcome to Anna is 100% privacy-focused. We never sell your data or show you ads."*

> **Assessment:** compliant and well-integrated. No sprint work required. (If you ever add data uses beyond matching — e.g. marketing email — revisit the consent copy so it still matches reality.)

---

# Section 3 — Magazine Population & Content Trust

## 3.1 Magazine Content Review & Quality Assurance — **[BUILT — this is a strength]**

**Verified state of `lib/magazine/production/sierra.ts`:** the design principle is enforced *structurally*, not just by policy. The file's own contract: *"Nothing here publishes, rejects, changes a byline, clears rights, or moves money — those are human gates. Suggestions are proposals; originals are never overwritten."* The AI specialists return **structured findings only**, each carrying a status (`PASS` / `ADVISORY` / `NEEDS_HUMAN` / `BLOCKED` / `ERROR`) and severity. Uploaded text is treated as untrusted data (prompt-injection guard).

The human sign-off is a hard gate: `lib/magazine/production/release-gate.ts` makes the **`TENANT_PUBLISHER`** the final release actor — *"AI may never override"* — and an emergency override requires **two people, a written reason, and an audit event**, and can never override authorship or payment. `lib/magazine/production/release-qa.ts` compiles a real, read-only launch-readiness report on top of that.

> **Assessment:** the human-oversight question is answered by the architecture itself. No content path publishes without a person. No sprint work required. Immediate step to be safe: confirm a named human holds the `TENANT_PUBLISHER` role for the Anna tenant before the first issue releases.

## 3.2 Unsold Ad Frame Management — **[VERIFY] — questionnaire claim not confirmed in code**

**Honest finding:** we could **not** confirm an automated "unsold ad frames auto-fill with house content (community art, puzzles, etc.)" mechanism by that description. Searching `lib/magazine/production/provision.ts`, `ads.ts`, `snapshot.ts`, and `manifest.ts` for house/remnant/filler/placeholder logic returned nothing matching that behavior.

**What *is* built and verified:** ad frames and editorial frames are cleanly separated in the manifest (`ad` vs `editorial_frames`); `ads.ts` structurally guarantees advertising confers **no** editorial benefit (rule 9), that prices are server-owned, one active order per slot, and that **every paid creative must pass file-safety, dimensions, DPI, QR/link checks, and a human proof approval before it locks into the issue.** So there is no risk of an unvetted paid ad appearing — but the specific "backfill an unsold slot with house content" feature appears to be **[PLANNED], not built**, or is handled by a manual editorial step.

> **Recommend:** tell us the intended behavior for an unsold ad slot at print time (leave blank? convert to editorial? insert a house-ad/community-art/puzzle from a pool?). If auto-backfill is required for launch, it's a small, well-scoped addition to the provisioning/snapshot layer. If a human simply fills leftover slots, no code is needed — just a checklist step. **We won't claim this is done when it isn't.**

## 3.3 Creator Pool Transparency & Payouts — **[BUILT — this is a strength]**

**Verified state of `lib/magazine/production/payouts.ts`:** the model is transparent and auditable by design.

- **50% pool** of net ad profit (`DEFAULT_POOL_BPS = 5000`), with a 5% reserve (`DEFAULT_RESERVE_BPS = 500`); ownership tracked in basis points that total exactly 10000.
- **Only settled ad funds** enter the calculation (refunds subtracted) — no counting money that hasn't cleared.
- **Deterministic largest-remainder rounding** so every per-owner statement sums to the pool **exactly** — no lost or phantom cents.
- **Human-gated:** the pool is a *proposal* until a `FINANCE_ADMIN` finalizes it. Finalized statements are **append-only**; corrections are reversal + replacement rows, never edits.
- **Full audit trail:** every state transition writes an append-only `AuditEvent`.
- Contributor payout onboarding exists (`app/api/life/contributors/payout-setup/route.ts`), and admin-side transparency views exist (`app/dashboard/admin/production/payouts/page.tsx`, `.../generations/contributors/page.tsx`).

> **Assessment:** the math and governance are trustworthy and launch-ready. The one **enhancement** (not a blocker) worth scoping: a **creator-facing self-serve statement view** — right now the richest transparency is admin-facing. A read-only "your share, how it was calculated, payout status" page for each contributor would turn already-honest internals into visible trust. Good fast-follow.

---

# Section 4 — Abacus Integration & Reporting

## 4.1 Dashboard Readiness — **[BUILT] — with one revenue nuance**

**Verified state of `app/api/admin/command/route.ts`:** it already aggregates, live from the database (batched to respect the DB connection cap): revenue MTD + all-time, leads (total / this week / converted), user counts (newcomers/residents, onboarding completed), provider counts (total, claimed/certified, verified, setup-fee-paid, token holders), tier breakdown, plus community/engagement tables (stories, events, jobs, gallery, welcome board).

**Top 5 metrics we'd put live and accurate for the sprint** (all already backed by real data):

1. **Real businesses onboarded** — `Provider.status ∈ (CLAIMED, CERTIFIED)`, deliberately excluding PHANTOM seeds. (command route + economic-impact route)
2. **Revenue** — from `TokenPurchase` aggregates. *(See nuance below.)*
3. **Leads + conversion rate** — `Lead` total / week / `CONVERTED`.
4. **Newcomer activation** — `User.onboardingCompleted` vs total (ties into the existing "Anna 10" funnel in `lib/analytics.ts`).
5. **Economic-impact headline set** — the five proof metrics from `app/api/admin/economic-impact/route.ts`.

**The one nuance (honest):** the dashboard's "Revenue" is currently computed from **`TokenPurchase`** rows. That does **not** yet fold in ANNA LIFE **magazine ad** revenue (`MagazineAdOrder`) or **card add-on** subscription revenue into a single number. `ANALYTICS_AUDIT.md` itself flags a **"canonical revenue container — single verified Total Revenue"** as an open item. If the Abacus dashboard needs one authoritative Total Revenue figure across **all** lines, that consolidation is the one aggregation piece to add here.

> **Recommend:** if a single all-in Total Revenue number is a launch requirement, add the canonical revenue container this sprint; otherwise label the current figure "Token & Membership Revenue" so it's truthful.

## 4.2 Economic Impact Report Automation — **[BUILT on-demand] — not yet scheduled**

**Verified state of `app/api/admin/economic-impact/route.ts`:** this is a real, honest, launch-ready report — but it is **generated on demand, not on a schedule.**

- It's an ADMIN-only read-only endpoint that computes the five headline proof metrics **all-time and last-30-days**, live, on every load. Because it's computed fresh each time, **the data is never stale** — there are no manual steps or batch jobs to run before viewing it.
- Every number **traces to a database row**; PHANTOM seed listings are excluded so the count is genuine; proxy metrics (e.g. job **apply-clicks** rather than fully-tracked applications) carry an honest `note` so the UI labels them truthfully. `components/admin/economic-impact-report.tsx` renders the five stats with CSV export.

**The gap vs. the questionnaire's wording:** there is **no scheduled/automated generation or distribution** to city stakeholders — we confirmed there is no `lib/cron-jobs/` directory. "Immediate generation" is true (open the page, it's current); **"automated distribution" is not built.**

> **Recommend:** if the City wants a report to **arrive** (e.g. a monthly emailed/archived PDF) rather than be **pulled**, we can add a scheduled task that snapshots this same endpoint's data on a cadence and emails/archives it. That's a clean, self-contained add — say the word and we'll scope it. For the sprint, the on-demand report is already demo- and pitch-ready.

---

## Bottom line — the one-week sprint list

**Must-fix (launch-blocking): 1 item**
- **S1.2** — Add the `invoice.payment_succeeded` webhook handler so recurring subscribers get their monthly tokens on renewal (and confirm the Stripe endpoint subscribes to it).

**Should-add (small, high-value): 2–3 items**
- **S2.2** — `DASHBOARD_VIEW` + `LOGIN` analytics events.
- **S4.1** — Canonical Total Revenue container *(only if the dashboard needs one all-in revenue number; otherwise relabel the current figure honestly).*

**Business decision (no engineering): 1 item**
- **S1.3** — Give us the new July-promo end date + label to extend it (one-line change).

**Clarify intent, then quick build if needed: 1 item**
- **S3.2** — Confirm desired behavior for unsold ad slots; auto-backfill is not currently built.

**Nice fast-follow (not blocking):**
- **S3.3** — Creator-facing self-serve payout statement view.
- **S4.2** — Scheduled auto-distribution of the economic-impact report.
- **S2.1** — Swap remaining hardcoded chrome strings to the town config (belongs to the first second-town sprint, not Anna's launch).

**Already solid, no work needed:** S1.1 (Tax ID), S2.3 (data consent), S3.1 (editorial human-gates), and the core of S4.1/S4.2 (live, honest reporting).

— The Development Team
