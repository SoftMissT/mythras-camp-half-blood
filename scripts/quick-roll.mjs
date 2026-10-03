// Rolagem rápida (RF-080..087). O módulo NÃO calcula nada: reaproveita o clique direito do sistema,
// que rola 1d100 contra as 6 dificuldades e posta o cartão no chat.
import { SETTINGS, LOG } from "./constants.mjs";
import { getPref } from "./prefs.mjs";
import { sheetRoot } from "./dom.mjs";

const ATTACHED = "pjQuickRoll";
const TIP_MARK = "pjTip";

// RF-084: só intercepta se houver uma perícia identificável ([data-item-id] num ancestral).
function alvo(event) {
  const el = event.target?.closest?.(".rollableSkill");
  if (!el || !el.closest("[data-item-id]")) return null;
  return el;
}

function disparar(el, tipo, origem) {
  const ev = new MouseEvent(tipo, {
    bubbles: true,
    cancelable: true,
    view: origem.view ?? null,
    button: tipo === "click" ? 0 : 2,
    clientX: origem.clientX,
    clientY: origem.clientY,
  });
  ev._pj = true; // marca: as nossas escutas ignoram este evento
  el.dispatchEvent(ev);
}

function onClick(event) {
  if (event._pj) return;
  if (!getPref(SETTINGS.QUICK_ROLL)) return;
  if (
    event.button !== 0 ||
    event.shiftKey ||
    event.ctrlKey ||
    event.altKey ||
    event.metaKey
  )
    return;
  const el = alvo(event);
  if (!el) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  disparar(el, "contextmenu", event); // o sistema rola direto
}

function onContext(event) {
  if (event._pj) return;
  if (!getPref(SETTINGS.QUICK_ROLL)) return;
  const el = alvo(event);
  if (!el) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  disparar(el, "click", event); // o sistema abre o menu completo
}

// Dica "Clique: rolar · Direito: opções" só enquanto a opção estiver ligada, e só nos elementos
// que não tinham dica própria.
export function syncTips(root) {
  const on = getPref(SETTINGS.QUICK_ROLL);
  const tip = game.i18n.localize("PJ.Tip.QuickRoll");
  for (const el of root.querySelectorAll(".rollableSkill")) {
    if (on) {
      if (!el.title) {
        el.title = tip;
        el.dataset[TIP_MARK] = "1";
      }
    } else if (el.dataset[TIP_MARK] === "1") {
      el.removeAttribute("title");
      delete el.dataset[TIP_MARK];
    }
  }
}

export function attachQuickRoll(app, html) {
  const root = sheetRoot(app, html);
  if (!root) {
    console.warn(LOG, "Rolagem rápida: não achei a janela da ficha.");
    return;
  }
  syncTips(root);
  if (root.dataset[ATTACHED] === "1") return; // sem escutas duplicadas em re-render
  root.dataset[ATTACHED] = "1";
  root.addEventListener("click", onClick, true);
  root.addEventListener("contextmenu", onContext, true);
}
