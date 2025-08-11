import React, { useState } from 'react';
import { X, Key, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const SettingsModal = ({ isOpen, onClose, apiKeys, onSave }) => {
  const [formData, setFormData] = useState(apiKeys);

  const handleInputChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const handleClose = () => {
    setFormData(apiKeys); // Reset form data
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <span>API Settings</span>
          </DialogTitle>
          <DialogDescription>
            Configure your AI provider API keys for metadata generation.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="gemini-key">Gemini API Key</Label>
            <Input
              id="gemini-key"
              type="password"
              placeholder="Enter your Gemini API key"
              value={formData.gemini || ''}
              onChange={(e) => handleInputChange('gemini', e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Get your API key from Google AI Studio
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="openai-key">OpenAI API Key (Optional)</Label>
            <Input
              id="openai-key"
              type="password"
              placeholder="Enter your OpenAI API key"
              value={formData.openai || ''}
              onChange={(e) => handleInputChange('openai', e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              For additional AI analysis capabilities
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="claude-key">Claude API Key (Optional)</Label>
            <Input
              id="claude-key"
              type="password"
              placeholder="Enter your Claude API key"
              value={formData.claude || ''}
              onChange={(e) => handleInputChange('claude', e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              For Anthropic Claude analysis
            </p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;

