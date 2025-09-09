
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Enhance = () => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const { user, loading: authLoading } = useAuth('/auth', true);

  useEffect(() => {
    // Simulate page loading and check for any initialization errors
    const initializePage = async () => {
      try {
        // Add any initialization logic here
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
        setIsPageLoading(false);
      } catch (error) {
        console.error('Error initializing enhance page:', error);
        setHasError(true);
        setIsPageLoading(false);
      }
    };

    if (!authLoading) {
      initializePage();
    }
  }, [authLoading]);

  if (isPageLoading || authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50 py-12 px-4 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading enhance page...</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50 py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="mb-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-2 bg-white/80 backdrop-blur-sm border-gray-200/50 hover:bg-white/90 transition-all duration-200">
                <ArrowLeft size={16} />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              There was an error loading the enhancement page. Please refresh the page or try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <div className="mb-4">
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2 bg-white/80 backdrop-blur-sm border-gray-200/50 hover:bg-white/90 transition-all duration-200">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Enhance Your Post
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium px-4">
            Transform your content with AI-powered enhancements, automatic trending hashtags, and viral CTAs
          </p>
        </div>

        {/* Authentication Warning */}
        {!user && (
          <Alert className="max-w-2xl mx-auto bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Sign in to access post enhancement features and save your enhanced content.
            </AlertDescription>
          </Alert>
        )}

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 md:p-8">
          <PostEnhancer 
            post={post} 
            setPost={setPost} 
            category={category} 
            setCategory={setCategory} 
            styleTone={styleTone}
            setStyleTone={setStyleTone}
          />
        </div>

        {/* Enhancement Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100/50">
            <div className="text-sm text-blue-600 font-medium">Today's Enhancements</div>
            <div className="text-2xl font-bold text-blue-900">24</div>
          </div>
          
          <div className="bg-green-50/80 backdrop-blur-sm rounded-xl p-4 border border-green-100/50">
            <div className="text-sm text-green-600 font-medium">Avg. Engagement Rate</div>
            <div className="text-2xl font-bold text-green-900">+147%</div>
          </div>
          
          <div className="bg-purple-50/80 backdrop-blur-sm rounded-xl p-4 border border-purple-100/50">
            <div className="text-sm text-purple-600 font-medium">Viral Score</div>
            <div className="text-2xl font-bold text-purple-900">8.9/10</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enhance;
