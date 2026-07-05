/**
 * @spec: US-010
 * @epic: EPIC-003
 * @phase: PHASE-3
 */

export function isValidAgencyCode(code: string): boolean {
  if (!code || typeof code !== 'string') {
    return false;
  }

  const cleaned = code.trim();
  return /^\d{4}$/.test(cleaned);
}

export function formatAgencyCode(code: string): string {
  if (!code || typeof code !== 'string') {
    return '';
  }

  const cleaned = code.replace(/\D/g, '');
  if (!cleaned) {
    return '';
  }
  return cleaned.padStart(4, '0');
}

export function extractBankCodeFromString(text: string): string | null {
  if (!text || typeof text !== 'string') {
    return null;
  }

  const match = text.match(/\b(\d{3})\b/);
  return match ? match[1] : null;
}

export function cleanBankName(name: string): string {
  if (!name || typeof name !== 'string') {
    return '';
  }

  return name
    .trim()
    .replace(/\s+/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function isValidISPB(ispb: string): boolean {
  if (!ispb || typeof ispb !== 'string') {
    return false;
  }

  const cleaned = ispb.trim();
  return /^\d{8}$/.test(cleaned);
}

export function isValidBankCode(code: string): boolean {
  if (!code || typeof code !== 'string') {
    return false;
  }

  const cleaned = code.trim();
  return /^\d{3}$/.test(cleaned);
}

export function formatBankCode(code: string): string {
  if (!code || typeof code !== 'string') {
    return '';
  }

  const cleaned = code.replace(/\D/g, '');
  if (!cleaned) {
    return '';
  }
  return cleaned.padStart(3, '0');
}

export function normalizeString(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}
