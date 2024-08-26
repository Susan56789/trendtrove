<template>
  <div>
    <div class="pt-32 bg-yellow-50">
      <h1 class="text-center text-2xl font-bold text-gray-800">All Products</h1>
    </div>
    <div class="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">
      <ProductFilter v-if="categories.length > 0" :categories="categories" @filterProducts="filterProducts" />
    </div>
    <div class="grid grid-cols-3 gap-4 p-4">
      <SingleProduct v-for="product in paginatedProducts" :key="product._id" :product="product" />
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
      filteredProducts: [],
      categoryFilter: null,
      priceFilter: null,
      currentPage: 1,
      itemsPerPage: 9,
      cart: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    filteredProductsList() {
      let filteredProducts = this.products;

      if (this.categoryFilter) {
        filteredProducts = filteredProducts.filter(product => product.category === this.categoryFilter);
      }

      if (this.priceFilter !== null && this.priceFilter !== undefined) {
        filteredProducts = filteredProducts.filter(product => product.price <= this.priceFilter);
      }

      return filteredProducts;
    },
    totalPages() {
      return Math.ceil(this.filteredProductsList.length / this.itemsPerPage);
    },
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredProductsList.slice(startIndex, endIndex);
    },
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://posinet.onrender.com/api/products');
        this.products = response.data.map(product => ({
          ...product,
          imageUrl: product.images && product.images.length > 0
            ? `data:${product.images[0].contentType};base64,${product.images[0].data}`
            : null
        }));
        this.categories = [...new Set(this.products.map(product => product.category))];
      } catch (error) {
        console.error('Error fetching products:', error);
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
  },
};
</script>