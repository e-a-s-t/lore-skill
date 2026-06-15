---
id: ADR-001
title: Separate Lore Skill repository
status: Draft
related_requirements:
  - REQ-001
related_features:
  - FEATURE-001
related_stories:
  - STORY-001
related_tests:
  - TEST-001
related_adrs: []
---

# Separate Lore Skill repository

## Context

Lore is the CLI and storage format for git-native project memory. Lore Skill is distribution and instruction material for AI coding agents.

## Decision

Keep Lore Skill in a separate repository from the Lore CLI.

## Consequences

- Agent instructions can evolve independently of the Lore CLI.
- The repository can be packaged like Caveman using npm.
- The skill can support multiple agents without adding noise to the main Lore project.
