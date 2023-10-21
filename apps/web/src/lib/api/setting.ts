import { db } from "@paperknife/database";
import type { Setting } from "@paperknife/database/types";
import { settings as SettingsTable } from "@paperknife/database/schema"

export async function siteSettings() {
  const settings = await db.query.settings.findMany() as Setting[];
  const map = new Map(settings.map((setting) => [setting.key, setting.value]));

  return {
    title: map.get("title") || "Paperknife",
    description: map.get("description") || "A blog engine for Deno",
    keywords: map.get("keywords") || "deno, blog, paperknife",
    domain: map.get("domain") || "localhost:3000",
  };
}

export async function updateSetting(key: string, value: string) {
  if (!allowedKeys.includes(key)) {
    throw new Error(`Setting key "${key}" is not allowed`);
  }

  const setting = await db.insert(SettingsTable)
    .values({
      key,
      value,
      updatedAt: new Date(),
     })
      .onConflictDoUpdate({
      target: SettingsTable.key,
      set: {
        value,
        updatedAt: new Date(),
      },
    });

  return setting;
}

const allowedKeys = ["title", "description", "keywords", "domain"];
