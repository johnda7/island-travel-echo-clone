import React from 'react';
import { Link } from 'react-router-dom';
import { createTagSlug } from '@/data/toursRegistry';

interface TourTagsProps {
  tags: string[];
  className?: string;
  showLabel?: boolean;
}

const TourTags: React.FC<TourTagsProps> = ({ 
  tags, 
  className = '', 
  showLabel = true 
}) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {showLabel && (
        <span className="text-sm font-medium text-gray-600">
          Теги:
        </span>
      )}
      {tags.map((tag, index) => (
        <Link
          key={index}
          to={`/tours?tag=${createTagSlug(tag)}`}
          className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full hover:bg-green-200 hover:text-green-800 transition-colors duration-200"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
};

export default TourTags;