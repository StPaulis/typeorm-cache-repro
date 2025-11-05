import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities';
import { PostsModule } from './posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5433,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'repro',
      entities: [Post],
      synchronize: true, // Auto-create tables for reproduction
      logging: true,
      cache: {
        type: 'redis',
        options: {
          socket: {
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT) || 6380,
          },
        },
      },
    }),
    PostsModule,
  ],
})
export class AppModule {}
