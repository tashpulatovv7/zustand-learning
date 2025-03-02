import { create } from 'zustand';

const useStore = create(set => ({
	products: [],
	likedProducts: [],
	cart: [],

	addToLiked: product =>
		set(state => {
			if (!state.likedProducts.some(p => p.id === product.id)) {
				return { likedProducts: [...state.likedProducts, product] };
			}
		}),

	addToCart: product =>
		set(state => {
			const existingProduct = state.cart.find(p => p.id === product.id);
			if (existingProduct) {
				return {
					cart: state.cart.map(item =>
						item.id === product.id
							? { ...item, quantity: item.quantity + 1 }
							: item
					),
				};
			}
			return { cart: [...state.cart, { ...product, quantity: 1 }] };
		}),

	removeFromCart: id =>
		set(state => ({
			cart: state.cart.filter(product => product.id !== id),
		})),

	updateCartQuantity: (id, quantity) =>
		set(state => ({
			cart: state.cart.map(item => (item.id === id ? { ...item, quantity } : item)),
		})),

	addProduct: newProduct =>
		set(state => ({
			products: [...state.products, newProduct],
		})),
}));

export default useStore;
