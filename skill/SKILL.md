---
name: bank-check-br
description: >
  Node.js library for validating Brazilian banks and generating SVG icons using official
  CSV data from Banco Central do Brasil (BCB). Use when working with Brazilian banking
  data: validating agency codes (4-digit), ISPB (8-digit), bank names, generating bank
  SVG icons, or listing/filtering Brazilian financial institutions. Supports 40+ banks
  with SVG icons. Zero config, 100% TypeScript, ESM+CJS dual output.
---

# bank-check-br

Node.js library that validates Brazilian banks and generates SVG icons from official BCB CSV data.

## Quick Start

```bash
npm install bank-check-br
```

```typescript
import { validarBanco, buscarBanco, gerarSVG } from 'bank-check-br';

// Validate bank by agency code
const banco = await validarBanco('001');
console.log(banco?.nomeExtenso); // "Banco do Brasil"

// Get SVG icon
const comSvg = await buscarBanco('001', { includeSvg: true });
console.log(comSvg?.svg); // "<svg>...</svg>"

// Generate SVG directly
const svg = gerarSVG('Nubank');
```

## Key Functions

| Function | Description |
|----------|-------------|
| `validarBanco(codigo, options?)` | Validate bank by 4-digit agency code |
| `buscarBanco(codigo, options?)` | Find bank by agency code |
| `buscarBancoPorISPB(ispb, options?)` | Find bank by 8-digit ISPB |
| `buscarBancosPorNome(nome, options?)` | Search banks by name (partial match) |
| `listarBancos(filters?)` | List all banks with optional filters |
| `listarBancosComIcone(options?)` | List banks that have SVG icons |
| `gerarSVG(nome, options?)` | Generate SVG string for a bank |
| `recarregarDados()` | Re-download CSV from BCB |
| `clearCaches()` | Clear all caches |
| `getCacheStats()` | Get cache statistics |

## Options

```typescript
interface BankServiceOptions {
  includeSvg?: boolean;    // Include SVG in response (default: false)
  svgOptions?: SVGOptions; // SVG customization
}

interface SVGOptions {
  width?: number;    // SVG width (default: 24)
  height?: number;   // SVG height (default: 24)
  className?: string; // CSS class
}

interface BankFilters {
  participaDaCompe?: string; // Filter by COMPE participation
  acessoPrincipal?: string;  // Filter by access type
  comSvg?: boolean;          // Filter banks with SVG icon
}
```

## Architecture

```
BankService (orchestrator)
├── STRClient      → fetches CSV from BCB
├── CSVParser      → parses semicolon-delimited CSV
├── MemoryCache    → in-memory cache (dual-key: agency + ISPB)
├── BankMapper     → maps bank names to SVG icon identifiers
└── SVGService     → generates SVG via @edusites/bancos-brasil
```

## Types

```typescript
interface Participante {
  ispb: string;
  nomeReduzido: string;
  numeroCodigo: string;
  participaDaCompe: string;
  acessoPrincipal: string;
  nomeExtenso: string;
  inicioDaOperacao: Date;
}

interface Banco extends Participante {
  svg: string | null;
  svgName: string | null;
}
```

## Utilities

```typescript
import {
  isValidAgencyCode,  // Validate 4-digit code
  formatAgencyCode,   // Zero-pad to 4 digits
  isValidISPB,        // Validate 8-digit ISPB
  isValidBankCode,    // Validate 3-digit bank code
  formatBankCode,     // Zero-pad to 3 digits
  cleanBankName,      // Normalize bank name
  normalizeString     // Full string normalization
} from 'bank-check-br';
```

## Supported Banks (40+)

Banco do Brasil, Itaú, Bradesco, Nubank, Santander, C6, Inter, BTG, XP, InfinitePay, PicPay, Original, Caixa, and more.

## References

- See [references/api-reference.md](references/api-reference.md) for complete API documentation
- See [references/examples.md](references/examples.md) for usage examples
