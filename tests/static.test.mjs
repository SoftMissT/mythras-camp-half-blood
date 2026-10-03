import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("não há modo escuro no código ativo", () => {
  const files = [
    "module.json",
    "scripts/constants.mjs",
    "scripts/preferences-app.mjs",
    "scripts/prefs.mjs",
    "styles/tokens.css",
    "templates/app/preferences.hbs",
    "lang/pt-BR.json",
  ];
  const source = files.map(read).join("\n").toLowerCase();
  assert.equal(source.includes("theme-dark"), false);
  assert.equal(source.includes("themedark"), false);
  assert.equal(source.includes("escuro"), false);
});

test("não há fontes binárias empacotadas", () => {
  assert.equal(fs.existsSync(path.join(root, "fonts")), false);
});

test("manifesto aponta para assets existentes", () => {
  const manifest = JSON.parse(read("module.json"));
  for (const file of [
    ...manifest.esmodules,
    ...manifest.styles,
    ...manifest.languages.map((entry) => entry.path),
  ]) {
    assert.equal(fs.existsSync(path.join(root, file)), true, file);
  }
  assert.equal(
    fs.existsSync(path.join(root, "assets/banner_modulo.webp")),
    true,
  );
});

test("manifesto mantém o canal estável de atualização do Foundry", () => {
  const manifest = JSON.parse(read("module.json"));
  assert.equal(
    manifest.manifest,
    "https://github.com/SoftMissT/mythras-camp-half-blood/releases/latest/download/module.json",
  );
  assert.match(manifest.download, /releases\/download\/v0\.0\.5\/mythras-camp-halfblood-v0\.0\.5\.zip$/);
});
