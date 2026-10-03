## 0.0.10 (2026-10-03): redesign da HUD e composição da ficha

- **Corrigido:** cabeçalho da ficha deixou de quebrar os cartões de atributos para uma segunda linha; identidade e recursos agora ocupam duas colunas alinhadas.
- **Corrigido:** altura mínima, espaçamento e largura dos cartões ajustados para remover o vazio visual e a compressão dos campos.
- **Redesign:** cabeçalho agora usa contraste em camadas, moldura de avatar, campo de personagem em pergaminho, cartões de recurso com raio controlado e faixa de navegação integrada.
- **Redesign:** conteúdo da ficha agora usa painéis com cabeçalho, divisores, zebra suave, hover legível e tabelas com ritmo uniforme; Personagem e Habilidades deixaram de parecer listas sem composição.
- **Novo:** fallback responsivo para telas estreitas com rolagem horizontal apenas na faixa de recursos.
- **Validação:** captura ao vivo no Foundry após injeção do CSS mostrou o cabeçalho reduzido de 282px para 164px; `git diff --check` e `node --check scripts/a11y.mjs` passaram.

## 0.0.9 (2026-10-03): HUD do cabeçalho acessível + locais de acerto em português

- **Novo:** HUD do cabeçalho reestruturada (Parte 3 do CSS): avatar com borda dourada, nomes com rótulo junto ao campo (13px), cartões de atributos sobre o azul do cabeçalho, números tabulares. Alvos de clique >= 24x24px (WCAG 2.5.8) em +/-, engrenagem e controles da janela; anel de foco visível de 2px com contraste AA.
- **Novo:** `scripts/a11y.mjs` - aria-labels em português (Aumentar/Diminuir <atributo>, Ajustar atributos da ficha), tabindex/role nos controles div/span com teclado (Enter/Espaço), MutationObserver para sheets novos. Só toca aria/tabindex/data-* - nenhum valor de ator (Art. IV).
- **Corrigido:** locais de acerto em inglês (Right Leg, Left Leg, Abdomen, Chest, Right Arm, Left Arm, Head) renomeados no mundo (atores "LLM" e "Ator" + compendium humanoidHitLocations) para as traducoes oficiais do proprio sistema Mythras (`static/lang/ptbr.json`): Perna direita, Perna esquerda, Abdômen, Peito, Braço direito, Braço esquerdo, Cabeça (mapa en->pt oficial). Logico do sistema usa id, nao nome (verificado no fonte kp-systems/mythras) - renomeio sem efeito em rolagens. Reversivel: aplicar o mapa inverso.
- **Decisão:** siglas STR/CON/SIZ/DEX/INT/POW/CHA, AP, HP, DM e ENC mantidas em ingles - o sistema oficial nao tem chave pt-BR para elas (fallback en em `MYTHRAS.STR`); traduzir seria inventar siglas fora da fonte.
- **Novo:** aprimoramento visual da HUD (skill high-end-visual-design): casco double-bezel nos cartoes de atributos, animacao de entrada `pj-rise` com escalonamento, botoes +/- magneticos (hover/active), engrenagem que gira 90 graus, avatar com escala suave no hover e bloco `prefers-reduced-motion` desligando tudo para quem pedir menos movimento.
- **Corrigido:** area de clique do link de documento na barra da janela para 24px (WCAG 2.5.8).
- **Validação:** testes Node 11/11, `node --check` limpo, prova ao vivo no Foundry: aba Combate inteira em português (capturas em .playwright-mcp/).

# Histórico de versões

## 0.0.8 (2026-10-03): item sheets e diálogos do sistema traduzidos

- **Corrigido:** todas as 8 classes de sheet do Mythras 2.3.0 agora têm hook de tradução (`CharacterSheet`, `CreatureSheet`, `SkillSheet`, `PhysicalItemSheet`, `SpellSheet`, `EquipmentSheet`, `ArmorSheet`, `CyberModuleSheet`) — o sheet de item deixou de ficar em inglês.
- **Corrigido:** diálogos do sistema via `renderDialog` (ex.: ⚙ Stat Tracker → "Acompanhamento de atributos / Em breve :)").
- **Corrigido:** nomes default de dados exibidos na ficha: `New Storage → Novo armazenamento`, `New Spell → Nova magia`, filtro `Uncategorized → Sem categoria`.
- **Corrigido:** novos rótulos de item/hit location: `Características base`, `Penalidade de ENC`, `Treino`, `Diversos`, `HP base/máximo/atual`, `Início/Fim da faixa de rolagem` — inclui normalização de sublinhado (`ENC_Penalty → Penalidade de ENC`).
- **Corrigido:** `No Penalties → Sem penalidades` nos cartões d100 do chat.
- **Validação:** testes Node (11/11) e prova ao vivo no Foundry por injeção do código local (item sheet, diálogo e chat traduzidos).

## 0.0.7 (2026-10-03): localização verificada por fonte externa

