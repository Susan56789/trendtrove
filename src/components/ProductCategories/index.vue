<template>
    <div class="bg-yellow-50 p-32">
        <h2 class="text-center text-2xl font-bold text-gray-800">Category: {{ selectedCategoryName }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="product in filteredProducts" :key="product.id" class="bg-white border rounded-lg shadow-md p-4">
                <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover mb-4">
                <h3 class="text-xl font-semibold mb-2">{{ product.name }}</h3>
                <p class="text-gray-700 mb-2">{{ product.description }}</p>
                <p class="text-green-600 font-semibold">${{ product.price.toFixed(2) }}</p>
            </div>
        </div>
    </div>
</template>
  
<script>
import products from '../ProductsPage/products.json';
import categories from './categories.json';

export default {
    name: 'ProductCategories',
    computed: {
        selectedCategoryId() {
            return parseInt(this.$route.params.id, 10);
        },
        selectedCategoryName() {
            const category = categories.find(category => category.id === this.selectedCategoryId);
            return category ? category.name : '';
        },
        filteredProducts() {
            return this.filterProductsByCategoryName(products, this.selectedCategoryName);
        }
    },
    methods: {
        filterProductsByCategoryName(products, categoryName) {
            return products.filter(product => product.category === categoryName);
        }
    }
};
</script>
  
<style scoped>
/* Add Tailwind CSS classes or your custom styles here */
</style>
  