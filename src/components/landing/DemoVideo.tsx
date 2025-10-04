import React, { useState } from 'react';
import { Play, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
const DemoVideo = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          See PostPro AI in Action
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
          Watch how AI transforms ordinary posts into viral content
        </p>
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
        >
          <Play className="w-5 h-5" />
          Watch Demo
          <ChevronRight className="w-5 h-5" />
        </Button>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-4xl">
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <p className="text-white">Demo video player placeholder</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
export default DemoVideo;