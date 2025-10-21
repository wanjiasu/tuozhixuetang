import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { AppConfig } from "@/lib/config";

import Container from "@/components/common/container";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("glossary");

  return {
    title: `AI Glossary | AI Terms & Definitions | ${AppConfig.siteName}`,
    description:
      "Comprehensive glossary of AI terms, definitions, and concepts. Learn about artificial intelligence terminology.",
    keywords:
      "AI glossary, AI terms, artificial intelligence definitions, AI concepts, machine learning terms",
  };
}

// Mock glossary data - in a real app, this would come from a database or CMS
const glossaryTerms = [
  {
    id: "1",
    term: "Artificial Intelligence (AI)",
    definition:
      "The simulation of human intelligence in machines that are programmed to think and learn like humans.",
    category: "General",
    letter: "A",
  },
  {
    id: "2",
    term: "Machine Learning (ML)",
    definition:
      "A subset of AI that enables computers to learn and improve from experience without being explicitly programmed.",
    category: "Machine Learning",
    letter: "M",
  },
  {
    id: "3",
    term: "Deep Learning",
    definition:
      "A subset of machine learning that uses neural networks with multiple layers to model and understand complex patterns.",
    category: "Machine Learning",
    letter: "D",
  },
  {
    id: "4",
    term: "Neural Network",
    definition:
      "A computing system inspired by biological neural networks that learns to perform tasks by considering examples.",
    category: "Machine Learning",
    letter: "N",
  },
  {
    id: "5",
    term: "Natural Language Processing (NLP)",
    definition:
      "A branch of AI that helps computers understand, interpret and manipulate human language.",
    category: "NLP",
    letter: "N",
  },
  {
    id: "6",
    term: "Computer Vision",
    definition:
      "A field of AI that trains computers to interpret and understand the visual world from digital images or videos.",
    category: "Computer Vision",
    letter: "C",
  },
  {
    id: "7",
    term: "Algorithm",
    definition:
      "A set of rules or instructions given to an AI, neural network, or other machine to help it learn on its own.",
    category: "General",
    letter: "A",
  },
  {
    id: "8",
    term: "Big Data",
    definition:
      "Extremely large datasets that may be analyzed computationally to reveal patterns, trends, and associations.",
    category: "Data Science",
    letter: "B",
  },
  {
    id: "9",
    term: "Chatbot",
    definition:
      "A computer program designed to simulate conversation with human users, especially over the internet.",
    category: "Applications",
    letter: "C",
  },
  {
    id: "10",
    term: "Generative AI",
    definition:
      "AI systems that can generate new content, such as text, images, audio, or code, based on training data.",
    category: "Applications",
    letter: "G",
  },
  {
    id: "11",
    term: "Large Language Model (LLM)",
    definition:
      "A type of AI model trained on vast amounts of text data to understand and generate human-like text.",
    category: "NLP",
    letter: "L",
  },
  {
    id: "12",
    term: "Prompt Engineering",
    definition:
      "The practice of designing and refining prompts to get desired outputs from AI language models.",
    category: "Applications",
    letter: "P",
  },
];

const categories = [
  "All",
  "General",
  "Machine Learning",
  "NLP",
  "Computer Vision",
  "Data Science",
  "Applications",
];
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default async function GlossaryPage() {
  const t = await getTranslations("glossary");

  // Group terms by letter
  const termsByLetter = glossaryTerms.reduce(
    (acc, term) => {
      const letter = term.letter.toUpperCase();

      if (!acc[letter]) {
        acc[letter] = [];
      }
      acc[letter].push(term);

      return acc;
    },
    {} as Record<string, typeof glossaryTerms>,
  );

  return (
    <div className="cityscape-bg min-h-screen">
      <Container className="mt-4">
        {/* Hero Section */}
        <div className="text-center py-16 border-b border-white/20">
          <h1 className="text-4xl sm:text-5xl font-bold text-white gradient-text neon-glow mb-4">
            AI Glossary
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Comprehensive glossary of AI terms, definitions, and concepts. Learn
            about artificial intelligence terminology.
          </p>
        </div>

        {/* Search Only */}
        <div className="modern-card p-6 my-10">
          <div className="max-w-md mx-auto">
            <input
              className="w-full p-3 bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg text-base focus:outline-none focus:border-white/40"
              placeholder="Search terms..."
              type="text"
            />
          </div>
        </div>

        {/* Alphabet Navigation */}
        <div className="modern-card p-6 mb-10">
          <h2 className="text-lg font-semibold text-white gradient-text mb-4">
            Jump to Letter
          </h2>
          <div className="flex flex-wrap gap-2">
            {alphabet.map((letter) => {
              const hasTerms = termsByLetter[letter]?.length > 0;

              return (
                <a
                  key={letter}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition-all duration-300 ${
                    hasTerms
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105 cursor-pointer shadow-lg"
                      : "bg-white/10 text-white/40 cursor-not-allowed"
                  }`}
                  href={hasTerms ? `#letter-${letter}` : undefined}
                >
                  {letter}
                </a>
              );
            })}
          </div>
        </div>

        {/* Terms List */}
        <div className="space-y-8 mb-16">
          {Object.entries(termsByLetter)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([letter, terms]) => (
              <div key={letter} className="scroll-mt-20" id={`letter-${letter}`}>
                <h2 className="text-3xl font-bold text-white gradient-text neon-glow mb-6 pb-2 border-b-2 border-white/20">
                  {letter}
                </h2>
                <div className="grid gap-6">
                  {terms.map((term) => (
                    <div
                      key={term.id}
                      className="modern-card p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white gradient-text mb-2">
                            {term.term}
                          </h3>
                          <p className="text-white/80 leading-relaxed mb-3">
                            {term.definition}
                          </p>
                          <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {term.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Suggest a Term */}
        <div className="modern-card text-center p-8 lg:p-12 mb-16">
          <h2 className="text-3xl font-bold text-white gradient-text mb-4">Missing a Term?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Can&apos;t find the AI term you&apos;re looking for? Suggest a new term and
            we&apos;ll add it to our glossary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg focus:outline-none focus:border-white/40"
              placeholder="Suggest a term..."
              type="text"
            />
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
              Suggest
            </button>
          </div>
        </div>

        {/* Back to Top */}
        <div className="text-center">
          <a
            className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors duration-300 neon-glow"
            href="#top"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 15l7-7 7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Back to Top
          </a>
        </div>
      </Container>
    </div>
  );
}