import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getInsights } from "@/lib/insightsData";

interface InsightArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function InsightArticlePage({ params }: InsightArticlePageProps) {
  const { slug } = await params;
  const insights = await getInsights();
  const article = insights.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <article className="py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link
              href="/insights"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-stone-700 hover:text-stone-900"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              All insights
            </Link>
            <SectionHeading eyebrow="Insight" title={article.title} description={article.excerpt} />
            <div className="prose prose-slate mt-10 max-w-none text-slate-700">
              {article.content.split(/\r?\n\s*\r?\n/).map((paragraph, index) => (
                <p key={index} className="whitespace-pre-line leading-8">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </article>
    </main>
  );
}