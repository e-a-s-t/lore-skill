---
id: TEST-001
title: Init creates agent instruction files
status: Draft
related_requirements:
  - REQ-001
related_features:
  - FEATURE-001
related_adrs:
  - ADR-001
related_stories:
  - STORY-001
related_tests: []
---

# Init creates agent instruction files

## Verification

Run:

```bash
lore-skill init --all
```

Expected files:

- `.claude/skills/lore/SKILL.md`
- `CLAUDE.md`
- `.codex/instructions.md`
- `.github/copilot-instructions.md`
- `AGENTS.md`

## Acceptance Criteria

- [ ] All expected files are created.
- [ ] Generated files mention `lore show <ID> --recursive`.
- [ ] Generated files mention `lore validate`.
