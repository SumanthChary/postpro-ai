import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = () => {
  const faqs = [
    {
      question: "Will this actually make my LinkedIn posts go viral?",
      answer: "Absolutely! Our AI transforms ordinary posts into engagement magnets. You'll see dramatic improvements in likes, comments, and shares within days. Join thousands who've already boosted their professional presence."
    },
    {
      question: "How quickly will I see results?",
      answer: "Most users see immediate improvements in their first enhanced post. Within a week, you'll notice significantly higher engagement rates and more meaningful professional connections reaching out to you."
    },
    {
      question: "Can I cancel anytime without hassle?",
      answer: "Yes, you have complete control. Cancel anytime with no hidden fees, no questions asked. We're confident you'll love the results, but your satisfaction comes first."
    },
    {
      question: "What makes your AI different from others?",
      answer: "Our AI doesn't just rewrite content, it strategically crafts posts that resonate with your professional audience. Every enhancement is designed to position you as a thought leader in your industry."
    },
    {
      question: "Is this suitable for executives and entrepreneurs?",
      answer: "Perfect for ambitious professionals! Whether you're a CEO, consultant, or rising entrepreneur, our AI helps you communicate with the authority and influence your expertise deserves."
    },
    {
      question: "Will my enhanced posts sound authentic to my voice?",
      answer: "Absolutely. The AI learns your unique style and amplifies your authentic voice while applying proven engagement strategies. Your personality shines through, just with maximum impact."
    },
    {
      question: "What if I'm not satisfied with the results?",
      answer: "We stand behind our service with a 30-day money-back guarantee. If you don't see improved engagement and better professional opportunities, we'll refund every penny."
    },
    {
      question: "How accurate is the virality prediction?",
      answer: "Our proprietary AI achieves 89% accuracy in predicting viral potential. You'll know before posting whether your content will drive massive engagement or if it needs strategic adjustments."
    },
    {
      question: "Can this help me build my personal brand?",
      answer: "This is exactly what successful professionals use to build their personal brands. Transform from posting randomly to strategically crafting content that establishes you as an industry authority."
    },
    {
      question: "Is there a learning curve to use this effectively?",
      answer: "Zero learning curve required. Simply paste your content, choose your preferred tone, and watch as AI transforms it into engagement-driving content. Professional results in seconds, not hours."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-gray-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Everything You Need to Know
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get confident answers about how PostPro AI will transform your LinkedIn presence and accelerate your professional success
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-4 sm:p-6 lg:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-sm sm:text-base lg:text-lg font-semibold hover:text-blue-600 transition-colors py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-sm sm:text-base leading-relaxed">
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