import { describe, it, expect, beforeEach } from 'vitest';
import { SVGService } from '../../src/services/SVGService';
import type { Participante } from '../../src/types/index';

describe('SVGService', () => {
  let service: SVGService;

  const mockParticipante: Participante = {
    ispb: '00000000',
    nomeReduzido: 'BB',
    numeroCodigo: '001',
    participaDaCompe: 'Sim',
    acessoPrincipal: 'Direto',
    nomeExtenso: 'Banco do Brasil',
    inicioDaOperacao: new Date('2000-01-01'),
  };

  beforeEach(() => {
    service = new SVGService();
  });

  describe('gerarSVG', () => {
    it('should generate SVG for known bank', () => {
      const svg = service.gerarSVG('Banco do Brasil');
      expect(svg).toBeDefined();
      expect(svg).toContain('<svg');
      expect(svg).toContain('xmlns');
    });

    it('should return null for unknown bank', () => {
      const svg = service.gerarSVG('Banco Inexistente');
      expect(svg).toBeNull();
    });

    it('should cache SVG results', () => {
      const svg1 = service.gerarSVG('Banco do Brasil');
      const svg2 = service.gerarSVG('Banco do Brasil');
      expect(svg1).toBe(svg2);
    });

    it('should apply options', () => {
      const svg = service.gerarSVG('Banco do Brasil', {
        width: 64,
        className: 'bank-icon',
      });
      expect(svg).toBeDefined();
      expect(svg).toContain('64');
      expect(svg).toContain('bank-icon');
    });
  });

  describe('adicionarSVGAoParticipante', () => {
    it('should add SVG to participante', () => {
      const result = service.adicionarSVGAoParticipante(mockParticipante);
      expect(result.svg).toBeDefined();
      expect(result.svgName).toBe('bancodobrasil');
      expect(result.nomeExtenso).toBe('Banco do Brasil');
    });

    it('should handle unknown bank', () => {
      const unknown = { ...mockParticipante, nomeExtenso: 'Banco Inexistente' };
      const result = service.adicionarSVGAoParticipante(unknown);
      expect(result.svg).toBeNull();
      expect(result.svgName).toBeNull();
    });
  });

  describe('adicionarSVGAosParticipantes', () => {
    it('should add SVG to multiple participantes', () => {
      const participantes = [
        mockParticipante,
        { ...mockParticipante, nomeExtenso: 'ITAÚ UNIBANCO' },
      ];
      const result = service.adicionarSVGAosParticipantes(participantes);
      expect(result).toHaveLength(2);
      expect(result[0].svg).toBeDefined();
      expect(result[1].svg).toBeDefined();
    });
  });

  describe('cache', () => {
    it('should track cache stats', () => {
      service.gerarSVG('Banco do Brasil');
      const stats = service.getCacheStats();
      expect(stats.size).toBe(1);
      expect(stats.maxSize).toBe(500);
    });

    it('should clear cache', () => {
      service.gerarSVG('Banco do Brasil');
      service.limparCache();
      const stats = service.getCacheStats();
      expect(stats.size).toBe(0);
    });
  });
});
