import { collection, doc, getDoc, getDocs, query, where, orderBy, limit, setDoc } from "firebase/firestore";
import { db } from "./client";
import type { NewsArticle, NewsCategory, Story, StoryPage } from "@/types/news";

export async function fetchNewsByCategory(category: NewsCategory): Promise<NewsArticle[]> {
  const q = query(
    collection(db, "news"),
    where("category", "==", category),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...(d.data() as Omit<NewsArticle, "id">) }));
}

export async function fetchNewsById(id: string): Promise<NewsArticle | null> {
  const docRef = doc(db, "news", id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<NewsArticle, "id">) };
}

export async function fetchStoriesByCategory(category: NewsCategory): Promise<Story | null> {
  const q = query(collection(db, "stories"), where("category", "==", category), limit(1));
  const stories = await getDocs(q);
  if (stories.empty) return null;
  const storyDoc = stories.docs[0];
  const pagesSnap = await getDocs(collection(storyDoc.ref, "story_pages"));
  const pages: StoryPage[] = pagesSnap.docs.map(p => ({ id: p.id, ...(p.data() as Omit<StoryPage, "id">) }));
  return { category, pages };
}

export async function insertNews(article: NewsArticle) {
  const docRef = doc(db, "news", article.id);
  await setDoc(docRef, {
    title: article.title,
    summary: article.summary,
    content: article.content,
    image: article.image,
    category: article.category,
    createdAt: article.createdAt,
    likes: article.likes ?? 0,
  });
}
