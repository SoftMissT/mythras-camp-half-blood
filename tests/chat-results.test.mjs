import test from "node:test";
import assert from "node:assert/strict";
import { classifyOutcomeText } from "../scripts/chat-results.mjs";
import { translateLabel } from "../scripts/sheet-translation.mjs";

test("classifica falha d100", () =>
  assert.equal(classifyOutcomeText("FAILURE!"), "failure"));
test("classifica sucesso d100", () =>
  assert.equal(classifyOutcomeText("SUCCESS!"), "success"));
test("classifica crítico antes de sucesso", () =>
  assert.equal(classifyOutcomeText("CRITICAL SUCCESS!"), "critical"));
test("classifica crítico isolado", () =>
  assert.equal(classifyOutcomeText("CRÍTICO"), "critical"));
test("ignora texto que não é célula de resultado", () =>
  assert.equal(classifyOutcomeText("Teste de perícia"), null));

test("traduz os grupos de perícias expostos pelo Mythras", () => {
  assert.equal(translateLabel("Standard Skills"), "Perícias padrão");
  assert.equal(translateLabel("Professional Skills"), "Perícias profissionais");
  assert.equal(translateLabel("Magic Skills"), "Perícias mágicas");
  assert.equal(translateLabel("Cults & Brotherhoods"), "Cultos e irmandades");
  assert.equal(translateLabel("Athletics"), "Atletismo");
  assert.equal(translateLabel("First Aid"), "Primeiros socorros");
});

test("traduz os resultados e estados exibidos na ficha e no chat", () => {
  assert.equal(translateLabel("FAILURE!"), "FALHA!");
  assert.equal(translateLabel("SUCCESS!"), "SUCESSO!");
  assert.equal(translateLabel("Fresh"), "Revigorado");
  assert.equal(translateLabel("Roll Modifiers"), "Modificadores da rolagem");
  assert.equal(translateLabel("Rolling Athletics"), "Rolando Atletismo");
  assert.equal(translateLabel("Social Class:"), "Classe social:");
});
