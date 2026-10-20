// src/App.jsx
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import CartDrawer from './components/CartDrawer';
import { useCart } from './context/CartContext';

function App() {
  const { addToCart } = useCart();

  // Data States
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://dummyjson.com/products?limit=100');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Apply filters locally (Client-side filtering for better UX)
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (isLoading) return <><Header /><div className="loading-state">Loading products...</div></>;
  if (error) return <><Header /><div className="error-state">Error: {error}</div></>;

  return (
    <>
      <Header />
      <CartDrawer />
      
      <main className="container">
        <div className="section-header">
          <h2>Explore Products</h2>
          <p>Found {filteredProducts.length} items</p>
        </div>

        <Filters 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <p>No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img 
                  src={product.thumbnail} 
                  alt={product.title} 
                  className="product-image"
                  loading="lazy"
                />
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-title">{product.title}</h3>
                  <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                    <button 
                      className="add-btn"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default App;