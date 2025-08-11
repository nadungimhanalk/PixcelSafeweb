import React from 'react';
import { Trash2, Sparkles, Loader2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ImageGrid = ({ images, viewMode, onImageDelete, onGenerateMetadata }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onImageDelete(image.id)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              {image.hasMetadata && (
                <Badge className="absolute top-2 left-2 bg-green-500">
                  Metadata
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              <h4 className="font-medium text-sm mb-2 truncate">{image.name}</h4>
              <p className="text-xs text-muted-foreground mb-3">
                {formatFileSize(image.size)} • {image.type}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onGenerateMetadata(image.id)}
                disabled={image.isProcessing || image.hasMetadata}
                className="w-full"
              >
                {image.isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : image.hasMetadata ? (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    View Metadata
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Metadata
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // List view
  return (
    <div className="space-y-4">
      {images.map((image) => (
        <Card key={image.id}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <img
                src={image.url}
                alt={image.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium">{image.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(image.size)} • {image.type}
                </p>
                {image.hasMetadata && (
                  <Badge className="mt-1 bg-green-500">Metadata Available</Badge>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onGenerateMetadata(image.id)}
                  disabled={image.isProcessing || image.hasMetadata}
                >
                  {image.isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : image.hasMetadata ? (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      View Metadata
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Metadata
                    </>
                  )}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onImageDelete(image.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ImageGrid;

