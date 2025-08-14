import { NewsArticle } from '@/types/news';
import { cn } from '@/lib/utils';

interface NewsCardProps {
  article: NewsArticle;
  onClick: () => void;
}

const categoryColors = {
  marilia: 'text-primary',
  regiao: 'text-orange-500',
  brasil: 'text-green-500',
  mundo: 'text-gray-500',
  entretenimento: 'text-purple-500',
  esporte: 'text-red-500'
};

const categoryNames = {
  marilia: 'Marília',
  regiao: 'Região', 
  brasil: 'Brasil',
  mundo: 'Mundo',
  entretenimento: 'Entretenimento',
  esporte: 'Esporte'
};

export const NewsCard = ({ article, onClick }: NewsCardProps) => {
  return (
    <div 
      className="cursor-pointer group" 
      onClick={onClick}
    >
      <div className="flex items-center p-4 bg-card rounded-xl shadow-md hover:shadow-lg border border-card-border transition-all duration-300 group-hover:scale-[1.02]">
        <img 
          className="h-24 w-24 object-cover rounded-lg flex-shrink-0" 
          src={article.image} 
          alt={`Imagem da notícia: ${article.title}`}
        />
        <div className="ml-4 flex-1 min-w-0">
          <div className={cn(
            "uppercase tracking-wide text-xs font-semibold mb-1",
            categoryColors[article.category]
          )}>
            {categoryNames[article.category]}
          </div>
          <h3 className="text-lg leading-tight font-bold text-text-primary mb-2 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-text-muted text-sm line-clamp-2">
            {article.summary}
          </p>
        </div>
      </div>
    </div>
  );
};