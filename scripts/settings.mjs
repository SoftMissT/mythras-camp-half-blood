import {
  MODULE_ID,
  SETTINGS,
  DEFAULTS,
  CURRENT_MIGRATION,
} from "./constants.mjs";
import { refreshSheets } from "./prefs.mjs";
import { PreferencesApp } from "./preferences-app.mjs";

// Tudo com scope "user" (Research D4): vale para o jogador em qualquer computador.
export function registerSettings() {
  const comum = {
    scope: "user",
    config: false,
    onChange: () => refreshSheets(),
  };
  game.settings.register(MODULE_ID, SETTINGS.LAYOUT, {
    ...comum,
    name: "PJ.Prefs.Layout",
    type: String,
    default: DEFAULTS.layout,
  });
  game.settings.register(MODULE_ID, SETTINGS.THEME, {
    ...comum,
    name: "PJ.Prefs.Theme",
    type: String,
    default: DEFAULTS.theme,
  });
  game.settings.register(MODULE_ID, SETTINGS.QUICK_ROLL, {
    ...comum,
    name: "PJ.Prefs.QuickRoll",
    type: Boolean,
    default: DEFAULTS.quickRoll,
  });
  game.settings.register(MODULE_ID, SETTINGS.MIGRATION, {
    ...comum,
    name: "Migration",
    type: String,
    default: "",
  });
  game.settings.registerMenu(MODULE_ID, "preferences", {
    name: "PJ.Menu.Name",
    label: "PJ.Menu.Label",
    hint: "PJ.Menu.Hint",
    icon: "fa-solid fa-campground",
    type: PreferencesApp,
    restricted: false,
  });
}

export async function migrateToCampTemplate() {
  if (game.settings.get(MODULE_ID, SETTINGS.MIGRATION) === CURRENT_MIGRATION)
    return;
  await Promise.all([
    game.settings.set(MODULE_ID, SETTINGS.LAYOUT, DEFAULTS.layout),
    game.settings.set(MODULE_ID, SETTINGS.THEME, DEFAULTS.theme),
    game.settings.set(MODULE_ID, SETTINGS.MIGRATION, CURRENT_MIGRATION),
  ]);
}
