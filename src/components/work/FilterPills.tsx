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
      {categories.map((category, index) => (
        <button
          key={category.id}
          className={`filter-pill ${activeCategory === category.id ? 'active' : ''} ${index === 0 ? 'primary' : ''}`}
          onClick={() => onCategoryChange(category.id)}
          onMouseEnter={() => setCursorState('hover')}
          onMouseLeave={() => setCursorState('default')}
        >
          {index === 0 ? (
            <>
              <span>{category.label}</span>
              <svg
                className="arrow-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </>
          ) : (
            category.label
          )}
        </button>
      ))}

      <style jsx>{`
        .filter-pills {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
          align-items: center;
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
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .filter-pill.primary {
          background: var(--color-black);
          border-color: var(--color-white);
          color: var(--color-white);
          padding: 1rem 2rem;
          font-size: 1rem;
        }
        
        .filter-pill.primary :global(.arrow-icon) {
          transition: transform 0.3s var(--transition-smooth);
        }
        
        .filter-pill.primary:hover :global(.arrow-icon) {
          transform: translateX(4px);
        }

        .filter-pill:hover {
          border-color: var(--color-white);
          color: var(--color-white);
          background: rgba(255, 255, 255, 0.05);
        }

        .filter-pill.active {
          background: var(--color-white);
          border-color: var(--color-white);
          color: var(--color-black);
        }
        
        .filter-pill.primary.active {
          background: var(--color-accent);
          border-color: var(--color-accent);
          color: var(--color-white);
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
          
          .filter-pill.primary {
            padding: 0.75rem 1.25rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}

