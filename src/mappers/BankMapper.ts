/**
 * @spec: US-006
 * @epic: EPIC-002
 * @phase: PHASE-2
 */

import type { Participante } from '../types/index.js';

const bankSVGMap: Record<string, string> = {
  'Banco do Brasil': 'bb',
  'ITAÚ UNIBANCO': 'itau',
  'Banco Bradesco': 'bradesco',
  'NU PAGAMENTOS': 'nubank',
  'Banco Santander': 'santander',
  'Banco do Estado do Rio Grande do Sul': 'banrisul',
  'Banco Mercantil': 'mercantil',
  'Banco Safra': 'safra',
  'Banco Votorantim': 'votorantim',
  'Banco Original': 'original',
  'Banco Inter': 'inter',
  'Banco C6': 'c6',
  'Banco BV': 'bv',
  'Banco Pan': 'pan',
  'Banco BMG': 'bmg',
  'Banco Intermedium': 'intermedium',
  'Banco CRBM': 'credicard',
  'Banco Itaú BBA': 'itau-bba',
  'Banco Rabobank International': 'rabobank',
  'Banco JP Morgan': 'jp-morgan',
  'Banco Goldman Sachs': 'goldman-sachs',
  'Banco Morgan Stanley': 'morgan-stanley',
  'Banco Credit Suisse': 'credit-suisse',
  'Banco Deutsche Bank': 'deutsche-bank',
  'Banco Barclays': 'barclays',
  'Banco HSBC': 'hsbc',
  'Banco Citibank': 'citibank',
  'Banco Bank of America': 'bank-of-america',
};

const aliases: Record<string, string> = {
  itau: 'ITAÚ UNIBANCO',
  bb: 'Banco do Brasil',
  bradesco: 'Banco Bradesco',
  nubank: 'NU PAGAMENTOS',
  santander: 'Banco Santander',
  banrisul: 'Banco do Estado do Rio Grande do Sul',
  mercantil: 'Banco Mercantil',
  safra: 'Banco Safra',
  votorantim: 'Banco Votorantim',
  original: 'Banco Original',
  inter: 'Banco Inter',
  c6: 'Banco C6',
  bv: 'Banco BV',
  pan: 'Banco Pan',
  bmg: 'Banco BMG',
};

export class BankMapper {
  mapToSVGName(nomeAPI: string): string | null {
    const directMatch = bankSVGMap[nomeAPI];
    if (directMatch) {
      return directMatch;
    }

    const aliasKey = nomeAPI.toLowerCase();
    const aliasMatch = aliases[aliasKey];
    if (aliasMatch) {
      return bankSVGMap[aliasMatch] || null;
    }

    const normalizedInput = this.normalize(nomeAPI);
    for (const [key, value] of Object.entries(bankSVGMap)) {
      if (this.normalize(key) === normalizedInput) {
        return value;
      }
    }

    return null;
  }

  hasIcon(nomeAPI: string): boolean {
    return this.mapToSVGName(nomeAPI) !== null;
  }

  filterBanksWithIcon(participantes: Participante[]): Participante[] {
    return participantes.filter((p) => this.hasIcon(p.nomeExtenso));
  }

  private normalize(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');
  }
}
