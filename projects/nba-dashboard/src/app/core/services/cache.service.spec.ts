import { TestBed } from '@angular/core/testing';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;
  const STORAGE_KEY = 'nba_api_cache';

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.removeItem(STORAGE_KEY);
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheService);
  });

  afterEach(() => {
    // Cleanup localStorage after each test
    localStorage.removeItem(STORAGE_KEY);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get data', () => {
    const key = 'test-key';
    const data = { foo: 'bar' };

    service.set(key, data);
    expect(service.get(key)).toEqual(data);
  });

  it('should return null for non-existent key', () => {
    expect(service.get('non-existent')).toBeNull();
  });

  it('should expire data after TTL', done => {
    const key = 'expiring-key';
    const data = { ephemeral: true };
    const ttl = 100; // 100ms

    service.set(key, data, ttl);
    expect(service.get(key)).toEqual(data);

    setTimeout(() => {
      expect(service.get(key)).toBeNull();
      done();
    }, 150);
  });

  it('should persist data to localStorage', () => {
    const key = 'persist-key';
    const data = { permanent: true };

    service.set(key, data);

    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored).toBeTruthy();

    const parsed = JSON.parse(stored!);
    // Find the entry for our key
    const entry = parsed.find((e: [string, unknown]) => e[0] === key);
    expect(entry).toBeTruthy();
    expect(entry[1].data).toEqual(data);
  });

  it('should load data from localStorage on initialization', () => {
    const key = 'init-key';
    const data = { fromStorage: true };
    const entry = {
      data,
      timestamp: Date.now(),
      expiration: Date.now() + 60000,
    };

    // Manually set in localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify([[key, entry]]));

    // Re-create service to trigger loadFromStorage
    const newService = new CacheService();
    expect(newService.get(key)).toEqual(data);
  });

  it('should clear all data', () => {
    service.set('key1', 'data1');
    service.set('key2', 'data2');

    service.clear();

    expect(service.get('key1')).toBeNull();
    expect(service.get('key2')).toBeNull();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
