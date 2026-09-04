import { contentfulClient } from "./contentful";

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  tags: string[];
  publishedAt: string | null;
  createdAt: string;
}

interface ContentfulPost {
  sys: { id: string; createdAt: string; updatedAt: string };
  fields: {
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    coverImage?: { fields: { file: { url: string } } };
    tags?: string[];
    publishedAt?: string;
  };
}

function formatPost(entry: ContentfulPost): Post {
  const fields = entry.fields;
  return {
    id: entry.sys.id,
    title: fields.title,
    slug: fields.slug,
    excerpt: fields.excerpt || null,
    content: fields.content,
    coverImage: fields.coverImage
      ? `https:${fields.coverImage.fields.file.url}`
      : null,
    tags: fields.tags || [],
    publishedAt: fields.publishedAt || null,
    createdAt: entry.sys.createdAt,
  };
}

export async function getPosts(): Promise<Post[]> {
  const entries = await contentfulClient.getEntries<ContentfulPost>({
    content_type: "blogPost",
    order: ["-fields.publishedAt"],
  });

  return entries.items.map(formatPost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const entries = await contentfulClient.getEntries<ContentfulPost>({
    content_type: "blogPost",
    "fields.slug": slug,
    limit: 1,
  });

  if (entries.items.length === 0) {
    return null;
  }

  return formatPost(entries.items[0]);
}
