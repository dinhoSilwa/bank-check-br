import { describe, it, expect } from 'vitest';
import { CSVParser } from '../../src/parser/CSVParser';

describe('CSVParser', () => {
  const parser = new CSVParser();

  it('should parse CSV correctly', () => {
    const csv = '"ISPB";"Nome Reduzido";"Número-Código";"Participa da Compe";"Acesso principal";"Nome Extenso";"Início da Operação"\n"00000000";"Banco do Brasil";"001";"Sim";"Direto";"Banco do Brasil S.A.";"01/01/2000"';

    const result = parser.parseCSV(csv);

    expect(result).toHaveLength(1);
    expect(result[0].ispb).toBe('00000000');
    expect(result[0].nomeReduzido).toBe('Banco do Brasil');
    expect(result[0].numeroCodigo).toBe('001');
    expect(result[0].participaDaCompe).toBe('Sim');
    expect(result[0].acessoPrincipal).toBe('Direto');
    expect(result[0].nomeExtenso).toBe('Banco do Brasil S.A.');
    expect(result[0].inicioDaOperacao).toBeInstanceOf(Date);
  });

  it('should return empty array for empty CSV', () => {
    const csv = '';
    const result = parser.parseCSV(csv);
    expect(result).toHaveLength(0);
  });

  it('should return empty array for header only', () => {
    const csv = '"ISPB";"Nome Reduzido";"Número-Código";"Participa da Compe";"Acesso principal";"Nome Extenso";"Início da Operação"';
    const result = parser.parseCSV(csv);
    expect(result).toHaveLength(0);
  });

  it('should handle multiple rows', () => {
    const csv = '"ISPB";"Nome Reduzido";"Número-Código";"Participa da Compe";"Acesso principal";"Nome Extenso";"Início da Operação"\n"00000000";"Banco do Brasil";"001";"Sim";"Direto";"Banco do Brasil S.A.";"01/01/2000"\n"00000000";"Itaú";"341";"Sim";"Direto";"Itaú Unibanco S.A.";"01/01/2000"';

    const result = parser.parseCSV(csv);
    expect(result).toHaveLength(2);
  });

  it('should skip rows with missing required fields', () => {
    const csv = '"ISPB";"Nome Reduzido";"Número-Código";"Participa da Compe";"Acesso principal";"Nome Extenso";"Início da Operação"\n"";"Banco do Brasil";"001";"Sim";"Direto";"Banco do Brasil S.A.";"01/01/2000"';

    const result = parser.parseCSV(csv);
    expect(result).toHaveLength(0);
  });
});
