#!/usr/bin/env node
// Generate the OpenClaw / ClawHub skill package (.openclaw/skills/) from the
// canonical skills/. OpenClaw descriptions must be one line under 160 chars.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const HOMEPAGE = 'https://github.com/Suisan-neki/ponytail';

const DESCRIPTIONS = {
  'ponytail': 'コーディング全般でYAGNI、stdlib、native機能を優先し、不要な抽象化を避ける怠け者のシニア開発者mode。',
  'ponytail-review': 'diffの過剰設計をreviewし、再実装、不要なdependency、推測的な抽象化などの削除候補を1行ずつ示す。',
  'ponytail-audit': 'repository全体の過剰設計をauditし、削除・簡素化・stdlibやnative機能への置換候補を優先順で示す。',
  'ponytail-debt': 'すべてのponytail: shortcut commentをdebt ledgerへ集め、先送りを追跡する一回限りのreport。',
  'ponytail-gain': '公開benchmarkに基づくcode量、cost、速度への効果をscoreboardで示す一回限りの表示。',
  'ponytail-help': 'Ponytailのmode、skill、commandを一覧するquick reference。',
};

const NAMES = Object.keys(DESCRIPTIONS);

function sourceBody(name) {
  const src = fs.readFileSync(path.join(ROOT, 'skills', name, 'SKILL.md'), 'utf8').replace(/\r\n/g, '\n');
  const fm = src.match(/^---\n[\s\S]*?\n---\n?/);
  if (!fm) throw new Error(`skills/${name}/SKILL.md has no frontmatter`);
  return src.slice(fm[0].length);
}

function render(name) {
  const desc = DESCRIPTIONS[name];
  if (desc.length > 160 || desc.includes('\n') || desc.includes('"')) {
    throw new Error(`description for ${name} must be one line, no quotes, under 160 chars`);
  }
  const frontmatter =
    `---\nname: ${name}\ndescription: "${desc}"\nhomepage: ${HOMEPAGE}\nlicense: MIT\n---\n`;
  return frontmatter + sourceBody(name);
}

function outPath(name) {
  return path.join(ROOT, '.openclaw', 'skills', name, 'SKILL.md');
}

module.exports = { DESCRIPTIONS, NAMES, render, outPath, sourceBody };

if (require.main === module) {
  for (const name of NAMES) {
    const p = outPath(name);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, render(name));
    console.log('wrote', path.relative(ROOT, p).replace(/\\/g, '/'));
  }
}
