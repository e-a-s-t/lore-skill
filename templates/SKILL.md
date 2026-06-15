---
name: lore
description: Use Lore to discover requirements, features, stories, ADRs and tests before changing code.
---

# Lore Skill

Lore is git-native project memory.

Use Lore before implementation when the user references project behavior, architecture, requirements, features, user stories, ADRs or tests.

## Core rule

Do not guess project intent. Inspect Lore first.

## Artifact IDs

When the user mentions an artifact ID, inspect it recursively:

    lore show <ID> --recursive

Examples:

    lore show FEATURE-001 --recursive
    lore show REQ-001 --recursive

## Discovery

Search for relevant context:

    lore search <topic>

List artifacts:

    lore <type> list

Inspect matching artifacts:

    lore show <ID> --recursive

## Change workflow

1. Search Lore for existing context.
2. Inspect related artifacts recursively.
3. Implement the smallest change that satisfies the known context.
4. Update or create Lore artifacts when behavior changes.
5. Validate.

    lore validate

## Preferred artifact flow

1. Feature: product capability.
2. Requirement: what and why.
3. Story: user-facing behavior.
4. ADR: architectural decision.
5. Test: expected verification.
6. Code: implementation.

## Creating artifacts

    lore feature new "Title"
    lore req new "Title"
    lore story new "Title"
    lore adr new "Title"
    lore test new "Title"

Link related artifacts:

    lore link FEATURE-001 REQ-001
    lore link FEATURE-001 STORY-001
    lore link FEATURE-001 ADR-001
    lore link STORY-001 TEST-001

## Rules

- Never invent requirements.
- Never ignore related ADRs.
- Never treat code as the only source of truth when Lore exists.
- Prefer updating existing artifacts over creating duplicates.
- Always validate after editing .lore.
