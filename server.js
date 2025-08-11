import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// In-memory storage for images (in production, use a database)
const imageStore = new Map();

// Generate metadata using mock AI analysis
const generateMetadata = async (imageId) => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  return {
    title: `AI Generated Title for Image ${imageId}`,
    description: 'A beautiful image analyzed by AI with detailed metadata including keywords, composition analysis, and commercial viability assessment.',
    keywords: ['photography', 'professional', 'high-quality', 'stock-photo', 'commercial'],
    tags: ['nature', 'landscape', 'outdoor', 'scenic'],
    suggestions: [
      'Consider adjusting brightness for better commercial appeal',
      'Add more descriptive keywords for better searchability',
      'This image has strong commercial potential for marketing materials'
    ],
    technicalAnalysis: {
      composition: 'Rule of thirds applied effectively',
      lighting: 'Natural lighting with good exposure',
      quality: 'High resolution suitable for print',
      colorProfile: 'sRGB color space detected'
    },
    commercialViability: {
      score: 8.5,
      marketDemand: 'High',
      suggestedPrice: '$25-50',
      targetAudience: 'Marketing agencies, web designers, content creators'
    },
    generatedAt: new Date().toISOString()
  };
};

// API Routes
app.post('/generate-metadata', async (req, res) => {
  try {
    const { imageId, apiKey } = req.body;

    if (!imageId || !apiKey) {
      return res.status(400).json({ error: 'Missing imageId or apiKey' });
    }

    console.log(`Generating metadata for image ${imageId} using API key: ${apiKey.substring(0, 10)}...`);

    const metadata = await generateMetadata(imageId);
    
    // Store metadata in memory
    if (imageStore.has(imageId)) {
      const imageData = imageStore.get(imageId);
      imageData.metadata = metadata;
      imageStore.set(imageId, imageData);
    }

    res.json(metadata);
  } catch (error) {
    console.error('Error generating metadata:', error);
    res.status(500).json({ error: 'Failed to generate metadata' });
  }
});

app.post('/upload-images', (req, res) => {
  try {
    const { images } = req.body;

    if (!images || !Array.isArray(images)) {
      return res.status(400).json({ error: 'Invalid images data' });
    }

    // Store images in memory
    images.forEach(image => {
      imageStore.set(image.id, image);
    });

    res.json({ success: true, count: images.length });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

app.get('/images', (req, res) => {
  try {
    const images = Array.from(imageStore.values());
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

app.delete('/images/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    if (imageStore.has(id)) {
      imageStore.delete(id);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`PixcelSafe API server running on http://0.0.0.0:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

