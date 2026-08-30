# Welcome to Anna — Customer Journey & Readiness Audit

**Prepared for:** Aubre' Murphy
**Purpose:** Turn your rough-draft "audience doors" spreadsheet into an organized customer journey for every audience — and use it as a readiness check: *Was it built? Is it complete? Did the experience land the way we intended?*

**How to read the status column**

| Status | Meaning |
|---|---|
| ✅ **Live** | Built, wired to real data, working in the app today. |
| 🟡 **Partial** | Some of it exists, but a piece of the intended experience is missing or thin. |
| ⬜ **Missing** | Named in your vision but not built yet. |

> **One important framing decision (yours):** The five "city" personas — Chamber, City Council, EDC, City Manager, Mayor — are **not** separate logins. Nobody signs in as "the Mayor." Those dashboards are **the app's own internal tooling** for fact-checking, events, the magazine, and data/analytics. So this audit treats them as **one ADMIN experience**, and the five audiences that actually have a journey are: **Newcomer, Resident, Business Owner, Nonprofit, and Admin.**

---

## The big thesis this journey has to prove

Every audience should eventually be able to do the same core set of things — create a presence, get matched, communicate, grow — so that the app can **demonstrate it drove Anna's economic development**, with the **Admin dashboard capturing all the proof**: newcomers and residents applying for and creating jobs, opening business profiles, selling products, and creating events. Keep that end-goal in mind as you read each gap — the gaps are exactly the data points the economic-impact story needs.

---

## Cross-cutting capability matrix (what *every* audience should have)

This is the shared toolkit from your vision paragraph, scored once so we can see the platform-wide gaps at a glance.

| Capability | Newcomer | Resident | Business | Nonprofit | Admin (tooling) |
|---|---|---|---|---|---|
| Create a landing page (for tagging / match-making) | 🟡 | 🟡 | 🟡 | 🟡 | n/a |
| Digital shareable business + contact card | ✅ | ✅ | ✅ | 🟡 | n/a |
| Ask Sierra | ✅ | ✅ | ✅ | ✅ | ✅ |
| Notifications (in-app) | 🟡 | 🟡 | 🟡 | 🟡 | ✅ |
| Receive / send messages | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |
| Job alerts (subscribe) | ⬜ | ⬜ | ⬜ | ⬜ | n/a |
| Create a resume | ⬜ | ⬜ | n/a | ⬜ | n/a |
| Goals helper | ⬜ | ⬜ | ⬜ | ⬜ | n/a |
| Sign up for alerts (news/events) | 🟡 | 🟡 | 🟡 | 🟡 | n/a |
| Sign up / RSVP for events | ⬜ | ⬜ | ✅ create | ⬜ | ✅ manage |
| Volunteer at nonprofits | 🟡 | 🟡 | 🟡 | ✅ receive | ✅ manage |
| Find resources | ✅ | ✅ | ✅ | ✅ | ✅ |
| Magazine-submission notifications | 🟡 | 🟡 | 🟡 | 🟡 | ✅ |
| Understand the EDC | ✅ | ✅ | ✅ | ✅ | ✅ |
| Find Anna's history | ✅ | ✅ | ✅ | ✅ | n/a |
| Open a sole-proprietor business in-app | 🟡 | 🟡 | ✅ | 🟡 | ✅ track |

**Platform-wide gaps that show up everywhere (build-once, benefit-all):**

1. ⬜ **Job Alerts** — subscribe-to-a-tag-and-get-notified. Jobs board is live; the *alert* layer isn't.
2. ⬜ **Resume builder** — not built for any audience.
3. ⬜ **Goals helper** — exists only inside the Arts studio and grants tools, not as a user-facing coach.
4. ⬜ **Event RSVP / sign-up** — businesses can *create* events, and events *display*, but users can't RSVP yet.
5. 🟡 **True in-app messaging** — there's a provider message endpoint and a unified inbox, but no general person-to-person threads.
6. 🟡 **Universal landing-page builder** — pieces exist (provider card, arts studio page, onboarding), but not one "any audience builds a taggable page" flow.
7. 🟡 **Notification triggers** — the notification system (bell, inbox, unread counts) is live, but today only the Welcome Board fires notifications. Most events don't yet.

