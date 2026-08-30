# ANNA LIFE - Release QA & Deployment Preparation (Phase 10)

**Status:** Staging acceptance candidate. Production remains unchanged until the Publisher gives explicit written authorization.

This report is also available live, in-app, at **Admin Dashboard -> ANNA LIFE Flatplan -> Release QA** (`/dashboard/admin/production/release-qa`), where it recomputes the gate, audit and isolation facts from real data on every load.

---

## 1. Exact test report

**216 automated assertions** pass across 7 phases (run from `nextjs_space/` via `npx tsx scripts/<script>.ts`). The remaining 3 foundational phases are verified by structured manual sign-off (see role journeys, section 2).

| Phase | Area | Automated assertions | Script |
|---|---|---|---|
| 1 | Tenant & RBAC | manual sign-off | - |
| 2 | Issue & frame core (64 pages / 213 frames) | manual sign-off | - |
| 3 | Assets & preflight (300 DPI truth) | manual sign-off | - |
| 4 | Submissions & authorship | 19 | test-phase4 |
| 5 | Runtime agents (Sierra) | 11 | test-phase5 |
| 6 | Ads & payment (sandbox) | 32 | test-phase6 |
| 7 | Contributor pool & payouts | 27 | test-phase7 |
| 8 | Production dashboard, storms & release gate | 44 | test-phase8 |
| 9 | Public reader & multi-city | 30 | test-phase9-public |
| 11 | Provenance, contribution points & selection audit | 53 | test-phase11-provenance-points |
| 10 | Release QA compiler | 33 | test-phase10-release-qa |

*(Phase 10's own 33 checks verify the report compiler and are additional to the 216.)*

Every test asserts against **persistent data**, not fixtures. Tenant-isolation tests run both directions (Anna cannot read the test city; the test city cannot read Anna) and self-clean via hard delete.

## 2. Role-journey scenarios (manual acceptance)

Anonymous reader; Press Pass writer; photographer; artist; business ad buyer; nonprofit administrator; editor; publisher; finance administrator; platform administrator; second-city user. Each end-to-end path is enumerated in-app on the Release QA page (Acceptance-test registry + journey list). Payment and payout journeys run in **sandbox only**.

## 3. Known limitations

- **Issue Zero has no approved editorial content yet**, so the public reader shows the "this issue is being composed" state and the release gate reports BLOCKED. This is expected pre-launch; the 64-page / 213-frame structure and all provenance are already in place.
- **Payments and payouts are sandbox-only.** No live Stripe activation and no real payout are triggered by this build.
- **Accessibility, keyboard, mobile/tablet/desktop, prompt-injection and concurrency** behaviours are implemented and covered by phase tests where automatable; final cross-device sign-off is a manual checklist item before launch.
- A stable set of **pre-existing, unrelated legacy-page issues** (a few academy pages' contrast, some marketing buttons, and external third-party links) are outside ANNA LIFE scope and were intentionally left untouched.

## 4. Data migration / export procedure

1. The database is the single source of truth; all ANNA LIFE rows are tenant-scoped and additive.
2. To export a tenant edition: query `MagazineProductionIssue`, `MagazineProductionFrame`, `MagazineAssignment`, `MagazineProdSubmission` (+ revisions), `MagazineContributorPool`/`Unit`/`Owner`/`PayoutStatement`, `MagazineSelectionRecord` and `AuditEvent`, all filtered by `tenantId`.
3. Originals are immutable and hashed; the audit trail (`AuditEvent`) is append-only - export it verbatim to preserve provenance.
4. Schema changes are always additive (new nullable columns backfilled from the frame manifest); never run `--accept-data-loss`.

## 5. Rollback procedure

1. Each phase is a saved checkpoint. Rollback = restore the last known-good checkpoint from the app's version history.
2. Because schema changes are additive, restoring code does **not** drop ledger or audit rows - integrity is preserved.
3. After rollback, re-run the phase test scripts to confirm green before re-opening to users.

## 6. Tenant (city) creation procedure

1. Platform admin opens **Create City** (`/dashboard/admin/production/create-city`).
2. The 8-step wizard collects identity, domain/branding, publication/template, connectors, roles/founding invites, payments, schedule, and a review.
3. Submitting calls `createCityTenant`, which deep-clones the blueprint, provisions an isolated tenant (own domain, brand, roles, connectors, issue template), optionally imports Issue Zero, and writes a `TENANT_CREATED` audit event.
4. **No source code or private tenant data is copied.** Cross-tenant reads are impossible by construction.

## 7. Incident-response contacts (placeholders)

- **Publisher / owner:** Aubre' (annatexas.org) - final release authority.
- **Platform admin on-call:** _<placeholder>_
- **Payments (sandbox -> live) owner:** _<placeholder>_
- **Data / audit escalation:** _<placeholder>_

## 8. Launch checklist (computed live in-app)

- [x] Automated acceptance tests pass (216 assertions, phases 4-11).
- [x] Every frame carries real provenance (213/213 source-moded; 82 revenue-share eligible).
- [x] Append-only audit trail recording.
- [x] Release gate computes for the active issue.
- [x] Multi-tenant isolation in place.
- [x] Payments & payouts remain sandbox until Publisher authorizes.
- [x] Production unchanged until explicit Publisher approval.
- [ ] Issue Zero editorial content approved & locked (pre-launch content work).
- [ ] Final cross-device / accessibility sign-off.
- [ ] Publisher written authorization to go live.

## 9. Post-launch monitoring dashboard

The **Production Dashboard** (`/dashboard/admin/production/dashboard`) and **Release QA** page together form the monitoring cockpit: completion ratios, blockers, ad sell-through, contributor-pool/retained-profit estimates, release-gate status, audit-event volume, and tenant-isolation counts - all recomputed from source records. Watch these post-launch for gate regressions, audit gaps and revenue reconciliation.

---

**Stop point:** This is a staging deployment candidate. Explicit Publisher authorization is required before production deployment, DNS changes, live Stripe activation, email campaigns or real payouts.
