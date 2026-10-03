// Tradução de rótulos estáticos expostos pela ficha Mythras. Não toca em valores de Actor.
const LABELS = new Map([
  ["Name", "Nome"], ["Description", "Descrição"], ["Main", "Principal"],
  ["Combat", "Combate"], ["Skills", "Perícias"], ["Items", "Itens"],
  ["Characteristics", "Características"], ["Attributes", "Atributos"],
  ["Fatigue", "Fadiga"], ["Life", "Vida"], ["Localization", "Localização"],
  ["Armour Type", "Tipo de armadura"], ["Armour Points", "Pontos de armadura"],
  ["Armour Enc.", "Enc. da armadura"], ["Current Life", "Vida atual"],
  ["Max Life", "Vida máxima"], ["Combat Styles", "Estilos de combate"],
  ["Edit Item", "Editar item"], ["Delete Item", "Excluir item"],
]);

function translateTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const value = node.nodeValue.trim();
    const translated = LABELS.get(value);
    if (translated) node.nodeValue = node.nodeValue.replace(value, translated);
  }
}

export function translateMythrasSheet(_app, html) {
  const root = html instanceof HTMLElement ? html : html?.[0];
  if (root instanceof HTMLElement) translateTextNodes(root);
}
