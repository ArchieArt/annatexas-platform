# The Anna Artist Portal — Master Build Specification
### Mona Sierra Studio · annatexas.org · The source of truth for Abacus

*Version 1.0 — written to be handed directly to Abacus and built slice by slice. Nothing left behind for anyone to re-imagine. Every decision named. Every dollar accounted for. Honest about what is real and what is not yet built.*

---

## 0. Why this exists (the heart)

This platform is being built for real people, not personas:

- **The mail carrier** — 30 years on her Anna route, quietly photographing the best of her neighbors. Nobody has ever seen her work.
- **The art teacher** — lost her husband to a motorcycle accident, and finds her strength every day in the children she teaches.
- **The founder (Aubre')** — donated 400 paintings to families fighting cancer, lost her home in the process, and has fought so that artists can finally be seen — because the beauty inside a person is the whole reason talent must be witnessed.

These artists today have **no platform, no visibility, and no local demand** for their talent. The portal's job is therefore not just to *display* art. It must **manufacture visibility and manufacture demand** inside a small town that does not yet know it wants what these artists make.

**The founding promise, locked forever:** the platform (annatexas.org / Anna Arts Council) takes **0% of the artist's markup — ever.** The artist keeps every dollar above what iCandy Grafix charges to print. Revenue for the platform comes from elsewhere (subscriptions/tokens/sponsors), never from an artist's sale.

---

## 1. The philosophy — best of both worlds, then beyond

**Fine Art America** monetizes the *image* (upload once, sell many products, invisible fulfillment).
**Art Storefronts** commercializes the *storefront* (own your brand, capture the collector, convert with intelligence).

**Mona Sierra develops the *artist*.** She begins with the artist's identity, confidence, story, body of work, readiness, and possible income paths — then assembles the website, products, services, marketing, and collector journey *around that artist*.

The portal combines:

1. **FAA's operational simplicity** — upload once, generate many sellable formats, printing/shipping nearly invisible, instant mockups, searchable tags, a shared collective marketplace, low-risk entry.
2. **Art Storefronts' conversion intelligence** — branded collector experience, lead capture, full funnel tracking, room/AR previews, cart recovery, campaigns and follow-up, festival + online bridge, "what's working and what to do next."
3. **AnnaArtPro's education** — the readiness ladder and coaching baked in.
4. **Mona Sierra's personal guidance** — honest, never-invented, one small step at a time.
5. **Anna Arts Council's shared audience & credibility** — the collective the town trusts.
6. **iCandy Grafix's local production** — real prints, real Anna money staying in Anna.
7. **The artist's story as the center of everything.**

---

## 2. The money model — zero platform commission, told honestly

This is the part most platforms fudge. We will not.

### 2.1 The four buckets of every sale
Every buyer payment is split into named, auditable buckets:

| Bucket | Who it belongs to | Notes |
|---|---|---|
| **Print / production cost** | iCandy Grafix | Verified per-product cost. Never guessed. |
| **Artist earnings (markup)** | **The artist — 100%** | Platform takes **$0** of this. |
| **Shipping** | Carrier (pass-through) | Buyer-paid; never taken from artist markup. |
| **Sales tax** | State of Texas | Collected and remitted (see 2.3). |

**Buyer pays** = print cost + artist markup + shipping + tax.
**Artist receives** = the full markup. Always.

### 2.2 The one honest asterisk — payment processing
Payment processors (Stripe/PayPal) charge ~2.9% + $0.30 per transaction. This cannot be wished away. We will **not** silently skim it from the artist's markup. Instead, one of these explicitly-approved models funds it (Aubre' chooses):

- **Model A — Platform-absorbed (default):** the platform's *Artist Commerce Fund* covers processing. Truest to the "artist keeps everything" promise. Costs the platform per sale.
- **Model B — Buyer-paid service fee:** a small, clearly-labeled "secure checkout fee" line the buyer sees. Artist still keeps 100% of markup; platform still takes $0.
- **Model C — Hybrid:** platform absorbs on originals/small sales, buyer covers on print products.

> **Decision needed from Aubre':** pick A, B, or C. Until chosen, the build uses **Model A** and labels processing as a platform cost in the ledger.

### 2.3 Sales-tax compliance checkpoint (Texas)
Because annatexas.org would *operate the marketplace and process payments*, Texas may treat it as a **marketplace provider**, making the platform responsible for **collecting and remitting sales tax** on behalf of artists. This is built in as a compliance gate, not assumed away:

- Tax is calculated at checkout and held in a separate ledger bucket.
- A remittance report is generated for the platform's bookkeeper.
- **Decision/verification needed:** confirm marketplace-provider status with a Texas tax professional before real money moves. The system is built to comply either way (platform-remit or artist-remit toggle).

### 2.4 The Artist Earnings Ledger
Every artist has a running ledger: each order writes a row with all four buckets, the processing cost, and net-to-artist. Artists always see exactly what they earned and why. No mystery math.

