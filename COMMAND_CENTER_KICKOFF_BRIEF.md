# TownSquareApps — Command Center Kickoff Brief
### The Unified "Client-to-Build-Prompt" Engine for Town Square Apps, LLC

**Prepared for:** Aubre' Murphy
**What this is:** A paste-ready brief to start the new **TownSquareApps** project — the master dashboard that all your other apps point to. Copy this into a new project conversation (from your app management console) when you're ready to build it.

---

## The Vision in One Sentence

One dashboard where you create a client once, run the exact scans and reports you choose, and an engine turns everything it learns into a paste-ready build prompt for a brand-new custom app — personalized from what it knows about that business.

---

## The Core Principle: One Brain, Many Bodies

TownSquareApps is a **new, thin project** that all your existing apps point to. It does two things no single existing app does: it **unifies your data** (by sharing the databases of your apps) and it **orchestrates the workflow** (client → scans → build tools → prompt).

A shared database unifies your *data*, not your *code*. Reusing the best module from each app (instead of rebuilding) is a portfolio audit done during the build — that's what the Platform Capabilities Report is for.

---

## The Four-Phase Assembly Line

### Phase 1 — Create a Client
A single intake screen captures the full business profile and saves it as the permanent record everything else attaches to:
- Business name, website URL, phone, address
- Social media handles (Facebook, Instagram, and others)
- Industry, location(s)
- Owner name, email, and other contact details

This profile is the folder. Every scan, report, and build decision for this client lives inside it.

### Phase 2 — Select Scans & Reports → Build "The Mind"
Every scan and report you own is shown as its own **clickable tile with a checkbox**. You tick the ones you want for this client and run them. The results flow into **The Mind** — the single source of truth about this business.

The Mind is what powers every downstream question: what services they offer, their uniqueness, strengths, tone, audience, industry, competition, pain points, monetization, contact funnels, reviews, social presence, and more. (See the OPHELIA Client Intelligence Engine document for the full catalog of what each scan captures.)

**Sources that feed The Mind:**
- SiloReport scans + its individual standalone reports
- AnnaTexas demographics / audience intelligence + business-profile tiles
- Any new scans/reports you add over time

### Phase 3 — Select Build Tools & Features
A second library of tiles — but these are the **building blocks themselves**: the features, tools, and commands you've actually used to build your Abacus apps. Each tile shows its **name, description, and purpose**. You select the ones that belong in this client's build.

Examples of tools in this library:
- Intelligent invoicing
- Project milestones / timelines
- Online booking & scheduling
- Email capture / newsletter funnels
- Business-profile tiles / directory
- Token / billing systems
- Analytics dashboards
- AI assistant persona

**This library is your moat.** It's the catalog of what *you* have personally learned to ship on Abacus. Every time you build a client app, the winning modules feed back into this library — so every future build gets faster and smarter.

### Phase 4 — Generate the Build Prompt
The engine writes the full command prompt for the new app or website — the one you paste into a fresh Abacus app to build. It's structured as a checklist that covers:
- Everything needed to **begin** the build
- How to **customize** it for this specific client
- Which **tools to implement** (everything selected in Phase 3)
- **Personalization pulled from The Mind** (Phase 2) — the client's real services, tone, audience, and gaps

You copy that prompt, open a new Abacus app, paste it, and the build begins — pre-loaded with everything true about the client and everything you know how to build.

---

## What Each App Contributes

| App | What it brings to TownSquareApps |
|---|---|
| **SiloReport** | The scan engine + individual standalone reports — the raw intelligence that fills The Mind. |
| **AnnaTexas.org** | The demographics/audience engine, analytics dashboards, and the business-profile tiles you love. |
| **Slidersss** | The presentation builder — turns a build into client-facing deliverables (invoicing, milestones, pitch decks). |
| **TownSquareApps (new)** | The client intake, the scan/report picker, The Mind, the Tool Library, and the build-prompt generator. |

---

## How It Connects (the technical ask for the new project)

- Start it as its **own new project** (named TownSquareApps), so no existing app is put at risk — AnnaTexas.org especially, with the Mayor demo on the line.
- Wire it to **share the databases** of SiloReport, AnnaTexas, and Slidersss (read access to their data).
- **Reuse, don't rebuild:** the scan engine (SiloReport), the demographics engine + profile tiles (AnnaTexas), the presentation builder (Slidersss). The Platform Capabilities Report is the map of what already exists.
- Add only what's genuinely new: the client intake, the scan/report picker, The Mind, the Tool Library, and the build-prompt generator.

---

## The Honest Boundary

SiloReport's actual source code and the exact AI training for OPHELIA/JULIETTE live inside the SiloReport workspace. TownSquareApps connects to SiloReport's *data and reports* through the shared database — it doesn't need SiloReport's source code to use its output. When it's time to fine-tune how the engine speaks in OPHELIA's voice, that detail comes from the SiloReport conversation.

---

## The SILO Framework (The Diagnostic Doctrine)

SILO is not a single product — it is the four-lens diagnostic every client is examined through. Each lens maps to a different buyer emotion, which is what makes it a repeatable consulting engine, not a report generator.

| Lens | What it examines | Buyer emotion |
|---|---|---|
| **S — Security** | Vulnerability analysis of the website; the Threat Matrix scan; risk posture. | Fear |
| **I — Intelligence** | What AI/automation exists today; their readiness; what AI tools exist or are normal in their industry; automation opportunities. | Ambition |
| **L — Leads** | Traffic, audience, audience pain-points, ways to generate new leads, where leads are NOT being captured, lead loyalty, lead demographics, the customer journey, products, monetization, competitive analysis of how competitors monetize, contact, onboarding. | Growth |
| **O — Operations** | Sales funnels, marketing, advertising, revenue, social media, content, branding. | Control |

When presenting to a client (e.g. the doctor friend), you don't pitch features — you walk them through these four lenses on their own business.

---

## The Six-Step Process (OPHELIA's Orchestration)

This is the proprietary framework OPHELIA runs inside TownSquareApps. The sequencing matters: truth before invention.

1. **Assess what exists now.** Onboard the client (Phase 1) → run selected SILO scans + AnnaTexas data → pull assets (site text, images, social) with consent.
2. **Identify pain-points, goals, audience, competitors.** Analyze assets against industry + North Texas benchmarks; map audience personas and competitor gaps.
3. **Gather & organize assets into The Mind.** Scrape/upload site, social, testimonials, reports, images, logo; store in the Client Profile for retrieval.
4. **Match to system capabilities.** Review the Build Library (proven, reusable tools) → identify fits and gaps.
5. **Solve problems & invent uniqueness.** OPHELIA *proposes* differentiated feature ideas tied to the business's tone and strengths — **you decide.** This step is human judgment amplified, not automated.
6. **Build overview, phases, prototype.** Generate the project brief (phases, timeline, ROI), the paste-ready Abacus build prompt, and initial prototype scaffolding.

**Honesty rule baked into the engine:** signals that cannot be truthfully scraped (live traffic, real lead counts, competitor internals) are either sourced from client-granted access or clearly labeled as *estimates* (e.g. "estimated traffic band: low/medium/high"). The engine never prints false precision — credibility in the pitch is the asset being protected.

---

## Related but Separate: The AnnaTexas Storefront

Distinct from TownSquareApps (which is *your* private consultant's cockpit) is the **"Grow With Us" storefront** inside AnnaTexas.org business dashboards — where local businesses can request to: build a Slider, hire you to analyze their SILO, hire you to build a website/app, or hire your marketing agency. That's the front door that generates leads; TownSquareApps is the workshop where you fulfill them. Two different rooms, both on the roadmap.
