# PROVISIONAL PATENT APPLICATION

## Title of Invention

**Gated, Self-Populating Community Publication System for Geographically-Bounded Towns, with Membership-Verified Contribution, Earned Business Ranking, and Integrated Local Matching, Token-Metered Lead Economy, and Municipal Impact Reporting**

## Inventors

Aubre' Murphy
Anna, Texas
(Assignor to Town Square Apps, LLC)

## Entity Status

Small Entity

---

> **Note to reader / preparer (not part of the specification):** This document distinguishes features that are **built and operational** from features that are **planned embodiments**, using the labels *[BUILT]* and *[PLANNED]*. A provisional application may properly describe both, but the inventor should confirm each label with counsel so that no claim overstates what currently exists. Exact numeric values (thresholds, award amounts, fee percentages) are described as *"in one embodiment"* so the claims are not narrowed to a single figure.

---

## Field of the Invention

The present invention relates to integrated community and municipal technology platforms. More specifically, it relates to a gated, self-populating community publication and engagement system designed for geographically-bounded towns that combines membership-verified contribution, earned business ranking, local matching, a token-metered lead economy, and municipal economic impact reporting within a single multi-tenant architecture.

## Background of the Invention

Many fast-growing towns lack local information infrastructure. A town may have no independent newspaper, no magazine, no journalists, and no news station, such that the only available civic information originates from the municipality itself. Such towns frequently also lack arts infrastructure, lack any organized means of welcoming and harnessing the talents of newcomers, and lack tools that help residents find meaningful local connection. Residents are pushed toward generic, unverified information sources (for example, general-purpose social-media groups and general web search) that are not local, not verified, and not accountable to the community.

Existing technology tools address at most one facet of this problem. No known single system simultaneously: (a) gates community participation to verified members of a specific town; (b) enables a community to populate its own publication organically by sharing with one another; (c) verifies that participating businesses are legitimate; (d) ranks those businesses for lead delivery based on earned participation rather than payment alone; (e) matches residents to verified local providers; (f) monetizes those connections through a controlled token economy; and (g) generates auditable economic-impact data for a municipal government. Existing tools are fragmented and do not create a self-reinforcing, gated publication-and-engagement loop tied to real local economic outcomes.

## Summary of the Invention

The invention is a single gated, self-populating community publication system for geographically-bounded towns that incorporates multiple distinct inventions working together, including:

1. A membership-verified contribution model that gates participation and ranks businesses based on earned activity within the system.
2. A tag-driven local matching engine that converts resident responses into categorical tags and ranks verified local businesses using overlap scoring with paid-tier weighting.
3. A token-metered pay-per-lead economy that controls delivery of matched introductions through atomic token balance updates.
4. A gamified community engagement subsystem (referred to in one embodiment as “Survey Says!”) in which answer options are real local businesses, simultaneously generating verified leads and minting token rewards and reputation badges.
5. A municipal economic-impact proof engine that aggregates platform activity into auditable reports of local economic development.
6. A multi-tenant white-label configuration system with master-to-child inheritance that enables replication of the full platform across additional towns.
7. Supporting systems including a graduated multi-role verification ladder, an AI editorial pipeline that converts verified business mentions from community publications into monetizable leads, and a municipal command center that derives early-warning signals and an automatically drafted governing-body report from the platform’s own activity data.

These distinct inventions operate together within one cohesive, gated publication and engagement system to keep local spending inside the community while producing measurable economic-development data for town governments.

**Reduction to practice.** The system has been reduced to practice as a deployed, operational platform. In its current implementation it comprises on the order of 132 distinct data models and 214 functional server endpoints, and is publicly deployed as a live civic platform, with a seeded proof-of-concept demonstrating replication to additional towns. Accordingly, the inventions described herein are not merely conceptual; representative subsystems are implemented and running.

## Detailed Description of the Invention

The platform is a gated, self-populating community publication system that contains multiple novel inventions working together. Throughout this description, numeric values are provided as examples “in one embodiment” and are not limiting.

### Invention 1 — Membership-Verified Contribution and Earned Business Ranking

