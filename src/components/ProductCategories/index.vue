<template>
    <div class="bg-yellow-50 p-32">
        <h2 class="text-center text-2xl font-bold text-gray-800">Category: {{ selectedCategoryName }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="product in filteredProducts" :key="product.id" class="bg-white border rounded-lg shadow-md p-4">
                <img :src="product.ImagePath" :alt="product.ProductName" class="w-full h-48 object-cover mb-4">
                <h3 class="text-xl font-semibold mb-2">{{ product.ProductName }}</h3>
                <p class="text-gray-700 mb-2">{{ product.defaultescription }}</p>
                <p v-if="product.DiscountedPrice" class="text-green-500 font-semibold">KES. {{
                    formatNumber(product.DiscountedPrice) }} </p>
                <p v-else class="text-green-500 font-semibold">KES. {{ formatNumber(product.Price) }}</p>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'ProductCategories',
    data() {
        return {
            categories: [],
            products: [],
        };
    },
    computed: {
        selectedCategoryId() {
            return parseInt(this.$route.params.id, 10);
        },
        selectedCategoryName() {
            const category = this.categories.find(category => category.id === this.selectedCategoryId);
            return category ? category.name : '';
        },
        filteredProducts() {
            return this.filterProductsByCategoryName(this.products, this.selectedCategoryName);
        },
    },
    methods: {
        formatNumber(value) {
            // Use toLocaleString to format the number with comma separators
            return value.toLocaleString();
        },
        async fetchCategories() {
            try {
                const response = await axios.get('/api/categories');
                this.categories = response.data || [];
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        },
        async fetchProducts() {
            try {
                const response = await axios.get('http://localhost:3000/api/products');
                this.products = response.data || [];
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        filterProductsByCategoryName(products, categoryName) {
            return products.filter(product => product.category === categoryName);
        },
    },
    mounted() {
        this.fetchCategories();
        this.fetchProducts();
    },
};
</script>
  
<style scoped>
/* Add Tailwind CSS classes or your custom styles here */
</style>
  