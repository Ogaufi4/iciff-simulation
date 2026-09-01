# ICiFF Financial Intelligence Simulation Lab

A responsive investigation-training application using synthetic data only. The interface separates the ICiFF learning shell from fictional operational portals and permanently marks every casework screen as a training simulation.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Build with `npm run build`; generate database migrations with `npm run db:generate`.

## Architecture

- Vinext/Next.js and strict TypeScript for the application UI
- D1/SQLite with Drizzle for durable attempts, evidence, browser state and scoring
- Platform-managed ChatGPT authentication for hosted access
- `app/lib/investigation.ts` contains deterministic screening, indirect-ownership and scoring functions
- `db/seed.ts` is the scenario catalogue; scenario truth must remain server-side

## Scenario authoring

Each scenario needs a unique slug, learner-facing briefing, portal access rules, synthetic entities and relationships, screening profiles, expected evidence and scoring rules. Never place hidden truth in client components. Fictional portals use `.test` domains and must not use real logos, seals, credentials, or live integrations.

## Safety

All names, records and decisions are fictional educational material. Reports must state that outcomes are training assessments rather than legal findings.
