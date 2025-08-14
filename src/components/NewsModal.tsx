import { useEffect, useState } from 'react';
import { X, Heart, Share, Bookmark } from 'lucide-react';
import { NewsArticle } from '@/types/news';
import { cn } from '@/lib/utils';

interface NewsModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

export const NewsModal = ({ article, isOpen, onClose }: NewsModalProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsLiked(article?.isLiked || false);
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, article]);

  if (!isOpen || !article) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
      <div
        className="fixed inset-0 bg-overlay z-50 animate-in fade-in duration-500"
        onClick={onClose}
      >
        <div
          className="absolute bottom-0 left-0 right-0 bg-background-alt rounded-t-2xl shadow-2xl max-w-md mx-auto h-[95vh] animate-in slide-in-from-bottom duration-500 ease-out"
          onClick={(e) => e.stopPropagation()}
        >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-text-secondary bg-gray-200 rounded-full p-1 hover:bg-gray-300 transition-colors z-30"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="h-full overflow-y-auto no-scrollbar pt-8 p-4 pb-20">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            {article.title}
          </h2>
          <div 
            className="text-text-secondary space-y-4"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-3 z-30">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={cn(
              "w-10 h-10 flex items-center justify-center backdrop-blur-sm rounded-full shadow-lg transition-colors",
              "bg-action-bg",
              isLiked ? "text-action-hover-like" : "text-text-secondary hover:text-action-hover-like"
            )}
          >
            <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
          </button>
          
          <button 
            onClick={handleShare}
            className="w-10 h-10 flex items-center justify-center bg-action-bg backdrop-blur-sm rounded-full shadow-lg text-text-secondary hover:text-action-hover-share transition-colors"
          >
            <Share className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className={cn(
              "w-10 h-10 flex items-center justify-center backdrop-blur-sm rounded-full shadow-lg transition-colors",
              "bg-action-bg",
              isSaved ? "text-action-hover-save" : "text-text-secondary hover:text-action-hover-save"
            )}
          >
            <Bookmark className={cn("w-5 h-5", isSaved && "fill-current")} />
          </button>
        </div>
      </div>
    </div>
  );
};