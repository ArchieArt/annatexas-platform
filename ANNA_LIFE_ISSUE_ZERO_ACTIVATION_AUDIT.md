# ANNA LIFE — Issue Zero Activation Audit

**Read-only pre-activation audit for Publisher review. Nothing was activated, invited, charged, populated, or gated.**

- Tenant: `anna-tx` (tenantId `cmrm6dgy80000pnvcf7439c7l`)
- Issue: `ANNA-LIFE-ISSUE-ZERO` (issueId `cmrm6dgzu000gpnvcd60ykh96`) — title "ANNA LIFE — Issue Zero"
- Issue status: **DRAFT** (unchanged)
- Audit checkpoint taken before this run: `before-issue-zero-activation-audit`
- Audit type: READ-ONLY. Queries used only `count` / `groupBy` / `findMany`. No writes, no invitations, no payment calls, no release-gate change.
- Reminder on terminology: **frames are layout containers; assignments are coherent editorial packages that may populate several linked frames.** No points are awarded for filling extra frames — points attach to a contribution scope/class, never to frame count.

---

## 1. Implemented-System Verification (evidence, not adjectives)

All numbers below are live counts from the production database for this issue, captured during this audit.

### 1.1 Page structure — 64 pages, correct order
- Persistent page records: **64** (`physicalPageCount` = 64; page rows = 64).
- Page-code order (verified exact):
  `C1, C2, P01..P60, C3, C4` — covers first/last, 60 printed interior pages in between. Matches the required flatplan order.
- Printed-page numbering: covers `C1/C2/C3/C4` carry `printedPage = null`; interior pages carry `printedPage = 1..60`.

### 1.2 Frame counts — 213 total / 183 non-ad / 30 paid-ad
- Total frame records: **213**
- `frameType = AD`: **30**  → paid-ad frames
- Non-ad frames: **183**
- Frame-type breakdown: TEXT 102, IMAGE 60, DATA 13, CAPTION 6, AD 30, LOGO 1, QR 1 (= 213).

### 1.3 Source-mode distribution — matches the required mix
| source_mode | frames |
|---|---|
| AUTO_POPULATED | **94** |
| MANUAL_PRESS_PASS | **82** |
| SIERRA_WRITTEN | **7** |
| PAID_UPLOAD (the 30 ad frames) | **30** |
| **Total** | **213** |

This confirms 94 auto + 82 human press-pass + 7 Sierra = 183 non-ad, plus 30 paid-upload ad frames = 213.

### 1.4 Provenance columns are fully populated (no nulls)
Null-count for each Phase 11 provenance column on all 213 frames:

| column | null count |
|---|---|
| source_mode | **0** |
| source_connector_key | **0** |
| selection_mode | **0** |
| contribution_class | **0** |
| revenue_share_eligible | **0** |

- `revenue_share_eligible = true`: **82** frames (exactly the human MANUAL_PRESS_PASS frames). All AUTO / SIERRA / PAID frames are correctly `false`.
- contribution_class distribution: EDITORIAL_STORY_OR_PHOTO 34, ADVERTISING_NO_SHARE 30, AUTO_OR_PROMOTIONAL_NO_SHARE 83, COVER_STORY 17, SPOTLIGHT_QUESTIONNAIRE 12, COMMUNITY_PHOTO 10, NON_HUMAN_OR_FEED_NO_SHARE 9, ARTIST_MARKETPLACE_NO_SHARE 9, PHOTO_ESSAY 5, COMMUNITY_LETTER_OR_PHOTO 3, LAST_LOOK_PHOTO 1.
- selection_mode distribution: VERIFIED_QUERY 92, EDITORIAL_SELECTION 66, PURCHASED_INVENTORY 30, CONTEST_OR_EDITORIAL_SELECTION 10, SURVEY_NUMBER_ONE_SELECTION 3, EDITORIAL_ROTATION 3, ELIGIBLE_CITY_LEADER_RANDOMIZER 3, MOST_ASKED_FREQUENCY 3, INVITATION_ONLY_RANDOMIZER 3.

### 1.5 Contribution-points policy
- Policy key `ANNA_LIFE_CONTRIBUTION_POINTS`, **version 1.0.0** (source of truth `config/CONTRIBUTION_POINTS_POLICY.yaml`, inlined in `lib/magazine/production/points-policy.ts`).
- Pool basis: 50% of net ad profit (`POOL_BASIS_POINTS = 5000`).
- Zero-point origins enforced in code: SIERRA_WRITTEN, AUTO_POPULATED, PAID_UPLOAD, and the four NO_SHARE classes. Only accepted + PUBLISHED + human original work earns points. Word count only selects a capped scope tier (padding cannot buy unlimited pay).

