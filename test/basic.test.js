import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const bin = path.join(root, 'bin/lore-skill.js');

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
    '.github/copilot-instructions.md',
    'AGENTS.md'
  ];

  for (const file of expected) {
    assert.equal(fs.existsSync(path.join(dir, file)), true, `${file} should exist`);
  }
});

test('skill tells agent to inspect recursively', () => {
  const skill = fs.readFileSync(path.join(root, 'templates/skills/lore/SKILL.md'), 'utf8');
  assert.match(skill, /lore show <ID> --recursive/);
  assert.match(skill, /lore validate/);
});