These seven are the highest-leverage items because fixing one helps all five audiences at once.

---
## 1. NEWCOMER journey

*Who they are:* Just moved to Anna (or about to). They don't know anyone, don't know what's real, and are overwhelmed. The whole point is to replace the noisy Facebook-group / Google-search scramble with one vetted, warm front door.

*Intended impact:* "In my first week I felt welcomed, I found trustworthy people and places, and I already did something in the community."

| # | Journey step | What it should feel like | Where it lives today | Status |
|---|---|---|---|---|
| 1 | Arrive at the front door | Six audience doors + welcome film; instantly "this is for me" | `/` (six-door film home) | ✅ Live |
| 2 | Create profile / account | Fast, warm sign-up as a New Resident | Sign-up + roles + `/settings` | ✅ Live |
| 3 | Questionnaire | Jotform-style intake that captures needs → tags | `/onboarding`, `/new-resident-onboarding`, deep intake | ✅ Live |
| 4 | Match Maker | Tags instantly route them to matching vetted businesses | `/dashboard` + `/api/matches` | ✅ Live |
| 5 | Welcome Board hello | A real human/greeter waves back; SLA-tracked | `/welcome-board` (+ notification fires) | ✅ Live |
| 6 | Tour the app | Guided "here's what you can do" | Home + welcome-door tours | ✅ Live |
| 7 | Tour Anna | Learn the town, landmarks, history | `/welcome/[door]`, growth & history content | ✅ Live |
| 8 | Ask Sierra | A friendly AI concierge answers anything local | `/hey-anna` + `/api/sierra/ask` | ✅ Live |
| 9 | Find businesses | Browse the vetted directory | `/directory`, `/directory/[id]` | ✅ Live |
| 10 | See their matches | The businesses that fit their tags | `/dashboard` newcomer view | ✅ Live |
| 11 | Welcome offers | First-week deals from local businesses | `/offers`, `/newcomer/deals` | ✅ Live |
| 12 | Find events | A real calendar they can filter by day | `/what2do` (clickable calendar) | ✅ Live |
| 13 | Surveys / "Survey Says!" | Trivia where every answer is a real local business | `/survey-says` + `/api/surveys` | ✅ Live |
| 14 | News | Local, verified news + school news | `/news` | ✅ Live |
| 15 | Find help (nonprofit) | Get connected to services when they need them | `/nonprofit`, `/opportunity-center` | ✅ Live |
| 16 | Community photo / gallery | Share a photo, feel part of it | `/gallery`, `/billboard` | ✅ Live |
| 17 | Stories & Kind Deeds | Read and feel the good in town | `/stories`, `/kind-deeds` | ✅ Live |
| 18 | Magazine | Discover Anna LIFE | `/magazine` | ✅ Live |
| 19 | Digital contact card | Share who they are with new neighbors | `/card/manage`, `/card/[slug]` | ✅ Live |
| 20 | Apply for jobs | Find and apply to local jobs | `/help-wanted` + `/api/jobs` | 🟡 Partial — board is live; in-app *apply* + tracking thin |
| 21 | Sign up to vote / civic | Register-to-vote / civic prompts | civic prompts in content | 🟡 Partial — informational, no real registration handoff |
| 22 | Notifications | Get pinged when something relevant happens | bell + `/api/notifications` | 🟡 Partial — only Welcome Board fires today |
| 23 | In-app messages | Message a business or neighbor | provider message + inbox | 🟡 Partial — no true person-to-person threads |
| 24 | Goals helper | "Here's your first-30-days plan" | — | ⬜ Missing |
| 25 | Job alerts | "Tell me when a job like X appears" | — | ⬜ Missing |
| 26 | Resume | Build a resume to apply locally | — | ⬜ Missing |
| 27 | RSVP to an event | Reserve a spot, get a reminder | — | ⬜ Missing |

**Newcomer readiness verdict:** 🟢 **Strong.** The core welcome-and-match arc (steps 1–19) is genuinely built and real. The gaps are the "take action / stay engaged" layer: jobs-apply, alerts, RSVP, goals, resume, and richer notifications.

---

## 2. RESIDENT journey

*Who they are:* Already settled, but wants to belong, contribute, and get value. Everything a Newcomer has, **plus** the ability to give back and step into creator/civic roles.

