
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpenIcon, HomeIcon } from "lucide-react";
import Footer from "@/components/Footer";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How AI is Revolutionizing LinkedIn Content Strategy",
    description: "Discover how artificial intelligence is transforming the way professionals create, optimize, and distribute content on LinkedIn for maximum engagement.",
    imageUrl: "/lovable-uploads/fda8da79-8fb0-49e8-b96d-a822f5f49818.png",
    date: "December 15, 2024"
  },
  {
    id: "2",
    title: "The Science Behind Viral LinkedIn Posts",
    description: "Uncover the data-driven secrets of posts that achieve massive reach and engagement. Learn the psychology and timing that makes content spread.",
    imageUrl: "/lovable-uploads/fdd496bb-ba93-4b3e-934f-c21a3a306935.png",
    date: "December 12, 2024"
  },
  {
    id: "3",
    title: "Building Authority Through Consistent LinkedIn Presence",
    description: "Master the art of establishing thought leadership on LinkedIn with strategic content planning and authentic engagement tactics.",
    imageUrl: "/lovable-uploads/0469528d-321e-4129-b477-feb07c3479cf.png",
    date: "December 10, 2024"
  },
  {
    id: "4",
    title: "LinkedIn Algorithm Decoded: What Really Drives Visibility",
    description: "Get inside the LinkedIn algorithm and learn exactly what factors determine whether your content gets seen by your target audience.",
    imageUrl: "/lovable-uploads/8f4675ad-4562-4fd6-9ed5-751a0415748f.png",
    date: "December 8, 2024"
  },
  {
    id: "5",
    title: "Content Personalization: The Future of LinkedIn Marketing",
    description: "Explore how AI-powered personalization is changing LinkedIn marketing and how to adapt your strategy for better results.",
    imageUrl: "/lovable-uploads/e61dd1bc-bee6-4f84-9cb2-8425f25f6a25.png",
    date: "December 5, 2024"
  },
  {
    id: "6",
    title: "Measuring ROI: LinkedIn Content Performance Metrics That Matter",
    description: "Learn which metrics actually predict business success and how to track the real impact of your LinkedIn content strategy.",
    imageUrl: "/lovable-uploads/93cc4b2a-0055-4c6f-bba3-3f8c3cc8ccdf.png",
    date: "December 3, 2024"
  }
];

const Blogs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex flex-col">
      <div className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Button 
            onClick={() => navigate("/")}
            variant="ghost" 
            size="sm"
            className="mb-8 flex items-center gap-2 hover:gap-3 transition-all duration-300"
          >
            <HomeIcon size={16} />
            <span>Back to Home</span>
          </Button>
          
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              <BookOpenIcon className="inline-block w-4 h-4 mr-2" />
              Insights & Strategies
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Blog & Insights
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Expert strategies and proven tips for LinkedIn content success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post, index) => (
              <Card 
                key={post.id}
                className="group overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500 cursor-pointer h-full"
                onClick={() => navigate(`/blog/${post.id}`)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="p-0">
                  <div className="aspect-video overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <CardDescription className="text-xs font-medium text-primary uppercase tracking-wider">
                    {post.date}
                  </CardDescription>
                  <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="pt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read Article
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
