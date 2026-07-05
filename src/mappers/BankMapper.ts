/**
 * @spec: US-006
 * @epic: EPIC-002
 * @phase: PHASE-2
 */

import type { Participante } from '../types/index.js';

const bankSVGMap: Record<string, string> = {
  'Banco do Brasil': 'bancodobrasil',
  'ITAÚ UNIBANCO': 'itau',
  'Banco Bradesco': 'bradesco',
  'NU PAGAMENTOS': 'nubank',
  'Banco Santander': 'santander',
  'Banco do Estado do Rio Grande do Sul': 'caixa',
  'Banco Mercantil': 'mercantil',
  'Banco Safra': 'safra',
  'Banco Original': 'original',
  'Banco Inter': 'inter',
  'Banco C6': 'c6',
  'Banco BV': 'bv',
  'Banco Pan': 'pan',
  'Banco BMG': 'bmg',
  'Banco BTG': 'btg',
  'Banco XP': 'xp',
  'Banco Stone': 'stone',
  'Banco Neon': 'neon',
  'Banco Sicoob': 'sicoob',
  'Banco Sicredi': 'sicredi',
  'Banco Rico': 'rico',
  'Banco Digio': 'digio',
  'Banco Asaas': 'asaas',
  'Banco PagBank': 'pagbank',
  'Banco Mercado Pago': 'mercadopago',
  'Banco InfinitePay': 'infinitepay',
  'Banco PicPay': 'picpay',
  'Banco Wise': 'wise',
  'Banco Cora': 'cora',
  'Banco Nomad': 'nomad',
  'Banco Avenue': 'avenue',
  'Banco BS2': 'bs2',
  'Banco Agibank': 'agibank',
  'Banco EfiBank': 'efibank',
  'Banco Ton': 'ton',
  'Banco Iugu': 'iugu',
  'Banco Next': 'next',
  'Banco NG Cash': 'ngcash',
  'Banco Revolut': 'revolut',
  'Banco PayPal': 'paypal',
  'Banco Stripe': 'stripe',
};

const aliases: Record<string, string> = {
  itau: 'ITAÚ UNIBANCO',
  bb: 'Banco do Brasil',
  bradesco: 'Banco Bradesco',
  nubank: 'NU PAGAMENTOS',
  santander: 'Banco Santander',
  caixa: 'Banco do Estado do Rio Grande do Sul',
  mercantil: 'Banco Mercantil',
  safra: 'Banco Safra',
  original: 'Banco Original',
  inter: 'Banco Inter',
  c6: 'Banco C6',
  bv: 'Banco BV',
  pan: 'Banco Pan',
  bmg: 'Banco BMG',
  btg: 'Banco BTG',
  xp: 'Banco XP',
  stone: 'Banco Stone',
  neon: 'Banco Neon',
  sicoob: 'Banco Sicoob',
  sicredi: 'Banco Sicredi',
  rico: 'Banco Rico',
  digio: 'Banco Digio',
  asaas: 'Banco Asaas',
  pagbank: 'Banco PagBank',
  mercadopago: 'Banco Mercado Pago',
  infinitepay: 'Banco InfinitePay',
  picpay: 'Banco PicPay',
  wise: 'Banco Wise',
  cora: 'Banco Cora',
  nomad: 'Banco Nomad',
  avenue: 'Banco Avenue',
  bs2: 'Banco BS2',
  agibank: 'Banco Agibank',
  efibank: 'Banco EfiBank',
  ton: 'Banco Ton',
  iugu: 'Banco Iugu',
  next: 'Banco Next',
  ngcash: 'Banco NG Cash',
  revolut: 'Banco Revolut',
  paypal: 'Banco PayPal',
  stripe: 'Banco Stripe',
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
