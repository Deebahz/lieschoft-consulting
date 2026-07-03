import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getSiteData } from "@/lib/siteData";

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

export default function CaseStudyArticlePage({ params }: CaseStudyPageProps) {
  const { caseStudies } = getSiteData();
  const article = caseStudies.find((item) => item.slug === params.slug);

  if (!article) {
    return (
      <main>
        <section className="py-24">
          <Container>
            <SectionHeading
              eyebrow="Not found"
              title="Case study not found"
              description="The article you are looking for does not exist."
            />
          </Container>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="Case Study"
            title={article.title}
            description={article.summary}
          />

          <div className="mt-10 rounded-3xl bg-white p-10 shadow-sm">
            <div className="prose prose-slate max-w-none text-slate-700">
              {article.content.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
