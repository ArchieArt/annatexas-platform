# TRADE SECRET SCHEDULE & CONFIDENTIAL KNOW-HOW REGISTER

**Town Square Apps, LLC — "Welcome to Anna" / AnnaTexas.org Platform**

**Owner / Custodian:** Aubre' Murphy
**Document status:** CONFIDENTIAL — TRADE SECRET — DO NOT DISTRIBUTE
**Date of record:** July 18, 2026
**Version:** 1.0

---

## IMPORTANT — READ FIRST

This is an **internal confidential inventory** of the proprietary information you treat as trade secrets. It is technical and business documentation to help you organize your IP — **it is not legal advice.** A trade secret only stays protected while it is (a) genuinely secret, (b) commercially valuable *because* it is secret, and (c) protected by reasonable safeguards. Please review this register with a licensed IP attorney before relying on it in any filing, sale, NDA, or dispute.

**How this differs from your patent:** Your provisional patent *publicly discloses* the inventions to claim them. A trade secret is the opposite — it is protected only by keeping it **secret**. The two strategies overlap but pull in opposite directions, so the columns below flag which items are **also** disclosed in your patent (patent-facing) versus items you should keep **secret** (trade-secret-facing). Discuss any item marked "OVERLAP" with your attorney — you generally cannot both patent and trade-secret the exact same detail.

**Legend:**
- `[BUILT]` — implemented and running in the live platform today.
- `[PARTIAL]` — partially implemented; core exists, refinements planned.
- `[PLANNED]` — designed / specified but not yet built.
- **Where it lives** — the internal file/subsystem custodian, so the secret can be located and access-controlled.

---

## SECTION A — SCHEDULE OF TRADE SECRETS

### 1. Tag Taxonomy & Question-to-Tag Mapping  `[BUILT]`
**What it is:** The exact controlled vocabulary of category tags, the master list of onboarding questions, and the precise rule that maps each questionnaire answer to one or more tags. The *structure* of tag families and any per-tag weighting or priority ordering.
**Why it's a secret:** This mapping is the raw fuel of the matching engine. A competitor who copied the questions would still not know how answers convert into routable tags. This is core know-how, not visible from the UI.
**Where it lives:** Onboarding questionnaire definitions + tag-derivation logic; tag constants/enums in the platform's shared library.
**Patent overlap:** OVERLAP — the *concept* of tag-driven routing is disclosed in the patent; the *specific taxonomy and mapping table* is kept secret. Keep the actual tag list out of any public filing.
**Protection priority:** HIGH.

### 2. Matching Algorithm & Scoring Formula  `[BUILT]`
**What it is:** The exact business-ranking computation — the tag-overlap score, its normalization, and the paid-tier weighting multipliers that let paying businesses rank above free listings, plus any tie-breakers and thresholds.
**Why it's a secret:** This is how you decide *who gets seen first*. The specific multipliers and normalization are your competitive ranking moat.
**Where it lives:** The matching library (`lib/matching.ts`).
**Patent overlap:** OVERLAP — the method (overlap-based scoring with paid-tier weighting) is claimed in the patent; the exact multiplier values and tuning constants stay secret.
**Protection priority:** HIGH.

### 3. Token Economy Rules  `[BUILT]`
**What it is:** Exact token pricing, the token cost charged per lead type, gifting rules and limits, and the balance-enforcement logic (including what happens when a business runs out of tokens mid-lead).
**Why it's a secret:** These economics are the revenue engine. Competitors seeing the app cannot see the internal decrement rules, per-lead pricing tiers, or enforcement path.
**Where it lives:** Lead delivery + token routes (`app/api/leads/`, `app/api/tokens/gift/`) and token-balance logic.
**Patent overlap:** OVERLAP — the token-metered pay-per-lead *mechanism* is claimed; the exact prices, per-lead costs, and gift limits stay secret and are also easy to change over time.
**Protection priority:** HIGH.

