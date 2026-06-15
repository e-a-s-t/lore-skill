---
name: lore-project-memory
description: Use Lore as project memory for this repository. Trigger when working in the lore codebase, searching project context, creating or updating FEATURE/REQ/STORY/ADR/TEST artifacts, validating Lore state, when a user references a Lore artifact ID, or when the user says /lore to start using Lore.
---

# Lore Project Memory

Use Lore as the source of truth for this repository.

## Session cues

- Treat `/lore` as the start signal for Lore-based work.
- Treat `/lore-bye` as the end signal for Lore-based work.
- After `/lore`, use Lore for context, decisions, and validation until `/lore-bye` appears.

## Core rules

- Inspect existing context before proposing changes.
- Treat `FEATURE-*`, `REQ-*`, `STORY-*`, `ADR-*`, and `TEST-*` artifacts as authoritative.
- Do not invent requirements, architecture decisions, or test expectations.
- If the user references a Lore artifact ID, inspect it recursively before suggesting code or edits.

## Common commands

- Search context: `lore search <topic>`
- Show an artifact recursively: `lore show <ID> --recursive`
- Create artifacts:
  - `lore feature new "slug"`
  - `lore req new "slug"`
  - `lore story new "slug"`
  - `lore adr new "slug"`
  - `lore test new "slug"`
- List artifacts:
  - `lore feature list`
  - `lore req list`
  - `lore story list`
  - `lore adr list`
  - `lore test list`
- Validate changes: `lore validate`

## Workflow

1. Search for the relevant topic in Lore.
2. Read linked artifacts recursively before making assumptions.
3. Use the artifact chain to derive scope, constraints, and test expectations.
4. Update or create the smallest relevant artifact type.
5. Validate with `lore validate`.

## Artifact types

- `FEATURE-*`: user-facing capability or product behavior
- `REQ-*`: requirement, constraint, or acceptance condition
- `STORY-*`: implementation slice or delivery step
- `ADR-*`: architecture decision and rationale
- `TEST-*`: test intent, coverage, or verification criteria
