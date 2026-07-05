/**
 * @spec: US-014
 * @epic: EPIC-005
 * @phase: PHASE-6
 */

import { describe, it, expect, beforeAll, vi } from 'vitest';
import { BankService } from '../../src/services/BankService';

const mockCSV = `"ISPB";"Nome Reduzido";"Número-Código";"Participa da Compe";"Acesso principal";"Nome Extenso";"Início da Operação"
"00000000";"BB";"001";"Sim";"Direto";"Banco do Brasil";"01/01/2000"
"00000000";"Itau";"341";"Sim";"Direto";"ITAÚ UNIBANCO";"01/01/2000"
"00000000";"Bradesco";"237";"Sim";"Direto";"Banco Bradesco";"01/01/2000"
"00000000";"Nubank";"260";"Sim";"Indireto";"NU PAGAMENTOS";"01/01/2015"
"00000000";"Santander";"033";"Sim";"Direto";"Banco Santander";"01/01/2000"
"00000000";"Inter";"077";"Sim";"Indireto";"Banco Inter";"01/01/2015"
"00000000";"C6";"260";"Sim";"Indireto";"Banco C6";"01/01/2018"
"00000000";"BTG";"208";"Sim";"Direto";"Banco BTG";"01/01/2010"
"00000000";"XP";"212";"Sim";"Direto";"Banco XP";"01/01/2015"
"00000000";"Original";"212";"Sim";"Indireto";"Banco Original";"01/01/2015"`;

describe('BankService Integration', () => {
  let service: BankService;

  beforeAll(async () => {
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
    it('should load data successfully', () => {
      const stats = service.getCacheStats();
      expect(stats.bankCacheSize).toBeGreaterThan(0);
      expect(stats.lastLoadTimestamp).toBeInstanceOf(Date);
    });
  });

  describe('buscarBancoPorAgencia', () => {
    it('should find Banco do Brasil (001)', async () => {
      const banco = await service.buscarBancoPorAgencia('001');
      expect(banco).toBeDefined();
      expect(banco?.nomeExtenso).toContain('Banco do Brasil');
      expect(banco?.numeroCodigo).toBe('001');
    });

    it('should find Itaú (341)', async () => {
      const banco = await service.buscarBancoPorAgencia('341');
      expect(banco).toBeDefined();
      expect(banco?.nomeExtenso).toContain('ITAÚ');
    });

    it('should find Bradesco (237)', async () => {
      const banco = await service.buscarBancoPorAgencia('237');
      expect(banco).toBeDefined();
      expect(banco?.nomeExtenso).toContain('Bradesco');
    });

    it('should return null for unknown code', async () => {
      const banco = await service.buscarBancoPorAgencia('999');
      expect(banco).toBeNull();
    });
  });

  describe('buscarBancoPorAgencia with SVG', () => {
    it('should return SVG for known bank', async () => {
      const banco = await service.buscarBancoPorAgencia('001', { includeSvg: true });
      expect(banco).toBeDefined();
      expect(banco?.svg).toBeDefined();
      expect(banco?.svg).toContain('<svg');
      expect(banco?.svgName).toBeDefined();
    });
  });

  describe('listarBancos', () => {
    it('should list all banks', async () => {
      const bancos = await service.listarBancos();
      expect(bancos.length).toBeGreaterThan(0);
    });

    it('should filter by participaDaCompe', async () => {
      const bancos = await service.listarBancos({ participaDaCompe: 'Sim' });
      expect(bancos.length).toBeGreaterThan(0);
      bancos.forEach((b) => {
        expect(b.participaDaCompe.toLowerCase()).toBe('sim');
      });
    });
  });

  describe('listarBancosComIcone', () => {
    it('should list banks with available icons', async () => {
      const bancos = await service.listarBancosComIcone();
      expect(bancos.length).toBeGreaterThan(0);
    });
  });

  describe('recarregarDados', () => {
    it('should reload data', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(mockCSV),
      } as Response);

      const statsBefore = service.getCacheStats();
      await service.recarregarDados();
      const statsAfter = service.getCacheStats();
      expect(statsAfter.bankCacheSize).toBe(statsBefore.bankCacheSize);
    });
  });
});
