
import { Card } from "@/components/ui/card";
import { FileTextIcon, RocketIcon, LockIcon } from "lucide-react";

interface TemplatesSectionProps {
  handleProTemplatesClick: () => void;
}

const TemplatesSection = ({ handleProTemplatesClick }: TemplatesSectionProps) => {
  return (
    <div className="mt-16 max-w-2xl mx-auto">
      <h2 className="text-2xl font-montserrat font-bold text-center mb-8 bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">
        Available Templates
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center space-x-3 mb-4">
            <FileTextIcon className="w-6 h-6 text-electric-purple" />
            <h3 className="text-lg font-montserrat font-bold">Basic Templates</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Access our collection of basic templates designed for essential social media posts.
          </p>
          <a 
            href="https://docs.google.com/document/d/1M-UTmrH6HtCT2ZfA1N7Prsr_U91Kd9fp5pklwdhJ9Dk/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-electric-purple hover:text-electric-purple/80 font-semibold"
          >
            View Templates
            <RocketIcon className="w-4 h-4 ml-2" />
          </a>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow duration-200 relative">
          <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] rounded-lg flex items-center justify-center">
            <div className="bg-white/90 p-4 rounded-lg shadow-lg flex items-center space-x-2">
              <LockIcon className="w-5 h-5 text-coral-red" />
              <span className="font-semibold text-coral-red">Pro Plan Required</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <FileTextIcon className="w-6 h-6 text-bright-teal" />
            <h3 className="text-lg font-montserrat font-bold">Pro Templates</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Explore our premium templates with advanced features for professional content.
          </p>
          <button 
            onClick={handleProTemplatesClick}
            className="inline-flex items-center text-bright-teal hover:text-bright-teal/80 font-semibold"
          >
            View Templates
            <RocketIcon className="w-4 h-4 ml-2" />
          </button>
        </Card>
      </div>
    </div>
  );
};

export default TemplatesSection;
