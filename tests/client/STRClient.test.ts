import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { STRClient } from '../../src/client/STRClient';

describe('STRClient', () => {
  let client: STRClient;

  beforeEach(() => {
    client = new STRClient();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should download CSV successfully', async () => {
    const mockCsv = '"ISPB";"Nome Reduzido";"Número-Código";"Participa da Compe";"Acesso principal";"Nome Extenso";"Início da Operação"\n"00000000";"Banco do Brasil";"001";"Sim";"Direto";"Banco do Brasil S.A.";"01/01/2000"';

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockCsv),
    } as Response);

    const result = await client.baixarCSV();
    expect(result).toBe(mockCsv);
  });

  it('should throw error on HTTP failure', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as Response);

    await expect(client.baixarCSV()).rejects.toThrow('HTTP 404: Not Found');
  });

  it('should throw timeout error', async () => {
    const timeoutClient = new STRClient('http://example.com', 100);

    vi.spyOn(global, 'fetch').mockImplementation(() => {
      return new Promise((_, reject) => {
        setTimeout(() => reject(new DOMException('Aborted', 'AbortError')), 50);
      });
    });

    await expect(timeoutClient.baixarCSV()).rejects.toThrow('Timeout after 100ms');
  });
});
