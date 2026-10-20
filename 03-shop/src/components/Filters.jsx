// src/components/Filters.jsx
import { useState, useEffect } from 'react';

export default function Filters({ selectedCategory, setSelectedCategory, searchQuery, setSearchQuery }) {
  const [categories, setCategories] = useState([]);

  // Fetch categories from DummyJSON API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/category-list');
        const data = await response.json();
        // Limit to first 8 categories to keep the UI clean
        setCategories(data.slice(0, 8));
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="filters-section">
      {/* Search Bar */}
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Chips */}
      <div className="category-chips">
        <button
          className={`chip ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`chip ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.replace('-', ' ')}
          </button>
        ))}
      </div>
    </div>
  );
}