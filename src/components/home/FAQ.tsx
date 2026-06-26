"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "How does AI Interview work?",
    a: "Our AI simulates real technical and behavioral interviews using advanced LLMs. You can respond via voice or text, and the AI will ask follow-up questions based on your answers, providing detailed feedback at the end.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. We use enterprise-grade encryption for all user data. Your resumes, code snippets, and interview transcripts are strictly private and never used to train public AI models without explicit consent.",
  },
  {
    q: "Can I practice unlimited interviews?",
    a: "Pro users get unlimited access to all AI interview scenarios, while our free tier includes 3 mock interviews per month to help you get started.",
  },
  {
    q: "Does it support coding interviews?",
    a: "Yes. We have a built-in code editor that supports 20+ languages. The AI will review your code in real-time, checking for optimal time/space complexity and edge cases.",
  },
  {
    q: "Can I upload my resume?",
    a: "Yes, you can upload your existing resume in PDF or DOCX format. Our ATS checker will instantly scan it and suggest actionable improvements.",
  },
  {
    q: "How is ATS scoring calculated?",
    a: "We reverse-engineered the most popular Applicant Tracking Systems (like Workday and Greenhouse). We score your resume based on keyword density, formatting, measurable impact, and readability.",
  },
  {
    q: "Do you support multiple languages?",
    a: "The platform currently supports English, Spanish, French, and German for behavioral interviews. Coding environments support 20+ programming languages.",
  },
  {
    q: "Can companies use this platform?",
    a: "Yes, we offer an Enterprise tier for companies looking to standardize their technical screening process and evaluate candidates fairly using AI-driven rubrics.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes, our basic plan is entirely free and includes access to the ATS checker, basic resume templates, and limited mock interviews.",
  },
  {
    q: "How accurate is the AI?",
    a: "Our AI is fine-tuned on thousands of verified interview transcripts from top tech companies, making its evaluation incredibly accurate and aligned with industry standards.",
  },
];

export default function FAQ() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about the platform.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border rounded-lg px-6 bg-card/50 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-base hover:no-underline hover:text-primary transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
