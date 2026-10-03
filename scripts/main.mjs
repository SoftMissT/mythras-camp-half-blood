import { MODULE_ID, SYSTEM_ID, SHEET_CLASS_NAME, LOG } from "./constants.mjs";
import { registerSettings, migrateToCampTemplate } from "./settings.mjs";
import { registerHeaderButton } from "./header-button.mjs";
import { attachQuickRoll } from "./quick-roll.mjs";
import { applyTheme } from "./theme.mjs";
import { checkEnvironment } from "./safety.mjs";
import { resetPreferences } from "./prefs.mjs";
import { registerChatResultStyling } from "./chat-results.mjs";

// Um erro nosso nunca pode impedir a ficha de abrir (Constituição, Art. IV).
const seguro =
  (nome, fn) =>
  (...args) => {
    try {
      return fn(...args);
    } catch (err) {
      console.warn(
        LOG,
        `Falha em ${nome}; a ficha continua como o sistema a monta.`,
        err,
      );
      return undefined;
    }
  };

Hooks.once("init", () => {
  if (game.system.id !== SYSTEM_ID) return;
  registerSettings();
  registerHeaderButton();
  registerChatResultStyling();
  Hooks.on(`render${SHEET_CLASS_NAME}`, seguro("tema", applyTheme));
  Hooks.on(
    `render${SHEET_CLASS_NAME}`,
    seguro("rolagem rápida", attachQuickRoll),
  );
  const mod = game.modules.get(MODULE_ID);
  if (mod) mod.api = { version: mod.version, resetPreferences };
});

Hooks.once("ready", () => {
  if (game.system.id !== SYSTEM_ID) return;
  migrateToCampTemplate().catch((err) => console.warn(LOG, "Falha na migração v0.0.3.", err));
  seguro("verificação", checkEnvironment)();
});
