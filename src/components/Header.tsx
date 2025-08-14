import { Heart, Search, User } from 'lucide-react';

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-card-border bg-background-alt">
      <h1 className="text-3xl font-bold text-primary">
        ComMarília
      </h1>
      <div className="flex items-center space-x-4">
        <button className="text-text-secondary hover:text-action-hover-like transition-colors">
          <Heart className="h-6 w-6" />
        </button>
        <button className="text-text-secondary hover:text-action-hover-share transition-colors">
          <Search className="h-6 w-6" />
        </button>
        <button className="text-text-secondary hover:text-action-hover-save transition-colors">
          <User className="h-8 w-8" />
        </button>
      </div>
    </header>
  );
};