<template>
  <div>
    <article class="rounded-xl bg-yellow-50 p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
      <div class="mt-1 p-2">
        <div class="image-container relative flex items-end overflow-hidden rounded-xl">
          <router-link :to="'/product/' + product.ProductName">
            <img :src="product.ImagePath" :alt="product.ProductName" class="mx-auto h-200 w-200 object-cover mb-4" />
            <div class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
              <i class="fas fa-star text-yellow-400"></i>
              <span class="ml-1 text-sm text-gray-700">{{ product.Rating }}</span>
            </div>
          </router-link>
        </div>
        <h2 class="text-slate-700">{{ product.ProductName }}</h2>

        <div class="mt-3 flex items-end justify-between">
          <router-link :to="'/product/' + product.ProductName">
            <p v-if="product.DiscountedPrice" class="text-green-500 font-semibold">KES. {{
              formatNumber(product.DiscountedPrice) }} </p>
            <p v-else class="text-green-500 font-semibold">KES. {{ formatNumber(product.Price) }}</p>
          </router-link>
          <button @click="handleCartAction" :class="cartButtonClass">
            <i :class="cartButtonIcon"></i> {{ cartButtonText }}
          </button>

          <button @click="addToWishlistButton"
            class="bg-green-500 text-white px-2 py-1.5 rounded-lg duration-100 hover:bg-green-700">
            <i class="fas fa-heart"></i>
          </button>
        </div>
      </div>
    </article>
  </div>
</template>



<script>
import axios from 'axios';

export default {
  data() {
    return {
      cart: this.getCartFromStorage() || [],
      wishlist: [],
    };
  },
  props: {
    product: {
      type: Object,
      required: true,
    },

  },
  methods: {
    formatNumber(value) {

      return value.toLocaleString();
    },
    addToWishlistButton() {
      this.addToWishlist(this.product);
    },
    addToCartButton() {
      this.addToCart(this.product);
    },
    removeFromCartButton() {
      this.removeFromCart(this.product);
    },
    handleCartAction() {
      if (this.isProductInCart(this.product)) {
        this.removeFromCart(this.product);
      } else {
        this.addToCart(this.product);
      }
    },

    addToWishlist(product) {

      if (product && product.ProductName && product.Price && product.ProductID) {

        if (this.isProductInWishlist(product)) {

          alert('Product already in wishlist');
        } else {

          this.wishlist.push(product);

          axios.post('https://worldempiresafaris.co.ke/addToWishlist', product)
            .then(response => {
              console.log(response.data);

              alert('Successfully added to wishlist');
            })
            .catch(error => {
              console.error(error);
            });
        }
      } else {
        console.error('Invalid product data for wishlist:', product);
      }
    },

    isProductInWishlist(product) {

      return this.wishlist.some(item => item.ProductID === product.ProductID);
    },

    addToCart(product) {

      if (product && product.ProductName && product.Price) {
        // Check if the product is already in the cart
        if (this.isProductInCart(product)) {
          // Display an alert for product already in cart
          alert('Product already in cart');
        } else {
          // If not in cart, add to cart
          this.cart.push(product); // Update the cart locally
          this.saveCartToStorage(); // Save the cart to localStorage
          axios.post('https://worldempiresafaris.co.ke/addToCart', product)
            .then(response => {
              console.log(response.data);
              // Display success alert
              alert('Successfully added to cart');
            })
            .catch(error => {
              console.error(error);
            });
        }
      } else {
        console.error('Invalid product data for cart:', product);
      }
    },

    removeFromCart(product) {
      // Remove the product from the local cart
      this.cart = this.cart.filter(item => item.ProductID !== product.ProductID);
      this.saveCartToStorage(); // Save the updated cart to localStorage
      // Additional logic to remove from the server-side cart can be added here if needed
    },

    saveCartToStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    getCartFromStorage() {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    },

    isProductInCart(product) {
      // Check if the product is not undefined and has the required properties
      if (product && product.ProductID) {
        // Check if the cart is not undefined
        if (this.cart) {
          // Check if the product is already in the local cart
          return this.cart.some(item => item.ProductID === product.ProductID);
        } else {
          console.error('Cart is undefined');
          return false; // Handle the case where the cart is undefined
        }
      } else {
        console.error('Invalid product data for cart:', product);
        return false; // Handle the case where the product is undefined or missing required properties
      }
    },
    emptyCart() {
      // Clear both the local storage and the local cart
      localStorage.removeItem('cart');
      this.cart = [];
    },
  },
  computed: {
    cartButtonClass() {
      return [
        'flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white duration-100 hover:bg-indigo-600',
        { 'bg-indigo-500': !this.isProductInCart(this.product), 'bg-red-500': this.isProductInCart(this.product) },
      ];
    },

    cartButtonIcon() {
      return this.isProductInCart(this.product) ? 'fas fa-cart-arrow-down' : 'fas fa-cart-plus';
    },

    cartButtonText() {
      return this.isProductInCart(this.product) ? '' : '';
    },
  },



};
</script>

<style scoped>
.image-container img {
  max-width: 100%;
  max-height: 100%;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}
</style>
