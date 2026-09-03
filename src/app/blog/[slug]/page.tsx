import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostData, getAllPostSlugs } from "@/lib/blog";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostData(slug);
    return {
      title: `${post.title} | Blog SINAPTECH`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [post.coverImage] : [],
      },
    };
  } catch {
    return { title: "Post não encontrado" };
  }
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostData(slug);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-brand-snow dark:bg-slate-950">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-ink dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Voltar ao blog
        </Link>

        {post.coverImage && (
          <div className="aspect-video rounded-xl overflow-hidden mb-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex items-center gap-4 text-sm text-brand-muted mb-6">
          <span className="flex items-center gap-1.5">
            <User size={14} aria-hidden="true" />
            SINAPTECH
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} aria-hidden="true" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} aria-hidden="true" />
            5 min de leitura
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink dark:text-white mb-6">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-brand-muted mb-8 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-synaptic-mint/10 px-3 py-1 text-sm font-medium text-synaptic-mint"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:text-brand-ink prose-p:text-brand-muted prose-a:text-forest-trust prose-strong:text-brand-ink"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
        />
      </div>
    </div>
  );
}
