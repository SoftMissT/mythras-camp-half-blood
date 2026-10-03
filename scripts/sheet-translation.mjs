// Camada visual de localização. Traduz apenas rótulos expostos pelo Mythras;
// não altera nomes, valores, fórmulas ou dados persistidos do Actor.
const LABELS = new Map([
  ["name", "Nome"],
  ["description", "Descrição"],
  ["main", "Principal"],
  ["combat", "Combate"],
  ["skills", "Perícias"],
  ["items", "Itens"],
  ["characteristics", "Características"],
  ["attributes", "Atributos"],
  ["movement", "Movimento"],
  ["fatigue", "Fadiga"],
  ["life", "Vida"],
  ["localization", "Localização"],
  ["social class", "Classe social"],
  ["culture", "Cultura"],
  ["gender", "Gênero"],
  ["age", "Idade"],
  ["height", "Altura"],
  ["weight", "Peso"],
  ["handedness", "Mão dominante"],
  ["frame", "Constituição física"],
  ["constitution", "Constituição"],
  ["strength", "Força"],
  ["size", "Tamanho"],
  ["dexterity", "Destreza"],
  ["intelligence", "Inteligência"],
  ["power", "Poder"],
  ["charisma", "Carisma"],
  ["action points", "Pontos de ação"],
  ["damage mod", "Mod. de dano"],
  ["experience mod", "Mod. de experiência"],
  ["healing rate", "Taxa de cura"],
  ["initiative bonus", "Bônus de iniciativa"],
  ["luck points", "Pontos de sorte"],
  ["magic points", "Pontos de magia"],
  ["walk", "Andar"],
  ["run", "Correr"],
  ["sprint", "Disparada"],
  ["climb", "Escalar"],
  ["swim", "Nadar"],
  ["v. jump", "Salto vertical"],
  ["h. jump", "Salto horizontal"],
  ["armour type", "Tipo de armadura"],
  ["armour points", "Pontos de armadura"],
  ["armour enc.", "Enc. da armadura"],
  ["current life", "Vida atual"],
  ["max life", "Vida máxima"],
  ["standard skills", "Perícias padrão"],
  ["professional skills", "Perícias profissionais"],
  ["combat styles", "Estilos de combate"],
  ["magic skills", "Perícias mágicas"],
  ["passions", "Paixões"],
  ["cults & brotherhoods", "Cultos e irmandades"],
  ["athletics", "Atletismo"],
  ["boating", "Náutica"],
  ["brawn", "Vigor"],
  ["conceal", "Ocultar"],
  ["customs", "Costumes"],
  ["dance", "Dança"],
  ["deceit", "Enganação"],
  ["drive", "Condução"],
  ["endurance", "Resistência"],
  ["evade", "Evasão"],
  ["first aid", "Primeiros socorros"],
  ["influence", "Influência"],
  ["insight", "Intuição"],
  ["locale", "Localidade"],
  ["native tongue", "Língua nativa"],
  ["perception", "Percepção"],
  ["ride", "Cavalgar"],
  ["sleight", "Prestidigitação"],
  ["stealth", "Furtividade"],
  ["streetwise", "Conhecimento das ruas"],
  ["swim", "Natação"],
  ["willpower", "Vontade"],
  ["base char", "Característica base"],
  ["rank", "Graduação"],
  ["roll", "Rolar"],
  ["roll modifiers", "Modificadores da rolagem"],
  ["skill", "Perícia"],
  ["result", "Resultado"],
  ["difficulty", "Dificuldade"],
  ["actor", "Ator"],
  ["rolling", "Rolando"],
  ["very easy", "Muito fácil"],
  ["easy", "Fácil"],
  ["standard", "Padrão"],
  ["hard", "Difícil"],
  ["formidable", "Formidável"],
  ["herculean", "Hercúlea"],
  ["failure!", "FALHA!"],
  ["success!", "SUCESSO!"],
  ["critical!", "CRÍTICO!"],
  ["failure", "Falha"],
  ["success", "Sucesso"],
  ["critical", "Crítico"],
  ["fresh", "Revigorado"],
  ["winded", "Ofegante"],
  ["tired", "Cansado"],
  ["wearied", "Exausto"],
  ["dazed", "Atordoado"],
  ["debilitated", "Debilitado"],
  ["unconscious", "Inconsciente"],
  ["dead", "Morto"],
  ["edit item", "Editar item"],
  ["delete item", "Excluir item"],
]);

const TRANSLATED_ATTRIBUTES = ["title", "aria-label", "placeholder"];

export function translateLabel(value) {
  const text = String(value ?? "").trim();
  const normalized = text.toLowerCase();
  const direct = LABELS.get(normalized);
  if (direct) return direct;
  const punctuation = normalized.match(/^(.+?)([:：])$/);
  if (punctuation) {
    const translated = LABELS.get(punctuation[1]);
    if (translated) return `${translated}${punctuation[2]}`;
  }
  const rolling = text.match(/^rolling\s+(.+)$/i);
  if (rolling) {
    const skill = LABELS.get(rolling[1].trim().toLowerCase()) ?? rolling[1].trim();
    return `Rolando ${skill}`;
  }
  return null;
}

function translateTextNodes(root) {
  const walker = root.ownerDocument?.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  if (!walker) return;
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const original = node.nodeValue ?? "";
    const trimmed = original.trim();
    const translated = translateLabel(trimmed);
    if (translated) {
      node.nodeValue = original.replace(trimmed, translated);
    }
  }
}

function translateAttributes(root) {
  for (const element of root.querySelectorAll?.("*") ?? []) {
    for (const attribute of TRANSLATED_ATTRIBUTES) {
      const value = element.getAttribute(attribute);
      const translated = translateLabel(value);
      if (translated) element.setAttribute(attribute, translated);
    }
  }
}

export function translateRenderedText(root) {
  if (!(root instanceof HTMLElement)) return false;
  translateTextNodes(root);
  translateAttributes(root);
  return true;
}

function observeSheetRenders(root) {
  if (root.dataset.pjTranslationObserver === "true") return;
  const Observer = root.ownerDocument?.defaultView?.MutationObserver;
  if (!Observer) return;
  const observer = new Observer(() => translateRenderedText(root));
  observer.observe(root, { childList: true, subtree: true });
  root.dataset.pjTranslationObserver = "true";
}

export function translateMythrasSheet(_app, html) {
  const root = html instanceof HTMLElement ? html : html?.[0];
  if (!translateRenderedText(root)) return;
  observeSheetRenders(root);
}

export function translateMythrasChatMessage(root) {
  if (!(root instanceof HTMLElement)) return false;
  const text = root.textContent ?? "";
  const isD100Card = /very\s+easy|muito\s+f[aá]cil/i.test(text)
    && /herculean|herc[uú]lea/i.test(text);
  return isD100Card && translateRenderedText(root);
}
