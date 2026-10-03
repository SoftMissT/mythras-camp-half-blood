// Coloreia resultados do cartão nativo sem substituir a mecânica do Mythras.
const CRITICAL = /cr[ií]tico|critical/i;
const SUCCESS = /sucesso|success|passou|passed/i;
const FAILURE = /falha|failure|falhou|failed/i;

function classify(row) {
  const text = row.textContent ?? "";
  if (CRITICAL.test(text)) row.classList.add("pj-result-critical");
  else if (SUCCESS.test(text)) row.classList.add("pj-result-success");
  else if (FAILURE.test(text)) row.classList.add("pj-result-failure");
}

export function registerChatResultStyling() {
  Hooks.on("renderChatMessageHTML", (_message, html) => {
    const root = html instanceof HTMLElement ? html : html?.[0];
    if (!(root instanceof HTMLElement)) return;
    for (const row of root.querySelectorAll("tr, li, .result, .outcome, .chat-card")) classify(row);
  });
}
