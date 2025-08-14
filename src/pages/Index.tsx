import { useState } from 'react';
import { Header } from '@/components/Header';
import { CategoryNavigation } from '@/components/CategoryNavigation';
import { NewsCard } from '@/components/NewsCard';
import { NewsModal } from '@/components/NewsModal';
import { StoryModal } from '@/components/StoryModal';
import { useNews } from '@/hooks/use-news';
import { fetchNewsById, fetchStoriesByCategory } from '@/integrations/firebase/news';
import { NewsArticle, NewsCategory, Story } from '@/types/news';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('marilia');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  const newsQuery = useNews(selectedCategory);

  const handleNewsSelect = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsNewsModalOpen(true);
  };

  const handleStorySelect = async (category: NewsCategory) => {
    const story = await fetchStoriesByCategory(category);
    if (story) {
      setSelectedStory(story);
      setIsStoryModalOpen(true);
    }
  };

  const handleNewsFromStory = async (newsId: string) => {
    const article = newsQuery.data?.find(n => n.id === newsId) || await fetchNewsById(newsId);
    if (article) {
      handleNewsSelect(article);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-md mx-auto bg-background-alt shadow-lg min-h-screen">
        <Header />

        <CategoryNavigation
          onCategorySelect={category => {
            setSelectedCategory(category);
            handleStorySelect(category);
          }}
          selectedCategory={selectedCategory}
        />

        <main className="p-4 space-y-4">
          {newsQuery.data?.map(article => (
            <NewsCard key={article.id} article={article} onClick={() => handleNewsSelect(article)} />
          ))}
        </main>

        <NewsModal article={selectedArticle} isOpen={isNewsModalOpen} onClose={() => setIsNewsModalOpen(false)} />

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
