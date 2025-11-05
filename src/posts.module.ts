import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsRepository],
  exports: [PostsRepository],
})
export class PostsModule {}
