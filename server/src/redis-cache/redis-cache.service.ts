import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async set(key: string, value: any, ttl: number = 3600) {
    await this.cacheManager.set(key, value, ttl);
  }

  async get(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }

  async del(key: string) {
    await this.cacheManager.del(key);
  }

  async reset() {
    await this.cacheManager.reset();
  }

  async isExistKey(key: string) {
    const value = await this.cacheManager.get(key);
    if(value) {
      return true;
    } else {
      return false;
    }
  }
}
