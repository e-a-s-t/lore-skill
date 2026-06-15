---
id: STORY-001
title: Initialize Lore Skill in a project
status: Draft
related_requirements:
  - REQ-001
related_features:
  - FEATURE-001
related_adrs:
  - ADR-001
related_stories: []
related_tests:
  - TEST-001
---

# Initialize Lore Skill in a project

As a developer using AI coding agents, I want to run one command in my repository so that the agents know how to use Lore as project memory.

## Acceptance Criteria

- [ ] `lore-skill init` creates agent instruction files.
- [ ] `lore-skill init --claude` creates only Claude-related files.
- [ ] `lore-skill init --codex` creates only Codex-related files.
- [ ] `lore-skill init --copilot` creates only Copilot-related files.
- [ ] The generated instructions tell agents to use `lore show <ID> --recursive`.
