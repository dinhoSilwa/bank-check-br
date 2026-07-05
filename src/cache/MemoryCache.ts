/**
 * @spec: US-005
 * @epic: EPIC-002
 * @phase: PHASE-1
 */

import type { CacheEntry, CacheStats } from '../types/index.js';

export class MemoryCache<T> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private lastLoadTimestamp: Date | null = null;

  set(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: new Date(),
      key,
    });
    this.lastLoadTimestamp = new Date();
  }

  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    return entry?.data;
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
    this.lastLoadTimestamp = null;
  }

  size(): number {
    return this.cache.size;
  }

  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  values(): T[] {
    return Array.from(this.cache.values()).map((entry) => entry.data);
  }

  getTimestamp(key: string): Date | undefined {
    return this.cache.get(key)?.timestamp;
  }

  getLastLoadTimestamp(): Date | null {
    return this.lastLoadTimestamp;
  }

  getStats(): CacheStats {
    return {
      bankCacheSize: this.cache.size,
      svgCacheSize: 0,
      lastLoadTimestamp: this.lastLoadTimestamp,
    };
  }
}