---

## 3. The Artist Journey (end to end)

1. **Welcome & confidence** — warm onboarding; Mona meets the artist where they are ("I've never sold anything" is a valid starting point).
2. **Identity & story** — the Personal Branding questionnaire (already built). Mona helps *write*, never invents.
3. **Body of work** — upload artwork; each piece becomes an intelligent record.
4. **Readiness ladder** — choose income paths via checkboxes across 4 tiers (built).
5. **Products from one image** *(NEW — FAA layer)* — one upload → prints, canvas, metal, cards, etc., with live iCandy pricing and instant mockups.
6. **The living studio assembles** — public page builds beside the form in real time (built).
7. **The collector experience** *(NEW — Art Storefronts layer)* — room/AR preview, multiple sizes, lead capture, testimonials.
8. **Go live** — publish; get digital card + QR (built).
9. **Demand arrives** — newcomer matching, Survey Says! rounds, Anna Art Town, auto-spotlights.
10. **Grow** — Mona "Grow Your Business," analytics, campaigns, follow-up.
11. **Get paid** — checkout runs, iCandy prints, artist keeps 100% of markup, ledger updates.

---

## 4. The Buyer / Collector Journey

1. **Discover** — via Anna Art Town, a shared marketplace, a spotlight article, a QR at an event, or newcomer matching.
2. **Land** on the artist's branded studio page (story-first, not product-first).
3. **Imagine it** — room preview / AR wall visualization, size + material + framing options.
4. **Get captured (gently)** — optional email for "save this piece" / "notify me" — becomes an artist-owned lead.
5. **Decide** — clear pricing, multiple price points, testimonials, limited-time campaigns.
6. **Checkout** — Stripe/Apple Pay/Google Pay/PayPal; buyer sees the honest breakdown.
7. **Fulfillment** — iCandy prints/ships (or artist self-fulfills originals).
8. **Nurture** — thank-you, abandoned-cart recovery, "from the artist" follow-up, repeat-collector path.

---

## 5. Every page / screen

### Artist-facing
- `/arts/studio` — **Studio Builder** (built; extended): live split-screen builder + new tabs for Products, Storefront, CRM, Analytics, Grow, Marketing, Earnings.
- `/arts/studio/products` — one-image-to-many product configurator + iCandy live pricing + mockups.
- `/arts/studio/crm` — leads, collectors, follow-up.
- `/arts/studio/analytics` — funnel + per-artwork insights.
- `/arts/studio/grow` — Mona "Grow Your Business" + "Go for It" + "Market Boost."
- `/arts/studio/earnings` — the Artist Earnings Ledger.

### Public / collector-facing
- `/arts/studio/[slug]` — **living public studio page** (built; extended with product buy + AR + lead capture).
- `/arts/card/[slug]` — **digital artist card** (built).
- `/arts/[slug]/artwork/[pieceId]` — **artwork detail page** (NEW): full record, sizes/materials, room preview, buy.
- `/arts/town` — **Anna Art Town** (NEW): the shared marketplace/gallery of all Anna artists.
- `/arts/checkout` and `/arts/order/[id]` — checkout + order confirmation/tracking.

### Admin / council
- `/arts/council` (built) extended with: artist verification, iCandy product/cost catalog management, tax/remittance report, Artist Commerce Fund dashboard.

---

## 6. Mona's agent system (multi-agent, all honesty-locked)

All agents draft **only** from the artist's own words and real data. None invents facts, stories, prices, or results.

| Agent | Job | Source of truth |
|---|---|---|
| **Mona (Studio Guide)** | Warm coaching, writing help, next steps | Artist's own answers |
| **Story Agent** | Bio, statement, origin story drafts | Artist's own words only |
| **Product Agent** | Suggests which products/sizes suit a given image | Image + iCandy catalog |
| **Pricing Agent** | Honest markup guidance within mercy tier caps | iCandy cost + tier rules |
| **Grow Agent** | Realistic next-step recommendations | Artist's actual tier + inventory + analytics |
| **Market Boost Agent** | Ready-to-approve marketing copy/campaigns | Real artwork + real events |
| **Collector Agent** | Prioritizes likely buyers among *the artist's own visitors* | On-site behavior only (never "finds" strangers) |

