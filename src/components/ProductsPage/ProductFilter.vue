<template>
    <div class="flex items-center space-x-4 mb-4 bg-yellow-50">
        <label>Filter by Category:</label>
        <select v-model="selectedCategory" @change="emitFilters"
            class="w-100 mt-1 py-1 px-1 rounded-lg border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none">
            <option value="">All</option>
            <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
            </option>
        </select>
        <label>Filter by Price:</label>
        <input type="number"
            class="w-100 mt-1 py-1 px-1 rounded-lg border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
            v-model="selectedPrice" @input="emitFilters" placeholder="Enter max price">
    </div>
</template>

<script>
export default {
    name: 'ProductFilter',
    props: {
        categories: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            selectedCategory: '',
            selectedPrice: null,
        };
    },
    methods: {
        emitFilters() {
            this.$emit('filterProducts', this.selectedCategory, this.selectedPrice);
        },
    },
};
</script>