import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, increaseQty, decreaseQty, removeItem } =
    useContext(CartContext);

  return (
    <div className="cart-page">
      <h1>Cart</h1>

      {cart.length === 0 ? (
        <p className="cart-empty">No items in cart</p>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <div key={item._id} className="cart-card">
              <div>
                <h3>{item.name}</h3>
                <p>Rs. {item.price}</p>
                <p>Qty: {item.qty}</p>
              </div>

              <div className="cart-actions">
                <button type="button" onClick={() => increaseQty(item._id)}>+</button>
                <button type="button" onClick={() => decreaseQty(item._id)}>-</button>
                <button type="button" onClick={() => removeItem(item._id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="cart-total">
        Total: Rs. {cart.reduce((total, item) => total + item.price * item.qty, 0)}
      </h2>
    </div>
  );
}

export default Cart;
