/**
 * @spec: US-008
 * @epic: EPIC-002
 * @phase: PHASE-2
 */

import { STRClient } from '../client/STRClient.js';
import { CSVParser } from '../parser/CSVParser.js';
import { MemoryCache } from '../cache/MemoryCache.js';
import { BankMapper } from '../mappers/BankMapper.js';
import { SVGService } from './SVGService.js';
import type { Participante, Banco, BankServiceOptions, BankFilters } from '../types/index.js';

export class BankService {
  private strClient: STRClient;
  private csvParser: CSVParser;
  private bankCache: MemoryCache<Participante>;
  private bankMapper: BankMapper;
  private svgService: SVGService;
  private initialized = false;

  constructor() {
    this.strClient = new STRClient();
    this.csvParser = new CSVParser();
    this.bankCache = new MemoryCache<Participante>();
    this.bankMapper = new BankMapper();
    this.svgService = new SVGService();
  }

  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    const csv = await this.strClient.baixarCSV();
    const participantes = this.csvParser.parseCSV(csv);

    for (const participante of participantes) {
      this.bankCache.set(participante.numeroCodigo, participante);
      this.bankCache.set(participante.ispb, participante);
    }

    this.initialized = true;
  }

  async validarBancoPorAgencia(codigo: string, options?: BankServiceOptions): Promise<Banco | null> {
    await this.ensureInitialized();

    const participante = this.bankCache.get(codigo);
    if (!participante) {
      return null;
    }

    if (options?.includeSvg) {
      return this.svgService.adicionarSVGAoParticipante(participante, options.svgOptions);
    }

    return {
      ...participante,
      svg: null,
      svgName: null,
    };
  }

  async buscarBancoPorAgencia(codigo: string, options?: BankServiceOptions): Promise<Banco | null> {
    return this.validarBancoPorAgencia(codigo, options);
  }

  async buscarBancoPorISPB(ispb: string, options?: BankServiceOptions): Promise<Banco | null> {
    await this.ensureInitialized();

    const participante = this.bankCache.get(ispb);
    if (!participante) {
      return null;
    }

    if (options?.includeSvg) {
      return this.svgService.adicionarSVGAoParticipante(participante, options.svgOptions);
    }

    return {
      ...participante,
      svg: null,
      svgName: null,
    };
  }

  async buscarBancosPorNome(nome: string, options?: BankServiceOptions): Promise<Banco[]> {
    await this.ensureInitialized();

    const participantes = this.bankCache.values().filter((p) =>
      p.nomeExtenso.toLowerCase().includes(nome.toLowerCase()) ||
      p.nomeReduzido.toLowerCase().includes(nome.toLowerCase())
    );

    if (options?.includeSvg) {
      return this.svgService.adicionarSVGAosParticipantes(participantes, options.svgOptions);
    }

    return participantes.map((p) => ({
      ...p,
      svg: null,
      svgName: null,
    }));
  }

  async listarBancos(filters?: BankFilters): Promise<Banco[]> {
    await this.ensureInitialized();

    let participantes = this.bankCache.values();

    if (filters?.participaDaCompe) {
      participantes = participantes.filter(
        (p) => p.participaDaCompe.toLowerCase() === filters.participaDaCompe!.toLowerCase()
      );
    }

    if (filters?.acessoPrincipal) {
      participantes = participantes.filter(
        (p) => p.acessoPrincipal.toLowerCase() === filters.acessoPrincipal!.toLowerCase()
      );
    }

    if (filters?.comSvg) {
      participantes = this.bankMapper.filterBanksWithIcon(participantes);
    }

    return participantes.map((p) => ({
      ...p,
      svg: null,
      svgName: null,
    }));
  }

  async listarBancosComIcone(options?: BankServiceOptions): Promise<Banco[]> {
    await this.ensureInitialized();

    const participantes = this.bankMapper.filterBanksWithIcon(this.bankCache.values());

    if (options?.includeSvg) {
      return this.svgService.adicionarSVGAosParticipantes(participantes, options.svgOptions);
    }

    return participantes.map((p) => ({
      ...p,
      svg: null,
      svgName: null,
    }));
  }

  async recarregarDados(): Promise<void> {
    this.initialized = false;
    this.bankCache.clear();
    await this.initialize();
  }

  clearCaches(): void {
    this.bankCache.clear();
    this.svgService.limparCache();
    this.initialized = false;
  }

  getCacheStats() {
    return {
      bankCacheSize: this.bankCache.size(),
      svgCacheSize: this.svgService.getCacheStats().size,
      lastLoadTimestamp: this.bankCache.getLastLoadTimestamp(),
    };
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }
  }
}
