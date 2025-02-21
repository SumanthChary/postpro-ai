
export const useHashtags = () => {
  const getCategoryHashtags = (category: string) => {
    const hashtags = {
      business: ["#entrepreneurship", "#business", "#success", "#leadership", "#innovation", "#startup", "#growthmindset", "#businesstips", "#networking", "#entrepreneurlife"],
      technology: ["#tech", "#innovation", "#ai", "#programming", "#coding", "#developer", "#software", "#technology", "#future", "#digitalmarketing"],
      lifestyle: ["#lifestyle", "#motivation", "#mindfulness", "#wellness", "#selfcare", "#inspiration", "#personaldevelopment", "#growth", "#positivity", "#mindset"],
      marketing: ["#marketing", "#digitalmarketing", "#socialmedia", "#branding", "#contentmarketing", "#marketingstrategy", "#advertising", "#business", "#marketingtips", "#socialmediatips"],
      creative: ["#creative", "#design", "#art", "#creativity", "#inspiration", "#artist", "#designer", "#creative", "#digitalart", "#graphicdesign"]
    };
    
    return hashtags[category as keyof typeof hashtags] || hashtags.business;
  };

  return { getCategoryHashtags };
};

export default useHashtags;
