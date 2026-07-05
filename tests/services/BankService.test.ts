import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BankService } from '../../src/services/BankService';

const mockCSV = `"ISPB";"Nome Reduzido";"Número-Código";"Participa da Compe";"Acesso principal";"Nome Extenso";"Início da Operação"
"00000000";"BB";"001";"Sim";"Direto";"Banco do Brasil";"01/01/2000"
"00000000";"Itau";"341";"Sim";"Direto";"ITAÚ UNIBANCO";"01/01/2000"
"00000000";"Nubank";"260";"Sim";"Indireto";"NU PAGAMENTOS";"01/01/2015"`;

describe('BankService', () => {
  let service: BankService;

  beforeEach(async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockCSV),
    } as Response);

    service = new BankService();
    await service.initialize();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initialize', () => {
    it('should initialize successfully', () => {
      const stats = service.getCacheStats();
      expect(stats.bankCacheSize).toBeGreaterThan(0);
    });

    it('should not reinitialize if already initialized', async () => {
      await service.initialize();
      const stats = service.getCacheStats();
      expect(stats.bankCacheSize).toBeGreaterThan(0);
    });
  });

  describe('validarBancoPorAgencia', () => {
    it('should find bank by agency code', async () => {
      const result = await service.validarBancoPorAgencia('001');
      expect(result).toBeDefined();
      expect(result?.nomeExtenso).toBe('Banco do Brasil');
    });

    it('should return null for unknown code', async () => {
      const result = await service.validarBancoPorAgencia('999');
      expect(result).toBeNull();
    });

    it('should include SVG when requested', async () => {
      const result = await service.validarBancoPorAgencia('001', { includeSvg: true });
      expect(result?.svg).toBeDefined();
      expect(result?.svgName).toBe('bancodobrasil');
    });
  });

  describe('buscarBancoPorISPB', () => {
    it('should find bank by ISPB', async () => {
      const result = await service.buscarBancoPorISPB('00000000');
      expect(result).toBeDefined();
    });
  });

  describe('buscarBancosPorNome', () => {
    it('should find banks by name', async () => {
      const result = await service.buscarBancosPorNome('Banco');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return empty for unknown name', async () => {
      const result = await service.buscarBancosPorNome('XYZXYZ');
      expect(result).toHaveLength(0);
    });
  });

  describe('listarBancos', () => {
    it('should list all banks', async () => {
      const result = await service.listarBancos();
      expect(result.length).toBeGreaterThan(0);
    });

    it('should filter by participaDaCompe', async () => {
      const result = await service.listarBancos({ participaDaCompe: 'Sim' });
      expect(result.length).toBeGreaterThan(0);
    });

    it('should filter by comSvg', async () => {
      const result = await service.listarBancos({ comSvg: true });
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('listarBancosComIcone', () => {
    it('should list banks with icon', async () => {
      const result = await service.listarBancosComIcone();
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('recarregarDados', () => {
    it('should reload data', async () => {
      await service.recarregarDados();
      const stats = service.getCacheStats();
      expect(stats.bankCacheSize).toBeGreaterThan(0);
    });
  });

  describe('clearCaches', () => {
    it('should clear all caches', () => {
      service.clearCaches();
      const stats = service.getCacheStats();
      expect(stats.bankCacheSize).toBe(0);
      expect(stats.svgCacheSize).toBe(0);
    });
  });
});
