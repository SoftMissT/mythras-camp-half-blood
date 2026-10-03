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
  ["frame", "Porte físico"],
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
  ["boating", "Navegação"],
  ["brawn", "Vigor físico"],
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
  ["no penalties", "Sem penalidades"],
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
  // Abas de fundo e cabeçalho (varredura de DOM, 2026-10-03).
  ["character", "Personagem"],
  ["character name", "Nome do personagem"],
  ["player name", "Nome do jogador"],
  ["experience rolls", "Rolagens de experiência"],
  ["tenacity", "Tenacidade"],
  ["career", "Carreira"],
  ["homeland", "Terra natal"],
  ["wounds and conditions", "Ferimentos e condições"],
  ["resistances", "Resistências"],
  ["traits", "Traços"],
  ["information", "Informações"],
  ["journal", "Diário"],
  // Combate e perícias de combate.
  ["hit locations", "Locais de acerto"],
  ["location", "Local"],
  ["armor", "Armadura"],
  ["natural armor", "Armadura natural"],
  ["penalty", "Penalidade"],
  ["roll 1d20", "Rolar 1d20"],
  ["unarmed", "Desarmado"],
  // Armas e equipamento.
  ["melee weapons", "Armas de corpo a corpo"],
  ["ranged weapons", "Armas à distância"],
  ["weapons", "Armas"],
  ["damage", "Dano"],
  ["force", "Força"],
  ["impale size", "Tamanho de empalamento"],
  ["reach", "Alcance"],
  ["range", "Alcance"],
  ["load", "Carga"],
  ["max. load", "Carga máx."],
  ["ammo", "Munição"],
  ["quantity", "Quantidade"],
  ["value", "Valor"],
  ["value (total)", "Valor (total)"],
  ["type", "Tipo"],
  ["carried", "Carregado"],
  ["equipped", "Equipado"],
  ["equipment", "Equipamento"],
  ["storage", "Armazenamento"],
  ["currency and wealth", "Moeda e riqueza"],
  ["clothing", "Vestuário"],
  ["consumables", "Consumíveis"],
  ["materials", "Materiais"],
  ["tools", "Ferramentas"],
  ["trinkets", "Badulaques"],
  ["sing", "Canto"],
  ["texts", "Textos"],
  ["encumbrance", "Sobrecarga"],
  ["burdened", "Sobrecarregado"],
  ["overloaded", "Sobrecarga excessiva"],
  // Magia.
  ["magic skill", "Perícia mágica"],
  ["memorized", "Memorizadas"],
  ["spells", "Magias"],
  ["intensity", "Intensidade"],
  ["magnitude", "Magnitude"],
  ["abilities", "Habilidades"],
  ["other", "Outros"],
  ["all", "Todos"],
  // Condições.
  ["comatose", "Comatoso"],
  ["incapacitated", "Incapacitado"],
  ["semi-conscious", "Semi-consciente"],
  ["exhausted", "Exausto"],
  // Atributos de elementos da ficha.
  ["create item", "Criar item"],
  ["delete", "Excluir"],
  ["fumbled", "Desastre"],
  ["trained", "Treinado"],
  ["search...", "Buscar..."],
  ["armor penalty", "Penalidade de armadura"],
  ["current enc", "ENC atual"],
  // Item sheets, diálogo Stat Tracker e nomes default do sistema (2026-10-03).
  ["base characteristics", "Características base"],
  ["enc penalty", "Penalidade de ENC"],
  ["training", "Treino"],
  ["misc", "Diversos"],
  ["uncategorized", "Sem categoria"],
  ["new storage", "Novo armazenamento"],
  ["new spell", "Nova magia"],
  ["stat tracker", "Acompanhamento de atributos"],
  ["coming soon :)", "Em breve :)"],
  ["roll range start", "Início da faixa de rolagem"],
  ["roll range end", "Fim da faixa de rolagem"],
  ["base hp", "HP base"],
  ["max hp", "HP máximo"],
  ["max hp mod", "Mod. de HP máximo"],
  ["current hp", "HP atual"],
]);

const TRANSLATED_ATTRIBUTES = ["title", "aria-label", "placeholder"];

export function translateLabel(value) {
  const text = String(value ?? "").trim();
  const normalized = text.toLowerCase().replace(/_/g, " ");
  const direct = LABELS.get(normalized);
  if (direct) return direct;
  const punctuation = normalized.match(/^(.+?)([:：])$/);
  if (punctuation) {
    const translated = LABELS.get(punctuation[1]);
    if (translated) return `${translated}${punctuation[2]}`;
  }
  const withValue = text.match(/^(.+?):\s*(.+)$/);
  if (withValue) {
    const translated = LABELS.get(withValue[1].trim().toLowerCase());
    if (translated) return `${translated}: ${withValue[2]}`;
  }
  const rolling = text.match(/^rolling\s+(.+)$/i);
  if (rolling) {
    const skill =
      LABELS.get(rolling[1].trim().toLowerCase()) ?? rolling[1].trim();
    return `Rolando ${skill}`;
  }
  return null;
}

function translateTextNodes(root) {
  const walker = root.ownerDocument?.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
  );
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
  const isD100Card =
    /very\s+easy|muito\s+f[aá]cil/i.test(text) &&
    /herculean|herc[uú]lea/i.test(text);
  return isD100Card && translateRenderedText(root);
}
