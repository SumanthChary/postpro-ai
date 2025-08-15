import { ArrowLeft, HelpCircle, Book, MessageCircle, Video, Search, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Footer from "@/components/Footer";
import { useState } from "react";

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How do I get started with PostPro AI?",
      answer: "Simply sign up for an account, choose your plan, and start enhancing your posts! Our AI will analyze your content and provide suggestions to improve engagement."
    },
    {
      question: "What social media platforms are supported?",
      answer: "PostPro AI supports all major platforms including LinkedIn, Twitter, Facebook, Instagram, TikTok, and more. Our AI adapts content for each platform's best practices."
    },
    {
      question: "How many posts can I enhance per month?",
      answer: "This depends on your subscription plan. Free users get 5 enhancements per month, while paid plans offer unlimited enhancements with additional features."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes! You can cancel your subscription at any time from your profile settings. You'll continue to have access until the end of your billing period."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 14-day satisfaction guarantee for new subscribers. If you're not happy with the service, contact us for a full refund."
    },
    {
      question: "Is my content data secure?",
      answer: "Absolutely! We use enterprise-grade encryption and never store your content permanently. Your data is processed securely and deleted after enhancement."
    },
    {
      question: "How does the AI enhancement work?",
      answer: "Our AI analyzes your content for engagement factors like tone, structure, hashtags, and timing. It then provides specific suggestions to improve visibility and engagement."
    },
    {
      question: "Can I use PostPro AI for team collaboration?",
      answer: "Yes! Our Pro and Enterprise plans include team features, collaborative workspaces, and shared content libraries for seamless team collaboration."
    }
  ];

  const supportOptions = [
    {
      title: "Knowledge Base",
      description: "Browse our comprehensive guides and tutorials",
      icon: Book,
      action: "Browse Articles",
      link: "/docs"
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step video guides",
      icon: Video,
      action: "Watch Videos",
      link: "/tutorials"
    },
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      action: "Start Chat",
      link: "/contact"
    },
    {
      title: "Community Forum",
      description: "Connect with other users and share tips",
      icon: HelpCircle,
      action: "Join Forum",
      link: "/community"
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/20">
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2 hover:scale-105 transition-transform">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
              Support Center
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers, get help, and learn how to make the most of PostPro AI.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>

          {/* Support Options */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {supportOptions.map((option) => (
              <Card key={option.title} className="shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <option.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                  <CardDescription className="text-center">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Link to={option.link}>
                    <Button variant="outline" className="w-full group">
                      {option.action}
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find quick answers to common questions about PostPro AI.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left hover:text-primary transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8">
                  <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No FAQs found matching your search.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchQuery("")}
                    className="mt-4"
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="mt-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="text-center py-8">
              <h3 className="text-xl font-semibold mb-4">Still need help?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="w-full sm:w-auto">
                    Contact Support
                  </Button>
                </Link>
                <a href="mailto:sumanthchary.business@gmail.com">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Email Us Directly
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Support;