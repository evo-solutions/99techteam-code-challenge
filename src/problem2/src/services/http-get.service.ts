import axios from 'axios';
import { CACHE_CONFIG } from '@/constants/cache.const';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class HttpGetService {
  private cache = new Map<string, CacheEntry<unknown>>();

  async get<T>(url: string, cacheKey?: string): Promise<T> {
    const key = cacheKey || url;

    if (this.isCacheValid(key)) {
      return this.cache.get(key)!.data as T;
    }

    const data = await this.fetchData<T>(url);
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });

    return data;
  }

  private async fetchData<T>(url: string): Promise<T> {
    try {
      const response = await axios.get<T>(url, {
        timeout: 10000,
        headers: {
          Accept: 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message || 'Failed to fetch data from server');
      }

      throw new Error('Failed to fetch data from server');
    }
  }

  private isCacheValid(key: string): boolean {
    const cache = this.cache.get(key);
    if (!cache) return false;

    return Date.now() - cache.timestamp < CACHE_CONFIG.DURATION;
  }
}

export const httpGetService = new HttpGetService();
