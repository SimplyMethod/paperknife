export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date | null;
  published: boolean;
  publishedAt?: Date;
}

export interface Tag {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Setting {
  id: string;
  key: string | null;
  value: string | null;
  updatedAt: Date | null;
}
