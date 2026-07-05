/**
 * @spec: US-004
 * @epic: EPIC-002
 * @phase: PHASE-1
 */

const CSV_URL =
  'https://www.bcb.gov.br/content/estabilidadefinanceira/str1/ParticipantesSTR.csv';

const DEFAULT_TIMEOUT = 30000;

export class STRClient {
  private url: string;
  private timeout: number;

  constructor(url: string = CSV_URL, timeout: number = DEFAULT_TIMEOUT) {
    this.url = url;
    this.timeout = timeout;
  }

  async baixarCSV(): Promise<string> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(this.url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'bank-check-br/1.0.0',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const text = await response.text();
      return text;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error(`Timeout after ${this.timeout}ms`);
        }
        throw new Error(`Failed to fetch CSV: ${error.message}`);
      }
      throw new Error('Unknown error occurred');
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
