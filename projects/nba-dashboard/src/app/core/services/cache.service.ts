import { Injectable } from '@angular/core';

interface CacheEntry {
  data: unknown;
  timestamp: number;
  expiration: number;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private readonly STORAGE_KEY = 'nba_api_cache';
  private cache = new Map<string, CacheEntry>();
  private readonly DEFAULT_TTL = 300000; // 5 minutes

  constructor() {
    this.loadFromStorage();
  }

  get(key: string): unknown | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiration) {
      this.cache.delete(key);
      this.saveToStorage();
      return null;
    }

    return entry.data;
  }

  set(key: string, data: unknown, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiration: Date.now() + ttl,
    });
    this.saveToStorage();
  }

  private saveToStorage(): void {
    try {
      // Convert Map to array of entries for serialization
      const serialized = JSON.stringify(Array.from(this.cache.entries()));
      localStorage.setItem(this.STORAGE_KEY, serialized);
    } catch (e) {
      console.warn('Failed to save cache to localStorage', e);
    }
  }

  private loadFromStorage(): void {
    try {
      const serialized = localStorage.getItem(this.STORAGE_KEY);
      if (serialized) {
        const entries = JSON.parse(serialized);
        this.cache = new Map(entries);

        // Clean up expired entries immediately on load
        const now = Date.now();
        let changed = false;
        for (const [key, entry] of this.cache.entries()) {
          if (now > entry.expiration) {
            this.cache.delete(key);
            changed = true;
          }
        }
        if (changed) {
          this.saveToStorage();
        }
      }
    } catch (e) {
      console.warn('Failed to load cache from localStorage', e);
    }
  }

  clear(): void {
    this.cache.clear();
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
