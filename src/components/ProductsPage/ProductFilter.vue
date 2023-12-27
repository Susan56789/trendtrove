<template>
    <div class="flex items-center space-x-4 mb-4 bg-yellow-50">
        <label>Filter by Category:</label>
        <select v-model="selectedCategory" @change="filterProducts" class="w-100 mt-1 py-1 px-1 rounded-lg border border-gray-400 
                dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none">
            <option value="">All</option>
            <option v-for="category in categories" :key="category.CategoryID">{{ category.CategoryName }}</option>
        </select>
        <label>Filter by Price:</label>
        <input type="number" class="w-100 mt-1 py-1 px-1 rounded-lg border border-gray-400 
        dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
            v-model="selectedPrice" @input="filterProducts" placeholder="Enter max price">
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            selectedCategory: '',
            selectedPrice: null,
            categories: [],
        };
    },
    computed: {
        uniqueCategories() {
            return [...new Set(this.$parent.products.map(product => product.CategoryID))];
        },
    },
    methods: {
        async fetchCategoryNames() {
            try {
                const response = await axios.get('/api/categories');
                this.categories = response.data || [];
            } catch (error) {
                console.error('Error fetching category names:', error);
            }
        },
        filterProducts() {
            this.$emit('filterProducts', this.selectedCategory, this.selectedPrice);
        },
    },
    watch: {
        uniqueCategories: 'fetchCategoryNames',
    },
    created() {
        this.fetchCategoryNames();
    },
};
</script>
  
<style scoped></style>
  