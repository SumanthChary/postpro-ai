"use client";

import React from "react";
import { AnimatedTooltip } from "./animated-tooltip";
const people = [{
  id: 1,
  name: "Sarah Chen",
  designation: "Marketing Director",
  image: "/lovable-uploads/97bd32e7-93e2-4645-94fe-abefa22c48b4.png"
}, {
  id: 2,
  name: "Marcus Johnson",
  designation: "Content Creator",
  image: "/lovable-uploads/7efcb3c2-eb10-425c-b878-b591a526933c.png"
}, {
  id: 3,
  name: "Elena Rodriguez",
  designation: "LinkedIn Strategist",
  image: "/lovable-uploads/59dc33af-55be-49fa-a248-8d17d4a9da2e.png"
}, {
  id: 4,
  name: "David Kim",
  designation: "Business Coach",
  image: "/lovable-uploads/0f24d879-0dfd-4159-9ff9-9c929de73b38.png"
}, {
  id: 5,
  name: "Priya Patel",
  designation: "Social Media Expert",
  image: "/lovable-uploads/17220bae-5e9e-4d14-8cbc-7cc2072b88be.png"
}, {
  id: 6,
  name: "Alex Thompson",
  designation: "Growth Hacker",
  image: "/lovable-uploads/88f25795-9d15-4c46-97a2-63eebfef26dc.png"
}];
export function AnimatedTooltipPreview() {
  return <div className="flex flex-col items-center justify-center w-full py-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          Join 10K+ LinkedIn Professionals
        </h3>
        <p className="text-gray-600 text-sm">Enhancing their content daily</p>
      </div>
      <AnimatedTooltip items={people} />
    </div>;
}