import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const bin = path.join(root, 'bin/lore-skill.js');

function readSkill() {
  return fs.readFileSync(path.join(root, 'lore-project-memory/SKILL.md'), 'utf8');
}

test('prints package version', () => {
  const result = spawnSync(process.execPath, [bin, '-V'], {
    encoding: 'utf8'
  });

  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout.trim(), '0.1.1');
});

test('init --all creates expected instruction files', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lore-skill-'));
  const result = spawnSync(process.execPath, [bin, 'init', '--all'], {
    cwd: dir,
    encoding: 'utf8'
  });

  assert.equal(result.status, 0, result.stderr);

  const expected = [
    '.claude/skills/lore/SKILL.md',
    'CLAUDE.md',
    '.codex/instructions.md',
    '.codex/skills/lore/SKILL.md',
    '.codex/skills/lore/agents/openai.yaml',
    '.github/copilot-instructions.md',
    'AGENTS.md'
  ];

  for (const file of expected) {
    assert.equal(fs.existsSync(path.join(dir, file)), true, `${file} should exist`);
  }
});

test('skill tells agent to inspect recursively', () => {
  const skill = readSkill();
  assert.match(skill, /lore show <ID> --recursive/);
  assert.match(skill, /lore validate/);
});
