/**
 * @spec: US-009
 * @epic: EPIC-003
 * @phase: PHASE-3
 */

import { BankService } from './services/BankService.js';
import type {
  Banco,
  BankServiceOptions,
  BankFilters,
  CacheStats,
} from './types/index.js';

let defaultService: BankService | null = null;

function getDefaultBankService(): BankService {
  if (!defaultService) {
    defaultService = new BankService();
  }
  return defaultService;
}

export async function validarBanco(
  codigo: string,
  options?: BankServiceOptions
): Promise<Banco | null> {
  const service = getDefaultBankService();
  return service.validarBancoPorAgencia(codigo, options);
}

export async function buscarBanco(
  codigo: string,
  options?: BankServiceOptions
): Promise<Banco | null> {
  const service = getDefaultBankService();
  return service.buscarBancoPorAgencia(codigo, options);
}

export async function buscarBancoPorISPB(
  ispb: string,
  options?: BankServiceOptions
): Promise<Banco | null> {
  const service = getDefaultBankService();
  return service.buscarBancoPorISPB(ispb, options);
}

export async function buscarBancosPorNome(
  nome: string,
  options?: BankServiceOptions
): Promise<Banco[]> {
  const service = getDefaultBankService();
  return service.buscarBancosPorNome(nome, options);
}

export async function listarBancos(
  filters?: BankFilters
): Promise<Banco[]> {
  const service = getDefaultBankService();
  return service.listarBancos(filters);
}

export async function listarBancosComIcone(
  options?: BankServiceOptions
): Promise<Banco[]> {
  const service = getDefaultBankService();
  return service.listarBancosComIcone(options);
}

export async function recarregarDados(): Promise<void> {
  const service = getDefaultBankService();
  return service.recarregarDados();
}

export function clearCaches(): void {
  const service = getDefaultBankService();
  service.clearCaches();
}

export function getCacheStats(): CacheStats {
  const service = getDefaultBankService();
  return service.getCacheStats();
}

export { BankService } from './services/BankService.js';
export { SVGService } from './services/SVGService.js';
export { BankMapper } from './mappers/BankMapper.js';
export { MemoryCache } from './cache/MemoryCache.js';

export {
  isValidAgencyCode,
  formatAgencyCode,
  extractBankCodeFromString,
  cleanBankName,
  isValidISPB,
  isValidBankCode,
  formatBankCode,
  normalizeString,
} from './utils/validators.js';

export type {
  Participante,
  Banco,
  BankServiceOptions,
  SVGOptions,
  BankFilters,
  CacheStats,
} from './types/index.js';
