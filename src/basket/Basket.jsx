import React from 'react';
import useStore from '../store';
import "./basket.css";

const Cart = () => {
	const { cart, updateCartQuantity, removeFromCart } = useStore();
	const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<div className="basket">
			<h1 className="title">Savatcha</h1>
			{cart.length === 0 ? (
				<p className="no-products">Savatcha bo'sh!</p>
			) : (
				<div className="cart-items">
					{cart.map((item) => (
						<div key={item.id} className="cart-item">
							<img src={item.thumbnail} alt={item.title} />
							<h3>{item.title}</h3>
							<p>{item.price.toLocaleString('uz-UZ')} so'm</p>
							<input
								type="number"
								value={item.quantity}
								min="1"
								onChange={(e) => {
									const newQuantity = parseInt(e.target.value) || 1;
									updateCartQuantity(item.id, newQuantity > 0 ? newQuantity : 1);
								}}
							/>

							<button className="remove-button" onClick={() => removeFromCart(item.id)}>
								O'chirish
							</button>
						</div>
					))}

					<div className="cart-summary">
						<h2>Jami narx: {totalPrice.toLocaleString('uz-UZ')} so'm</h2>
					</div>
				</div>
			)}
		</div>
	);
};

export default Cart;
