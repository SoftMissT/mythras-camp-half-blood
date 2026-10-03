// Acessibilidade da HUD: atributos de apresentação e teclado.
// Só toca em aria/tabindex/data-*, nunca em valores de ator (Art. IV).

function rotulo(el) {
  const vizinho = [el.nextElementSibling, el.previousElementSibling].find(
    (irmao) => irmao?.classList?.contains("input-label"),
  );
  if (vizinho) return vizinho.textContent.trim();
  return (
    el.closest(".stats-container")?.querySelector(".stat-minimizer")
      ?.textContent.trim() ?? ""
  );
}

function operavel(el, nome) {
  if (el.dataset.pjA11y === "1") return;
  el.setAttribute("tabindex", "0");
  el.setAttribute("role", "button");
  if (nome && !el.hasAttribute("aria-label")) el.setAttribute("aria-label", nome);
  el.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    el.click();
  });
  el.dataset.pjA11y = "1";
}

function enhance(root) {
  for (const btn of root.querySelectorAll?.(".plus-minus-buttons a") ?? []) {
    const acao = btn.classList.contains("stat-increase") ? "Aumentar" : "Diminuir";
    operavel(btn, `${acao} ${rotulo(btn)}`.trim());
  }
  const engrenagem = root.querySelector?.(".stat-settings");
  if (engrenagem) operavel(engrenagem, "Ajustar atributos da ficha");
  for (const input of root.querySelectorAll?.(".sheet-header input") ?? []) {
    if (input.dataset.pjA11y === "1") continue;
    const nome = rotulo(input);
    if (nome) input.setAttribute("aria-label", nome);
    input.dataset.pjA11y = "1";
  }
}

// Reaplica quando o sistema troca nós no meio da ficha (mesmo padrão da tradução).
function observar(root) {
  if (root.dataset.pjA11yObserver === "true") return;
  const Observer = root.ownerDocument?.defaultView?.MutationObserver;
  if (!Observer) return;
  new Observer(() => enhance(root)).observe(root, {
    childList: true,
    subtree: true,
  });
  root.dataset.pjA11yObserver = "true";
}

export function enhanceSheetA11y(_app, html) {
  const root = html instanceof HTMLElement ? html : html?.[0];
  if (!(root instanceof HTMLElement)) return;
  enhance(root);
  observar(root);
}
