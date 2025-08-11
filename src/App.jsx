import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SettingsModal from './components/SettingsModal';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [viewMode, setViewMode] = useState('grid');
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKeys, setApiKeys] = useState({
    gemini: 'AIzaSyDVTt7Jp9NJqqrS6Md4J2FSbFU2Mezzy38'
  });

  useEffect(() => {
    // Load saved settings from localStorage
    const savedApiKeys = localStorage.getItem('pixcelSafeApiKeys');
    if (savedApiKeys) {
      setApiKeys(JSON.parse(savedApiKeys));
    }
    
    const savedDarkMode = localStorage.getItem('pixcelSafeDarkMode');
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleImageUpload = (newImages) => {
    setImages(prev => [...prev, ...newImages]);
  };

  const handleImageDelete = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Implement keyword research functionality
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('pixcelSafeDarkMode', JSON.stringify(newDarkMode));
  };

  const handleSettingsOpen = () => {
    setIsSettingsOpen(true);
  };

  const handleSettingsSave = (newApiKeys) => {
    setApiKeys(newApiKeys);
    localStorage.setItem('pixcelSafeApiKeys', JSON.stringify(newApiKeys));
    setIsSettingsOpen(false);
  };

  const handleGenerateMetadata = async (imageId) => {
    const image = images.find(img => img.id === imageId);
    if (!image || !apiKeys.gemini) {
      console.error('Image not found or Gemini API key not configured');
      return;
    }

    try {
      // Update image status to processing
      setImages(prev => prev.map(img => 
        img.id === imageId 
          ? { ...img, isProcessing: true }
          : img
      ));

      const response = await fetch('/api/generate-metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageId,
          apiKey: apiKeys.gemini
        }),
      });

      if (response.ok) {
        const metadata = await response.json();
        setImages(prev => prev.map(img => 
          img.id === imageId 
            ? { ...img, metadata, isProcessing: false, hasMetadata: true }
            : img
        ));
      } else {
        throw new Error('Failed to generate metadata');
      }
    } catch (error) {
      console.error('Error generating metadata:', error);
      setImages(prev => prev.map(img => 
        img.id === imageId 
          ? { ...img, isProcessing: false }
          : img
      ));
    }
  };

  const statistics = {
    totalImages: images.length,
    withMetadata: images.filter(img => img.hasMetadata).length,
    aiSuggestions: images.filter(img => img.metadata?.suggestions?.length > 0).length
  };

  return (
    <div className={`min-h-screen bg-background text-foreground ${isDarkMode ? 'dark' : ''}`}>
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode}
        onSettingsOpen={handleSettingsOpen}
      />
      <div className="flex">
        <Sidebar 
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          statistics={statistics}
          apiStatus={{
            gemini: apiKeys.gemini ? 'configured' : 'not configured'
          }}
        />
        <MainContent 
          viewMode={viewMode}
          images={images}
          onImageUpload={handleImageUpload}
          onImageDelete={handleImageDelete}
          onGenerateMetadata={handleGenerateMetadata}
        />
      </div>
      
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKeys={apiKeys}
        onSave={handleSettingsSave}
      />
      
      <Toaster />
    </div>
  );
}

export default App;