### 4. AI Agent System Prompts & Scoring Rubrics  `[BUILT]`
**What it is:** The full system prompts, personas, guardrails, and internal scoring/quality rubrics for your AI assistants (e.g., Sierra Grace, Ophelia) and any editorial or grant-matching logic they run.
**Why it's a secret:** Prompts and rubrics are extremely high-value and are essentially invisible to users. They are also NOT disclosed in your patent, so they are pure trade secret.
**Where it lives:** AI assistant libraries (`lib/sierra.ts`, grant-match / editorial logic) and any prompt/config constants.
**Patent overlap:** NONE — keep fully secret. Never paste full prompts into public docs, marketing, or filings.
**Protection priority:** VERY HIGH.

### 5. Economic-Impact Calculation Methodology  `[BUILT]`
**What it is:** The precise method for counting "verified businesses," excluding seed/demo records, defining time windows, and computing local dollars moved / community impact — including the methodology notes and any adjustment factors.
**Why it's a secret:** This is the exact thing you sell to the City. The number is only credible because the methodology is rigorous — and only defensible if the method is yours.
**Where it lives:** Economic-impact route (`app/api/admin/economic-impact/`).
**Patent overlap:** OVERLAP — the impact-reporting *engine* is claimed; the exact formulas, exclusion rules, and weighting stay secret. This is also part of your B2G pitch (see #12).
**Protection priority:** VERY HIGH (this is what you're selling).

### 6. Vetted Business Directory Logic  `[PARTIAL]`
**What it is:** The criteria and step-by-step process for vetting and approving a business (Chamber-of-Commerce sourcing, verification steps, approval thresholds), plus relationship data about which businesses are real, active, and in good standing.
**Why it's a secret:** "Vetted" is your promise and your moat. The vetting *process* and the relationship data are hard to replicate.
**Where it lives:** Business onboarding/approval flow + verification records.
**Patent overlap:** LOW — the concept of a gated vetted directory is disclosed; the operational vetting checklist and Chamber relationships stay secret.
**Protection priority:** HIGH.

### 7. Multi-Tenant Inheritance Rules  `[BUILT]`
**What it is:** The specific logic by which a master town configuration cascades to child towns — what is inherited by default, what can be overridden, and how an active town is selected at deployment.
**Why it's a secret:** This is the mechanics of your white-label / clone-to-any-town product. It's how you scale to new cities cheaply.
**Where it lives:** Town configuration library (`lib/town-config.ts`, `lib/town-doors.ts`, `TownDoor` model).
**Patent overlap:** OVERLAP — the inheritance *method* is claimed; the exact config schema and override rules stay secret.
**Protection priority:** HIGH.

### 8. Verification Ladder Details  `[BUILT]`
**What it is:** The exact criteria and evidence requirements for each verification level, and how each level maps to role-based access and platform privileges.
**Why it's a secret:** The specific evidence bar per level is your trust infrastructure and anti-fraud design.
**Where it lives:** `VerificationLevel` enum + `UserRoleAssignment` model and role-gating logic.
**Patent overlap:** LOW-OVERLAP — membership/role verification is disclosed generally; the per-level evidence requirements stay secret.
**Protection priority:** MEDIUM-HIGH.

### 9. Gamified Survey ("Survey Says!") Mechanics  `[BUILT]`
**What it is:** How survey options are drawn from verified businesses, how answers auto-generate leads, deduplication rules, winner thresholds, and the token/badge reward distribution logic.
**Why it's a secret:** The exact thresholds and dedup rules are the gamification engine that quietly drives leads to businesses.
**Where it lives:** Survey vote route (`app/api/surveys/[id]/vote/`) — includes winner threshold and reward constants.
**Patent overlap:** OVERLAP — the gamified-survey-to-lead mechanism is claimed generically; the exact thresholds, reward amounts, and dedup rules stay secret.
**Naming caution:** "Survey Says!" echoes a well-known game-show mark — treat the public name separately from the protected mechanics; consider a distinct product name.
**Protection priority:** MEDIUM-HIGH.

### 10. Data Models & Non-Obvious Business Logic  `[BUILT]`
**What it is:** The custom data structures, relationships, and rules that are not visible from the UI — especially the non-obvious ones that encode how the whole ecosystem fits together (~130+ models).
**Why it's a secret:** The schema is the blueprint of the system. Custom relationships and constraints represent years of design decisions.
**Where it lives:** The platform data schema and shared type definitions.
**Patent overlap:** LOW — general architecture is disclosed; the full schema stays secret.
**Protection priority:** MEDIUM.

### 11. Internal Scoring & Ranking Systems  `[BUILT]`
**What it is:** Any hidden scoring used for recommendations, prioritization, featured placement, or ordering beyond the primary match score — e.g. earned-ranking signals for businesses.
**Why it's a secret:** Hidden ranking signals are a classic competitive advantage (same reason search engines guard ranking factors).
**Where it lives:** Ranking/earned-reputation logic across matching and directory subsystems.
**Patent overlap:** LOW-OVERLAP — earned ranking is mentioned; the exact signals and weights stay secret.
**Protection priority:** MEDIUM-HIGH.

### 12. City / Municipal (B2G) Pitch Materials & Methodology  `[PARTIAL]`
**What it is:** The specific methodologies, calculation methods, ROI models, and slide/deck assets shown to cities and chambers to justify buying the platform as a white-labeled municipal tool.
**Why it's a secret:** This is your sales weapon. The narrative + the impact math together are what close a B2G deal.
**Where it lives:** Pitch decks, economic-impact methodology (#5), and B2G proposal documents.
**Patent overlap:** LOW — keep the methodology and pricing secret; NDA before showing to any city or chamber.
**Protection priority:** HIGH.

### 13. Other Proprietary Processes & Know-How
**Items to include here:**
- **Zero-commission arts money-model** — the multi-bucket revenue split logic for artists/creatives (`lib/arts/money-model.ts`). `[BUILT]` — keep the split rules and rationale secret.
- **Grant-matching logic** — how grants are matched to organizations (`lib/grant-match.ts`, Ophelia Grant Station). `[BUILT]`.
- **City command-center logic** — the Citynest municipal dashboard methodology (`lib/citynest.ts`). `[BUILT/PARTIAL]`.
- **Onboarding-to-lead automation timing** — the sequencing/triggers that turn a new resident's answers into live business introductions. `[BUILT]`.
- **Seed/demo data separation rules** — how demo records are flagged and excluded from real metrics (ties to #5). `[BUILT]`.
- **Pricing evolution & discount rules** — any non-public pricing, founder/charter-member deals, or Chamber partnership terms. `[BUSINESS]`.

---

## SECTION B — REASONABLE PROTECTION MEASURES (checklist)

A trade secret is only legally protectable if you take **reasonable steps** to keep it secret. Track these:

- **NDAs** signed before disclosure to: contractors, potential buyers, city/chamber partners, investors, any AI/dev help.
- **Access control** — least-privilege logins; production code, prompts, and formulas restricted to you (and any bound-by-NDA collaborators).
- **Marked CONFIDENTIAL** — this register and all pitch/methodology docs carry a confidentiality legend (they do).
- **Secrets out of the codebase's public surface** — no keys, prompts, or formulas in client-side code or public repos; environment variables for anything sensitive.
- **Onboarding/offboarding** — collect credentials and confirm return/deletion of confidential material when anyone stops working with you.
- **Separation from patent filings** — keep trade-secret specifics OUT of the public provisional/non-provisional text (see OVERLAP flags above).
- **Record of independent development** — keep dated records (this document, your invention disclosure, git history) proving you created these.

---

## SECTION C — PATENT vs. TRADE SECRET (quick decision guide)

| Keep as TRADE SECRET | Put in PATENT |
|---|---|
| AI system prompts & rubrics (#4) | The overall closed-loop system architecture |
| Exact scoring multipliers & constants (#2, #3, #9) | The *method* of tag-driven matching + token-metered leads |
| Economic-impact formulas & exclusions (#5) | The *concept* of an economic-impact proof engine |
| Vetting checklist & Chamber relationships (#6) | The gated, membership-verified contribution model |
| Full data schema (#10) | Novel structural innovations you want to claim |
| B2G pricing & pitch math (#12) | — |

**Rule of thumb:** If keeping it secret is realistic AND you'd rather not teach competitors how, trade-secret it. If it can be reverse-engineered from the running product, a patent may protect it better. Decide each item with your attorney.

---

*Prepared as confidential IP documentation support for Town Square Apps, LLC. Not legal advice. Review with a licensed patent/IP attorney before filing or disclosure.*
