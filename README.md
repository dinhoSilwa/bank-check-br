# bank-check-br

[![Test](https://github.com/dinhoSilwa/bank-check-br/actions/workflows/test.yml/badge.svg)](https://github.com/dinhoSilwa/bank-check-br/actions/workflows/test.yml)
[![npm version](https://img.shields.io/npm/v/bank-check-br.svg)](https://www.npmjs.com/package/bank-check-br)
[![license](https://img.shields.io/npm/l/bank-check-br.svg)](https://github.com/dinhoSilwa/bank-check-br/blob/main/LICENSE)

Biblioteca Node.js que valida bancos brasileiros e gera ícones SVG usando CSV oficial do Banco Central.

## Visão Geral

`bank-check-br` une em uma única lib:
- **Validação** de dados bancários (código de agência, ISPB, nome)
- **Ícones SVG** de 40+ bancos brasileiros via `@edusites/bancos-brasil`
- **Metadados** oficiais do CSV do BCB
- **Cache em memória** para performance

## Instalação

```bash
npm install bank-check-br
```

## Uso Básico

```typescript
import { validarBanco, buscarBanco, listarBancos, gerarSVG } from 'bank-check-br';

// Validar banco por código de agência
const banco = await validarBanco('001');
console.log(banco?.nomeExtenso); // "Banco do Brasil"

// Buscar com SVG incluído
const comSvg = await buscarBanco('001', { includeSvg: true });
console.log(comSvg?.svg); // "<svg>...</svg>"

// Listar todos os bancos
const todos = await listarBancos();

// Gerar SVG diretamente
const svg = gerarSVG('Itaú');
```

## API

### Funções de Conveniência

| Função | Descrição |
|--------|-----------|
| `validarBanco(codigo, options?)` | Valida e retorna banco por código |
| `buscarBanco(codigo, options?)` | Busca banco por código de agência |
| `buscarBancoPorISPB(ispb, options?)` | Busca banco por ISPB |
| `buscarBancosPorNome(nome, options?)` | Busca bancos por nome |
| `listarBancos(filters?)` | Lista todos os bancos |
| `listarBancosComIcone(options?)` | Lista bancos com ícone SVG |
| `gerarSVG(nome, options?)` | Gera SVG do banco |
| `recarregarDados()` | Recarrega dados do BCB |

### Opções

```typescript
interface BankServiceOptions {
  includeSvg?: boolean;    // Incluir SVG na resposta
  svgOptions?: SVGOptions; // Opções de personalização do SVG
}

interface SVGOptions {
  width?: number;    // Largura do SVG (default: 24)
  height?: number;   // Altura do SVG (default: 24)
  className?: string; // Classe CSS
}

interface BankFilters {
  participaDaCompe?: string; // Filtrar por COMPE
  acessoPrincipal?: string;  // Filtrar por acesso
  comSvg?: boolean;          // Filtrar com ícone
}
```

### Usando o Serviço Diretamente

```typescript
import { BankService } from 'bank-check-br';

const service = new BankService();
await service.initialize();

const banco = await service.buscarBancoPorAgencia('001');
const comSvg = await service.buscarBancoPorAgencia('001', { includeSvg: true });
```

## Bancos Suportados

A lib mapeia 40+ bancos brasileiros para SVGs:

| Banco | SVG Key |
|-------|---------|
| Banco do Brasil | `bancodobrasil` |
| Itaú | `itau` |
| Bradesco | `bradesco` |
| Nubank | `nubank` |
| Santander | `santander` |
| C6 Bank | `c6` |
| Inter | `inter` |
| BTG Pactual | `btg` |
| XP | `xp` |
| ... | ... |

## TypeScript

A lib é escrita 100% em TypeScript com tipos completos:

```typescript
import type { Banco, Participante, BankServiceOptions } from 'bank-check-br';
```

## Build

```bash
npm run build    # Build ESM + CJS + DTS
npm test         # Rodar testes
npm run lint     # Verificar código
npm run format   # Formatar código
```

## Licença

[MIT](LICENSE)

## AI Assistant Skill

Esta lib inclui uma skill para assistentes de IA (Codex, Claude Code, etc.).

Para instalar, copie a pasta `skill/` para o diretório de skills do seu assistente:

```bash
# Codex/OpenAI
cp -r skill/ ~/.codex/skills/bank-check-br/

# Claude Code
cp -r skill/ ~/.claude/skills/bank-check-br/
```

A skill fornece contexto completo sobre a API, tipos e exemplos de uso.

## Autor

[Dinho Silva](https://github.com/dinhoSilwa) - Desenvolvedor Fullstack

## Contribuição

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para guia de contribuição.
