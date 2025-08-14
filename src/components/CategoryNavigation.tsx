import { NewsCategory } from '@/types/news';

interface CategoryNavigationProps {
  onCategorySelect: (category: NewsCategory) => void;
  selectedCategory?: NewsCategory;
}

const categories = [
  { 
    id: 'marilia', 
    name: 'Marília', 
    image: 'https://marilianoticia.com.br/wp-content/uploads/2025/08/mercado-livre-ok-768x576.jpg',
    gradient: 'bg-gradient-marilia'
  },
  { 
    id: 'regiao', 
    name: 'Região', 
    image: 'https://images.unsplash.com/photo-1573168343383-f27a43d1d88a?q=80&w=800&auto=format&fit=crop',
    gradient: 'bg-gradient-regiao'
  },
  { 
    id: 'brasil', 
    name: 'Brasil', 
    image: 'https://images.unsplash.com/photo-1523978591428-BC504392aaa6?q=80&w=800&auto=format&fit=crop',
    gradient: 'bg-gradient-brasil'
  },
  { 
    id: 'mundo', 
    name: 'Mundo', 
    image: 'https://images.unsplash.com/photo-1559424563-216434c4ead4?q=80&w=800&auto=format&fit=crop',
    gradient: 'bg-gradient-mundo'
  },
  { 
    id: 'entretenimento', 
    name: 'Entretenimento', 
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    gradient: 'bg-gradient-entretenimento'
  },
  { 
    id: 'esporte', 
    name: 'Esporte', 
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop',
    gradient: 'bg-gradient-esporte'
  }
];

export const CategoryNavigation = ({ onCategorySelect, selectedCategory }: CategoryNavigationProps) => {
  return (
    <nav className="p-4 border-b border-card-border bg-background-alt">
      <div className="flex space-x-4 overflow-x-auto no-scrollbar">
        {categories.map((category) => (
          <div
            key={category.id}
            className="text-center flex-shrink-0 group w-20 cursor-pointer"
            onClick={() => onCategorySelect(category.id as NewsCategory)}
          >
            <div className={`w-16 h-16 mx-auto p-1 rounded-full ${
              selectedCategory === category.id ? category.gradient : 'bg-gray-200'
            } transition-all duration-300 hover:scale-105`}>
              <div className="bg-background-alt h-full w-full rounded-full flex items-center justify-center p-1">
                <img 
                  className="w-full h-full object-cover rounded-full" 
                  src={category.image} 
                  alt={`Thumbnail ${category.name}`}
                />
              </div>
            </div>
            <span className={`text-xs font-medium mt-2 block transition-colors ${
              selectedCategory === category.id ? 'text-primary font-bold' : 'text-text-secondary'
            }`}>
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </nav>
  );
};