- **Corrigido:** 55 rótulos que permaneciam em inglês (cabeçalho, abas, Combate, Itens, Magia, condições, atributos de elementos) agora traduzidos — validados com varredura exaustiva do DOM em todas as abas.
- **Corrigido:** traduções revisadas no Google Tradutor: `Boating → Navegação`, `Frame → Porte físico`, `Brawn → Vigor físico`, `Burdened → Sobrecarregado`, `Overloaded → Sobrecarga excessiva`, `Trinkets → Badulaques`, `Impale Size → Tamanho de empalamento`, `Melee Weapons → Armas de corpo a corpo`, `Memorized → Memorizadas`.
- **Novo:** padrão `rótulo: valor` no tradutor (ex.: `Penalidade de armadura: 0`, `ENC atual: 0`).
- **Validação:** testes Node (11/11) e varredura ao vivo no Foundry com zero textos em inglês.

## 0.0.6 (2026-10-03): localização completa da ficha

- **Corrigido:** rótulos de atributos, movimento, fadiga, cabeçalhos de perícias e resultados do chat agora são traduzidos no DOM renderizado.
- **Novo:** nomes canônicos das perícias padrão do Mythras aparecem em português sem alterar os dados do Actor.
- **Novo:** a tradução acompanha re-renderizações da ficha e cartões d100 do chat.

## 0.0.5 (2026-10-03): canal de atualização do Foundry

- **Corrigido:** o campo `manifest` agora usa a URL estável `releases/latest/download/module.json`.
- **Novo:** a release publica `module.json` como asset, permitindo que o Foundry verifique atualizações futuras.
- **Novo:** o README oferece um ZIP de download com nome estável (`mythras-camp-halfblood.zip`).
- **Mantido:** o campo `download` de cada manifesto aponta para o ZIP versionado da própria release.

## 0.0.4 (2026-10-03): resultados d100 e português

- **Removido:** modo escuro, modo sistema e seletor de layout alternativo.
- **Novo:** visual Camp claro único, ativo por padrão e migrado de instalações anteriores.
- **Novo:** classificação estrutural dos resultados d100, com falha vermelha, sucesso verde e crítico dourado.
- **Novo:** tradução do painel e dos rótulos estáticos expostos pela ficha Mythras.
- **Validação:** testes Node para classificador, resíduos de tema e fontes empacotadas.

## 0.0.3 (2026-10-03): Camp ativo por padrão

- **Novo:** ficha Camp Half-Blood inicia ativa ao habilitar o módulo, com tema claro.
- **Novo:** migração única para instalações da v0.0.2, preservando o sistema Mythras e documentos dos atores.
- **Novo:** banner `assets/banner_modulo.webp`, imagem de setup no manifesto e badges no README.
- **Mudou:** fontes passaram a usar Google Fonts (`Cinzel` e `Alegreya Sans`); fontes binárias locais removidas do módulo.
- **Distribuição:** manifesto aponta para GitHub, release `v0.0.3` e artefato ZIP.

## Próxima versão (não publicada)

- **Corrigido:** preferências agora distinguem `Sistema`, `Claro` e `Escuro`; o CSS usa classes que o JavaScript realmente aplica.
- **Novo:** coloração semântica dos resultados nativos do Mythras: falha vermelha, sucesso verde e crítico dourado, sem recalcular a rolagem.
- **Novo:** README de distribuição e workflow GitHub Actions para validar JSON, sintaxe e caminhos do manifesto.
- **Limitação:** ainda não há `origin`, release ou QA runtime no Foundry; publicação aguarda o repositório GitHub do operador.

## 0.2.0 (2026-09-30): Base e Rolagem rápida

- **Novo:** Rolagem rápida. O clique esquerdo no valor de uma perícia rola direto e manda ao chat a tabela com as 6 dificuldades (o mesmo cartão que o clique direito já gerava no sistema). Clique direito ou Shift+clique abre o menu completo. Pode ser desligada.
- **Novo:** botão "Camp" no cabeçalho das fichas de personagem e entrada nas configurações do módulo. Abrem o mesmo painel de preferências.
- **Novo:** preferências por jogador (valem em qualquer computador): layout, visual do Acampamento e Rolagem rápida. Botão "Voltar ao padrão".
- **Novo:** visual do Acampamento (opcional) para a ficha Clássica. Vem **desligado**: com as configurações padrão nenhuma ficha muda de aparência.
- **Novo:** comando de recuperação no console: `game.modules.get("mythras-camp-halfblood").api.resetPreferences()`.
- **Mudou:** o CSS da fase 1 deixou de valer para todos; agora só vale na ficha de quem ligar o visual. O cabeçalho da ficha (`.sheet-header`) passou a ser coberto.
- **Segurança:** o módulo não grava nada em dados do sistema. Se algo falhar, a ficha abre como o sistema a monta.
- **Ainda não existe:** layout Camp (v0.3 em diante).
