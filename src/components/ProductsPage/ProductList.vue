<template>
  <div>
    <div class="pt-32 bg-yellow-50">
      <h1 class="text-center text-2xl font-bold text-gray-800">All Products</h1>
    </div>
    <div class="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">
      <ProductFilter v-if="categories.length > 0" :categories="categories" @filterProducts="filterProducts" />

    </div>
    <div class="grid grid-cols-3 gap-4 p-4">
      <SingleProduct v-for="product in paginatedProducts" :key="product.ProductID" :product="product"
        @addToCart="addToCart" />
    </div>
    <ShopPagination :totalPages="totalPages" @changePage="changePage" />
  </div>
</template>

<script>
import SingleProduct from './SingleProduct.vue';
import ProductFilter from './ProductFilter.vue';
import ShopPagination from './ShopPagination.vue';
import axios from 'axios';

export default {
  components: {
    SingleProduct,
    ProductFilter,
    ShopPagination,
  },
  data() {
    return {
      products: [],
      categories: [],
      categoryFilter: null,
      priceFilter: null,
      currentPage: 1,
      itemsPerPage: 9,
      cart: [],
      ratings: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    filteredProducts() {
      let filteredProducts = this.products || [];
      if (this.categoryFilter) {
        filteredProducts = filteredProducts.filter(product => product.category === this.categoryFilter);
      }
      if (this.priceFilter !== null && this.priceFilter !== undefined) {
        filteredProducts = filteredProducts.filter(product => product.price <= this.priceFilter);
      }
      return filteredProducts;
    },
    totalPages() {
      return Math.ceil((this.filteredProducts || []).length / this.itemsPerPage);
    },
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return (this.filteredProducts || []).slice(startIndex, endIndex);
    },
  },
  methods: {
    async fetchData() {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:3000/api/products'),
          axios.get('http://localhost:3000/api/categories'),
        ]);

        this.products = productsResponse.data || [];
        this.categories = categoriesResponse.data || [];
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    filterProducts(category, price) {
      this.categoryFilter = category;
      this.priceFilter = price;
      this.currentPage = 1;
    },
    changePage(page) {
      this.currentPage = page;
    },
    addToCart(product) {
      const existingCartItem = (this.cart || []).find(item => item.id === product.id);

      if (existingCartItem) {
        existingCartItem.quantity++;
      } else {
        this.cart.push({ ...(product || {}), quantity: 1 });
      }

      this.$emit('updateCart', this.cart);
      console.log('Cart updated:', this.cart);
    },
  },
};
</script>
