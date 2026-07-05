/**
 * @spec: US-004
 * @epic: EPIC-002
 * @phase: PHASE-1
 */

import type { Participante } from '../types/index.js';

const SEPARATOR = ';';

export class CSVParser {
  parseCSV(csvTexto: string): Participante[] {
    const lines = csvTexto.split('\n').filter((line) => line.trim());

    if (lines.length < 2) {
      return [];
    }

    const participants: Participante[] = [];

    for (let i = 1; i < lines.length; i++) {
      const participant = this.parseLine(lines[i]);
      if (participant) {
        participants.push(participant);
      }
    }

    return participants;
  }

  private parseLine(line: string): Participante | null {
    const columns = this.parseColumns(line);

    if (columns.length < 7) {
      return null;
    }

    const [ispb, nomeReduzido, numeroCodigo, participaDaCompe, acessoPrincipal, nomeExtenso, inicioDaOperacao] =
      columns;

    if (!ispb || !nomeReduzido || !numeroCodigo) {
      return null;
    }

    const parsedDate = this.parseDate(inicioDaOperacao);

    return {
      ispb: this.cleanValue(ispb),
      nomeReduzido: this.cleanValue(nomeReduzido),
      numeroCodigo: this.cleanValue(numeroCodigo),
      participaDaCompe: this.cleanValue(participaDaCompe),
      acessoPrincipal: this.cleanValue(acessoPrincipal),
      nomeExtenso: this.cleanValue(nomeExtenso),
      inicioDaOperacao: parsedDate,
    };
  }

  private parseColumns(line: string): string[] {
    const columns: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === SEPARATOR && !inQuotes) {
        columns.push(current);
        current = '';
      } else {
        current += char;
      }
    }

    columns.push(current);
    return columns;
  }

  private cleanValue(value: string): string {
    return value.replace(/^"|"$/g, '').trim();
  }

  private parseDate(dateStr: string): Date {
    const cleaned = this.cleanValue(dateStr);

    if (!cleaned) {
      return new Date(0);
    }

    const parts = cleaned.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }

    const parsed = new Date(cleaned);
    return isNaN(parsed.getTime()) ? new Date(0) : parsed;
  }
}
