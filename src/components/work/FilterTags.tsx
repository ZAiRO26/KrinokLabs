'use client';

import { useStore } from '@/store/useStore';

interface FilterTagsProps {
  tags: string[];
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
}

export default function FilterTags({
  tags,
  activeTag,
  onTagChange
}: FilterTagsProps) {
  const { setCursorState } = useStore();

  return (
    <div className="filter-tags">
      <button
        className={`filter-tag ${activeTag === null ? 'active' : ''}`}
        onClick={() => onTagChange(null)}
        onMouseEnter={() => setCursorState('hover')}
        onMouseLeave={() => setCursorState('default')}
      >
        All Types
      </button>

      {tags.map((tag) => (
        <button
          key={tag}
          className={`filter-tag ${activeTag === tag ? 'active' : ''}`}
          onClick={() => onTagChange(tag)}
          onMouseEnter={() => setCursorState('hover')}
          onMouseLeave={() => setCursorState('default')}
        >
          {tag}
        </button>
      ))}

      <style jsx>{`
        .filter-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .filter-tag {
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          border: none;
          border-radius: 4px;
          background: var(--color-dark-gray);
          color: var(--color-gray);
          transition: all 0.3s ease;
        }

        .filter-tag:hover {
          background: rgba(255, 255, 255, 0.15);
          color: var(--color-white);
        }

        .filter-tag.active {
          background: var(--color-accent);
          color: var(--color-white);
        }
        
        @media (max-width: 768px) {
          .filter-tags {
            gap: 0.4rem;
            margin-bottom: 1.5rem;
          }
          
          .filter-tag {
            padding: 0.4rem 0.75rem;
            font-size: 0.65rem;
          }
        }
      `}</style>
    </div>
  );
}
