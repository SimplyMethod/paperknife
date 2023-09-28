# Database

Paperknife provides a multi-tenant database. This database is used to store all of the data for the application. The database is a SQLite database by default, but can be configured to use any database supported by Drizzle ORM. Each tenant has its own database, and the tenant database is created when the tenant is created.

## Single Tenant(Default)

If you tent to use Paperknife as a single tenant application, you can disable the multi-tenant feature by setting the `MULTI_TENANT` environment variable to `false`, which is the default value.

## Multi Tenants

Note: If you enable the multi-tenant feature, you will need to run the migrations for each tenant database.

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
