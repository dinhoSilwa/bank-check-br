# API Reference — bank-check-br

## Funções de Conveniência

### validarBanco

```typescript
async function validarBanco(
  codigo: string,
  options?: BankServiceOptions
): Promise<Banco | null>
```

Valida e retorna banco por código de agência.

**Parâmetros:**
- `codigo` — Código da agência (4 dígitos)
- `options` — Opções opcionais

**Retorno:** `Banco | null`

**Exemplo:**
```typescript
const banco = await validarBanco('001');
console.log(banco?.nomeExtenso); // "Banco do Brasil"
```

---

### buscarBanco

```typescript
async function buscarBanco(
  codigo: string,
  options?: BankServiceOptions
): Promise<Banco | null>
```

Busca banco por código de agência.

**Parâmetros:**
- `codigo` — Código da agência (4 dígitos)
- `options` — Opções opcionais

**Retorno:** `Banco | null`

**Exemplo:**
```typescript
const banco = await buscarBanco('341');
console.log(banco?.nomeReduzido); // "Itau"
```

---

### buscarBancoPorISPB

```typescript
async function buscarBancoPorISPB(
  ispb: string,
  options?: BankServiceOptions
): Promise<Banco | null>
```

Busca banco por ISPB.

**Parâmetros:**
- `ispb` — ISPB do banco (8 dígitos)
- `options` — Opções opcionais

**Retorno:** `Banco | null`

**Exemplo:**
```typescript
const banco = await buscarBancoPorISPB('00000000');
console.log(banco?.nomeExtenso);
```

---

### buscarBancosPorNome

```typescript
async function buscarBancosPorNome(
  nome: string,
  options?: BankServiceOptions
): Promise<Banco[]>
```

Busca bancos por nome.

**Parâmetros:**
- `nome` — Nome do banco (busca parcial)
- `options` — Opções opcionais

**Retorno:** `Banco[]`

**Exemplo:**
```typescript
const bancos = await buscarBancosPorNome('Banco');
console.log(bancos.length); // 5+
```

---

### listarBancos

```typescript
async function listarBancos(
  filters?: BankFilters
): Promise<Banco[]>
```

Lista todos os bancos.

**Parâmetros:**
- `filters` — Filtros opcionais

**Retorno:** `Banco[]`

**Exemplo:**
```typescript
const todos = await listarBancos();
const comCompe = await listarBancos({ participaDaCompe: 'Sim' });
```

---

### listarBancosComIcone

```typescript
async function listarBancosComIcone(
  options?: BankServiceOptions
): Promise<Banco[]>
```

Lista bancos com ícone SVG disponível.

**Parâmetros:**
- `options` — Opções opcionais

**Retorno:** `Banco[]`

**Exemplo:**
```typescript
const bancos = await listarBancosComIcone();
console.log(bancos.length); // 40+
```

---

### gerarSVG

```typescript
function gerarSVG(
  nome: string,
  options?: SVGOptions
): string | null
```

Gera SVG do banco.

**Parâmetros:**
- `nome` — Nome do banco ou alias
- `options` — Opções de personalização

**Retorno:** `string | null`

**Exemplo:**
```typescript
const svg = gerarSVG('Itaú');
const svg64 = gerarSVG('BB', { width: 64, className: 'bank-icon' });
```

---

### recarregarDados

```typescript
async function recarregarDados(): Promise<void>
```

Recarrega dados do BCB.

**Exemplo:**
```typescript
await recarregarDados();
```

---

### clearCaches

```typescript
function clearCaches(): void
```

Limpa todos os caches.

**Exemplo:**
```typescript
clearCaches();
```

---

### getCacheStats

```typescript
function getCacheStats(): CacheStats
```

Retorna estatísticas do cache.

**Retorno:**
```typescript
interface CacheStats {
  bankCacheSize: number;
  svgCacheSize: number;
  lastLoadTimestamp: Date | null;
}
```

**Exemplo:**
```typescript
const stats = getCacheStats();
console.log(stats.bankCacheSize); // 200+
```

---

## Classes

### BankService

Serviço principal que orquestra todas as funcionalidades.

```typescript
class BankService {
  initialize(): Promise<void>
  validarBancoPorAgencia(codigo: string, options?: BankServiceOptions): Promise<Banco | null>
  buscarBancoPorAgencia(codigo: string, options?: BankServiceOptions): Promise<Banco | null>
  buscarBancoPorISPB(ispb: string, options?: BankServiceOptions): Promise<Banco | null>
  buscarBancosPorNome(nome: string, options?: BankServiceOptions): Promise<Banco[]>
  listarBancos(filters?: BankFilters): Promise<Banco[]>
  listarBancosComIcone(options?: BankServiceOptions): Promise<Banco[]>
  recarregarDados(): Promise<void>
  clearCaches(): void
  getCacheStats(): CacheStats
}
```

---

### SVGService

Serviço de geração de SVG.

```typescript
class SVGService {
  gerarSVG(nomeAPI: string, options?: SVGOptions): string | null
  gerarSVGPorAgencia(codigo: string, options?: SVGOptions): string | null
  adicionarSVGAoParticipante(participante: Participante, options?: SVGOptions): Banco
  adicionarSVGAosParticipantes(participantes: Participante[], options?: SVGOptions): Banco[]
  limparCache(): void
  getCacheStats(): { size: number; maxSize: number }
}
```

---

### BankMapper

Mapper de nomes para SVG.

```typescript
class BankMapper {
  mapToSVGName(nomeAPI: string): string | null
  hasIcon(nomeAPI: string): boolean
  filterBanksWithIcon(participantes: Participante[]): Participante[]
}
```

---

### MemoryCache

Cache genérico em memória.

```typescript
class MemoryCache<T> {
  set(key: string, data: T): void
  get(key: string): T | undefined
  has(key: string): boolean
  clear(): void
  size(): number
  keys(): string[]
  values(): T[]
  getTimestamp(key: string): Date | undefined
  getLastLoadTimestamp(): Date | null
  getStats(): CacheStats
}
```

---

## Tipos

### Participante

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
```

### Banco

```typescript
interface Banco extends Participante {
  svg: string | null;
  svgName: string | null;
}
```

### BankServiceOptions

```typescript
interface BankServiceOptions {
  includeSvg?: boolean;
  svgOptions?: SVGOptions;
}
```

### SVGOptions

```typescript
interface SVGOptions {
  width?: number;
  height?: number;
  className?: string;
}
```

### BankFilters

```typescript
interface BankFilters {
  participaDaCompe?: string;
  acessoPrincipal?: string;
  comSvg?: boolean;
}
```

---

## Utilitários

### isValidAgencyCode

```typescript
function isValidAgencyCode(code: string): boolean
```

Valida código de agência (4 dígitos).

### formatAgencyCode

```typescript
function formatAgencyCode(code: string): string
```

Formata código de agência com zeros à esquerda.

### extractBankCodeFromString

```typescript
function extractBankCodeFromString(text: string): string | null
```

Extrai código de banco de uma string.

### cleanBankName

```typescript
function cleanBankName(name: string): string
```

Limpa nome do banco.

### isValidISPB

```typescript
function isValidISPB(ispb: string): boolean
```

Valida ISPB (8 dígitos).

### isValidBankCode

```typescript
function isValidBankCode(code: string): boolean
```

Valida código do banco (3 dígitos).

### formatBankCode

```typescript
function formatBankCode(code: string): string
```

Formata código do banco com zeros à esquerda.

### normalizeString

```typescript
function normalizeString(str: string): string
```

Normaliza string (lowercase, sem acentos).
