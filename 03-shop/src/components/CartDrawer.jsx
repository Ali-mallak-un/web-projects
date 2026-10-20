// src/components/CartDrawer.jsx
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={toggleCart}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={toggleCart}>
            &times;
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} />
                <div className="cart-item-info">
                  <h4>{item.title}</h4>
                  <p className="cart-item-price">${item.price}</p>
                  
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
                <button 
                  className="remove-btn" 
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button className="checkout-btn" disabled={cart.length === 0}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}