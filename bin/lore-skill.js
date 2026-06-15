#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const repoSkillDir = path.join(root, "lore-project-memory");
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));

const args = process.argv.slice(2);
const command = args[0] ?? "help";
const targetDir = process.cwd();

const loreInstructions = `# Lore Instructions

This repository uses Lore as project memory.

Artifact types:

- feature → \`FEATURE-*\`
- req → \`REQ-*\`
- story → \`STORY-*\`
- adr → \`ADR-*\`
- test → \`TEST-*\`

Inspect existing context:

    lore search <topic>
    lore show <ID> --recursive

Create new artifacts:

    lore <type> new "slug"

List artifacts:

    lore <type> list

Validate changes:

    lore validate

If the user references a \`FEATURE-*\`, \`REQ-*\`, \`STORY-*\`, \`ADR-*\`, or \`TEST-*\` artifact, inspect it recursively before proposing code.

Use Lore as the source of truth.

Do not invent requirements, architecture decisions, or test expectations.
`;

const loreCommand = `Enable Lore mode.

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
`;

const loreByeCommand = `Disable Lore mode.

Return to normal code-centric behavior.

Ignore Lore workflows and artifacts unless explicitly requested by the user.
`;

function usage() {
  console.log(`Lore Skill

Version:
  ${packageJson.version}

Usage:
  lore-skill -V|--version
  lore-skill init [--all] [--codex] [--copilot] [--claude] [--agents]
  lore-skill install [--global|--codex]
  lore-skill doctor

Examples:
  lore-skill -V
  lore-skill install
  lore-skill init --all
  lore-skill init --codex --copilot
  lore-skill init --claude
`);
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`created ${path.relative(targetDir, dest)}`);
}

function writeFile(contents, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, contents);
  console.log(`created ${path.relative(targetDir, dest)}`);
}

function codexHome() {
  return process.env.CODEX_HOME ?? path.join(os.homedir(), ".codex");
}

function init() {
  const flags = new Set(args.slice(1));
  const all = flags.has("--all") || args.length === 1;

  const skill = path.join(repoSkillDir, "SKILL.md");
  const openaiYaml = path.join(repoSkillDir, "agents/openai.yaml");

  if (all || flags.has("--claude")) {
    copyFile(skill, path.join(targetDir, ".claude/skills/lore/SKILL.md"));
    writeFile(loreInstructions, path.join(targetDir, "CLAUDE.md"));
    writeFile(loreCommand, path.join(targetDir, ".claude/commands/lore.md"));
    writeFile(
      loreByeCommand,
      path.join(targetDir, ".claude/commands/lore-bye.md"),
    );
  }

  if (all || flags.has("--codex")) {
    writeFile(loreInstructions, path.join(targetDir, ".codex/instructions.md"));
    copyFile(skill, path.join(targetDir, ".codex/skills/lore/SKILL.md"));
    copyFile(openaiYaml, path.join(targetDir, ".codex/skills/lore/agents/openai.yaml"));
  }

  if (all || flags.has("--copilot")) {
    writeFile(
      loreInstructions,
      path.join(targetDir, ".github/copilot-instructions.md"),
    );
  }

  if (all || flags.has("--agents")) {
    writeFile(loreInstructions, path.join(targetDir, "AGENTS.md"));
  }
}

function install() {
  const flags = new Set(args.slice(1));
  const home = codexHome();
  const skillDir = path.join(home, "skills", "lore");

  if (flags.has("--global") || flags.has("--codex") || flags.size === 0) {
    copyFile(path.join(repoSkillDir, "SKILL.md"), path.join(skillDir, "SKILL.md"));
    copyFile(
      path.join(repoSkillDir, "agents/openai.yaml"),
      path.join(skillDir, "agents/openai.yaml"),
    );
    writeFile(loreInstructions, path.join(home, "instructions.md"));
    writeFile(loreCommand, path.join(home, "commands/lore.md"));
    writeFile(
      loreByeCommand,
      path.join(home, "commands/lore-bye.md"),
    );
    return;
  }

  console.error("Nothing to install.");
  process.exit(1);
}

function doctor() {
  const checks = [
    ["Lore CLI", "lore --version"],
    ["Git", "git --version"],
  ];
  console.log("Doctor checks to run manually:");
  for (const [name, cmd] of checks) {
    console.log(`- ${name}: ${cmd}`);
  }
}

if (command === "-V" || command === "--version") console.log(packageJson.version);
else if (command === "init") init();
else if (command === "install") install();
else if (command === "doctor") doctor();
else usage();