Participation in the community publication system is gated by membership verification. *[BUILT]* In the current implementation, participation is gated by account authentication and by a role/membership verification model (described in the Supporting Inventions section), and the local directory and community content are scoped to a single town. *[PLANNED]* In a further embodiment, participation is additionally gated by residency or locality verification such that individuals outside the defined town boundary are prevented from contributing, so that the publication is populated organically only by verified members of that town and remains outside the reach of out-of-town parties.

Contributors and businesses earn ranking and visibility through verified activity, participation, and contribution within the geographically-bounded town system rather than through paid promotion alone. In one embodiment, a business must be verified as a legitimate local business before it can receive delivered leads, and its ranking for lead delivery is a function of earned signals (for example, verification status, participation, and community reputation) in combination with, but not solely determined by, paid tier.

### Invention 2 — Tag-Triggered Local Matching Engine

A structured onboarding process presents questions each associated with a predefined category tag, and emits categorical tags from a resident’s responses. The system computes a match score between a resident’s tag set and each vetted local business record. In one embodiment, the match score is computed as a function of the size of the intersection between the resident tag set and the business tag set, normalized by the size of the resident tag set. The system applies a weighting factor that favors businesses participating in the paid tier of the token economy, sorts businesses by the resulting weighted score, and returns ranked introductions limited to the municipal boundary. In one embodiment, businesses of a paid tier receive a higher weighting factor than businesses of a free tier.

### Invention 3 — Token-Metered Lead Economy

Matched introductions are delivered only when the receiving business maintains a sufficient balance of a closed virtual currency (“tokens”). Upon generation of a matched lead, the system compares the business’s token balance to a per-lead token cost; when the balance is insufficient, the system withholds delivery of the lead and returns a payment-required state. When the balance is sufficient, the system atomically decrements the balance by the per-lead token cost and records the transaction in a ledger. Tokens may be acquired by purchase and, in one embodiment, transferred between two business accounts by an atomic decrement of a sending account and increment of a receiving account, subject to constraints (for example, a bounded transfer amount and a prohibition on self-transfer).

### Invention 4 — Gamified Community Survey Lead Generation and Rewards

