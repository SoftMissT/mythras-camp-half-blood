import { MODULE_ID, SETTINGS, LAYOUTS_ENABLED, LOG } from "./constants.mjs";
import { getPref, setPref, resetPreferences } from "./prefs.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

let instance = null;
const isOpen = (app) => !!(app && (app.rendered ?? app.element?.isConnected));

async function guardado(app, fn) {
  try {
    await fn();
  } catch (err) {
    console.warn(LOG, "Falha ao salvar preferência.", err);
    ui.notifications?.error(game.i18n.localize("PJ.Err.Save"));
  }
  return app.render();
}

export class PreferencesApp extends HandlebarsApplicationMixin(ApplicationV2) {
  // Uma janela só: o botão do cabeçalho e o menu de configurações abrem a mesma.
  constructor(options = {}) {
    if (isOpen(instance)) return instance;
    super(options);
    instance = this;
  }

  static DEFAULT_OPTIONS = {
    id: "pj-preferences",
    classes: ["pj-prefs"],
    position: { width: 420, height: "auto" },
    window: {
      title: "PJ.Prefs.Title",
      icon: "fa-solid fa-campground",
      resizable: false,
    },
    actions: {
      setLayout: PreferencesApp.onSetLayout,
      toggleTheme: PreferencesApp.onToggleTheme,
      toggleQuickRoll: PreferencesApp.onToggleQuickRoll,
      reset: PreferencesApp.onReset,
    },
  };

  static PARTS = {
    body: { template: `modules/${MODULE_ID}/templates/app/preferences.hbs` },
  };

  static async show() {
    const app = new PreferencesApp();
    await app.render({ force: true });
    app.bringToFront?.();
    return app;
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const layout = getPref(SETTINGS.LAYOUT);
    return Object.assign(context, {
      isClassic: layout === "classic",
      isCamp: layout === "camp",
      campEnabled: LAYOUTS_ENABLED.includes("camp"),
      theme: getPref(SETTINGS.THEME),
      themeLabel: game.i18n.localize(`PJ.Prefs.Theme${getPref(SETTINGS.THEME)[0].toUpperCase()}${getPref(SETTINGS.THEME).slice(1)}`),
      themeOn: getPref(SETTINGS.THEME) !== "system",
      quickRollOn: !!getPref(SETTINGS.QUICK_ROLL),
      emblem: `modules/${MODULE_ID}/assets/emblema-acampamento.svg`,
      version: game.modules.get(MODULE_ID)?.version ?? "",
    });
  }

  static onSetLayout(event, target) {
    const value = target.dataset.layout;
    if (!LAYOUTS_ENABLED.includes(value)) return undefined;
    return guardado(this, () => setPref(SETTINGS.LAYOUT, value));
  }

  static onToggleTheme() {
    const current = getPref(SETTINGS.THEME);
    const next = current === "system" ? "dark" : current === "dark" ? "light" : "system";
    return guardado(this, () => setPref(SETTINGS.THEME, next));
  }

  static onToggleQuickRoll() {
    return guardado(this, () =>
      setPref(SETTINGS.QUICK_ROLL, !getPref(SETTINGS.QUICK_ROLL)),
    );
  }

  static onReset() {
    return guardado(this, () => resetPreferences());
  }
}