*Intended impact:* "I'm not just living here — I'm shaping it: nominating good people, volunteering, contributing to the magazine, and getting local perks."

| # | Journey step | What it should feel like | Where it lives today | Status |
|---|---|---|---|---|
| 1 | Everything in the Newcomer journey | Full access to match/find/ask/events/etc. | (see Newcomer) | ✅ Live |
| 2 | Promos & deals | Ongoing local deals, not just welcome offers | `/offers`, `/my-deals` | ✅ Live |
| 3 | Kind Deed nomination | Nominate a neighbor / business for recognition | `/kind-deeds` | ✅ Live |
| 4 | Press Pass application | Apply to contribute to the magazine | `/magazine/contribute/apply` | ✅ Live |
| 5 | Artist application | Step into the Arts wing as a creator | `/arts` + studio onboarding | ✅ Live |
| 6 | Community photo upload | Add to the shared gallery | `/gallery` | ✅ Live |
| 7 | Story upload | Share their Anna story | `/stories`, `/annas-growing`, `/submit-growth` | ✅ Live |
| 8 | Sign up: vote / library / volunteer | Civic + community sign-ups | civic content + `/opportunity-center` | 🟡 Partial — volunteer intake exists; vote/library informational |
| 9 | Digital contact card | Shareable identity | `/card/manage` | ✅ Live |
| 10 | Volunteer at a nonprofit | Pick an opportunity and sign up | `/opportunity-center`, `/api/roles/opportunities` | 🟡 Partial — opportunities exist; one-click volunteer sign-up thin |
| 11 | Notifications / alerts sign-up | Choose what to be alerted about | bell + notifications | 🟡 Partial — no preference/subscribe UI |
| 12 | Goals / job alerts / resume / RSVP | Same action layer as Newcomer | — | ⬜ Missing |

**Resident readiness verdict:** 🟢 **Strong on contribution, thin on subscriptions.** The "give back / become a creator" paths (nominate, press pass, artist, stories, photos) are real. What's missing is the opt-in engagement layer (alert preferences, one-click volunteer/RSVP) and the shared action tools.

---
## 3. BUSINESS OWNER journey

*Who they are:* A vetted local business (sourced via the Chamber directory). They pay the **$150 profile setup fee**, then run on the **token economy** (10 tokens for $10) to pay for ads, featured listings, and pay-per-lead matches.

*Intended impact:* "I set up once, I show up in front of the exact newcomers who need me, and every dollar I spend is a traceable local lead — not wasted reach."

| # | Journey step | What it should feel like | Where it lives today | Status |
|---|---|---|---|---|
| 1 | Profile + digital card | Guided setup, shareable business card | `/dashboard/provider/setup`, `/dashboard/provider/card` | ✅ Live |
| 2 | Tour the dashboard | "Here's how you win here" | provider dashboard | ✅ Live |
| 3 | Meet Sierra (for business) | AI growth coach for their listing | `/hey-anna` + provider context | ✅ Live |
| 4 | Welcome offers | Publish a first-week newcomer offer | `/offers`, care-package tools | ✅ Live |
| 5 | Promos / deals page | Ongoing deals | `/dashboard/provider` deals | ✅ Live |
| 6 | Leads Finder | See the tag-matched leads sent to them | `/api/leads` | ✅ Live |
| 7 | Tokens | Buy/spend 10-for-$10, see history | `/dashboard/provider/tokens` (+ history) | ✅ Live |
| 8 | List events | Publish an event (costs 10 tokens) | `/api/events/create` | ✅ Live |
| 9 | Reports | See stats on their listing/leads | `/api/providers/stats` | ✅ Live |
| 10 | Magazine ads / sponsor | Advertise in Anna LIFE | `/dashboard/provider/magazine`, production ads | ✅ Live |
| 11 | Care package | Bundle a newcomer welcome gift | `/dashboard/provider/care-package` | ✅ Live |
| 12 | Testimonials | Collect social proof | `/api/providers/*/testimonial` | ✅ Live |
| 13 | List products | Sell products in-app | Arts studio products (arts only) | 🟡 Partial — real for artists; general product listing thin |
| 14 | List services | Publish service menu | provider profile | 🟡 Partial |
| 15 | List jobs | Post a local job | `/api/jobs` + `/help-wanted` | 🟡 Partial — jobs exist; owner self-serve post flow thin |
| 16 | In-app messenger | Talk to leads/customers | provider message endpoint | 🟡 Partial — endpoint only, no full thread UI |
| 17 | Offer URL for parsing | Paste a site URL, app pulls their info | — (site wizard concept) | 🟡 Partial / ⬜ |
| 18 | Create in-app page / Site Wizard / Website Builder | Build a landing page without a website | onboarding + arts card pieces | ⬜ Missing (as a unified builder) |
| 19 | Goals | Growth goals coached by Sierra | Arts studio goals only | ⬜ Missing (for general business) |
| 20 | Marketing boost / content creator / bio maker / article maker | AI content tools to promote themselves | Sierra + magazine tools (partial) | 🟡 Partial |
| 21 | Cross-sell: Silo Reports / TownSquareApps / Slidersss / Store Integrator | "Grow beyond Anna" upsells | referenced in Bring-to-your-town | 🟡 Partial — referenced, not full flows |

