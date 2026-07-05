import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  validarBanco,
  buscarBanco,
  buscarBancoPorISPB,
  buscarBancosPorNome,
  listarBancos,
  listarBancosComIcone,
  recarregarDados,
  clearCaches,
  getCacheStats,
  BankService,
  SVGService,
  BankMapper,
  MemoryCache,
} from '../src/index';

const mockCSV = `"ISPB";"Nome Reduzido";"Número-Código";"Participa da Compe";"Acesso principal";"Nome Extenso";"Início da Operação"
"00000000";"BB";"001";"Sim";"Direto";"Banco do Brasil";"01/01/2000"
"00000000";"Itau";"341";"Sim";"Direto";"ITAÚ UNIBANCO";"01/01/2000"`;

describe('Convenience Functions', () => {
  beforeEach(async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockCSV),
    } as Response);

    clearCaches();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should export all convenience functions', () => {
    expect(typeof validarBanco).toBe('function');
    expect(typeof buscarBanco).toBe('function');
    expect(typeof buscarBancoPorISPB).toBe('function');
    expect(typeof buscarBancosPorNome).toBe('function');
    expect(typeof listarBancos).toBe('function');
    expect(typeof listarBancosComIcone).toBe('function');
    expect(typeof recarregarDados).toBe('function');
    expect(typeof clearCaches).toBe('function');
    expect(typeof getCacheStats).toBe('function');
  });

  it('should export classes', () => {
    expect(typeof BankService).toBe('function');
    expect(typeof SVGService).toBe('function');
    expect(typeof BankMapper).toBe('function');
    expect(typeof MemoryCache).toBe('function');
  });

  it('should validate bank by agency code', async () => {
    const result = await validarBanco('001');
    expect(result).toBeDefined();
    expect(result?.nomeExtenso).toBe('Banco do Brasil');
  });

  it('should find bank by agency code', async () => {
    const result = await buscarBanco('001');
    expect(result).toBeDefined();
  });

  it('should find bank by ISPB', async () => {
    const result = await buscarBancoPorISPB('00000000');
    expect(result).toBeDefined();
  });

  it('should find banks by name', async () => {
    const result = await buscarBancosPorNome('Banco');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should list all banks', async () => {
    const result = await listarBancos();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should list banks with icon', async () => {
    const result = await listarBancosComIcone();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should get cache stats', () => {
    const stats = getCacheStats();
    expect(stats).toHaveProperty('bankCacheSize');
    expect(stats).toHaveProperty('svgCacheSize');
    expect(stats).toHaveProperty('lastLoadTimestamp');
  });

  it('should clear caches', () => {
    clearCaches();
    const stats = getCacheStats();
    expect(stats.bankCacheSize).toBe(0);
  });
});
