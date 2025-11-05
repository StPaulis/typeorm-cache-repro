# TypeORM 0.3.26 Redis Cache Issue Reproduction

This is a minimal reproduction case for the Redis cache issue that occurs when upgrading from an earlier version of TypeORM to 0.3.26.

## Issue Description

When using TypeORM 0.3.26 with Redis caching, queries with cache enabled fail with an error in `RedisQueryResultCache.getFromCache`. This issue does not occur in earlier versions of TypeORM.

## Setup

### 1. Start PostgreSQL and Redis

```bash
cd typeorm-cache-repro
docker-compose up -d
```

This will start:

- PostgreSQL on port 5433
- Redis on port 6380

### 2. Install dependencies

```bash
npm install
```

### 3. Start the application

```bash
npm run start:dev
```

The application will be available at `http://localhost:3000`

## Reproducing the Issue

### Method 1: Using the complex query (most likely to trigger the issue)

1. First, create some test data by calling the seed endpoint or manually inserting data
2. Call the expiring posts endpoint:
   ```bash
   curl http://localhost:3000/posts/expiring/7
   ```
3. Check the console for cache-related errors from `RedisQueryResultCache.getFromCache`

### Method 2: Using simple cached query

1. Create a post with a known ID
2. Call the get by ID endpoint (which uses cache):
   ```bash
   curl http://localhost:3000/posts/test-id-123
   ```
3. Call it again to hit the cache
4. Check the console for any cache errors

## Expected Behavior

The queries should execute successfully and use Redis for caching without errors.

## Actual Behavior

Queries with cache enabled throw errors related to `RedisQueryResultCache.getFromCache`.

## Key Files

- `src/posts.repository.ts` - Contains the problematic queries with cache enabled
- `src/app.module.ts` - TypeORM configuration with Redis cache
- `src/entities/index.ts` - Entity definitions matching your schema

## Testing with Different TypeORM Versions

To test with a different version of TypeORM:

```bash
# Install a specific version
npm install typeorm@0.3.20

# Restart the application
npm run start:dev
```

## Notes

- The `getExpiringPosts` method in `posts.repository.ts` closely mimics the query from your `daily-notifications.task.event.ts` file
- The query includes the same complex joins, subqueries, and cache configuration
- The cache is configured to use Redis as in your main application
