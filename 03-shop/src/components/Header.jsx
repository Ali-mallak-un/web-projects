// src/components/Header.jsx
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { cartItemCount, toggleCart } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="logo">UrbanStore</div>
      
      <div className="header-actions">
        {/* Theme Toggle Button */}
        <button 
          className="icon-btn" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {/* Cart Button */}
        <button 
          className="icon-btn cart-btn" 
          onClick={toggleCart}
          aria-label="Open cart"
        >
          🛒
          {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}