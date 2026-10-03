// Descobre a raiz da janela de uma ficha V1 (o hook entrega jQuery) ou V2 (elemento).
export function sheetRoot(app, html) {
  const candidate = app?.element?.[0] ?? app?.element ?? html?.[0] ?? html;
  if (!(candidate instanceof HTMLElement)) return null;
  return candidate.closest(".window-app") ?? candidate;
}
