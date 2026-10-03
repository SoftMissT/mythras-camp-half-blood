import { effectiveTheme } from "./prefs.mjs";
import { sheetRoot } from "./dom.mjs";

// Aplica (ou remove) as classes de tema na janela da ficha (Specs §4.6).
export function applyTheme(app, html) {
  const root = sheetRoot(app, html);
  if (!root) return;
  for (const cls of [...root.classList]) {
    if (cls === "pj-themed" || cls.startsWith("pj-theme-")) root.classList.remove(cls);
  }
  const theme = effectiveTheme();
  if (theme) root.classList.add("pj-themed", `pj-theme-${theme}`);
}
