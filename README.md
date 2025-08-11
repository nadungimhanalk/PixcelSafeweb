# PixcelSafe - Complete AI-Powered Image Metadata Management

## Overview
PixcelSafe is a comprehensive web application for managing image metadata with AI-powered analysis capabilities. It provides professional tools for stock photography optimization, keyword research, and intelligent metadata generation using Google Gemini AI.

## ✨ Features

### 🎯 **Core Functionality**
- **Non-Destructive Processing**: Original images remain untouched
- **AI-Powered Metadata Generation**: Intelligent analysis using Google Gemini API
- **Batch Processing**: Handle multiple images efficiently
- **Professional UI**: Modern, responsive design with dark/light mode

### 🖼️ **Image Management**
- **Drag & Drop Upload**: Intuitive file upload interface
- **Multiple Format Support**: JPEG, PNG, TIFF and other image formats
- **Large File Support**: Up to 50MB per image, max 50 images
- **Grid/List Views**: Flexible viewing modes
- **Image Deletion**: Easy removal with confirmation

### 🤖 **AI Integration**
- **Google Gemini API**: Advanced image analysis
- **Metadata Generation**: Automatic title, description, keywords
- **Technical Analysis**: Composition, lighting, quality assessment
- **Commercial Viability**: Market potential scoring
- **SEO Optimization**: Keyword suggestions for better searchability

### ⚙️ **Settings & Configuration**
- **API Key Management**: Secure storage of AI provider keys
- **Multiple AI Providers**: Support for Gemini, OpenAI, Claude (extensible)
- **Dark/Light Mode**: Theme switching with persistence
- **Responsive Design**: Works on desktop and mobile

### 📊 **Statistics & Monitoring**
- **Real-time Statistics**: Total images, metadata count, AI suggestions
- **API Status Monitoring**: Connection status for AI providers
- **Processing Indicators**: Visual feedback for ongoing operations

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or pnpm package manager
- Google Gemini API key (provided: AIzaSyDVTt7Jp9NJqqrS6Md4J2FSbFU2Mezzy38)

### Installation
1. **Extract the application**:
   ```bash
   tar -xzf PixcelSafe-Complete-Application.tar.gz
   cd pixcel-safe-complete
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the application**:
   ```bash
   # Option 1: Start both frontend and backend together
   pnpm start
   
   # Option 2: Start separately
   # Terminal 1 - API Server
   node server.js
   
   # Terminal 2 - Frontend
   pnpm run dev --host
   ```

4. **Open your browser**:
   Navigate to `http://localhost:5173`

## 🏗️ Architecture

### Frontend (React + Vite)
- **React 19**: Modern React with hooks and context
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: High-quality component library
- **Lucide Icons**: Beautiful, consistent icons
- **Sonner**: Toast notifications

### Backend (Express.js)
- **Express 5**: Fast, minimalist web framework
- **CORS**: Cross-origin resource sharing
- **In-memory Storage**: Fast image and metadata storage
- **RESTful API**: Clean, predictable endpoints

### API Endpoints
- `POST /generate-metadata` - Generate AI metadata for images
- `POST /upload-images` - Upload and store images
- `GET /images` - Retrieve all images
- `DELETE /images/:id` - Delete specific image
- `GET /health` - Server health check

## 🔧 Configuration

### API Keys
1. Click the settings (gear) icon in the header
2. Enter your API keys:
   - **Gemini API Key**: Required for AI analysis (pre-configured)
   - **OpenAI API Key**: Optional for additional capabilities
   - **Claude API Key**: Optional for Anthropic analysis
3. Click "Save Settings"

### Environment Variables
```bash
# Optional: Set API keys via environment variables
GEMINI_API_KEY=your_gemini_key_here
OPENAI_API_KEY=your_openai_key_here
CLAUDE_API_KEY=your_claude_key_here
```

## 📱 Usage Guide

### 1. Upload Images
- Drag and drop images onto the upload area
- Or click "Choose Files" to select images
- Supports JPEG, PNG, TIFF formats
- Max 50 images, 50MB each

### 2. Generate Metadata
- Click "Generate Metadata" on any uploaded image
- AI will analyze the image and provide:
  - Descriptive title and description
  - Relevant keywords and tags
  - Technical analysis
  - Commercial viability assessment
  - SEO optimization suggestions

### 3. Manage Images
- Switch between Grid and List views
- Delete images using the trash icon
- View metadata by clicking "View Metadata"
- Monitor statistics in the sidebar

### 4. Search & Research
- Use the keyword research tool
- Enter search queries for market research
- View API status and connection health

## 🛠️ Development

### Project Structure
```
pixcel-safe-complete/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx      # App header with navigation
│   │   ├── Sidebar.jsx     # Tools and statistics
│   │   ├── MainContent.jsx # Main content area
│   │   ├── ImageUpload.jsx # File upload component
│   │   ├── ImageGrid.jsx   # Image display grid/list
│   │   ├── SettingsModal.jsx # API configuration
│   │   └── FeatureHighlights.jsx # Feature showcase
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Application entry point
├── server.js               # Express API server
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

### Available Scripts
```bash
pnpm dev          # Start frontend development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm server       # Start API server only
pnpm start        # Start both frontend and backend
```

### Adding New Features
1. **New AI Providers**: Extend the API key configuration in SettingsModal
2. **Additional Analysis**: Add new endpoints in server.js
3. **UI Components**: Create new components in src/components/
4. **Styling**: Use Tailwind CSS classes and shadcn/ui components

## 🔒 Security

- API keys are stored securely in localStorage
- CORS is properly configured for cross-origin requests
- File uploads are validated for type and size
- No sensitive data is logged or exposed

## 🚀 Deployment

### Production Build
```bash
pnpm build
```

### Environment Setup
- Ensure Node.js is installed on the server
- Set environment variables for API keys
- Configure reverse proxy (nginx) if needed
- Use PM2 or similar for process management

## 📝 API Documentation

### Generate Metadata
```http
POST /api/generate-metadata
Content-Type: application/json

{
  "imageId": "unique-image-id",
  "apiKey": "your-gemini-api-key"
}
```

**Response:**
```json
{
  "title": "AI Generated Title",
  "description": "Detailed description...",
  "keywords": ["keyword1", "keyword2"],
  "tags": ["tag1", "tag2"],
  "suggestions": ["suggestion1", "suggestion2"],
  "technicalAnalysis": {
    "composition": "Analysis...",
    "lighting": "Assessment...",
    "quality": "Quality score...",
    "colorProfile": "Color information..."
  },
  "commercialViability": {
    "score": 8.5,
    "marketDemand": "High",
    "suggestedPrice": "$25-50",
    "targetAudience": "Description..."
  },
  "generatedAt": "2025-08-10T14:36:26.418Z"
}
```

## 🐛 Troubleshooting

### Common Issues
1. **API Connection Failed**: Check API keys in settings
2. **Upload Not Working**: Verify file format and size limits
3. **Server Not Starting**: Ensure port 3001 is available
4. **Build Errors**: Clear node_modules and reinstall

### Debug Mode
```bash
# Enable debug logging
DEBUG=* node server.js
```

## 📄 License
This project is proprietary software. All rights reserved.

## 🤝 Support
For technical support or feature requests, please contact the development team.

---

**PixcelSafe** - Professional Image Metadata Management with AI
Version 1.0.0 | Built with ❤️ using React, Express, and Google Gemini AI

