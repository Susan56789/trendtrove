<template>
  <article class="rounded-xl bg-yellow-50 p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
    <div class="mt-1 p-2">
      <div class="image-container relative flex items-end overflow-hidden rounded-xl">
        <router-link :to="'/product/' + product._id">
          <img :src="product.imageUrl" :alt="product.title" class="mx-auto h-200 w-200 object-cover mb-4" />
        </router-link>
      </div>
      <h2 class="text-slate-700">{{ product.title }}</h2>

      <div class="mt-3 flex items-end justify-between">
        <router-link :to="'/product/' + product._id">
          <p class="text-green-500 font-semibold">KES. {{ formatNumber(product.price) }}</p>
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
</template>

<script>
import axios from 'axios';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cart: this.getCartFromStorage() || [],
      wishlist: [],
    };
  },
  methods: {
    formatNumber(value) {
      return value.toLocaleString();
    },
    addToWishlistButton() {
      this.addToWishlist(this.product);
    },
    handleCartAction() {
      if (this.isProductInCart(this.product)) {
        this.removeFromCart(this.product);
      } else {
        this.addToCart(this.product);
      }
    },
    addToWishlist(product) {
      if (product && product.title && product.price && product._id) {
        if (this.isProductInWishlist(product)) {
          alert('Product already in wishlist');
        } else {
          this.wishlist.push(product);
          axios.post('https://posinet.onrender.com/api/addToWishlist', product)
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
      return this.wishlist.some(item => item._id === product._id);
    },
    addToCart(product) {
      if (product && product.title && product.price) {
        if (this.isProductInCart(product)) {
          alert('Product already in cart');
        } else {
          this.cart.push(product);
          this.saveCartToStorage();
          axios.post('https://posinet.onrender.com/api/addToCart', product)
            .then(response => {
              console.log(response.data);
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
      this.cart = this.cart.filter(item => item._id !== product._id);
      this.saveCartToStorage();
    },
    saveCartToStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    getCartFromStorage() {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    },
    isProductInCart(product) {
      if (product && product._id) {
        if (this.cart) {
          return this.cart.some(item => item._id === product._id);
        } else {
          console.error('Cart is undefined');
          return false;
        }
      } else {
        console.error('Invalid product data for cart:', product);
        return false;
      }
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