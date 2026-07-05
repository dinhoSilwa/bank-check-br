import { describe, it, expect } from 'vitest';
import { BankMapper } from '../../src/mappers/BankMapper';
import type { Participante } from '../../src/types/index';

describe('BankMapper', () => {
  const mapper = new BankMapper();

  const mockParticipantes: Participante[] = [
    {
      ispb: '00000000',
      nomeReduzido: 'BB',
      numeroCodigo: '001',
      participaDaCompe: 'Sim',
      acessoPrincipal: 'Direto',
      nomeExtenso: 'Banco do Brasil',
      inicioDaOperacao: new Date('2000-01-01'),
    },
    {
      ispb: '00000000',
      nomeReduzido: 'Itau',
      numeroCodigo: '341',
      participaDaCompe: 'Sim',
      acessoPrincipal: 'Direto',
      nomeExtenso: 'ITAÚ UNIBANCO',
      inicioDaOperacao: new Date('2000-01-01'),
    },
    {
      ispb: '00000000',
      nomeReduzido: 'Banco Teste',
      numeroCodigo: '999',
      participaDaCompe: 'Sim',
      acessoPrincipal: 'Direto',
      nomeExtenso: 'Banco Teste Inexistente',
      inicioDaOperacao: new Date('2000-01-01'),
    },
  ];

  describe('mapToSVGName', () => {
    it('should map exact name', () => {
      expect(mapper.mapToSVGName('Banco do Brasil')).toBe('bb');
    });

    it('should map exact name uppercase', () => {
      expect(mapper.mapToSVGName('ITAÚ UNIBANCO')).toBe('itau');
    });

    it('should map alias', () => {
      expect(mapper.mapToSVGName('bb')).toBe('bb');
      expect(mapper.mapToSVGName('itau')).toBe('itau');
      expect(mapper.mapToSVGName('nubank')).toBe('nubank');
    });

    it('should return null for unknown bank', () => {
      expect(mapper.mapToSVGName('Banco Inexistente')).toBeNull();
    });

    it('should handle similar names', () => {
      expect(mapper.mapToSVGName('banco do brasil')).toBe('bb');
      expect(mapper.mapToSVGName('BANCO DO BRASIL')).toBe('bb');
    });
  });

  describe('hasIcon', () => {
    it('should return true for known bank', () => {
      expect(mapper.hasIcon('Banco do Brasil')).toBe(true);
    });

    it('should return true for alias', () => {
      expect(mapper.hasIcon('bb')).toBe(true);
    });

    it('should return false for unknown bank', () => {
      expect(mapper.hasIcon('Banco Inexistente')).toBe(false);
    });
  });

  describe('filterBanksWithIcon', () => {
    it('should filter banks with icon', () => {
      const result = mapper.filterBanksWithIcon(mockParticipantes);
      expect(result).toHaveLength(2);
      expect(result[0].nomeExtenso).toBe('Banco do Brasil');
      expect(result[1].nomeExtenso).toBe('ITAÚ UNIBANCO');
    });

    it('should return empty array if no banks have icon', () => {
      const result = mapper.filterBanksWithIcon([mockParticipantes[2]]);
      expect(result).toHaveLength(0);
    });
  });
});
