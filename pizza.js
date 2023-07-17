document.addEventListener('alpine:init', () => {
	Alpine.data('pizzaCart', () => {
		return {
			title: 'Pizza Cart API',
			pizzas: [],
			username: 'ntruter42',
			cartID: 'jryoqyEwNH',
			cartPizzas: [],
			cartTotal: 0,

			getCart() {
				const getCartURL = `https://pizza-api.projectcodex.net/api/pizza-cart/${this.cartID}/get`;
				return axios.get(getCartURL);
			},

			showCartData() {
				this.getCart().then(result => {
					const cartData = result.data;
					this.cartPizzas = cartData.pizzas;
					this.cartTotal = cartData.total;
				});
			},

			addPizza(pizzaID) {
				const addToCartURL = `https://pizza-api.projectcodex.net/api/pizza-cart/add`;
				return axios.post(addToCartURL, {
					'cart_code': this.cartID,
					'pizza_id': pizzaID
				})
			},

			removePizza(pizzaID) {
				const addToCartURL = `https://pizza-api.projectcodex.net/api/pizza-cart/remove`;
				return axios.post(addToCartURL, {
					'cart_code': this.cartID,
					'pizza_id': pizzaID
				})
			},

			init() {
				axios
					.get('https://pizza-api.projectcodex.net/api/pizzas')
					.then(result => {
						this.pizzas = result.data.pizzas;
					});

				this.showCartData();
			},

			addPizzaToCart(pizzaID) {
				this
					.addPizza(pizzaID)
					.then(() => {
						this.showCartData();
					});
			},

			removePizzaFromCart(pizzaID) {
				this
					.removePizza(pizzaID)
					.then(() => {
						this.showCartData();
					});
			},

			// TODO: modify to delete cart and create new cart
			clearCart() {
				for (const pizza of this.cartPizzas) {
					for (let i = 0; i < pizza.qty; i++) {
						this.removePizza(pizza.id);
					}
				}
				setTimeout(() => {
					this.showCartData();
				}, 1000);
			}
		};
	});
});