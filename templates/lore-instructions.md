# Lore Instructions

This repository uses Lore as project memory.

Artifact types:

- feature → `FEATURE-*`
- req → `REQ-*`
- story → `STORY-*`
- adr → `ADR-*`
- test → `TEST-*`

Inspect existing context:

    lore search <topic>
    lore show <ID> --recursive

Create new artifacts:

    lore <type> new "slug"

List artifacts:

    lore <type> list

Validate changes:

    lore validate

If the user references a `FEATURE-*`, `REQ-*`, `STORY-*`, `ADR-*`, or `TEST-*` artifact, inspect it recursively before proposing code.

Use Lore as the source of truth.

Do not invent requirements, architecture decisions, or test expectations.
