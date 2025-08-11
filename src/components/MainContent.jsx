import React from 'react';
import ImageUpload from './ImageUpload';
import ImageGrid from './ImageGrid';
import FeatureHighlights from './FeatureHighlights';

const MainContent = ({ 
  viewMode, 
  images, 
  onImageUpload, 
  onImageDelete, 
  onGenerateMetadata 
}) => {
  return (
    <main className="flex-1 p-6">
      {images.length === 0 ? (
        <>
          <ImageUpload onImageUpload={onImageUpload} />
          <FeatureHighlights />
        </>
      ) : (
        <ImageGrid 
          images={images}
          viewMode={viewMode}
          onImageDelete={onImageDelete}
          onGenerateMetadata={onGenerateMetadata}
        />
      )}
    </main>
  );
};

export default MainContent;

