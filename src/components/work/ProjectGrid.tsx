'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FilterPills from './FilterPills';
import FilterTags from './FilterTags';
import ProjectCard from './ProjectCard';
import { Project, Category } from '@/types/project';

interface ProjectGridProps {
  projects: Project[];
  categories: Category[];
  tags: string[];
}

export default function ProjectGrid({
  projects,
  categories,
  tags
}: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Filter projects based on active category and tag
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
      const matchesTag = activeTag === null || project.tags.includes(activeTag);
      return matchesCategory && matchesTag;
    });
  }, [projects, activeCategory, activeTag]);

  // Get relevant tags for current category
  const relevantTags = useMemo(() => {
    if (activeCategory === 'all') return tags;

    const categoryProjects = projects.filter(p => p.category === activeCategory);
    const categoryTags = new Set<string>();
    categoryProjects.forEach(p => p.tags.forEach(t => categoryTags.add(t)));
    return Array.from(categoryTags);
  }, [projects, activeCategory, tags]);

  // Reset tag when category changes
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveTag(null);
  };

  return (
    <div className="project-grid-container">
      {/* Level 1: Category Filters */}
      <FilterPills
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Level 2: Tag Filters */}
      <FilterTags
        tags={relevantTags}
        activeTag={activeTag}
        onTagChange={setActiveTag}
      />

      {/* Masonry Grid */}
      <motion.div
        className="project-grid"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                layout: { duration: 0.4 }
              }}
              className={project.featured ? 'grid-item-large' : 'grid-item'}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No results message */}
      {filteredProjects.length === 0 && (
        <div className="no-results">
          <p>No projects found with the selected filters.</p>
        </div>
      )}

      <style jsx>{`
        .project-grid-container {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }

        .project-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .project-grid :global(.grid-item-large) {
          grid-column: span 2;
        }

        @media (max-width: 1200px) {
          .project-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .project-grid :global(.grid-item-large) {
            grid-column: span 2;
          }
        }

        @media (max-width: 768px) {
          .project-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .project-grid :global(.grid-item-large) {
            grid-column: span 1;
          }
          
          :global(.filter-pills) {
            display: flex !important;
            flex-wrap: wrap !important;
            width: 100% !important;
            gap: 0.5rem !important;
          }
          
          :global(.filter-pill) {
            flex-shrink: 0 !important;
          }
          
          :global(.filter-tags) {
            display: flex !important;
            flex-wrap: wrap !important;
            width: 100% !important;
            gap: 0.4rem !important;
          }
          
          :global(.filter-tag) {
            flex-shrink: 0 !important;
          }
        }

        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--color-gray);
        }
      `}</style>
    </div>
  );
}
