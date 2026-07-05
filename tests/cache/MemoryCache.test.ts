import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryCache } from '../../src/cache/MemoryCache';

describe('MemoryCache', () => {
  let cache: MemoryCache<string>;

  beforeEach(() => {
    cache = new MemoryCache<string>();
  });

  it('should set and get values', () => {
    cache.set('key1', 'value1');
    expect(cache.get('key1')).toBe('value1');
  });

  it('should return undefined for non-existent keys', () => {
    expect(cache.get('nonexistent')).toBeUndefined();
  });

  it('should check if key exists', () => {
    cache.set('key1', 'value1');
    expect(cache.has('key1')).toBe(true);
    expect(cache.has('key2')).toBe(false);
  });

  it('should clear cache', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.clear();
    expect(cache.size()).toBe(0);
    expect(cache.get('key1')).toBeUndefined();
  });

  it('should return cache size', () => {
    expect(cache.size()).toBe(0);
    cache.set('key1', 'value1');
    expect(cache.size()).toBe(1);
    cache.set('key2', 'value2');
    expect(cache.size()).toBe(2);
  });

  it('should return all keys', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    expect(cache.keys()).toEqual(['key1', 'key2']);
  });

  it('should return all values', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    expect(cache.values()).toEqual(['value1', 'value2']);
  });

  it('should track timestamps', () => {
    const before = new Date();
    cache.set('key1', 'value1');
    const after = new Date();

    const timestamp = cache.getTimestamp('key1');
    expect(timestamp).toBeDefined();
    expect(timestamp!.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(timestamp!.getTime()).toBeLessThanOrEqual(after.getTime());
  });

  it('should track last load timestamp', () => {
    expect(cache.getLastLoadTimestamp()).toBeNull();
    cache.set('key1', 'value1');
    expect(cache.getLastLoadTimestamp()).toBeInstanceOf(Date);
  });

  it('should return cache stats', () => {
    cache.set('key1', 'value1');
    const stats = cache.getStats();
    expect(stats.bankCacheSize).toBe(1);
    expect(stats.svgCacheSize).toBe(0);
    expect(stats.lastLoadTimestamp).toBeInstanceOf(Date);
  });

  it('should overwrite existing keys', () => {
    cache.set('key1', 'value1');
    cache.set('key1', 'value2');
    expect(cache.get('key1')).toBe('value2');
    expect(cache.size()).toBe(1);
  });
});
