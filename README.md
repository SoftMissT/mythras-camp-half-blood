# Mythras — Camp Half-Blood

[![Validate module](https://github.com/SoftMissT/mythras-camp-half-blood/actions/workflows/validate.yml/badge.svg)](https://github.com/SoftMissT/mythras-camp-half-blood/actions/workflows/validate.yml)
[![Foundry v14](https://img.shields.io/badge/Foundry-v14-7b2cbf)](https://foundryvtt.com/)
[![Mythras](https://img.shields.io/badge/System-Mythras-0b2a4a)](https://foundryvtt.com/packages/mythras)

![Banner Camp Half-Blood](assets/banner_modulo.webp)

Módulo para Foundry VTT que adiciona preferências por jogador à ficha do sistema Mythras, rolagem rápida de perícias e um tema opcional inspirado no Acampamento Meio-Sangue.

## Estado

Versão atual: `0.0.3`. Alvo declarado: Foundry VTT v13+, verificado em v14, sistema `mythras`.

O módulo não altera atributos, PV, perícias ou documentos do sistema. Ele apenas registra preferências `scope: user`, adiciona listeners à ficha e reaproveita a rolagem nativa do Mythras.

## Instalação

1. No Foundry, abra **Add-on Modules → Install Module**.
2. Use o `module.json` publicado no GitHub quando o repositório tiver uma release.
3. Ative **Mythras – Camp Half-Blood** em um mundo que use o sistema `mythras`.
4. Abra uma ficha e use o botão **Camp** para preferências.

## Preferências

- Ao ativar o módulo, a ficha Camp Half-Blood já inicia ativa no modo claro.
- `Sistema`: respeita o modo do Foundry; o tema permanece desligado na ficha clássica.
- `Claro` e `Escuro`: aplicam tokens visuais somente à ficha do jogador atual.
- `Rolagem rápida`: clique esquerdo rola diretamente; clique direito/Shift abre o menu nativo.

## Desenvolvimento

O projeto é ESModule sem bundler. Antes de publicar uma versão, valide JSON, sintaxe dos `.mjs`, caminhos do manifesto e o roteiro `TESTES-v0.2.txt` em um mundo Foundry real.

## Licença

MIT. Consulte [LICENSE](LICENSE).
