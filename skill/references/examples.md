# Examples — bank-check-br

## Basic Usage

```typescript
import { validarBanco, buscarBanco, listarBancos } from 'bank-check-br';

// Validate bank by agency code
const banco = await validarBanco('001');
console.log(banco?.nomeExtenso); // "Banco do Brasil"
console.log(banco?.numeroCodigo); // "001"
```

## With SVG Icons

```typescript
import { buscarBanco, gerarSVG } from 'bank-check-br';

// Get bank with SVG included
const comSvg = await buscarBanco('341', { includeSvg: true });
console.log(comSvg?.svg); // "<svg>...</svg>"
console.log(comSvg?.svgName); // "itau"

// Generate SVG directly
const svg = gerarSVG('Nubank');
const svgLarge = gerarSVG('Nubank', { width: 64, className: 'bank-icon' });
```

## Search by Name

```typescript
import { buscarBancosPorNome } from 'bank-check-br';

const bancos = await buscarBancosPorNome('Banco');
// Returns all banks with "Banco" in the name

const nubank = await buscarBancosPorNome('NU');
// Returns banks matching "NU"
```

## Search by ISPB

```typescript
import { buscarBancoPorISPB } from 'bank-check-br';

const banco = await buscarBancoPorISPB('60701190');
console.log(banco?.nomeExtenso);
```

## List with Filters

```typescript
import { listarBancos, listarBancosComIcone } from 'bank-check-br';

// List all banks
const todos = await listarBancos();

// List only banks participating in COMPE
const compe = await listarBancos({ participaDaCompe: 'Sim' });

// List only banks with SVG icons
const comIcone = await listarBancosComIcone();
```

## Using Classes Directly

```typescript
import { BankService, SVGService } from 'bank-check-br';

// BankService
const service = new BankService();
await service.initialize();

const banco = await service.buscarBancoPorAgencia('001');
const stats = service.getCacheStats();

// SVGService
const svgService = new SVGService();
const svg = svgService.gerarSVG('Banco do Brasil');
```

## Utilities

```typescript
import {
  isValidAgencyCode,
  formatAgencyCode,
  isValidISPB,
  formatBankCode
} from 'bank-check-br';

isValidAgencyCode('0001');   // true
isValidAgencyCode('123');    // false (needs 4 digits)

formatAgencyCode('1');       // "0001"
formatAgencyCode('1234');    // "1234"

isValidISPB('60701190');     // true
formatBankCode('1');         // "001"
```

## Cache Management

```typescript
import { getCacheStats, clearCaches, recarregarDados } from 'bank-check-br';

// Check cache status
const stats = getCacheStats();
console.log(stats.bankCacheSize);   // e.g. 200
console.log(stats.svgCacheSize);    // e.g. 15

// Clear all caches
clearCaches();

// Force reload from BCB
await recarregarDados();
```

## Express.js Integration

```typescript
import express from 'express';
import { buscarBanco, listarBancos } from 'bank-check-br';

const app = express();

app.get('/api/bank/:code', async (req, res) => {
  const banco = await buscarBanco(req.params.code, { includeSvg: true });
  if (!banco) return res.status(404).json({ error: 'Not found' });
  res.json(banco);
});

app.get('/api/banks', async (req, res) => {
  const bancos = await listarBancos();
  res.json(bancos);
});
```

## React Component

```tsx
import { useEffect, useState } from 'react';
import { buscarBanco } from 'bank-check-br';

function BankCard({ code }: { code: string }) {
  const [bank, setBank] = useState(null);

  useEffect(() => {
    buscarBanco(code, { includeSvg: true }).then(setBank);
  }, [code]);

  if (!bank) return <div>Loading...</div>;

  return (
    <div>
      {bank.svg && <div dangerouslySetInnerHTML={{ __html: bank.svg }} />}
      <h3>{bank.nomeExtenso}</h3>
      <p>Código: {bank.numeroCodigo}</p>
    </div>
  );
}
```