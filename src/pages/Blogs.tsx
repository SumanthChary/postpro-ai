
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
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow pt-20">
        <div className="max-w-6xl mx-auto px-6">
          <Button 
            onClick={() => navigate("/")}
            variant="outline" 
            size="sm"
            className="mb-6 flex items-center gap-2"
          >
            <HomeIcon size={16} />
            <span>Back to Home</span>
          </Button>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Blog & Insights
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Latest strategies and tips for LinkedIn content success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {blogPosts.map((post) => (
              <Card 
                key={post.id}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer h-full"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                <CardHeader className="p-4">
                  <div className="aspect-video overflow-hidden rounded-lg mb-4">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CardTitle className="text-lg line-clamp-2 text-gray-900">{post.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">{post.date}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-gray-700 line-clamp-3">{post.description}</p>
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
