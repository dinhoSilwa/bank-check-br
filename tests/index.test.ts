import { describe, it, expect } from 'vitest';
import { hello } from '../src/index';

describe('bank-check-br', () => {
  it('should return hello message', () => {
    expect(hello()).toBe('bank-check-br');
  });
});
