import { useQuery } from '@tanstack/react-query';
import { fetchNewsByCategory } from '@/integrations/firebase/news';
import { NewsCategory, NewsArticle } from '@/types/news';

export const useNews = (category: NewsCategory) => {
  return useQuery<NewsArticle[]>({
    queryKey: ['news', category],
    queryFn: () => fetchNewsByCategory(category),
  });
};
