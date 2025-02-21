
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BookOpenIcon } from "lucide-react";

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
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    date: "March 15, 2024"
  },
  {
    id: "2",
    title: "The Power of AI in Content Creation",
    description: "Discover how artificial intelligence is revolutionizing the way we create and optimize social media content.",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    date: "March 14, 2024"
  },
  {
    id: "3",
    title: "Trending Hashtag Strategies for 2024",
    description: "Stay ahead of the curve with the latest hashtag strategies that can boost your content's visibility.",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    date: "March 13, 2024"
  },
  {
    id: "4",
    title: "Building a Strong Personal Brand Online",
    description: "Essential tips and techniques for creating and maintaining a powerful personal brand on social media.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    date: "March 12, 2024"
  }
];

const Blogs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-custom-bg pt-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <BookOpenIcon className="w-8 h-8 text-electric-purple mr-2" />
          <h1 className="text-3xl font-montserrat font-bold text-custom-text">
            Latest Blog Posts
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Card 
              key={post.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              <CardHeader>
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardTitle className="text-xl font-montserrat mt-4">{post.title}</CardTitle>
                <CardDescription className="text-sm text-gray-500">{post.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-custom-text font-opensans">{post.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
