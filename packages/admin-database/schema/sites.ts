import {sql} from 'drizzle-orm';
import {integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const sites = sqliteTable('site', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  subdomain: text('subdomain'),
  domain: text('domain'),
  createdAt: integer('created_at', {mode: 'timestamp'}).default(
    sql`(strftime('%s', 'now'))`
  ),
  updateAt: integer('updated_at', {mode: 'timestamp'}).default(
    sql`(strftime('%s', 'now'))`
  ),
});
