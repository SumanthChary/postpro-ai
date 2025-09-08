import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = () => {
  const faqs = [
    {
      question: "Is it accessible?",
      answer: "Yes. It adheres to the WAI-ARIA design pattern and is fully keyboard navigable."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time with no hidden fees or penalties."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Razorpay for your convenience."
    },
    {
      question: "Is there a trial period?",
      answer: "Yes, our Free Plan gives you 5 post enhancements per month to try our service."
    },
    {
      question: "How does the AI enhancement work?",
      answer: "Our AI analyzes your content for engagement patterns, trending topics, and optimal formatting to maximize your LinkedIn post performance."
    },
    {
      question: "Can I use this for other social platforms?",
      answer: "Currently we focus specifically on LinkedIn optimization, but we're exploring other platforms for future updates."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service."
    },
    {
      question: "How accurate is the virality predictor?",
      answer: "Our virality predictor uses advanced AI models trained on millions of LinkedIn posts and typically achieves 85-90% accuracy in predicting engagement levels."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-gray-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get answers to the most common questions about PostPro AI
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl p-6 sm:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
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