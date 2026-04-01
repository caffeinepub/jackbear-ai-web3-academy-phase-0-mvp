import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function FaqPage() {
  const { t } = useLanguage();

  const faqs = [
    { question: t.faqQuestion1, answer: t.faqAnswer1 },
    { question: t.faqQuestion2, answer: t.faqAnswer2 },
    { question: t.faqQuestion3, answer: t.faqAnswer3 },
    { question: t.faqQuestion4, answer: t.faqAnswer4 },
    { question: t.faqQuestion5, answer: t.faqAnswer5 },
    { question: t.faqQuestion6, answer: t.faqAnswer6 },
    { question: t.faqQuestion7, answer: t.faqAnswer7 },
    { question: t.faqQuestion8, answer: t.faqAnswer8 },
    { question: t.faqQuestion9, answer: t.faqAnswer9 },
    { question: t.faqQuestion10, answer: t.faqAnswer10 },
  ];

  return (
    <div className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="container max-w-4xl relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-6">
            <HelpCircle className="h-8 w-8 text-primary neon-glow" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 glow-text">
            {t.faqTitle}
          </h1>
          <p className="text-xl text-muted-foreground">{t.faqSubtitle}</p>
        </div>

        <Card className="p-6 border-primary/30 shadow-glow-md bg-card/50 backdrop-blur-sm">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                // biome-ignore lint/suspicious/noArrayIndexKey: stable list items
                key={index}
                value={`item-${index}`}
                className="border-primary/20"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </div>
  );
}
