export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  published: boolean;
  author: { name: string | null; email: string };
  tags: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

const API_BASE = process.env.FLUX_API_URL || "https://twelve-cups-smile.loca.lt";

async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export async function getPosts(): Promise<Post[]> {
  return fetchApi<Post[]>("/api/blog");
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    return await fetchApi<Post>(`/api/blog/${slug}`);
  } catch {
    return null;
  }
}
