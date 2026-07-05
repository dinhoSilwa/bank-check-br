/**
 * @spec: US-004
 * @epic: EPIC-002
 * @phase: PHASE-1
 */

export interface Participante {
  ispb: string;
  nomeReduzido: string;
  numeroCodigo: string;
  participaDaCompe: string;
  acessoPrincipal: string;
  nomeExtenso: string;
  inicioDaOperacao: Date;
}

export interface Banco extends Participante {
  svg: string | null;
  svgName: string | null;
}

export interface BankServiceOptions {
  includeSvg?: boolean;
  svgOptions?: SVGOptions;
}

export interface SVGOptions {
  width?: number;
  height?: number;
  className?: string;
}

export interface BankFilters {
  participaDaCompe?: string;
  acessoPrincipal?: string;
  comSvg?: boolean;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: Date;
  key: string;
}

export interface CacheStats {
  bankCacheSize: number;
  svgCacheSize: number;
  lastLoadTimestamp: Date | null;
}
