import { describe, it, expect } from 'vitest';
import {
  isValidAgencyCode,
  formatAgencyCode,
  extractBankCodeFromString,
  cleanBankName,
  isValidISPB,
  isValidBankCode,
  formatBankCode,
  normalizeString,
} from '../../src/utils/validators';

describe('Validators', () => {
  describe('isValidAgencyCode', () => {
    it('should validate 4-digit codes', () => {
      expect(isValidAgencyCode('0001')).toBe(true);
      expect(isValidAgencyCode('1234')).toBe(true);
      expect(isValidAgencyCode('9999')).toBe(true);
    });

    it('should reject invalid codes', () => {
      expect(isValidAgencyCode('001')).toBe(false);
      expect(isValidAgencyCode('12345')).toBe(false);
      expect(isValidAgencyCode('abcd')).toBe(false);
      expect(isValidAgencyCode('')).toBe(false);
      expect(isValidAgencyCode('0001 ')).toBe(true);
    });
  });

  describe('formatAgencyCode', () => {
    it('should format codes with leading zeros', () => {
      expect(formatAgencyCode('1')).toBe('0001');
      expect(formatAgencyCode('12')).toBe('0012');
      expect(formatAgencyCode('123')).toBe('0123');
      expect(formatAgencyCode('1234')).toBe('1234');
    });

    it('should remove non-numeric characters', () => {
      expect(formatAgencyCode('abc1')).toBe('0001');
      expect(formatAgencyCode('1-2-3')).toBe('0123');
    });

    it('should handle empty input', () => {
      expect(formatAgencyCode('')).toBe('');
      expect(formatAgencyCode('abc')).toBe('');
    });
  });

  describe('extractBankCodeFromString', () => {
    it('should extract 3-digit codes', () => {
      expect(extractBankCodeFromString('001')).toBe('001');
      expect(extractBankCodeFromString('code: 341')).toBe('341');
      expect(extractBankCodeFromString('bank 260 test')).toBe('260');
    });

    it('should return null for no match', () => {
      expect(extractBankCodeFromString('no code here')).toBeNull();
      expect(extractBankCodeFromString('ab')).toBeNull();
      expect(extractBankCodeFromString('')).toBeNull();
    });
  });

  describe('cleanBankName', () => {
    it('should clean bank names', () => {
      expect(cleanBankName('  Banco do Brasil  ')).toBe('banco do brasil');
      expect(cleanBankName('ITAÚ UNIBANCO')).toBe('itau unibanco');
      expect(cleanBankName('Banco  do   Brasil')).toBe('banco do brasil');
    });

    it('should handle empty input', () => {
      expect(cleanBankName('')).toBe('');
      expect(cleanBankName('  ')).toBe('');
    });
  });

  describe('isValidISPB', () => {
    it('should validate 8-digit ISPB', () => {
      expect(isValidISPB('00000000')).toBe(true);
      expect(isValidISPB('12345678')).toBe(true);
      expect(isValidISPB('99999999')).toBe(true);
    });

    it('should reject invalid ISPB', () => {
      expect(isValidISPB('0000000')).toBe(false);
      expect(isValidISPB('000000000')).toBe(false);
      expect(isValidISPB('abcdefgh')).toBe(false);
      expect(isValidISPB('')).toBe(false);
    });
  });

  describe('isValidBankCode', () => {
    it('should validate 3-digit codes', () => {
      expect(isValidBankCode('001')).toBe(true);
      expect(isValidBankCode('341')).toBe(true);
      expect(isValidBankCode('999')).toBe(true);
    });

    it('should reject invalid codes', () => {
      expect(isValidBankCode('01')).toBe(false);
      expect(isValidBankCode('1234')).toBe(false);
      expect(isValidBankCode('abc')).toBe(false);
      expect(isValidBankCode('')).toBe(false);
    });
  });

  describe('formatBankCode', () => {
    it('should format codes with leading zeros', () => {
      expect(formatBankCode('1')).toBe('001');
      expect(formatBankCode('12')).toBe('012');
      expect(formatBankCode('123')).toBe('123');
    });

    it('should remove non-numeric characters', () => {
      expect(formatBankCode('a1')).toBe('001');
      expect(formatBankCode('1-2')).toBe('012');
    });
  });

  describe('normalizeString', () => {
    it('should normalize strings', () => {
      expect(normalizeString('  Hello World  ')).toBe('helloworld');
      expect(normalizeString('Banco do Brasil')).toBe('bancodobrasil');
      expect(normalizeString('ITAÚ UNIBANCO')).toBe('itauunibanco');
    });

    it('should handle empty input', () => {
      expect(normalizeString('')).toBe('');
    });
  });
});
