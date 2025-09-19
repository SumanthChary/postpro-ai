
import { ImageComparisonSlider } from "@/components/ui/image-comparison-slider-horizontal";

const ComparisonSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 lg:mb-8 tracking-tight">
            Before vs After
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed px-2">
            See the dramatic difference AI enhancement makes to your social media posts
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="rounded-lg border overflow-hidden shadow-lg bg-white" style={{ aspectRatio: "16/10" }}>
            <ImageComparisonSlider
              leftImage="/lovable-uploads/new-before-post.png"
              rightImage="/lovable-uploads/new-after-post.png"
              altLeft="Before: Basic post with only 4 likes"
              altRight="After: Enhanced post with 1,847 likes, 423 comments, 156 shares"
              initialPosition={80}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
