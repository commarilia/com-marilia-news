export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  category: NewsCategory;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

export type NewsCategory = 'marilia' | 'regiao' | 'brasil' | 'mundo' | 'entretenimento' | 'esporte';

export interface StoryPage {
  id: string;
  image: string;
  title: string;
  summary: string;
  newsId: string;
}

export interface Story {
  category: NewsCategory;
  pages: StoryPage[];
}