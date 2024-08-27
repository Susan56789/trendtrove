<template>
  <article
    class="rounded-xl bg-yellow-50 p-3 shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 w-full max-w-xs">
    <div class="space-y-3">
      <div class="w-full overflow-hidden rounded-lg bg-gray-200">
        <router-link :to="'/product/' + product._id">
          <img :src="product.imageUrl" :alt="product.title" class="w-full h-48 object-cover">
        </router-link>
      </div>
      <h2 class="text-sm font-semibold text-slate-700 truncate">{{ product.title }}</h2>
      <div class="flex items-center justify-between">
        <router-link :to="'/product/' + product._id" class="text-base font-bold text-green-600">
          KES. {{ formatNumber(product.price) }}
        </router-link>
        <div class="flex space-x-1">
          <button @click="handleCartAction" :class="cartButtonClass">
            <i :class="cartButtonIcon"></i>
            <span class="sr-only">{{ isProductInCart(product) ? 'Remove from cart' : 'Add to cart' }}</span>
          </button>
          <button @click="addToWishlistButton"
            class="bg-green-500 hover:bg-green-600 text-white p-1.5 rounded-lg transition duration-150">
            <i class="fas fa-heart text-xs"></i>
            <span class="sr-only">Add to wishlist</span>
          </button>
        </div>
      </div>
    </div>
  </article>
</template>


<script>
import axios from 'axios';

export default {
  name: 'SingleProduct',
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