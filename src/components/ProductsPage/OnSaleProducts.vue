<template>
  <div class="bg-yellow-50 overflow-x-auto">
    <div class="pt-32">
      <h1 class="text-center text-2xl font-bold text-gray-800">Today's Offer</h1>
    </div>
    <div class="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">
      <article class="rounded-xl bg-white p-3 bg-yellow-50">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="product in productsOnSale" :key="product._id"
            class="p-2 border rounded shadow-lg hover:shadow-xl hover:transform hover:scale-105 mb-4">
            <div class="image-container relative flex items-end overflow-hidden rounded-xl">
              <button v-if="product.percentageSaved > 0"
                class="save-button sm:absolute sm:top-0 sm:right-0 bg-green-500 text-white p-2 duration-100 hover:bg-green-700 rounded-full">
                SAVE<br />{{ product.percentageSaved }}%
              </button>
              <router-link :to="'/product/' + product._id">
                <img :src="product.imagePath" :alt="product.title" class="mx-auto w-full h-full object-cover mb-2" />
              </router-link>
              <div class="absolute bottom-2 left-2 inline-flex items-center rounded-lg bg-white p-1 shadow-md">
                <i class="fas fa-star text-yellow-400"></i>
                <span class="ml-1 text-sm text-gray-700">{{ product.rating }}</span>
              </div>
            </div>
            <h2 class="text-slate-700 text-xs">{{ product.title }}</h2>
            <div class="mt-2 flex items-end justify-between">
              <router-link :to="'/product/' + product._id">
                <p class="text-green-500 font-semibold text-xxs">KES. {{ formatNumber(product.discountedPrice) }}</p>
              </router-link>
              <button @click="handleCartAction(product)" :class="getCartButtonClass(product)">
                <i :class="getCartButtonIcon(product)"></i> {{ getCartButtonText(product) }}
              </button>
              <button @click="addToWishlistButton(product)"
                class="bg-green-500 text-white px-2 py-1.5 rounded-lg duration-100 hover:bg-green-700">
                <i class="fas fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      cart: this.getCartFromStorage() || [],
      wishlist: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('https://posinet.onrender.com/api/products');
        this.products = response.data || [];
        this.calculatePercentageSavedForEachProduct();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    calculatePercentageSavedForEachProduct() {
      this.products.forEach((product) => {
        if (product && typeof product.price === 'number' && typeof product.discountedPrice === 'number') {
          const savings = product.price - product.discountedPrice;
          product.percentageSaved = ((savings / product.price) * 100).toFixed(0);
        } else {
          console.error('Invalid Price or DiscountedPrice for a product:', product);
        }
      });
    },
    formatNumber(value) {
      return value.toLocaleString();
    },
    addToWishlistButton(product) {
      this.addToWishlist(product);
    },
    handleCartAction(product) {
      if (this.isProductInCart(product)) {
        this.removeFromCart(product);
      } else {
        this.addToCart(product);
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
      if (!product || !product.title || !product.price) {
        console.error('Invalid product data for cart:', product);
        return;
      }
      if (this.isProductInCart(product)) {
        alert('Product already in cart');
        return;
      }
      this.cart.push(product);
      this.saveCartToStorage();
      axios.post('https://posinet.onrender.com/api/addToCart', product)
        .then(response => {
          console.log(response.data);
          alert('Successfully added to cart');
        })
        .catch(error => {
          console.error('Error adding to cart:', error);
        });
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
      return this.cart.some(item => item._id === product._id);
    },
    getCartButtonClass(product) {
      return [
        'flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white duration-100 hover:bg-indigo-600',
        { 'bg-indigo-500': !this.isProductInCart(product), 'bg-red-500': this.isProductInCart(product) },
      ];
    },
    getCartButtonIcon(product) {
      return this.isProductInCart(product) ? 'fas fa-cart-arrow-down' : 'fas fa-cart-plus';
    },
    getCartButtonText(product) {
      return this.isProductInCart(product) ? 'Remove' : 'Add to Cart';
    },
    emptyCart() {
      localStorage.removeItem('cart');
      this.cart = [];
    },
  },
  computed: {
    productsOnSale() {
      return this.products.filter((product) => product.price > product.discountedPrice && product.discountedPrice > 0);
    },
  },
};
</script>
<style scoped>
.save-button {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #48bb78;
  color: #fff;
  padding: 0.5rem;
  border-radius: 50%;
}

@media (min-width: 640px) {
  .save-button {
    font-size: 10px;
  }
}
</style>
