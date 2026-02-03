import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onLearnMore?: () => void;
}

export default function ServiceCard({ icon: Icon, title, description, onLearnMore }: ServiceCardProps) {
  return (
    <div className="card p-8 text-center group hover:scale-105 transition-transform duration-200">
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center 
          group-hover:bg-primary-200 transition-colors">
          <Icon className="w-12 h-12 text-primary-700" strokeWidth={1.5} />
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">
        {description}
      </p>
      <button 
        onClick={onLearnMore}
        className="btn-outline w-full hover:border-primary hover:text-primary"
      >
        Ver más
      </button>
    </div>
  );
}
