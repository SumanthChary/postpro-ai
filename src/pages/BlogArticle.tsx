
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  content: string;
}

const blogPosts: Record<string, BlogPost> = {
  "1": {
    id: "1",
    title: "Maximizing Your Social Media Impact",
    description: "Learn the key strategies to enhance your social media presence and engage with your audience effectively.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    date: "March 15, 2024",
    content: `
      In today's digital landscape, having a strong social media presence is more important than ever. Whether you're an individual creator or a business, the way you present yourself online can make a significant difference in your success.

      Here are some key strategies to maximize your social media impact:

      1. Consistency is Key
      Maintain a regular posting schedule to keep your audience engaged. Use tools like PostPro AI to ensure your content is always optimized and ready to go.

      2. Engage With Your Audience
      Don't just post content - interact with your followers. Respond to comments, participate in discussions, and create content that encourages engagement.

      3. Use Trending Hashtags Wisely
      Research and use relevant hashtags that can help your content reach a wider audience. PostPro AI's hashtag suggestions can help you stay on top of trending topics in your niche.

      4. Monitor and Adapt
      Keep track of which posts perform well and adjust your strategy accordingly. Use analytics tools to understand your audience better and create content that resonates with them.

      Remember, building a strong social media presence takes time and dedication, but the results are worth the effort.
    `
  },
  "2": {
    id: "2",
    title: "The Power of AI in Content Creation",
    description: "Discover how artificial intelligence is revolutionizing the way we create and optimize social media content.",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    date: "March 14, 2024",
    content: `
      Artificial Intelligence is transforming the way we create and optimize content for social media. From generating ideas to optimizing posts for maximum engagement, AI tools are becoming indispensable for content creators.

      Key Benefits of AI in Content Creation:

      1. Time Efficiency
      AI tools can help you create content faster by automating repetitive tasks and providing quick suggestions for improvements.

      2. Data-Driven Insights
      AI can analyze vast amounts of data to identify trends and patterns that can inform your content strategy.

      3. Consistency in Quality
      With AI-powered tools like PostPro AI, you can ensure your content maintains a high standard of quality across all posts.

      4. Personalization at Scale
      AI helps you create personalized content for different audience segments while maintaining efficiency.

      The future of content creation is here, and it's powered by AI. Stay ahead of the curve by incorporating AI tools into your content strategy.
    `
  },
  "3": {
    id: "3",
    title: "Trending Hashtag Strategies for 2024",
    description: "Stay ahead of the curve with the latest hashtag strategies that can boost your content's visibility.",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    date: "March 13, 2024",
    content: `
      Hashtags continue to be a crucial element in social media strategy. In 2024, the way we use hashtags has evolved, and it's important to stay updated with the latest trends.

      Essential Hashtag Strategies:

      1. Niche-Specific Hashtags
      Focus on hashtags that are specific to your industry or niche. These tend to have higher engagement rates than general hashtags.

      2. Brand Hashtags
      Create and promote your own branded hashtags to build community and track user-generated content.

      3. Location-Based Hashtags
      If your content is location-specific, include relevant geographic hashtags to reach local audiences.

      4. Trending Topics
      Stay current with trending hashtags in your industry, but only use them when relevant to your content.

      Remember to regularly update your hashtag strategy and use tools like PostPro AI to find the most effective hashtags for your posts.
    `
  },
  "4": {
    id: "4",
    title: "Building a Strong Personal Brand Online",
    description: "Essential tips and techniques for creating and maintaining a powerful personal brand on social media.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    date: "March 12, 2024",
    content: `
      Your personal brand is how you present yourself to the world online. It's the combination of your skills, experience, and personality that makes you unique.

      Steps to Build Your Personal Brand:

      1. Define Your Brand Identity
      Determine what you want to be known for and how you want to be perceived by your audience.

      2. Create Consistent Content
      Maintain a consistent voice and visual style across all your social media platforms.

      3. Share Your Expertise
      Regularly share valuable insights and knowledge in your area of expertise.

      4. Engage Authentically
      Build genuine connections with your audience through meaningful interactions.

      Building a strong personal brand takes time, but with consistency and authenticity, you can create a powerful online presence that resonates with your target audience.
    `
  }
};

const BlogArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = id ? blogPosts[id] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-custom-bg pt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-montserrat">Article not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-custom-bg pt-24">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/blogs")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Blogs
        </Button>

        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        <h1 className="text-3xl font-montserrat font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500 mb-6 font-opensans">{post.date}</p>

        <div className="prose max-w-none font-opensans">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph.trim()}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogArticle;
