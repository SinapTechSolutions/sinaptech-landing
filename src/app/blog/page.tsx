import { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/blog";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | SINAPTECH",
  description:
    "Artigos sobre IA Local, GovTech, SaaS B2B e engenharia de software premium.",
};

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function BlogPage() {
  let posts = [];
  try {
    posts = await getPosts();
  } catch {
    // API offline, mostrar vazio
  }

  return (
    <div className="min-h-screen bg-brand-snow dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-brand-ink dark:text-white">
            Blog SINAPTECH
          </h1>
          <p className="mt-4 text-lg text-brand-muted">
            Insights sobre IA Local, GovTech, SaaS B2B e engenharia de software premium.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-brand-muted">Nenhum artigo publicado ainda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group relative rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {post.coverImage && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-brand-muted mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} aria-hidden="true" />
                      {formatDate(post.publishedAt || post.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} aria-hidden="true" />
                      5 min de leitura
                    </span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="block">
                    <h2 className="font-display text-xl font-bold text-brand-ink dark:text-white group-hover:text-forest-trust dark:group-hover:text-synaptic-mint transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-brand-muted line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-synaptic-mint/10 px-2.5 py-0.5 text-xs font-medium text-synaptic-mint"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest-trust dark:text-synaptic-mint hover:underline"
                  >
                    Ler mais
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
