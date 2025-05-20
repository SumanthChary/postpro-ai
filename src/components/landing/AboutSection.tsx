
const AboutSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-light-lavender to-white rounded-2xl shadow-lg my-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-center mb-8">
          About Our Platform
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-electric-purple">Our Mission</h3>
            <p className="text-custom-text leading-relaxed">
              We're dedicated to empowering professionals and businesses to create engaging, 
              impactful social media content through innovative AI technology.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-electric-purple">Why Choose Us</h3>
            <ul className="space-y-2 text-custom-text">
              <li className="flex items-center gap-2">
                <span className="text-bright-teal">✓</span>
                Advanced AI-powered content enhancement
              </li>
              <li className="flex items-center gap-2">
                <span className="text-bright-teal">✓</span>
                Professional templates for every industry
              </li>
              <li className="flex items-center gap-2">
                <span className="text-bright-teal">✓</span>
                Time-saving automation tools
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