**Business Owner readiness verdict:** 🟢 **The money engine is real.** Setup, digital card, leads, tokens, events, reports, magazine ads, care packages — all live. The gaps are the *self-serve growth studio*: a real page/site builder, self-serve product/service/job posting, full messaging, and the goals + AI-content tools that make Sierra a true growth coach.

---

## 4. NONPROFIT journey

*Who they are:* Local mission organizations that need volunteers, visibility, funding, and a way to receive people who need help.

*Intended impact:* "Newcomers who need help find us, residents who want to give find us, and we have a real cockpit for grants and cases — not a static listing."

| # | Journey step | What it should feel like | Where it lives today | Status |
|---|---|---|---|---|
| 1 | Nonprofit profile / org page | A real presence in the app | `/nonprofit` + `/api/nonprofit/orgs` | ✅ Live |
| 2 | Be findable as "help" | Newcomers/residents get routed here | `/opportunity-center`, `/nonprofit` | ✅ Live |
| 3 | Intake / cases | Receive and manage people needing help | `/opportunity-center` (cases/intake/referrals/brief) | ✅ Live |
| 4 | Grants station (Ophelia) | AI grant strategist + funding cockpit | `/grants` + `/api/grants` | ✅ Live |
| 5 | Ask Sierra | AI help for the org | `/hey-anna` | ✅ Live |
| 6 | Understand EDC | See how they fit the local economy | EDC content | ✅ Live |
| 7 | Receive volunteers | Residents sign up to help | `/api/roles/opportunities` | 🟡 Partial — opportunities exist; volunteer match loop thin |
| 8 | Digital / contact card | Shareable org card | (uses card system) | 🟡 Partial — not tailored for orgs |
| 9 | Landing page for tagging | Taggable page so matches route in | nonprofit page (not builder-driven) | 🟡 Partial |
| 10 | Events | Publish volunteer/fundraiser events | events system | 🟡 Partial — shares business event flow |
| 11 | Magazine submission + notifications | Submit stories, get notified | `/magazine/contribute` | 🟡 Partial — submit yes, notifications thin |
| 12 | Volunteer notifications / messaging | Reach volunteers directly | notifications + inbox | 🟡 Partial |
| 13 | Goals / job alerts / resume | Shared action tools | — | ⬜ Missing |

**Nonprofit readiness verdict:** 🟡 **Solid backbone, needs the two-way loop.** The heavy lift — org pages, intake/cases, and the Ophelia grant cockpit — is genuinely built. What's thin is the *volunteer two-way loop* (sign up → notify → message) and nonprofit-tailored cards/pages/events.

---
## 5. ADMIN experience (the app's internal tooling — not a human login)

*Reframed per your decision:* Chamber, City Council, EDC, City Manager, and Mayor are **not** people who log in. These dashboards are **the app working on its own behalf** — fact-checking, running events, producing the magazine, and capturing the data/analytics that prove the app drove Anna's economy. So this is scored as **one Admin experience** with internal "desks."

*Intended impact:* "From one place, the app can verify what's true, keep the content engine running, and produce hard proof — jobs applied for, jobs created, businesses opened, products sold, events created — that Welcome to Anna moved the local economy."