### 1.6 Routes / TOC / snapshot / financial authorization
- Clickable TOC + reader routes implemented: public `/life` reader and `/api/magazine/issue`; issue navigation is itself a connector-backed set of 8 frames on P02-P03 (`magazine.issue_navigation`).
- Production snapshot / release readiness implemented: `lib/magazine/production/release-qa.ts` (compileReleaseReadiness), route `/api/magazine/production/release-qa`, admin page `/dashboard/admin/production/release-qa`.
- Implemented magazine API routes (read during audit):
  `admin`, `admin/create-city`, `ads/mine`, `ads/purchase`, `claim`, `contributor`, `covenant`, `gate`, `issue`, `submit`,
  `production/ads`, `production/ads/creative`, `production/ads/hold`, `production/ads/refund`, `production/ads/webhook`,
  `production/assets`, `production/assignments`, `production/assignments/claim`, `production/dashboard`, `production/flatplan`,
  `production/payouts`, `production/preflight`, `production/release-gate`, `production/release-qa`,
  `production/sierra`, `production/sierra/resolve`, `production/storms`, `production/submissions`, `production/submissions/decision`.
- Financial authorization is admin/finance-role gated (payouts + release-gate routes require finance/production/editorial roles; platform-admin checks in `roles.ts`).
- Migrations: this project provisions schema via Prisma `db push` (additive), not a migrations folder, so there is no migration file list to cite; schema is current and provenance columns are live (proven by the zero-null counts above).

### 1.7 Automated test evidence (re-run during this audit)
- Phase 11 provenance + points suite: **53 passed, 0 failed**
- Phase 10 release-QA suite: **33 passed, 0 failed** (including an explicit assertion that compiling the readiness snapshot did NOT change frame count — read-only safe)
- Prior suites on record (unchanged): phase4 authorship 19, phase5 Sierra 11, phase6 ads 32, phase7 payouts 27, phase8 dashboard 44, phase9 public 30.

### 1.8 Content state (expected, pre-launch)
- Approved editorial content: **0** (issue is DRAFT). Public reader will show "issue is being composed"; the release gate is BLOCKED. This is the correct pre-activation state — nothing to fix.

---

## 2. Normalized Human Assignment Packages

The 82 human (MANUAL_PRESS_PASS) frames are grouped below into **21 coherent assignment packages**. Linked frames that are one person's job are consolidated; genuinely independent stories/photo essays are kept separate. Point ranges are from policy v1.0.0. Deadlines are shown as schedule anchors (see Section 7), not fixed dates.

> Rule honored: a package that fills several frames earns points for ONE contribution scope, not per frame.

