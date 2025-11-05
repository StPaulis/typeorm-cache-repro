import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Post } from './entities';

@Injectable()
export class PostsRepository extends Repository<Post> {
  readonly cachePrefix = 'posts_';

  constructor(@InjectRepository(Post) repository: Repository<Post>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  /**
   * This method reproduces the issue with TypeORM 0.3.26 and Redis cache
   * The query uses cache with a custom cache key
   */
  async getCached(): Promise<Post> {
    return await this.findOne({
      where: { id: Not(IsNull()) },
      cache: {
        id: this.cachePrefix.concat('typeorm_0_3_26_redis_cache_issue'),
        milliseconds: 60000, // 60 seconds
      },
    });
  }
}
