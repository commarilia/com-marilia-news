import { useEffect, useState, useCallback } from 'react';
import { X, Heart, Share, Bookmark } from 'lucide-react';
import { Story, NewsCategory } from '@/types/news';
import { cn } from '@/lib/utils';

interface StoryModalProps {
  story: Story | null;
  isOpen: boolean;
  onClose: () => void;
  onNewsSelect: (newsId: string) => void;
}

export const StoryModal = ({ story, isOpen, onClose, onNewsSelect }: StoryModalProps) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const nextPage = useCallback(() => {
    if (!story) return;
    
    if (currentPageIndex < story.pages.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
      setProgressKey(prev => prev + 1);
    } else {
      onClose();
    }
  }, [currentPageIndex, story, onClose]);

  const prevPage = useCallback(() => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
      setProgressKey(prev => prev + 1);
    }
  }, [currentPageIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentPageIndex(0);
      setProgressKey(0);
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !story) return;

    const timer = setTimeout(nextPage, 5000);
    return () => clearTimeout(timer);
  }, [isOpen, story, currentPageIndex, nextPage]);

  if (!isOpen || !story) return null;

  const currentPage = story.pages[currentPageIndex];

  const handleNewsOpen = () => {
    onClose();
    setTimeout(() => {
      onNewsSelect(currentPage.newsId);
    }, 500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentPage.title,
        text: currentPage.summary,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black z-50 transition-opacity duration-500"
      onClick={onClose}
    >
      <div 
        className="relative h-full w-full max-w-md mx-auto flex flex-col justify-center transition-transform duration-500 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress Bars */}
        <div className="absolute top-2 left-2 right-2 flex gap-1 z-20">
          {story.pages.map((_, index) => (
            <div key={index} className="h-1 bg-story-progress-bg rounded-full flex-1">
              <div 
                key={`${index}-${progressKey}`}
                className={cn(
                  "h-1 bg-story-progress rounded-full transition-all duration-[5000ms] ease-linear",
                  index < currentPageIndex ? "w-full" : 
                  index === currentPageIndex ? "w-full" : "w-0"
                )}
                style={{
                  transitionDuration: index === currentPageIndex ? '5000ms' : '0ms'
                }}
              />
            </div>
          ))}
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-4 text-white z-30 hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <X className="h-7 w-7" />
        </button>

        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${currentPage.image}')` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 story-overlay-gradient" />
        
        {/* Content */}
        <div className="relative z-10 h-full w-full flex flex-col justify-end">
          <div className="w-full p-4 flex items-end">
            <div className="flex-grow pr-4">
              <button 
                onClick={handleNewsOpen}
                className="mb-4 bg-white/30 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-lg hover:bg-white/50 transition-colors"
              >
                Matéria Completa
              </button>
              <h3 className="text-2xl font-bold text-white mb-2">
                {currentPage.title}
              </h3>
              <p className="text-lg text-white text-ellipsis-3-lines">
                {currentPage.summary}
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col items-center space-y-5 text-white">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="flex flex-col items-center text-center hover:scale-110 transition-transform"
              >
                <Heart className={cn("w-8 h-8", isLiked && "fill-current text-red-500")} />
              </button>
              
              <button 
                onClick={handleShare}
                className="flex flex-col items-center text-center hover:scale-110 transition-transform"
              >
                <Share className="w-8 h-8" />
              </button>
              
              <button 
                onClick={() => setIsSaved(!isSaved)}
                className="flex flex-col items-center text-center hover:scale-110 transition-transform"
              >
                <Bookmark className={cn("w-8 h-8", isSaved && "fill-current text-green-500")} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Touch Areas */}
        <div className="absolute inset-0 flex z-10">
          <div className="w-1/3" onClick={prevPage} />
          <div className="w-2/3" onClick={nextPage} />
        </div>
      </div>
    </div>
  );
};