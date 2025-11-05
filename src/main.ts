import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  await app.listen(3000);
  console.log('');
  console.log('='.repeat(60));
  console.log('TypeORM 0.3.26 Redis Cache Issue Reproduction');
  console.log('='.repeat(60));
  console.log('');
  console.log('Application is running on: http://localhost:3000');
  console.log('');
  console.log('Available endpoints:');
  console.log('  GET  /posts           - Get all posts');
  console.log('  GET  /posts/:id       - Get post by ID (with cache)');
  console.log(
    '  GET  /posts/expiring/:days - Get expiring posts (triggers error)',
  );
  console.log('');
  console.log('To reproduce the error:');
  console.log('  1. Create some test data');
  console.log('  2. Call GET /posts/expiring/7');
  console.log('  3. Check the console for cache errors');
  console.log('');
  console.log('='.repeat(60));
  console.log('');
}

bootstrap();
