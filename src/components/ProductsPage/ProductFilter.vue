<template>
    <div class="flex items-center space-x-4 mb-4 bg-yellow-50">
        <label>Filter by Category:</label>
        <select v-model="selectedCategory" @change="filterProducts" class="w-100 mt-1 py-1 px-1 rounded-lg border border-gray-400 
                    dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none">
            <option value="">All</option>
            <option v-for="category in categories" :key="category">{{ category }}</option>
        </select>
        <label>Filter by Price:</label>
        <input type="number" class="w-100 mt-1 py-1 px-1 rounded-lg border border-gray-400 
            dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
            v-model="selectedPrice" @input="filterProducts" placeholder="Enter max price">
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            selectedCategory: '',
            selectedPrice: null,
        };
    },
    computed: {
        categories() {
            const uniqueCategories = [...new Set(this.$parent.products.map(product => product.category))];
            return uniqueCategories;
        },
    },
    methods: {
        filterProducts() {
            this.$emit('filterProducts', this.selectedCategory, this.selectedPrice);
        },
    },
};
</script>
  
<style scoped>
/* Add additional styling for the filter dropdown if needed */
/* For example, you can adjust the margin-top to position the filter dropdown lower */
</style>
  