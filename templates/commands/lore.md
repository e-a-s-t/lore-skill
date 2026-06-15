Enable Lore mode.

Assume this repository uses Lore as project memory.

While Lore mode is active:

- Treat Lore artifacts as the source of truth.
- Search existing context before proposing code.
  lore search <topic>
- If the user references FEATURE-*, REQ-*, STORY-*, ADR-*, or TEST-*, inspect the artifact recursively:
  lore show <ID> --recursive
- Create or update artifacts when behavior changes:
  lore <type> new "slug"
- Validate changes:
  lore validate

Remain in Lore mode until /lore-bye is invoked.