A gamified community survey subsystem (referred to in one embodiment as “Survey Says!”) presents surveys whose selectable answer options each correspond to a verified local business record. When a user selects an option corresponding to a business account holding a positive token balance, the system automatically generates a lead record associated with that business, in one embodiment de-duplicated per user and seeded at zero token cost so that gameplay is free to the player. Upon closure of a survey — in one embodiment, upon reaching a configurable vote threshold — the business associated with the most-selected option is declared a winner, its token balance is incremented by a configurable reward amount, and a persistent reputation badge (for example, “Voted #1 in {category}”) is appended to that business’s record. This creates a self-reinforcing loop of engagement, verified lead generation, and local commerce.

### Invention 5 — Municipal Economic-Impact Proof Engine

The system aggregates verified platform activity — including, in one embodiment, business activations, jobs posted, commerce transactions with associated local dollar amounts, and community events — over one or more configurable time windows. The engine excludes non-genuine seed records from its counts so that reported figures reflect real activity, annotates each aggregate metric with a provenance or methodology descriptor, and generates a structured report suitable for municipal economic-development use, including export in a structured format. Where a metric is a proxy for an underlying behavior rather than a direct measurement, the engine labels it as such.

### Invention 6 — Multi-Tenant White-Label System with Inheritance

A configuration layer maintains a registry of town configuration records, each defining branding fields and municipal fact fields (for example, county, postal code, city contact information, utility portal, and non-emergency lines). A designated master town record holds shared value-proposition data. A resolver composes each town’s presentation by inheriting the master’s shared data unless the town record specifies an override, in which case the town’s own value-proposition data is used. In one embodiment, the active town is selected at deployment time by an environment parameter, so that additional towns can be instantiated and configured without modifying or disturbing existing tenants. This enables rapid, consistent replication of the full gated publication-and-engagement system across geographically-bounded communities.

### Additional Integrated Inventions

**Graduated multi-role verification ladder.** A single user account may be associated with a plurality of community role assignments (for example, Resident, Business, Nonprofit, Press, and others). Each role assignment carries an independent verification level selected from an ordered ladder — in one embodiment: self-declared, ownership-verified, editorially-approved, institutionally-confirmed, and privileged-admin. Access to platform capabilities is gated by the verification level of the currently-active role, and a level-up workflow allows a user to submit proof to advance a specific role’s verification level subject to reviewer approval.

**AI editorial pipeline.** Submitted community content is processed through a sequence of automated agents, including a fact-verification agent that matches named entities in the content against the local business directory to produce a set of verified business mentions. Upon human approval of the content, the system generates lead records for the businesses corresponding to those verified mentions, thereby bridging community publishing to the token-metered lead economy. In one embodiment, an internal editorial rubric score is computed and stored but not disclosed to the author, who instead receives coaching feedback derived from, but not exposing, that score.

**Municipal command center.** A municipal operations subsystem monitors the platform’s own activity records against a plurality of configurable thresholds to emit civic early-warning signals, and generates a governing-body report by computing municipal metrics over a time window and composing an automated narrative constrained to those computed metrics, rendered as a distributable document. Integration points to external municipal systems are presented as clearly labeled, not-yet-connected seams rather than fabricated data.

All inventions operate within one gated, self-populating community publication system for geographically-bounded towns.

## Claims

**Claim 1 (System Claim).** A gated, self-populating community publication system for geographically-bounded towns comprising: a membership-verified contribution model that gates participation and establishes earned business ranking; a tag-driven matching engine that ranks local providers by tag overlap with paid-tier weighting; a token-metered lead delivery mechanism that withholds introductions based on token balance; a gamified survey subsystem that generates leads and rewards from verified-business answer options; an economic-impact aggregation engine that produces municipal reports; and a multi-tenant configuration layer enabling replication of the system to additional towns.

**Claim 2.** The system of claim 1, further comprising atomic token balance management that withholds delivery of matched leads when a business token balance is insufficient and that atomically decrements the balance and records a ledger entry upon delivery.

**Claim 3.** The system of claim 1, further comprising a gamified survey engine in which selectable options correspond to verified local businesses and user selection automatically generates a lead record, and wherein upon closure of a survey the business associated with the most-selected option is credited with a token reward and a reputation badge.

**Claim 4.** The system of claim 1, further comprising an economic-impact reporting engine that aggregates verified activity while excluding non-genuine records and annotates outputs with methodology descriptors.

**Claim 5.** The system of claim 1, further comprising a multi-tenant inheritance system in which child town instances inherit shared configurations from a master town unless explicitly overridden, and in which an active town is selected at deployment time without modifying other town instances.

**Claim 6.** The system of claim 1, further comprising an AI editorial pipeline that identifies verified business mentions in approved community content and generates lead records upon human approval.

**Claim 7.** The system of claim 1, further comprising a single-identity multi-role verification model in which one user account holds a plurality of role assignments each having an independent verification level selected from an ordered ladder, and in which access to capabilities is gated by the verification level of a currently-active role.

**Claim 8.** The system of claim 1, wherein the membership-verified contribution model further comprises a locality verification that restricts contribution to verified members of a defined town boundary such that out-of-boundary parties are prevented from contributing.

**Claim 9.** The system of claim 1, wherein the tag-driven matching engine computes a match score as a function of the intersection of a resident tag set and a provider tag set normalized by the size of the resident tag set, and applies a higher weighting factor to providers of a paid tier than to providers of a free tier.

**Claim 10.** The system of claim 1, further comprising a municipal command center that monitors platform activity against configurable thresholds to emit civic early-warning signals and that generates a governing-body report comprising an automated narrative constrained to municipal metrics computed over a time window.

*(Additional dependent claims may be added.)*

## Abstract

A gated, self-populating community publication system for geographically-bounded towns integrates multiple distinct inventions including membership-verified contribution with earned business ranking, tag-driven local matching, a token-metered lead economy, gamified community surveys that generate leads and rewards, and municipal economic-impact reporting. The system operates as a single cohesive platform that can be replicated across towns through a multi-tenant inheritance model, keeping local spending inside the community while producing measurable economic-development data for town governments. The system has been reduced to practice as a deployed, operational platform.

---

*This provisional application is a technical disclosure prepared to establish a priority date. It is not legal advice. The inventor should review the built-versus-planned labels and all claim language with a licensed patent attorney before filing or before disclosing the described mechanisms to third parties.*