| package_id | pages | linked frames | title | type | planned scope | points (v1.0.0) | selection | rights/releases | publicly claimable |
|---|---|---|---|---|---|---|---|---|---|
| AP-01 | P10-P14 | 10 (all TEXT+CAPTION) | Cover Story — writing & reporting | story | cover text package, ~2,500-3,500 wds | 8-12 | EDITOR_COMMISSIONED | yes (subject consent, quotes) | no |
| AP-02 | P10-P14 | 7 (all IMAGE) | Cover Story — photography | photo | hero + 6 supporting photos | up to 8 (cover photo) | EDITOR_COMMISSIONED | yes (model/property) | no |
| AP-03 | P16,P17,P19 | 6 (TEXT) | Faces & Stories of Anna — writing/interview | story | profile + Q&A + notes, ~1,500-2,000 wds | 1-8 | EDITOR_COMMISSIONED | yes (subject consent) | no |
| AP-04 | P16,P17,P19 | 3 (IMAGE) | Faces & Stories of Anna — photography | photo | portrait set | 1-8 | EDITOR_COMMISSIONED | yes (model release) | no |
| AP-05 | P32,P34 | 4 (TEXT) | Arts feature — writing/interview | story | artist story + process Q&A | 1-8 | EDITOR_COMMISSIONED | yes | no |
| AP-06 | P32,P34 | 2 (IMAGE) | Arts feature — photography | photo | artist portrait/process | 1-8 | EDITOR_COMMISSIONED | yes (artwork rights) | no |
| AP-07 | P39 | 5 | Game-Day sports photo essay | photo | 3-photo essay + narrative | 5 (photo essay) | EDITOR_COMMISSIONED | yes (minors: guardian) | no |
| AP-08 | P07 | 3 | Ask Sierra — Letters to the Editor | questionnaire/curation | selected reader letters | 1-2 | OPEN_SUBMISSION_POOL | yes (publication consent) | yes (submission) |
| AP-09 | P27 | 3 | City & Growth — What Happens Next | story | reported story + image | 1-8 | EDITOR_COMMISSIONED | yes | no |
| AP-10 | P28 | 3 | Anna Business — Opening feature | story | opener story + image | 1-8 | EDITOR_COMMISSIONED | yes | no |
| AP-11 | P36 | 3 | Anna High School Sports — Opening | story | opener story + image | 1-8 | EDITOR_COMMISSIONED | yes | no |
| AP-12 | P56 | 3 | Voices of Anna — opening essay | story | community essay | 1-8 | OPEN_SUBMISSION_POOL | yes (author agreement) | yes (submission) |
| AP-13 | P60 | 2 | Last Look — full-page photo + caption | photo | single hero photo + reflection | 3 (last look) | EDITOR_COMMISSIONED | yes | no |
| AP-14 | P01 | 1 | Founder / community portrait | photo | 1 editorial portrait | 1-8 | EDITOR_COMMISSIONED | yes | no |
| AP-15 | C1 | 1 | Front cover hero image | photo | cover photograph | up to 8 | EDITOR_COMMISSIONED (open juried call only if Publisher chooses) | yes | no |
| AP-16 | P22 | 3 | Nonprofit of the Month spotlight | questionnaire | spotlight Q&A + portrait | 1-2 | RANDOMIZER_THEN_INVITATION | yes | no |
| AP-17 | P26 | 3 | City Leader of the Month spotlight | questionnaire | spotlight Q&A + portrait | 1-2 | RANDOMIZER_THEN_INVITATION | yes | no |
| AP-18 | P29 | 3 | Business of the Month spotlight | questionnaire | spotlight Q&A + portrait | 1-2 | INVITATION_ONLY (survey #1 winner) | yes | no |
| AP-19 | P38 | 3 | Athlete & Team Spotlight | questionnaire | spotlight Q&A + portrait | 1-2 | INVITATION_ONLY (editorial rotation) | yes (minors: guardian) | no |
| AP-20 | P46,P47,P48 | 10 (COMMUNITY_PHOTO frames) | Pet & Community Photos — open pool | photo | reader-submitted photo pool | 1.5 each (per accepted photo) | OPEN_SUBMISSION_POOL | yes (photographer + subject) | yes (submission) |
| AP-21 | P46,P47,P48 | 4 (editorial TEXT) | Pet & Community — editorial framing | story | intros + captions | 1-8 | EDITOR_COMMISSIONED | yes | no |

Frame accounting: 10+7+6+3+4+2+5+3+3+3+3+3+2+1+1+3+3+3+3+10+4 = **82** human frames — fully covered.

---

## 3. Activation-Lane Classification (proposed — NOT activated)

Every assignment/frame is classified into exactly one lane. Human editorial units are counted as **packages**; machine/paid units are counted as **frames** (labeled).

| lane | count | members |
|---|---|---|
| PUBLIC_CLAIM | 0 packages | none opened — reserved for a future Publisher-approved open call |
| OPEN_SUBMISSION_POOL | 3 packages | AP-08 letters, AP-12 Voices essay, AP-20 Pet/Community photo pool |
| INVITATION_ONLY | 2 packages | AP-18 Business of the Month (survey #1 winner), AP-19 Athlete/Team Spotlight (editorial rotation) |
| RANDOMIZER_THEN_INVITATION | 2 packages | AP-16 Nonprofit of the Month, AP-17 City Leader of the Month |
| EDITOR_COMMISSIONED | 14 packages | AP-01, AP-02, AP-03, AP-04, AP-05, AP-06, AP-07, AP-09, AP-10, AP-11, AP-13, AP-14, AP-15, AP-21 |
| AUTO_CONNECTOR | 94 frames | 21 verified AnnaTexas.org / magazine feeds (Section 4) — NEVER public |
| SIERRA_DRAFT | 7 frames | nameplate, cover lines, editor letter, Ask Sierra explainer — NEVER public, never a human byline |
| PAID_INVENTORY | 30 frames | the 30 AD frames — advertising only, NEVER editorial |
| ADMIN_ONLY | actions (0 printable frames) | release-gate + payout authorization — second-human approval required |

Rule checks honored: Nonprofit + City Leader = RANDOMIZER_THEN_INVITATION; Business of the Month = survey winner then INVITATION_ONLY; Athlete/Team = editorial rotation then INVITATION_ONLY; Pet + Community photos = OPEN_SUBMISSION_POOL; cover photo = EDITOR_COMMISSIONED (juried call only if Publisher opens one); auto feeds never public; Sierra frames never public; ads = PAID_INVENTORY, never editorial.

---

## 4. Connector Readiness Matrix (94 AUTO_POPULATED frames)

All 94 auto frames map to a named connector. Frames use internal structured AnnaTexas.org / magazine DB modules — the audit did **not** scrape the public website. **No live sync has run yet**: `last successful sync`, `source freshness`, and `preview record count` are runtime values that only exist after a Publisher-authorized connector run, so they are honestly marked *pending activation*. Connector results were NOT written into the magazine.

| pages | frames | connector key | expected source module | selection | rights rule | last sync / freshness / preview count | responsible owner |
|---|---|---|---|---|---|---|---|
| P04,P05 | 6 | annatexas.dashboard_digest | Community dashboard digest | VERIFIED_QUERY | permissioned summary | pending activation | Managing Editor |
| P08,P09 | 6 | annatexas.surveys | Survey Says results | VERIFIED_QUERY | aggregate, no PII | pending activation | Managing Editor |
| P02,P03 | 8 | magazine.issue_navigation | Internal TOC / navigation | VERIFIED_QUERY | internal | pending activation | Prepress / Art Director |
| P01 | 1 | magazine.masthead_memberships | Masthead / memberships | VERIFIED_QUERY | internal | pending activation | Tenant Publisher |
| P18 | 3 | annatexas.faces_of_anna_permissioned_import | Faces of Anna (opted-in) | VERIFIED_QUERY | explicit opt-in consent | pending activation | Managing Editor |
| P20,P21 | 6 | annatexas.kind_deeds_and_stories | Kind Deeds & nonprofit stories | VERIFIED_QUERY | permissioned | pending activation | Managing Editor |
| P24,P25 | 6 | annatexas.city_admin_reports | City / growth admin reports | VERIFIED_QUERY | public-record / attributed | pending activation | City liaison (Publisher to name) |
| P30 | 3 | annatexas.claimed_businesses | Newly claimed businesses | VERIFIED_QUERY | verified-owner claim | pending activation | Managing Editor |
| P33 | 6 | annatexas.artist_portal_gallery | Artist portal gallery | VERIFIED_QUERY | artist-granted rights | pending activation | Arts editor (Publisher to name) |
| P35 | 3 | annatexas.artist_portal_marketplace | Artist marketplace listings | VERIFIED_QUERY | artist-granted rights | pending activation | Arts editor |
| P37,P40 | 7 | annatexas.high_school_sports | HS sports scores/schedule | VERIFIED_QUERY | school-permissioned | pending activation | Sports liaison |
| P42,P43,P44,P45 | 14 | annatexas.events_next_month | Events calendar (next month) | VERIFIED_QUERY | public listings | pending activation | Managing Editor |
| P49 | 3 | annatexas.pet_contest_results | Pet contest results | VERIFIED_QUERY | entrant consent | pending activation | Managing Editor |
| P50,P51 | 6 | annatexas.newcomer_welcome | Newcomer welcome data | VERIFIED_QUERY | permissioned | pending activation | Managing Editor |
| P52,P53 | 2 | annatexas.paid_coupon_index | Coupon clipper index | VERIFIED_QUERY | advertiser-supplied | pending activation | Finance Admin |
| P54 | 3 | annatexas.deals_affiliates | Deals & premier affiliates | VERIFIED_QUERY | advertiser-supplied | pending activation | Finance Admin |
| P06 | 1 | annatexas.ask_sierra_questions | Most-asked questions feed | MOST_ASKED_FREQUENCY | aggregate, no PII | pending activation | Managing Editor |
| P57 | 3 | magazine.open_assignments | Open-assignment board | VERIFIED_QUERY | internal | pending activation | Managing Editor |
| P58 | 3 | magazine.sources_corrections | Sources & corrections | VERIFIED_QUERY | internal | pending activation | Managing Editor |
| P59 | 3 | magazine.credits_ledger | Contributor/advertiser credits | VERIFIED_QUERY | internal | pending activation | Finance Admin |
| C1 | 1 | magazine.verified_connector | Cover verified-source flag | EDITORIAL_SELECTION | internal | pending activation | Prepress / Art Director |

Total = 94 frames across 21 connectors. **Blocker:** each connector needs its live binding verified and a named human owner confirmed by the Publisher before any sync is authorized. Owners above are proposed defaults, not assignments.

---

## 5. Minimum Human-Role Plan (invitation DRAFTS only — nothing sent)

No invitations were created or sent. These are DRAFT role slots for the Publisher to fill with real people. No names or emails were invented.

| role | who | responsibilities | may combine? |
|---|---|---|---|
| Tenant Publisher | **Aubre'** (confirmed) | owns the tenant, final publish authority | may also hold one production role, but NOT be the sole second approver |
| Managing Editor / 2nd release approver | *(Publisher to name)* | editorial sign-off; the required second human for final release | must be a DIFFERENT human from the Publisher for final release |
| Finance Admin | *(Publisher to name)* | rate card, payouts, live-payment authorization | must be a different human from whoever triggers payouts |
| Prepress / Art Director | *(Publisher to name)* | page lock, print-ready proof, preflight | may combine with Managing Editor for a small pilot |
| Press Pass writers / photographers | *(invited later)* | claim EDITOR_COMMISSIONED + submission-pool packages | invited only after roles + connectors verified |

**Separation of duties (hard rule):** final release requires two distinct humans (Publisher + Managing Editor). Payout authorization requires a Finance Admin who is not the same person who initiates the payout. The Publisher may hold at most one additional operational role but cannot single-handedly satisfy a two-human approval.

---

## 6. Live-Payment Launch Checklist (payments stay in SANDBOX)

Live payments are NOT enabled. Every box below must be checked and Publisher-authorized before switching off sandbox.

- [ ] Payment processor selected and connected account verified
- [ ] Advertiser agreement / terms finalized
- [ ] Rate card reviewed and approved by Finance Admin
- [ ] Refund / cancellation policy published
- [ ] Tax configuration set (jurisdiction, rates)
- [ ] Bank settlement destination verified
- [ ] Two successful **sandbox** ad purchases completed end-to-end
- [ ] Failed-payment path tested (declined card)
- [ ] Refund path tested in sandbox
- [ ] Finance Admin sign-off recorded
- [ ] Publisher authorization recorded

---

## 7. Issue Zero Pilot Schedule (template — anchored to a blank Publisher date T)

The publication date **T is intentionally blank** — the Publisher selects it. All milestones are computed backward from T. Storms/automation are NOT activated until the Publisher supplies and approves the date. This is a 10-12 week pilot template.

| week | milestone |
|---|---|
| T-12 | Publisher sets date T; activate roles (Section 5); confirm separation of duties |
| T-11 | Verify all 21 connectors; name each connector owner; first sandbox connector sync review |
| T-10 | Open EDITOR_COMMISSIONED assignments; open submission pools (letters, Voices, Pet/Community) |
| T-9 | Ad sales period opens; rate card live in sandbox; advertiser outreach |
| T-8 | Randomizer + invitation spotlights (Nonprofit, City Leader, Business, Athlete) issued |
| T-7 | Submission deadline for open pools; first editorial review pass |
| T-6 | Cover story + features drafts due; photo selects; editorial review continues |
| T-5 | Contributor proof approval; rights/releases verified for every human frame |
| T-4 | Ad creative deadline; advertiser proofs approved |
| T-3 | Page lock; digital proof generated and circulated |
| T-2 | Physical proof review; finance freeze (no new paid inventory) |
| T-1 | Print-ready (PDF/X) sign-off by Prepress + Publisher + Managing Editor |
| **T** | Publication / distribution (digital + print) |

---

## 8. Blockers Requiring Publisher Decisions

1. **Publication date T** — everything in Section 7 depends on it. No storms/automation start until you set and approve it.
2. **Second release approver** — name a Managing Editor (must be a different human from you for final release).
3. **Finance Admin** — name the person who approves rate card + payouts + the sandbox-to-live payment switch.
4. **Prepress / Art Director** — name who owns page lock and print-ready proof.
5. **Connector owners** — confirm the 21 connector owners (Section 4 lists proposed defaults) before any live sync.
6. **Cover art path (AP-15)** — decide EDITOR_COMMISSIONED vs. an open juried call.
7. **Live payments** — remain in sandbox until the Section 6 checklist is fully green and you authorize the switch.

---

### Audit integrity statement
This audit read production data only. No assignments were opened, no invitations sent, no live payments connected, no production records populated, and the release gate was not changed. Issue Zero remains in DRAFT. The next actions in Sections 2-7 are proposals awaiting your approval.
