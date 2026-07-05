/**
 * @spec: US-014
 * @epic: EPIC-005
 * @phase: PHASE-6
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { SVGService } from '../../src/services/SVGService';
import type { Participante } from '../../src/types/index';

describe('SVG Generation Integration', () => {
  let svgService: SVGService;

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
      nomeReduzido: 'Nubank',
      numeroCodigo: '260',
      participaDaCompe: 'Sim',
      acessoPrincipal: 'Indireto',
      nomeExtenso: 'NU PAGAMENTOS',
      inicioDaOperacao: new Date('2015-01-01'),
    },
  ];

  beforeAll(() => {
    svgService = new SVGService();
  });

  describe('gerarSVG', () => {
    it('should generate SVG for Banco do Brasil', () => {
      const svg = svgService.gerarSVG('Banco do Brasil');
      expect(svg).toBeDefined();
      expect(svg).toContain('<svg');
      expect(svg).toContain('xmlns');
    });

    it('should generate SVG for Nubank', () => {
      const svg = svgService.gerarSVG('Nubank');
      expect(svg).toBeDefined();
      expect(svg).toContain('<svg');
    });

    it('should return null for unknown bank', () => {
      const svg = svgService.gerarSVG('Banco Inexistente XYZ');
      expect(svg).toBeNull();
    });

    it('should apply width option', () => {
      const svg = svgService.gerarSVG('Banco do Brasil', { width: 64 });
      expect(svg).toBeDefined();
      expect(svg).toContain('64');
    });

    it('should apply className option', () => {
      const svg = svgService.gerarSVG('Banco do Brasil', { className: 'my-icon' });
      expect(svg).toBeDefined();
      expect(svg).toContain('my-icon');
    });
  });

  describe('adicionarSVGAoParticipante', () => {
    it('should add SVG to participante', () => {
      const result = svgService.adicionarSVGAoParticipante(mockParticipantes[0]);
      expect(result.svg).toBeDefined();
      expect(result.svg).toContain('<svg');
      expect(result.svgName).toBeDefined();
    });

    it('should handle unknown bank', () => {
      const unknown = { ...mockParticipantes[0], nomeExtenso: 'Banco Inexistente' };
      const result = svgService.adicionarSVGAoParticipante(unknown);
      expect(result.svg).toBeNull();
      expect(result.svgName).toBeNull();
    });
  });

  describe('adicionarSVGAosParticipantes', () => {
    it('should add SVG to multiple participantes', () => {
      const result = svgService.adicionarSVGAosParticipantes(mockParticipantes);
      expect(result).toHaveLength(3);
      result.forEach((b) => {
        expect(b).toHaveProperty('svg');
        expect(b).toHaveProperty('svgName');
      });
    });
  });

  describe('cache', () => {
    it('should cache SVG results', () => {
      const svg1 = svgService.gerarSVG('Banco do Brasil');
      const svg2 = svgService.gerarSVG('Banco do Brasil');
      expect(svg1).toBe(svg2);
    });

    it('should track cache stats', () => {
      svgService.gerarSVG('Itaú');
      const stats = svgService.getCacheStats();
      expect(stats.size).toBeGreaterThan(0);
      expect(stats.maxSize).toBe(500);
    });
  });
});
