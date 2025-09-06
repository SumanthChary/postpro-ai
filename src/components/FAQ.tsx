
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircleIcon } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is PostPro AI?",
      answer: "PostPro AI is an advanced AI-powered tool that helps you enhance your social media posts with trending hashtags, optimized content structure, and engaging elements for better performance across LinkedIn, Twitter, and Instagram."
    },
    {
      question: "How does the hashtag enhancement work?",
      answer: "Our intelligent system analyzes your post content, category, and current trends to suggest the most relevant and effective hashtags that match your content's theme and maximize visibility and engagement."
    },
    {
      question: "Can I use PostPro AI for different types of content?",
      answer: "Absolutely! We support various content categories including Business, Technology, Lifestyle, Marketing, Creative content, and more. Each category has its own specialized optimization approach and hashtag sets."
    },
    {
      question: "What's included in the Pro Plan?",
      answer: "The Pro Plan includes unlimited post enhancements, access to premium templates, advanced analytics, priority support, team collaboration features, and exclusive AI models for even better content optimization."
    },
    {
      question: "How can I get started?",
      answer: "Getting started is simple! Sign up for a free account, paste your post in the editor, select your content category and style tone, then click 'Enhance Post' to see the magic happen instantly!"
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! We offer a generous free tier that allows you to try our basic features. You can enhance posts and see the difference before deciding to upgrade to our Pro Plan for advanced features."
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl" style={{ backgroundColor: 'rgba(57,107,255,0.1)' }}>
              <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" style={{ color: 'rgba(57,107,255,1)' }} />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 px-2 font-medium leading-relaxed">
            Find answers to common questions about PostPro AI
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl sm:rounded-2xl px-4 sm:px-6 border-0 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <AccordionTrigger className="text-left text-sm sm:text-base lg:text-lg hover:no-underline font-semibold py-4 sm:py-5 lg:py-6 text-gray-900">
                <div className="flex items-start gap-3 sm:gap-4 pr-3 sm:pr-4">
                  <MessageCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-1" style={{ color: 'rgba(57,107,255,1)' }} />
                  <span className="leading-tight">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-sm sm:text-base leading-relaxed pb-4 sm:pb-5 lg:pb-6 pl-7 sm:pl-9 font-medium">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
