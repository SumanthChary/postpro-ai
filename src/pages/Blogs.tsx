
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
    title: "Maximizing Your Social Media Impact",
    description: "Learn the key strategies to enhance your social media presence and engage with your audience effectively.",
    imageUrl: "/lovable-uploads/fda8da79-8fb0-49e8-b96d-a822f5f49818.png",
    date: "March 15, 2024"
  },
  {
    id: "2",
    title: "The Power of AI in Content Creation",
    description: "Discover how artificial intelligence is revolutionizing the way we create and optimize social media content.",
    imageUrl: "/lovable-uploads/fdd496bb-ba93-4b3e-934f-c21a3a306935.png",
    date: "March 14, 2024"
  },
  {
    id: "3",
    title: "Trending Hashtag Strategies for 2024",
    description: "Stay ahead of the curve with the latest hashtag strategies that can boost your content's visibility.",
    imageUrl: "/lovable-uploads/0469528d-321e-4129-b477-feb07c3479cf.png",
    date: "March 13, 2024"
  },
  {
    id: "4",
    title: "Building a Strong Personal Brand Online",
    description: "Essential tips and techniques for creating and maintaining a powerful personal brand on social media.",
    imageUrl: "/lovable-uploads/8f4675ad-4562-4fd6-9ed5-751a0415748f.png",
    date: "March 12, 2024"
  }
];

const Blogs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-custom-bg flex flex-col">
      <div className="flex-grow pt-16 sm:pt-20 md:pt-24">
        <div className="container mx-auto px-4">
          <Button 
            onClick={() => navigate("/")}
            variant="outline" 
            size="sm"
            className="mb-6 flex items-center gap-2 hover:bg-electric-purple/10 border-electric-purple/20"
          >
            <HomeIcon size={16} />
            <span>Back to Home</span>
          </Button>
          
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <BookOpenIcon className="w-6 h-6 md:w-8 md:h-8 text-electric-purple mr-2" />
            <h1 className="text-2xl sm:text-3xl font-montserrat font-bold text-custom-text">
              Latest Blog Posts
            </h1>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {blogPosts.map((post) => (
              <Card 
                key={post.id}
                className="hover:shadow-lg transition-shadow cursor-pointer h-full"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                <CardHeader className="p-3 sm:p-4">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-montserrat mt-3 md:mt-4 line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-gray-500">{post.date}</CardDescription>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0">
                  <p className="text-sm sm:text-base text-custom-text line-clamp-3">{post.description}</p>
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
