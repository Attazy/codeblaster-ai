import { createClient, RedisClientType } from 'redis';
import crypto from 'crypto';
import { CacheConfig } from '../types';

export class CacheManager {
  private memoryCache: Map<string, { value: any; expiry: number }>;
  private redisClient?: RedisClientType;
  private config: CacheConfig;

  constructor(config: CacheConfig) {
    this.config = config;
    this.memoryCache = new Map();
    
    if (config.type === 'redis' && config.redisUrl) {
      this.initRedis();
    }
  }

  private async initRedis() {
    try {
      this.redisClient = createClient({ url: this.config.redisUrl });
      await this.redisClient.connect();
      console.log('Redis cache connected');
    } catch (error) {
      console.warn('Redis connection failed, falling back to memory cache:', error);
    }
  }

  generateKey(prefix: string, data: any): string {
    const hash = crypto
      .createHash('sha256')
      .update(JSON.stringify(data))
      .digest('hex');
    return `${prefix}:${hash}`;
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.config.enabled) return null;

    if (this.config.type === 'redis' && this.redisClient) {
      try {
        const value = await this.redisClient.get(key);
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.warn('Redis get failed:', error);
      }
    }

    // Memory cache
    const cached = this.memoryCache.get(key);
    if (cached && cached.expiry > Date.now()) {
      return cached.value;
    }
    this.memoryCache.delete(key);
    return null;
  }

  async set(key: string, value: any): Promise<void> {
    if (!this.config.enabled) return;

    if (this.config.type === 'redis' && this.redisClient) {
      try {
        await this.redisClient.setEx(key, this.config.ttl, JSON.stringify(value));
        return;
      } catch (error) {
        console.warn('Redis set failed:', error);
      }
    }

    // Memory cache
    this.memoryCache.set(key, {
      value,
      expiry: Date.now() + this.config.ttl * 1000,
    });
  }

  async clear(pattern?: string): Promise<void> {
    if (this.config.type === 'redis' && this.redisClient) {
      if (pattern) {
        const keys = await this.redisClient.keys(pattern);
        if (keys.length > 0) {
          await this.redisClient.del(keys);
        }
      } else {
        await this.redisClient.flushDb();
      }
    }

    if (pattern) {
      for (const key of this.memoryCache.keys()) {
        if (key.startsWith(pattern.replace('*', ''))) {
          this.memoryCache.delete(key);
        }
      }
    } else {
      this.memoryCache.clear();
    }
  }

  async disconnect(): Promise<void> {
    if (this.redisClient) {
      await this.redisClient.quit();
    }
  }
}

export default CacheManager;
