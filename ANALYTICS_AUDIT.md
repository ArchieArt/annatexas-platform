# AnnaTexas.org — Analytics Audit (Module 3.1)

_Phase 1 deliverable. This document maps every analytics tracker and data source the platform captures today, states what is missing, and scores each of the 16 sales-funnel stages by whether we can already detect it. It is the prerequisite reference for the Communications Engine (Modules 4 & 5) — triggers can only react to events we actually record._

_Last audited: July 2026._

---

## 1. The two analytics streams

The app captures analytics through **two independent, complementary systems**:

### A. First-party event stream (our own database) — `AnalyticsEvent` table
This is the **source of truth for dashboards**. Every event is a row in the `AnalyticsEvent` table, written by the server through `lib/track.ts` (`recordEvent` / `recordEventWithSession`). It is privacy-first by design: it stores the actor's **role** (never name/email), an internal `userId` used only for de-duplication (never surfaced in aggregates), plus optional `entityType`, `entityId`, and `topic` buckets. Recording is fire-and-forget — it can never slow down or break a real feature.

Query helpers already available in `lib/track.ts`: `countEvents`, `countByType`, `countByTopic`, `countByRole`, `countDistinctUsers`, plus an `n < 5` low-count suppression helper for privacy.

### B. Google Analytics 4 (client-side) — `lib/analytics.ts`
This mirrors key journey/monetization events to GA4 for marketing-funnel visibility (`trackEvent`, `trackOnboardingCompleted`, `trackTokenPurchase`, `trackProviderInteraction`, etc.). GA4 data lives in Google's console, **not** in our dashboards, and is anonymized. Useful for traffic trends; not a substitute for the first-party stream.

> **Key takeaway:** dashboards must always read from stream **A** (our DB) so the numbers are private, real, and role-filterable. GA is supplementary.

---

## 2. First-party events CAPTURED today (`AnalyticsEventType`)

| Event type | Fires from | Captured? |
|---|---|---|
| `LISTING_VIEW` | provider detail page view (`provider-detail-content.tsx`) | ✅ |
| `LISTING_CLICK` | provider contact/website click | ✅ |
| `OFFER_VIEW` | Welcome Offers browse page | ✅ |
| `OFFER_CLAIM` | care-package clip (`/api/care-packages/[id]/clip`) | ✅ |
| `OFFER_REDEMPTION` | defined in enum | ⚠️ enum only — no emitter found |
| `EVENT_RSVP` | defined in enum | ⚠️ enum only — no emitter found |
| `JOB_VIEW` | job click (`/api/jobs/click`) | ✅ |
| `SIERRA_QUESTION` | Ask Sierra (`/api/hey-anna`) — bucketed by `topic` | ✅ |
| `SURVEY_RESPONSE` | survey vote (`/api/surveys/[id]/vote`) | ✅ |
| `VOLUNTEER_SIGNUP` | defined in enum | ⚠️ enum only — no emitter found |
| `MAGAZINE_VIEW` | magazine content view | ✅ |
| `MAGAZINE_FRAME_CLAIM` | magazine frame claim (`/api/magazine/claim`) | ✅ |
| `MAGAZINE_CONTRIB_SUBMIT` | magazine contribution (`/api/magazine/submit`) | ✅ |
| `INTRO_POSTED` | welcome-board post (`/api/welcome-board`) | ✅ |
| `INTRO_REPLIED` | welcome-board reply | ✅ |
| `CARD_VIEW` | public digital card view | ✅ |
| `VCARD_DOWNLOAD` | Save Contact / vCard download | ✅ |
| `CARD_SHARE` | card share action | ✅ |
| `QR_SCAN` | card opened via QR (`?src=qr`) | ✅ |

**15 of 19 event types are actively emitted.** 4 are declared in the enum but have no emitter yet (`OFFER_REDEMPTION`, `EVENT_RSVP`, `VOLUNTEER_SIGNUP` — these correspond to features not yet wired for tracking).

---

## 3. Structured data ALSO available (relational tables, not the event stream)

Beyond the event stream, these tables hold state we can query directly for dashboards and funnel detection:

