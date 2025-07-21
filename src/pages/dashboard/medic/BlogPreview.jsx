import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BlogPreview = ({ 
  title, 
  category, 
  excerpt, 
  image, 
  date, 
  readTime, 
  author, 
  slug,
  showCategory = true,
  variant = 'default'
}) => {
  // Variant styles
  const variants = {
    default: {
      container: 'flex gap-4 items-start group',
      image: 'w-16 h-16 object-cover rounded-md group-hover:opacity-90 transition',
      title: 'font-medium text-blue-700 line-clamp-1 group-hover:text-blue-800 transition text-base',
      category: 'text-xs text-gray-500',
      excerpt: 'text-xs text-gray-600 mt-1 line-clamp-2',
      meta: 'hidden'
    },
    featured: {
      container: 'flex flex-col gap-3 group',
      image: 'w-full h-48 object-cover rounded-lg group-hover:opacity-90 transition',
      title: 'font-semibold text-lg text-gray-800 line-clamp-2 group-hover:text-blue-600 transition',
      category: 'text-sm text-blue-600 font-medium',
      excerpt: 'text-sm text-gray-600 mt-1 line-clamp-3',
      meta: 'flex items-center gap-3 text-xs text-gray-500 mt-2'
    },
    compact: {
      container: 'flex gap-3 items-center group',
      image: 'w-12 h-12 object-cover rounded-md group-hover:opacity-90 transition',
      title: 'font-medium text-sm text-gray-800 line-clamp-1 group-hover:text-blue-600 transition',
      category: 'hidden',
      excerpt: 'hidden',
      meta: 'hidden'
    }
  };

  const currentVariant = variants[variant] || variants.default;

  return (
    <Link 
      to={`/blog/${slug}`} 
      className={currentVariant.container}
      aria-label={`Read more about ${title}`}
    >
      {/* Image with fallback */}
      <div className="relative">
        <img 
          src={image || '/images/blog-placeholder.jpg'} 
          alt={title} 
          className={`${currentVariant.image} bg-gray-100`}
          loading="lazy" 
          width={variant === 'featured' ? 384 : 64}
          height={variant === 'featured' ? 192 : 64}
          onError={(e) => {
            e.target.src = '/images/blog-placeholder.jpg';
          }}
        />
        {variant === 'featured' && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
        )}
      </div>

      <div className="flex-1">
        {showCategory && category && (
          <p className={currentVariant.category}>
            {category}
          </p>
        )}
        
        <h3 className={currentVariant.title}>
          {title}
        </h3>
        
        {excerpt && (
          <p className={currentVariant.excerpt}>
            {excerpt}
          </p>
        )}

        {(date || readTime || author) && (
          <div className={currentVariant.meta}>
            {date && <span>{new Date(date).toLocaleDateString()}</span>}
            {readTime && <span>• {readTime} min read</span>}
            {author && <span>• By {author}</span>}
          </div>
        )}
      </div>
    </Link>
  );
};

BlogPreview.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string,
  excerpt: PropTypes.string,
  image: PropTypes.string,
  date: PropTypes.string,
  readTime: PropTypes.number,
  author: PropTypes.string,
  slug: PropTypes.string.isRequired,
  showCategory: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'featured', 'compact'])
};

export default BlogPreview;