// components/SEOHead.js
import { useEffect } from 'react';

const SEOHead = ({ 
  title = 'Default Title', 
  description = 'Default description', 
  keywords = '' 
}) => {
  useEffect(() => {
    // Set document title
    document.title = title;
    
    // Create or update description meta tag
    updateMetaTag('description', description);
    
    // Create or update keywords meta tag
    if (keywords) updateMetaTag('keywords', keywords);

  }, [title, description, keywords]);

  // Helper function to update or create meta tags
  const updateMetaTag = (name, content) => {
    let tag = document.querySelector(`meta[name="${name}"]`);
    
    if (!tag) {
      tag = document.createElement('meta');
      tag.name = name;
      document.head.appendChild(tag);
    }
    
    tag.content = content;
  };

  // This component doesn't render anything
  return null;
};

export default SEOHead;