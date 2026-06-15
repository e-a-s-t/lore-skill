---
id: FEATURE-001
title: Agent instruction installer
status: Draft
related_requirements:
  - REQ-001
related_features: []
related_adrs:
  - ADR-001
related_stories:
  - STORY-001
related_tests:
  - TEST-001
---

# Agent instruction installer

## Summary

Provide a small CLI that installs Lore-aware instructions for common AI coding agents.

## Scope

Initial supported outputs:

- Claude Code skill file
- Claude project instructions
- Codex instructions
- GitHub Copilot instructions
- Generic AGENTS.md

## Out of Scope

Installing the Lore CLI itself is out of scope for this repository.
