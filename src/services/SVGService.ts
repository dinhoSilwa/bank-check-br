/**
 * @spec: US-007
 * @epic: EPIC-002
 * @phase: PHASE-2
 */

// @ts-expect-error - @edusites/bancos-brasil doesn't have TypeScript types
import { svgBanco } from '@edusites/bancos-brasil';
import { BankMapper } from '../mappers/BankMapper.js';
import { MemoryCache } from '../cache/MemoryCache.js';
import type { Participante, Banco, SVGOptions } from '../types/index.js';

const MAX_SVG_CACHE = 500;

const FALLBACK_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="24" height="24" rx="4" fill="#E5E7EB"/>
  <text x="12" y="16" text-anchor="middle" font-size="12" fill="#6B7280">🏦</text>
</svg>`;

export class SVGService {
  private svgCache: MemoryCache<string> = new MemoryCache();
  private bankMapper: BankMapper;

  constructor() {
    this.bankMapper = new BankMapper();
  }

  gerarSVG(nomeAPI: string, options?: SVGOptions): string | null {
    const cacheKey = `${nomeAPI}-${JSON.stringify(options || {})}`;

    if (this.svgCache.has(cacheKey)) {
      return this.svgCache.get(cacheKey) || null;
    }

    const svgName = this.bankMapper.mapToSVGName(nomeAPI);
    if (!svgName) {
      return null;
    }

    try {
      const svg = svgBanco({
        nome: svgName,
        tamanho: options?.width || 24,
        className: options?.className,
      });

      if (svg) {
        if (this.svgCache.size() >= MAX_SVG_CACHE) {
          this.svgCache.clear();
        }
        this.svgCache.set(cacheKey, svg);
        return svg;
      }
    } catch {
      // SVG generation failed
    }

    return null;
  }

  gerarSVGPorAgencia(codigo: string, options?: SVGOptions): string | null {
    return this.gerarSVG(codigo, options);
  }

  adicionarSVGAoParticipante(participante: Participante, options?: SVGOptions): Banco {
    const svg = this.gerarSVG(participante.nomeExtenso, options);
    const svgName = svg ? this.bankMapper.mapToSVGName(participante.nomeExtenso) : null;

    return {
      ...participante,
      svg,
      svgName,
    };
  }

  adicionarSVGAosParticipantes(participantes: Participante[], options?: SVGOptions): Banco[] {
    return participantes.map((p) => this.adicionarSVGAoParticipante(p, options));
  }

  obterFallback(): string {
    return FALLBACK_SVG;
  }

  limparCache(): void {
    this.svgCache.clear();
  }

  getCacheStats(): { size: number; maxSize: number } {
    return {
      size: this.svgCache.size(),
      maxSize: MAX_SVG_CACHE,
    };
  }
}
