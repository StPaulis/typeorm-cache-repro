import { Controller, Get } from '@nestjs/common';
import { PostsRepository } from './posts.repository';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsRepository: PostsRepository) {}

  @Get()
  async getPost() {
    console.log(`Fetching cached post`);
    const post = await this.postsRepository.getCached();
    return post;
  }
}
