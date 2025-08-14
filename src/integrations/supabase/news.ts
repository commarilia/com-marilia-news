import { supabase } from './client';
import { NewsArticle, NewsCategory, Story, StoryPage } from '@/types/news';

export async function fetchNewsByCategory(category: NewsCategory): Promise<NewsArticle[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    summary: row.summary,
    content: row.content,
    image: row.image,
    category: row.category,
    createdAt: row.created_at,
    likes: row.likes ?? 0,
  })) as NewsArticle[];
}

export async function fetchNewsById(id: string): Promise<NewsArticle | null> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  if (!data) return null;
  return {
    id: data.id,
    title: data.title,
    summary: data.summary,
    content: data.content,
    image: data.image,
    category: data.category,
    createdAt: data.created_at,
    likes: data.likes ?? 0,
  } as NewsArticle;
}

export async function fetchStoriesByCategory(category: NewsCategory): Promise<Story | null> {
  const { data, error } = await supabase
    .from('stories')
    .select('id, story_pages(id, image, title, summary, news_id)')
    .eq('category', category)
    .single();
  if (error) throw error;
  if (!data) return null;
  const pages: StoryPage[] = (data.story_pages ?? []).map(
    (p: {
      id: string;
      image: string;
      title: string;
      summary: string;
      news_id: string;
    }) => ({
      id: p.id,
      image: p.image,
      title: p.title,
      summary: p.summary,
      newsId: p.news_id,
    }),
  );
  return { category, pages } as Story;
}

export async function insertNews(article: NewsArticle) {
  const { error } = await supabase.from('news').insert({
    id: article.id,
    title: article.title,
    summary: article.summary,
    content: article.content,
    image: article.image,
    category: article.category,
    created_at: article.createdAt,
    likes: article.likes ?? 0,
  });
  if (error) throw error;
}
