
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is PostPro AI?",
      answer: "PostPro AI is a tool that helps you enhance your social media posts with trending hashtags and optimized content structure for better engagement across LinkedIn, Twitter, and Instagram."
    },
    {
      question: "How does the hashtag enhancement work?",
      answer: "Our system analyzes your post category and adds relevant, trending hashtags that match your content's theme to increase visibility and engagement."
    },
    {
      question: "Can I use PostPro AI for different types of content?",
      answer: "Yes! We support various content categories including Business, Technology, Lifestyle, Marketing, and Creative content. Each category has its own specialized set of hashtags."
    },
    {
      question: "What's included in the Pro Plan?",
      answer: "The Pro Plan includes unlimited post enhancements, access to premium templates, and advanced features to help you create more engaging content across all major social platforms."
    },
    {
      question: "How can I get started?",
      answer: "Simply sign up for a free account, paste your post in the editor, select your content category, and click 'Enhance Post' to improve your content instantly!"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-light-lavender/30 to-transparent">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="w-6 h-6 text-electric-purple" />
            <h2 className="text-3xl font-montserrat font-extrabold bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-custom-text font-opensans">
            Find answers to common questions about PostPro AI
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white/80 backdrop-blur-sm rounded-lg px-6 border border-gray-100"
            >
              <AccordionTrigger className="text-left font-montserrat text-lg hover:text-electric-purple">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-custom-text font-opensans">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
