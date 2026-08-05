#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), 'utf8').replace(/\r\n/g, '\n').trim();
}

function stripFrontmatter(text) {
  return text.replace(/^---\n[\s\S]*?\n---\n*/, '').trim();
}

const agents = read('AGENTS.md');
const canonical = agents.replace(/\n\n（このファイルは[\s\S]*?）$/, '').trim();

// Compact copies: AGENTS.mdと同じ本文。host固有のfrontmatterだけ除外する。
const copies = [
  ['.cursor/rules/ponytail.mdc', stripFrontmatter],
  ['.windsurf/rules/ponytail.md', text => text.trim()],
  ['.clinerules/ponytail.md', text => text.trim()],
  ['.agents/rules/ponytail.md', text => text.trim()],
  ['.qoder/rules/ponytail.md', text => text.trim()],
  ['.github/copilot-instructions.md', text => text.trim()],
  ['.kiro/steering/ponytail.md', stripFrontmatter],
];

let failed = false;

for (const [relPath, normalize] of copies) {
  const actual = normalize(read(relPath));
  if (actual !== canonical) {
    console.error(`${relPath} drifted from AGENTS.md`);
    failed = true;
  }
}

// SKILL.mdはruntimeのsource of truthで、compact bodyより長いためbyte比較はしない。
// 代わりに、重要なruleがSKILL.mdとAGENTS.mdの両方に残っていることを確認する。
const INVARIANTS = [
  'このコードベースにすでにある',
  '単純なヒューリスティック',
  '実行可能な確認を1つ',
  '壊れやすい方',
  '信頼境界での入力検証',
  'データ損失を防ぐエラーハンドリング',
  'セキュリティ',
  'アクセシビリティ',
  '確認のない最小コードは未完成',
];

const skill = read('skills/ponytail/SKILL.md');
const sources = [['skills/ponytail/SKILL.md', skill], ['AGENTS.md', agents]];
for (const phrase of INVARIANTS) {
  for (const [label, text] of sources) {
    if (!text.includes(phrase)) {
      console.error(`${label} is missing rule invariant: "${phrase}"`);
      failed = true;
    }
  }
}

if (failed) {
  console.error('Copied rule text、AGENTS.md、SKILL.mdを更新し、共有ruleを一致させてください。');
  process.exit(1);
}

console.log(`Rule copies match AGENTS.md; ${INVARIANTS.length} rule invariants present in SKILL.md and AGENTS.md.`);
