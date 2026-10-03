import { SHEET_CLASS_NAME } from "./constants.mjs";
import { PreferencesApp } from "./preferences-app.mjs";

// Hook do Application V1 nomeado pela classe (documentação oficial da V14): dispara na cadeia toda.
export function registerHeaderButton() {
  Hooks.on(`get${SHEET_CLASS_NAME}HeaderButtons`, (app, buttons) => {
    if (!Array.isArray(buttons)) return;
    buttons.unshift({
      label: game.i18n.localize("PJ.Header.Button"),
      class: "pj-prefs-btn",
      icon: "fa-solid fa-campground",
      onclick: () => PreferencesApp.show(),
    });
  });
}