> **Honest limit, stated plainly (as Art Storefronts' Art Buyer AI also admits):** the Collector Agent does **not** magically find unknown buyers elsewhere on the internet. It ranks people already visiting the artist's page. We will never claim otherwise.

---

## 7. iCandy Grafix fulfillment

- **Product & cost catalog** managed in admin: each product (paper, canvas, metal, acrylic, wood, cards, apparel) has a verified iCandy base cost + size matrix.
- **One image → many products:** artist positions the image once; the system generates sellable formats with live mockups.
- **Order routing:** print orders route to iCandy with the correct spec (DPI ≥ 300, per-sq-in $2 floor honored). Originals route to the artist for self-fulfillment.
- **Local-money loop:** production stays with iCandy in Anna TX — a selling point for the City/EDC pitch.

---

## 8. Pricing & checkout

- **Mercy tier caps** (locked): T1 < $100 (max 5 items, $10/mo), T2 < $250, T3 < $500, T4 < $1000.
- **Pricing modes:** fixed price, or cost + markup. Artist always sees their net.
- **Checkout:** Stripe primary; Apple Pay / Google Pay / PayPal supported. Buyer sees honest breakdown (print + artist + shipping + tax [+ processing per chosen model]).
- **Conversion tools:** room/AR preview, multiple sizes/materials, framing, promo codes, gift cards, limited-time campaigns, cart recovery, testimonials, mobile-first checkout, printable catalog/sales sheets for in-person selling.

---

## 9. CRM, marketing automation, analytics

- **CRM (artist-owned):** every lead/collector belongs to the artist, exportable, never sold.
- **Funnels:** visit → capture → browse → consider → buy → repeat, tracked end to end.
- **Automation:** welcome email, save-for-later, abandoned-cart recovery, post-purchase thank-you, re-engagement — all pre-drafted, artist-approved before sending.
- **Analytics:** views, card saves, QR scans, per-artwork attention, geography, funnel drop-off, likely-buyer ranking, sales & payout reporting.

---

## 10. Permissions & roles

- **ARTIST** role → studio builder, own CRM/analytics/earnings, publish control.
- **RESIDENT/newcomer** → browse, buy, get matched.
- **ADMIN/COUNCIL** → verification, iCandy catalog, tax/remittance, Commerce Fund, spotlights.
- All data APIs session-gated; artists see only their own leads/earnings.

---

## 11. Data model (additive to current Prisma schema)

Current models `ArtistStudioProfile` and `ArtworkPiece` stay. New additive models:

- **`ArtProduct`** — an iCandy product type: key, label, material, base cost matrix by size, active flag.
- **`ArtworkListing`** — links an `ArtworkPiece` to enabled products + per-product markup + pricing mode.
- **`ArtOrder`** — buyer, items, four-bucket amounts, processing cost, net-to-artist, status, fulfillment route.
- **`ArtOrderItem`** — artwork + product + size + qty + resolved costs.
- **`ArtLead`** — artist-owned collector/lead (email, source, behavior, status).
- **`ArtLedgerEntry`** — one row per money event; the Artist Earnings Ledger.
- **`ArtCampaign`** — limited-time promo (image, size, discount, qty, expiry).

All additive, non-destructive; no data loss. Slugs stay app-enforced unique.

---

## 12. Acceptance tests (definition of done, per capability)

- **Zero commission:** for any order, `net_to_artist == artist_markup` exactly. A test order proves the platform bucket on markup is $0.
- **Honest breakdown:** buyer sees all buckets; sum equals charge; no hidden skim.
- **One-image-to-many:** a single upload produces ≥3 sellable products with correct iCandy costs and mockups.
- **Fulfillment routing:** print order reaches iCandy spec; original routes to artist.
- **CRM ownership:** artist can export leads; another artist cannot see them.
- **Honesty lock:** Mona/agents never output a fact the artist didn't provide (spot-checked).
- **Ledger integrity:** ledger sum reconciles to processor payouts.
- **Tax gate:** tax computed and held; remittance report generates.
- **Accessibility:** every new screen works in Comfort Mode, mobile-first, warm + scannable.

---

## 13. Build order — small, confirmed slices (Aubre' picks one at a time)

Built so far: living studio page, artwork records, Mona writing help, readiness ladder, digital card + QR/vCard.

**Recommended next slices (one at a time, TBI-friendly):**

1. **Earnings Ledger + money model** — make the zero-commission promise real and visible first. *(Foundational; pick the processing model A/B/C.)*
2. **One-image-to-many products + iCandy catalog + mockups** — the FAA superpower.
3. **Artwork detail page + room/AR preview + buy button** — the collector experience.
4. **Checkout + orders + fulfillment routing** — real sales.
5. **CRM + lead capture + cart recovery** — Art Storefronts conversion machinery.
6. **Analytics (per-artwork + funnel).**
7. **Mona Grow / Go for It / Market Boost** (spec items 6–8).
8. **Anna Art Town** (shared marketplace) + auto-spotlights.
9. **Campaigns, gift cards, printable sales sheets, festival mode.**

---

## 14. Decisions I need from Aubre' before real money moves

1. **Processing model:** A (platform absorbs), B (buyer service fee), or C (hybrid)?
2. **Texas marketplace-provider status:** confirm with a tax pro (platform-remit vs artist-remit).
3. **iCandy catalog:** get the real product list + base costs from iCandy Grafix.
4. **Which slice first** (I recommend #1, the Earnings Ledger + money model).

*Everything above is the plan of record. Nothing is "live" until built and you deploy it. I'll build only the slice you name, then show you.* 🤍
