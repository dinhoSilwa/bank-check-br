import { describe, it, expect } from 'vitest';
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

describe('bank-check-br exports', () => {
  it('should export convenience functions', () => {
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
});
