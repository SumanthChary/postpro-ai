import React from 'react';
const AboutFounderSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <img src="/lovable-uploads/e055f783-4b8b-47c8-a842-0449cddb238b.png" alt="Founder" className="w-24 h-24 rounded-full object-cover mx-auto mb-4 ring-4 ring-blue-100" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Founder & Creator</h3>
          <p className="text-gray-600 mb-4">
            "Built PostPro AI to solve my own LinkedIn engagement challenges. Now helping creators worldwide grow their professional presence."
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <span>5+ SaaS Built</span>
            <span>•</span>
            <span>Content Creator</span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutFounderSection;