import {
  MODULE_ID,
  SETTINGS,
  DEFAULTS,
  SHEET_CLASS_NAME,
  LOG,
} from "./constants.mjs";

export function getPref(key) {
  try {
    return game.settings.get(MODULE_ID, key);
  } catch (err) {
    console.warn(LOG, `Não consegui ler "${key}"; usando o padrão.`, err);
    return DEFAULTS[key];
  }
}

export function setPref(key, value) {
  return game.settings.set(MODULE_ID, key, value);
}

// O módulo oferece somente o visual Camp claro.
export function effectiveTheme() {
  return "light";
}

// Junta as fichas Mythras que estão abertas. `_sheet` é a instância já criada de cada ator
// (evita criar fichas novas só para consultar). `ui.windows` cobre fichas V1 de atores sem vínculo.
function openSheets() {
  const sheets = new Set();
  const add = (sheet) => {
    if (sheet?.rendered && sheet.constructor?.name === SHEET_CLASS_NAME)
      sheets.add(sheet);
  };
  for (const actor of game.actors ?? []) add(actor._sheet);
  for (const token of globalThis.canvas?.tokens?.placeables ?? [])
    add(token.actor?._sheet);
  for (const win of Object.values(globalThis.ui?.windows ?? {})) add(win);
  return sheets;
}

function doRefresh() {
  for (const sheet of openSheets()) {
    try {
      sheet.render(false);
    } catch (err) {
      console.warn(LOG, "Falha ao atualizar uma ficha aberta.", err);
    }
  }
}

// Agrupa várias mudanças seguidas (ex.: "Voltar ao padrão" grava 3 valores) em uma só atualização.
let timer = null;
export function refreshSheets() {
  clearTimeout(timer);
  timer = setTimeout(doRefresh, 25);
}

export async function resetPreferences() {
  await Promise.all(
    Object.entries(DEFAULTS).map(([key, value]) => setPref(key, value)),
  );
  refreshSheets();
}
