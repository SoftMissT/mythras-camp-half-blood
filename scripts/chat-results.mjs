// Estiliza somente o resultado do cartão d100 do Mythras; nunca recalcula a rolagem.
const OUTCOME = Object.freeze({
  critical: "critical",
  success: "success",
  failure: "failure",
});
const CRITICAL = /\b(?:critical|cr[ií]tico|cr[ií]tica)\b/i;
const SUCCESS = /^(?:success|sucesso|passou|passed)[.!: ]*$/i;
const FAILURE = /^(?:failure|falha|falhou|failed)[.!: ]*$/i;

export function classifyOutcomeText(value) {
  const text = String(value ?? "").trim();
  if (CRITICAL.test(text)) return OUTCOME.critical;
  if (SUCCESS.test(text)) return OUTCOME.success;
  if (FAILURE.test(text)) return OUTCOME.failure;
  return null;
}

function isMythrasD100Card(root) {
  const marker =
    root.matches?.("[data-system='mythras'], .mythras-roll, .mythras-card") ||
    root.querySelector?.(
      "[data-system='mythras'], .mythras-roll, .mythras-card",
    );
  const text = root.textContent ?? "";
  const difficultyTable =
    /very\s+easy|muito\s+f[aá]cil/i.test(text) &&
    /herculean|herc[uú]lea/i.test(text);
  return Boolean(marker || difficultyTable);
}

function styleOutcomeCell(cell) {
  const result = classifyOutcomeText(cell.textContent);
  if (!result) return;
  cell.classList.remove(
    "pj-result-failure",
    "pj-result-success",
    "pj-result-critical",
  );
  cell.classList.add(`pj-result-${result}`);
  cell.dataset.pjOutcome = result;
}

export function styleMythrasD100Card(root) {
  if (!(root instanceof HTMLElement) || !isMythrasD100Card(root)) return false;
  const cells = root.querySelectorAll(
    "td, th, .result, .outcome, [data-result], [data-outcome]",
  );
  for (const cell of cells) styleOutcomeCell(cell);
  return true;
}

export function registerChatResultStyling() {
  Hooks.on("renderChatMessageHTML", (_message, html) =>
    styleMythrasD100Card(html),
  );
}
