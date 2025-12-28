'use client';

import { useStore } from '@/store/useStore';
import { Category } from '@/types/project';

interface FilterPillsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function FilterPills({
  categories,
  activeCategory,
  onCategoryChange
}: FilterPillsProps) {
  const { setCursorState } = useStore();

  return (
    <div className="filter-pills">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`filter-pill ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
          onMouseEnter={() => setCursorState('hover')}
          onMouseLeave={() => setCursorState('default')}
        >
          {category.label}
        </button>
      ))}

      <style jsx>{`
        .filter-pills {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .filter-pill {
          padding: 0.75rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 100px;
          background: transparent;
          color: var(--color-gray);
          transition: all 0.3s var(--transition-smooth);
        }

        .filter-pill:hover {
          border-color: var(--color-white);
          color: var(--color-white);
        }

        .filter-pill.active {
          background: var(--color-white);
          border-color: var(--color-white);
          color: var(--color-black);
        }
        
        @media (max-width: 768px) {
          .filter-pills {
            gap: 0.5rem;
            margin-bottom: 1rem;
          }
          
          .filter-pill {
            padding: 0.5rem 1rem;
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
