
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does PostPro AI enhance my social media posts?",
      answer:
        "Our AI analyzes your content and optimizes it for engagement by improving clarity, tone, and emotional appeal. It adds relevant hashtags, fixes grammar, and structures your post for maximum impact based on data from millions of high-performing posts.",
    },
    {
      question: "Is PostPro AI available for all social media platforms?",
      answer:
        "Yes! PostPro AI works with LinkedIn, Twitter, Instagram, and Facebook. Each platform has specific optimization features tailored to its unique algorithm and audience expectations.",
    },
    {
      question: "How much time can PostPro AI save me?",
      answer:
        "Our users report saving an average of 5-7 hours per week on content creation and optimization. What used to take 30-45 minutes per post now takes just seconds.",
    },
    {
      question: "Will my enhanced posts still sound like me?",
      answer:
        "Absolutely! PostPro AI preserves your unique voice while enhancing your message. You can adjust the enhancement level to maintain your authentic tone while improving engagement factors.",
    },
    {
      question: "Do I need any technical skills to use PostPro AI?",
      answer:
        "Not at all! Our platform is designed to be user-friendly and intuitive. Simply paste your content, choose your preferences, and let our AI do the work.",
    },
    {
      question: "What kind of results can I expect?",
      answer:
        "Our users typically see 2-5x increases in engagement metrics within the first month. Many report significant growth in followers, connection requests, and profile views as well.",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <div className="px-4 py-2 bg-electric-purple/10 rounded-full text-sm font-medium text-electric-purple inline-block mb-3">
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-center mb-10 max-w-2xl mx-auto text-custom-text">
            Everything you need to know about PostPro AI
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-100 last:border-0">
                <AccordionTrigger className="text-left font-medium py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-custom-text pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