| # | Internal desk / function | What it's for | Where it lives today | Status |
|---|---|---|---|---|
| 1 | Admin command center | The 18-tab control room | `/dashboard/admin` | ✅ Live |
| 2 | Users & providers oversight | See/manage residents and businesses | `/api/admin/users`, `/api/admin/providers` | ✅ Live |
| 3 | Activation / funnel analytics | The "Anna 10" activation funnel | `/api/analytics/track`, `/api/analytics/containers` | ✅ Live |
| 4 | Growth stories / banners | Curate the growth narrative | `/api/admin/growth-stories`, `/api/admin/banners` | ✅ Live |
| 5 | Fact-check / unanswered intros | Keep the welcome promise honest | `/api/admin/unanswered-intros`, welcome SLA | ✅ Live |
| 6 | Phantom / command tools | Seed & steer the ecosystem | `/api/admin/phantom`, `/api/admin/command` | ✅ Live |
| 7 | EDC command center | Economic-development cockpit | `/edc` (boardroom/incentives/signals/…) | ✅ Live |
| 8 | Citynest (council/manager desk) | Directives, early-warning, packets | `/citynest` | ✅ Live |
| 9 | Chamber / municipality desks | Chamber + city data views | `/dashboard/chamber`, `/dashboard/municipality` | ✅ Live |
| 10 | Magazine production engine | Ads, assets, newsroom, payouts, QA, new-city | `/dashboard/admin/production/*` | ✅ Live |
| 11 | Notifications system | Fire pings across the app | `/api/notifications` + bell | 🟡 Partial — live but few triggers wired |
| 12 | **Economic-impact proof report** | *One* unified view: jobs applied, jobs created, businesses opened, products sold, events created | pieces scattered across analytics/EDC | 🟡 Partial — **the headline gap** |

**Admin readiness verdict:** 🟢 **Very built-out — but the proof isn't yet in one place.** Every internal desk exists. The single most valuable next step for your B2G pitch is a **unified Economic-Impact report** that rolls up the five proof metrics (jobs applied for, jobs created, businesses opened, products sold, events created) into one screen the app can show the City of Anna.

---

## Readiness scorecard (roll-up)

| Audience | Core experience | Verdict | The one thing to build next |
|---|---|---|---|
| **Newcomer** | Welcome + match + discover | 🟢 Strong | Action layer: job-apply + RSVP + alerts |
| **Resident** | Contribute + civic | 🟢 Strong | Alert/subscribe preferences + one-click volunteer |
| **Business Owner** | Setup + leads + tokens | 🟢 Money engine real | Self-serve page/site builder + product/service/job posting |
| **Nonprofit** | Org + cases + grants | 🟡 Solid backbone | Volunteer two-way loop (sign-up → notify → message) |
| **Admin (tooling)** | Verify + run + measure | 🟢 Very built | **Unified Economic-Impact proof report** |

---

## Recommended build order (highest leverage first)

These are ordered so each item helps the most audiences and moves the economic-development thesis forward. **Nothing here is built yet — this is the proposed plan for your approval.**

1. **Unified Economic-Impact report (Admin)** — the proof screen for the City pitch. Rolls up jobs applied/created, businesses opened, products sold, events created.
2. **Event RSVP / sign-up (all audiences)** — closes the loop between "businesses create events" and "people show up," and every RSVP is a data point for #1.
3. **Notification triggers (all audiences)** — wire the already-live notification system to fire on matches, messages, events, magazine, volunteering.
4. **Job alerts + in-app apply/track (Newcomer/Resident)** — turns the jobs board into measurable economic activity.
5. **Volunteer two-way loop (Nonprofit + Resident)** — sign up → notify → message.
6. **Universal landing-page builder (all)** — one "build a taggable page" flow that serves business, nonprofit, and creator alike.
7. **Goals helper + resume builder + Sierra growth coaching** — the personal-growth layer.

---

### How I suggest we proceed

This document is the map — it doesn't change anything in the live app. Tell me which row(s) you want to turn from 🟡/⬜ into ✅ first, and I'll build them one slice at a time so Anna stays live and stable the whole way. My recommendation is to start with **#1 (the Economic-Impact proof report)** because it's the piece that turns everything already built into a story you can sell to the City. 🤍
