# Database

## Tech Stack

* Drizzle ORM
* Turso

## Configuration

* `DATABASE_URL` - The URL to the database

## Scripts

### Generate local database using Turso

### Generate Migration

`pnpm generate` - Generate a new migration based on schema changes

`pnpm drizzle-kit generate:sqlite`

### Run migrations

`pnpm drizzle-kit push:sqlite`
