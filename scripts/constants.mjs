// Constantes do módulo. Nada aqui toca em dados do sistema.
export const MODULE_ID = "mythras-camp-halfblood";
export const SYSTEM_ID = "mythras";
export const SYSTEM_VERSION_TESTED = "2.3.0";
// Nome da classe da ficha de personagem do Mythras (confirmado no console do usuário).
export const SHEET_CLASS_NAME = "CharacterSheetMythras";
export const LOG = "[mythras-camp-halfblood]";

export const SETTINGS = Object.freeze({
  LAYOUT: "layout",
  THEME: "theme",
  QUICK_ROLL: "quickRoll",
  MIGRATION: "migration",
});

// Valores padrão: com eles, nenhuma ficha muda de aparência (Constituição, Art. V).
export const DEFAULTS = Object.freeze({
  layout: "camp",
  theme: "light",
  quickRoll: true,
});

export const THEME_IDS = Object.freeze(["system", "light", "dark"]);
export const CURRENT_MIGRATION = "0.0.3";
// Layouts que o painel permite escolher nesta versão (o Camp chega na v0.3).
export const LAYOUTS_ENABLED = Object.freeze(["classic", "camp"]);
