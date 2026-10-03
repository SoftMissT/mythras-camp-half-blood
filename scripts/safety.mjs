import { SYSTEM_ID, SYSTEM_VERSION_TESTED, LOG } from "./constants.mjs";

const warned = new Set();

// Aviso na tela só uma vez por sessão; o console recebe sempre.
export function warnOnce(key, i18nKey, data = {}) {
  const message = game.i18n.format(i18nKey, data);
  console.warn(LOG, message);
  if (warned.has(key)) return;
  warned.add(key);
  ui.notifications?.warn(message);
}

export function isMythrasWorld() {
  return game.system?.id === SYSTEM_ID;
}

export function checkEnvironment() {
  if (!isMythrasWorld()) return { ok: false };
  const found = game.system.version;
  if (found !== SYSTEM_VERSION_TESTED) {
    warnOnce("system-version", "PJ.Warn.SystemVersion", {
      found,
      tested: SYSTEM_VERSION_TESTED,
    });
  }
  return { ok: true };
}
