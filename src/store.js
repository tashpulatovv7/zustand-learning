import { create } from 'zustand';

const saveToLocalStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = (key, defaultValue = null) => {
	const data = localStorage.getItem(key);
	return data ? JSON.parse(data) : defaultValue;
};

const useStore = create((set) => {
	const userFromStorage = loadFromLocalStorage('user', null);
	const storedProducts = loadFromLocalStorage('products', []);
	const storedCart = loadFromLocalStorage('cart', []);
	const storedLikedProducts = loadFromLocalStorage('likedProducts', []);

	return {
	
		user: userFromStorage,
		isLoggedIn: !!userFromStorage,

			login: (userData) => {
			saveToLocalStorage('user', userData);
			set({ user: userData, isLoggedIn: true });
		},

		logout: () => {
			localStorage.removeItem('user');
			set({ user: null, isLoggedIn: false });
		},

		products: storedProducts,

		likedProducts: storedLikedProducts,
	
		cart: storedCart,

			setProducts: (newProducts) => {
			saveToLocalStorage('products', newProducts);
			set({ products: newProducts });
		},

		addProduct: (newProduct) =>
			set((state) => {
				if (state.products.some((product) => product.id === newProduct.id)) {
					return state;
				}
				return { products: [...state.products, newProduct] };
			}),
		
		updateProduct: (id, updatedProduct) =>
			set((state) => {
				const updatedProducts = state.products.map((product) =>
					product.id === id ? updatedProduct : product
				);
				saveToLocalStorage('products', updatedProducts);
				return { products: updatedProducts };
			}),

		deleteProduct: (id) =>
			set((state) => {
				const filteredProducts = state.products.filter((product) => product.id !== id);
				saveToLocalStorage('products', filteredProducts);
				return { products: filteredProducts };
			}),

		toggleLike: (product) =>
			set((state) => {
				const isLiked = state.likedProducts.some((p) => p.id === product.id);
				const updatedLikedProducts = isLiked
					? state.likedProducts.filter((p) => p.id !== product.id)
					: [...state.likedProducts, product];

				saveToLocalStorage('likedProducts', updatedLikedProducts);
				return { likedProducts: updatedLikedProducts };
			}),

		addToCart: (product) =>
			set((state) => {
				const existingProduct = state.cart.find((p) => p.id === product.id);
				let updatedCart;

				if (existingProduct) {
					updatedCart = state.cart.map((item) =>
						item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
					);
				} else {
					updatedCart = [...state.cart, { ...product, quantity: 1 }];
				}

				saveToLocalStorage('cart', updatedCart);
				return { cart: updatedCart };
			}),

		removeFromCart: (id) =>
			set((state) => {
				const updatedCart = state.cart.filter((product) => product.id !== id);
				saveToLocalStorage('cart', updatedCart);
				return { cart: updatedCart };
			}),

		updateCartQuantity: (id, quantity) =>
			set((state) => {
				const updatedCart = state.cart.map((item) =>
					item.id === id ? { ...item, quantity } : item
				);
				saveToLocalStorage('cart', updatedCart);
				return { cart: updatedCart };
			}),
	};
});

export default useStore;
