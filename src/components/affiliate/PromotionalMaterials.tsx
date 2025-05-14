
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from 'lucide-react';

interface PromotionalMaterialProps {
  materials: Array<{
    title: string;
    description: string;
    cta: string;
  }>;
}

const PromotionalMaterials: React.FC<PromotionalMaterialProps> = ({ materials }) => {
  return (
    <Card className="p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-electric-purple">Promotional Materials</h3>
      <p className="text-sm text-gray-600 mb-6">
        Use these ready-made marketing materials to promote PostPro AI effectively. All materials automatically include your unique affiliate link.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {materials.map((material, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-electric-purple transition-colors">
            <h4 className="font-semibold text-lg mb-2">{material.title}</h4>
            <p className="text-sm text-gray-600 mb-4">{material.description}</p>
            <Button variant="outline" size="sm">
              {material.cta} <ArrowRightIcon className="w-3 h-3 ml-1" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PromotionalMaterials;
