# API Reference — bank-check-br

## Convenience Functions

All functions use a lazily-initialized singleton `BankService`. Auto-downloads CSV on first call.

### validarBanco

```typescript
async function validarBanco(
  codigo: string,
  options?: BankServiceOptions
): Promise<Banco | null>
```

Validate and return bank by 4-digit agency code.

### buscarBanco

```typescript
async function buscarBanco(
  codigo: string,
  options?: BankServiceOptions
): Promise<Banco | null>
```

Find bank by agency code. Alias for `validarBanco`.

### buscarBancoPorISPB

```typescript
async function buscarBancoPorISPB(
  ispb: string,
  options?: BankServiceOptions
): Promise<Banco | null>
```

Find bank by 8-digit ISPB.

### buscarBancosPorNome

```typescript
async function buscarBancosPorNome(
  nome: string,
  options?: BankServiceOptions
): Promise<Banco[]>
```

Search banks by name (partial match on `nomeExtenso` and `nomeReduzido`).

### listarBancos

```typescript
async function listarBancos(
  filters?: BankFilters
): Promise<Banco[]>
```

List all banks with optional filters.

### listarBancosComIcone

```typescript
async function listarBancosComIcone(
  options?: BankServiceOptions
): Promise<Banco[]>
```

List banks that have SVG icons mapped.

### gerarSVG

```typescript
function gerarSVG(
  nome: string,
  options?: SVGOptions
): string | null
```

Generate SVG string for a bank. Returns null if bank not mapped.

### recarregarDados

```typescript
async function recarregarDados(): Promise<void>
```

Re-download CSV from BCB and rebuild cache.

### clearCaches

```typescript
function clearCaches(): void
```

Clear all caches (bank + SVG).

### getCacheStats

```typescript
function getCacheStats(): CacheStats
```

Return cache statistics.

---

## Classes

### BankService

Main orchestrator service.

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

### SVGService

SVG generation service.

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

### BankMapper

Maps bank names to SVG icon identifiers.

```typescript
class BankMapper {
  mapToSVGName(nomeAPI: string): string | null
  hasIcon(nomeAPI: string): boolean
  filterBanksWithIcon(participantes: Participante[]): Participante[]
}
```

### MemoryCache<T>

Generic in-memory cache with timestamps.

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

## Types

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

### CacheStats

```typescript
interface CacheStats {
  bankCacheSize: number;
  svgCacheSize: number;
  lastLoadTimestamp: Date | null;
}
```

---

## Utilities

```typescript
function isValidAgencyCode(code: string): boolean
function formatAgencyCode(code: string): string
function extractBankCodeFromString(text: string): string | null
function cleanBankName(name: string): string
function isValidISPB(ispb: string): boolean
function isValidBankCode(code: string): boolean
function formatBankCode(code: string): string
function normalizeString(str: string): string
```