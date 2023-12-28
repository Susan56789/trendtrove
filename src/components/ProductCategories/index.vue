<template>
    <div class="bg-yellow-50 p-32">
        <h2 class="text-center text-2xl font-bold text-gray-800">Category: {{ selectedCategoryName }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="product in filteredProducts" :key="product.ProductID"
                class="bg-white border rounded-lg shadow-md p-4">
                <img :src="product.ImagePath" :alt="product.ProductName" class="w-full h-48 object-cover mb-4">
                <h3 class="text-xl font-semibold mb-2">{{ product.ProductName }}</h3>
                <p class="text-gray-700 mb-2">{{ product.Description }}</p>
                <p v-if="product.DiscountedPrice" class="text-green-500 font-semibold">KES. {{
                    formatNumber(product.DiscountedPrice) }}</p>
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
            selectedCategoryId: null,
        };
    },
    methods: {
        async fetchData() {
            try {
                console.log('Fetching data...');
                const [productsResponse, categoriesResponse] = await Promise.all([
                    axios.get('http://localhost:3000/api/products'),
                    axios.get('http://localhost:3000/api/categories'),
                ]);

                this.products = productsResponse.data || [];
                this.categories = categoriesResponse.data || [];
                console.log('Categories:', this.categories);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async fetchProductsByCategory(CategoryID) {
            try {
                console.log('Fetching products for category ID:', CategoryID);
                const response = await axios.get(`http://localhost:3000/api/category/id?CategoryID=${CategoryID}`);
                this.products = response.data || [];
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
    },
    computed: {
        selectedCategoryName() {
            const selectedCategory = this.categories.find(category => category.CategoryID === this.selectedCategoryId);
            return selectedCategory ? selectedCategory.CategoryName : '';
        },
        filteredProducts() {
            return this.products.filter(product => product.CategoryID === this.selectedCategoryId);
        },
    },
    watch: {
        '$route.params.categoryId'(newCategoryId) {
            this.selectedCategoryId = newCategoryId;
            this.fetchProductsByCategory(newCategoryId);
        },
    },
    mounted() {
        console.log('Mounted');
        this.fetchData();
        this.selectedCategoryId = this.$route.params.categoryId;
        console.log('Selected Category ID:', this.selectedCategoryId);
        this.fetchProductsByCategory(this.selectedCategoryId);
    },
};
</script>
  
<style scoped>
/* Add Tailwind CSS classes or your custom styles here */
</style>
  