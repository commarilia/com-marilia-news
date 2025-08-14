import { useState } from 'react';
import { Header } from '@/components/Header';
import { CategoryNavigation } from '@/components/CategoryNavigation';
import { NewsCard } from '@/components/NewsCard';
import { NewsModal } from '@/components/NewsModal';
import { StoryModal } from '@/components/StoryModal';
import { mockNews, mockStories } from '@/data/mockNews';
import { NewsArticle, NewsCategory, Story } from '@/types/news';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('marilia');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  const handleNewsSelect = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsNewsModalOpen(true);
  };

  const handleStorySelect = (category: NewsCategory) => {
    const story = mockStories.find(s => s.category === category);
    if (story) {
      setSelectedStory(story);
      setIsStoryModalOpen(true);
    }
  };

  const handleNewsFromStory = (newsId: string) => {
    const article = mockNews.find(n => n.id === newsId);
    if (article) {
      handleNewsSelect(article);
    }
  };

  const filteredNews = selectedCategory 
    ? mockNews.filter(article => article.category === selectedCategory)
    : mockNews;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-background-alt shadow-lg min-h-screen">
        <Header />
        
        <CategoryNavigation 
          onCategorySelect={(category) => {
            setSelectedCategory(category);
            handleStorySelect(category);
          }}
          selectedCategory={selectedCategory}
        />
        
        <main className="p-4 space-y-4">
          {filteredNews.map((article) => (
            <NewsCard 
              key={article.id}
              article={article}
              onClick={() => handleNewsSelect(article)}
            />
          ))}
        </main>

        <NewsModal 
          article={selectedArticle}
          isOpen={isNewsModalOpen}
          onClose={() => setIsNewsModalOpen(false)}
        />

        <StoryModal 
          story={selectedStory}
          isOpen={isStoryModalOpen}
          onClose={() => setIsStoryModalOpen(false)}
          onNewsSelect={handleNewsFromStory}
        />
      </div>
    </div>
  );
};

export default Index;
