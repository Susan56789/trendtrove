<template>
    <div class="flex items-center space-x-4 mb-4 bg-yellow-50">
        <label>Filter by Category:</label>
        <select v-model="selectedCategory" @change="filterProducts"
            class="w-100 mt-1 py-1 px-1 rounded-lg border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none">
            <option value="">All</option>
            <option v-for="category in uniqueCategories" :key="category" :value="category">
                {{ category }}
            </option>
        </select>
        <label>Filter by Price:</label>
        <input type="number"
            class="w-100 mt-1 py-1 px-1 rounded-lg border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
            v-model="selectedPrice" @input="filterProducts" placeholder="Enter max price">
    </div>
</template>

<script>
export default {
    name: 'ProductFilter',
    data() {
        return {
            selectedCategory: '',
            selectedPrice: null,
        };
    },
    computed: {
        uniqueCategories() {
            return [...new Set(this.$parent.products.map((product) => product.category))];
        },
    },
    methods: {
        filterProducts() {
            const filteredProducts = this.$parent.products.filter((product) => {
                const categoryMatch =
                    this.selectedCategory === '' || product.category === this.selectedCategory;
                const priceMatch = this.selectedPrice === null || product.price <= this.selectedPrice;
                return categoryMatch && priceMatch;
            });

            this.$emit('filterProducts', filteredProducts);
        },
    },
};
</script>

<style scoped></style>