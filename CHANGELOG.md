# Histórico de versões

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
