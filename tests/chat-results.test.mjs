import test from "node:test";
import assert from "node:assert/strict";
import { classifyOutcomeText } from "../scripts/chat-results.mjs";

test("classifica falha d100", () => assert.equal(classifyOutcomeText("FAILURE!"), "failure"));
test("classifica sucesso d100", () => assert.equal(classifyOutcomeText("SUCCESS!"), "success"));
test("classifica crítico antes de sucesso", () => assert.equal(classifyOutcomeText("CRITICAL SUCCESS!"), "critical"));
test("classifica crítico isolado", () => assert.equal(classifyOutcomeText("CRÍTICO"), "critical"));
test("ignora texto que não é célula de resultado", () => assert.equal(classifyOutcomeText("Teste de perícia"), null));
