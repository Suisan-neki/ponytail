#!/usr/bin/env node

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const FORK_URL = 'https://github.com/Suisan-neki/ponytail';

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(root, relPath), 'utf8'));
}

test('Codex marketplace installs the Japanese fork from main', () => {
  const marketplace = readJson('.agents/plugins/marketplace.json');
  const plugin = marketplace.plugins.find((entry) => entry.name === 'ponytail');

  assert.ok(plugin, 'ponytail marketplace entry must exist');
  assert.equal(plugin.source.source, 'url');
  assert.equal(plugin.source.url, `${FORK_URL}.git`);
  assert.equal(plugin.source.ref, 'main');
});

test('Codex manifest exposes the Japanese fork metadata and adapters', () => {
  const manifest = readJson('.codex-plugin/plugin.json');

  assert.equal(manifest.repository, FORK_URL);
  assert.equal(manifest.homepage, FORK_URL);
  assert.equal(manifest.interface.websiteURL, FORK_URL);
  assert.match(manifest.interface.displayName, /日本語版/);
  assert.ok(fs.existsSync(path.join(root, manifest.skills)), 'skills path must exist');
  assert.ok(fs.existsSync(path.join(root, manifest.hooks)), 'hooks path must exist');
});
