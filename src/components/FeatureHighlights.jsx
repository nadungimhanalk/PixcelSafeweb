import React from 'react';
import { Shield, Sparkles, Zap } from 'lucide-react';

const FeatureHighlights = () => {
  const features = [
    {
      icon: Shield,
      title: 'Non-Destructive',
      description: 'Original images remain untouched',
      color: 'text-green-500'
    },
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Intelligent metadata generation',
      color: 'text-purple-500'
    },
    {
      icon: Zap,
      title: 'Fast & Efficient',
      description: 'Batch processing capabilities',
      color: 'text-blue-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      {features.map((feature, index) => (
        <div key={index} className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <feature.icon className={`h-8 w-8 ${feature.color}`} />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureHighlights;

