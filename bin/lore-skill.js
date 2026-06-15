#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const templates = path.join(root, "templates");

const args = process.argv.slice(2);
const command = args[0] ?? "help";
const targetDir = process.cwd();

function usage() {
  console.log(`Lore Skill

Usage:
  lore-skill init [--all] [--codex] [--copilot] [--claude] [--agents]
  lore-skill doctor

Examples:
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

function init() {
  const flags = new Set(args.slice(1));
  const all = flags.has("--all") || args.length === 1;

  const instructions = path.join(templates, "lore-instructions.md");
  const skill = path.join(templates, "SKILL.md");
  const loreCommand = path.join(templates, "commands/lore.md");
  const loreByeCommand = path.join(templates, "commands/lore-bye.md");

  if (all || flags.has("--claude")) {
    copyFile(skill, path.join(targetDir, ".claude/skills/lore/SKILL.md"));
    copyFile(instructions, path.join(targetDir, "CLAUDE.md"));
    copyFile(loreCommand, path.join(targetDir, ".claude/commands/lore.md"));
    copyFile(
      loreByeCommand,
      path.join(targetDir, ".claude/commands/lore-bye.md"),
    );
  }

  if (all || flags.has("--codex")) {
    copyFile(instructions, path.join(targetDir, ".codex/instructions.md"));
  }

  if (all || flags.has("--copilot")) {
    copyFile(
      instructions,
      path.join(targetDir, ".github/copilot-instructions.md"),
    );
  }

  if (all || flags.has("--agents")) {
    copyFile(instructions, path.join(targetDir, "AGENTS.md"));
  }
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

if (command === "init") init();
else if (command === "doctor") doctor();
else usage();