- **`User`** — role (NEWCOMER/RESIDENT/PROVIDER/CHAMBER/CITY/ADMIN), `createdAt`, `onboardingCompleted`, `answers` (onboarding survey JSON), `tags`, `lastActive`, `dataConsent`, and the full personal-card fields (`cardEnabled`, `cardSlug`, etc.). → powers New User Feed, demographics, card-activation counts.
- **`Provider`** — `businessName`, `category`, `tags`, `status` (PHANTOM/NEW/CLAIMED/CERTIFIED), `tier` (FREE/CONNECTED/PRIORITY), `setupFeePaid`, `stripeSubId`, `cardSlug`, `cardTier`, `cardTierStatus`, `cardHasDeal`, token balance. → powers Business Summary, Industry Inventory, and most funnel-stage detection.
- **`Lead`** — status incl. `CONVERTED`. → lead volume & conversion.
- **`Survey` / `SurveyResponse`** — questions, options, votes, declared winners. → survey analytics.
- **`CommunityStory`**, **`WelcomeBoardPost`**, **`Job`**, **`CarePackage`/`CarePackageClip`**, **magazine tables**. → engagement + magazine fill metrics.
- **`AnnaGraph`** — pre-aggregated community-interest categories.

---

## 4. Sales-funnel stage coverage map (Module 5.4 pre-check)

Can we already detect each of the 16 business funnel stages from data we capture today?

| # | Funnel stage | Detectable now? | Signal source |
|---|---|---|---|
| 1 | New Account (Phantom) | ✅ | `Provider.status = PHANTOM` |
| 2 | Profile Claimed | ✅ | `Provider.status ∈ (CLAIMED, CERTIFIED)` / `userId` linked |
| 3 | Paid Membership Fee | ✅ | `Provider.setupFeePaid = true` |
| 4 | Chose Plan | ✅ | `Provider.tier ≠ FREE` |
| 5 | Activated Digital Business Card | ✅ | `Provider.cardSlug` set / card exists |
| 6 | Customized Digital Business Card | ✅ | `Provider.cardTierStatus` active / add-ons payload present |
| 7 | Updated Deals/Promos | ✅ | `Provider.cardHasDeal = true` |
| 8 | Created Welcome Package for Newcomers | ✅ | `CarePackage` owned by provider |
| 9 | Posted a Bulletin Board Listing | ✅ | `WelcomeBoardPost` / `INTRO_POSTED` |
| 10 | Posted a Job | ✅ | `Job` table rows by provider |
| 11 | Posted a Welcome Board Message | ✅ | `INTRO_POSTED` event |
| 12 | Created a Survey | ⚠️ partial | surveys are ADMIN-created today; no provider-authored survey field yet |
| 13 | Spent Tokens | ✅ | token ledger / balance deltas |
| 14 | Purchased Tokens | ✅ | Stripe token purchase + `trackTokenPurchase` |
| 15 | Purchased Ad (Anna Life Magazine) | ✅ | `MAGAZINE_FRAME_CLAIM` + magazine claim record |
| 16 | Viewed Dashboard | ❌ missing | **no `DASHBOARD_VIEW` event emitted yet** |

**Findings for the funnel engine:**
- **14 of 16 stages are already detectable** from existing data with no new tracking.
- **Stage 16 (Viewed Dashboard) needs a new tracker** — add a `DASHBOARD_VIEW` event fired when a provider opens their dashboard. (Small addition; recommended in the funnel-engine phase.)
- **Stage 12 (Created a Survey)** is only partial — survey creation is currently admin-only. If businesses will author surveys, add an author/owner field. Otherwise this stage stays admin-triggered.
- **Number of log-ins** (referenced in the brief) is **not currently counted as an event** — `User.lastActive` gives last-seen but not a login tally. Add a `LOGIN` event in the auth flow if a running login count is required.

---

## 5. Gaps summary — what to add, and when

| Gap | Needed for | Recommended phase |
|---|---|---|
| `DASHBOARD_VIEW` event | Funnel stage 16 | Funnel-engine phase |
| `LOGIN` event (login tally) | "number of log-ins" metric | Funnel-engine phase |
| Emitters for `OFFER_REDEMPTION`, `EVENT_RSVP`, `VOLUNTEER_SIGNUP` | completeness of engagement metrics | as those features mature |
| Provider-authored surveys (stage 12) | full funnel stage 12 | only if product direction requires it |
| Canonical revenue container | single verified Total Revenue (Module 8.2) | data-container phase (partially built in Phase 1) |

---

## 6. Architecture decision established in Phase 1

**One data container per metric.** All dashboard metrics are served by a single shared endpoint, `/api/analytics/containers`, which authenticates the caller's role from the session and returns the same numbers regardless of which dashboard (Admin / Chamber / City) renders them. No dashboard-specific query forks. Phase 1 ships the first two containers — **New Users** and **Business Summary** — to prove the pattern; subsequent phases add containers (Revenue, Page Views, Funnel, etc.) to the same endpoint.
