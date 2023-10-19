export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date | null;
  published: boolean;
}

export interface Tag {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
