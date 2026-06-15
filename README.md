# Lore Skill

AI agent skill for Lore.

Lore is git-native project memory for requirements, features, user stories, ADRs and tests.

This repository teaches AI coding agents how to use Lore before changing code.

## Install

bash npm install -g @e-a-s-t/lore-skill 

Then initialize agent instructions inside a project:

bash cd my-project lore-skill init 

By default, init installs support for all supported agents.

## Targeted install

bash lore-skill init --codex lore-skill init --copilot lore-skill init --claude lore-skill init --agents 

## Requirement

The Lore CLI must already be installed:

bash npm install -g github:e-a-s-t/lore 

Verify:

bash lore -V 

## What gets generated

Depending on selected targets:

text .claude/skills/lore/SKILL.md .claude/commands/lore.md .claude/commands/lore-bye.md CLAUDE.md .codex/instructions.md .github/copilot-instructions.md AGENTS.md 

## Commands

Enable Lore mode:

text /lore 

Disable Lore mode:

text /lore-bye 

While Lore mode is active, agents should:

- Treat Lore artifacts as the source of truth.
- Search existing context:

bash lore search <topic> 

- Inspect artifacts recursively:

bash lore show <ID> --recursive 

- Create new artifacts when behavior changes:

bash lore <type> new "slug" 

- Validate changes:

bash lore validate 

## Artifact IDs

Lore artifact IDs include:

text FEATURE-* REQ-* STORY-* ADR-* TEST-* 

For example:

text FEATURE-001 REQ-001 ADR-001 

Agents should inspect referenced artifacts recursively before proposing code.

## This repository uses Lore too

This repository contains its own .lore directory.

Start here:

bash lore show FEATURE-001 --recursive
