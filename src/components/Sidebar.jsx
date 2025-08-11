import React from 'react';
import { Grid, List, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Sidebar = ({ 
  viewMode, 
  setViewMode, 
  searchQuery, 
  setSearchQuery, 
  onSearch, 
  statistics,
  apiStatus
}) => {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border p-4 min-h-screen">
      {/* Tools Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-sidebar-foreground mb-3">Tools</h3>
        
        {/* View Mode */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">View Mode</p>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="flex-1"
            >
              <Grid className="h-4 w-4 mr-1" />
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="flex-1"
            >
              <List className="h-4 w-4 mr-1" />
              List
            </Button>
          </div>
        </div>

        {/* Keyword Research */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">Keyword Research</p>
          <div className="flex space-x-2">
            <Input
              placeholder="Search query (e.g., 'happy family')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button size="sm" onClick={onSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-sidebar-foreground mb-3">Statistics</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Images:</span>
            <span className="font-medium">{statistics.totalImages}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">With Metadata:</span>
            <span className="font-medium">{statistics.withMetadata}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">AI Suggestions:</span>
            <span className="font-medium">{statistics.aiSuggestions}</span>
          </div>
        </div>
      </div>

      {/* API Status Section */}
      <div>
        <h3 className="text-sm font-medium text-sidebar-foreground mb-3">API Status</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              apiStatus.gemini === 'configured' ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <span className="text-sm text-muted-foreground">
              Gemini API: {apiStatus.gemini}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

