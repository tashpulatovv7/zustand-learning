import React from 'react';
import useStore from '../store';

const Cart = () => {
	const { cart, updateCartQuantity, removeFromCart } = useStore();
	const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<div className='container'>
			<h1 className='title'>Savatcha</h1>
			{cart.length === 0 ? (
				<p className='no-products'>Savatcha bo'sh!</p>
			) : (
				<div className='cart-items'>
					{cart.map(item => (
						<div key={item.id} className='cart-item'>
							<img src={item.imageUrl} alt={item.name} />
							<h3>{item.name}</h3>
							<p>{item.price} so'm</p>
							<input
								type='number'
								value={item.quantity}
								onChange={e =>
									updateCartQuantity(
										item.id,
										parseInt(e.target.value)
									)
								}
							/>
							<button
								className='remove-button'
								onClick={() => removeFromCart(item.id)}
							>
								O'chirish
							</button>
						</div>
					))}
					<div className='cart-summary'>
						<h2>Jami narx: {totalPrice} so'm</h2>
					</div>
				</div>
			)}
		</div>
	);
};

export default Cart;
