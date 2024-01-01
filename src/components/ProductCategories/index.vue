<template>
    <div class="bg-yellow-50 p-32">
        <h2 class="text-center text-2xl font-bold text-gray-800">Category: {{ selectedCategoryName }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="product in filteredProducts" :key="product.ProductID"
                class="bg-white border rounded-lg shadow-md p-4">
                <div class="image-container relative flex items-end overflow-hidden rounded-xl">
                    <img :src="product.ImagePath" :alt="product.ProductName"
                        class="mx-auto h-200 w-200 object-cover mb-4" />
                    <div class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        <span class="ml-1 text-sm text-gray-700">{{ product.Rating }}</span>
                    </div>
                </div>
                <h2 class="text-slate-700">{{ product.ProductName }}</h2>
                <!-- <p class="mt-1 text-sm text-slate-400">{{ product.prod_Description }}</p> -->
                <div class="mt-3 flex items-end justify-between">
                    <p v-if="product.DiscountedPrice" class="text-green-500 font-semibold">KES. {{
                        formatNumber(product.DiscountedPrice) }} </p>
                    <p v-else class="text-green-500 font-semibold">KES. {{ formatNumber(product.Price) }}</p>

                    <div
                        class="flex items-center space-x-1.5 rounded-lg bg-indigo-500 px-4 py-1.5 text-white duration-100 hover:bg-indigo-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-4 w-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        <button @click="addToCartButton(product)" class="text-sm">Add to Cart</button>
                    </div>
                    <button @click="addToWishlistButton(product)"
                        class="bg-green-500 text-white px-2 py-1.5 rounded-lg duration-100 hover:bg-green-700">
                        Add to Wishlist
                    </button>
                </div>
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
            selectedProduct: null,
        };
    },
    methods: {
        formatNumber(value) {

            return value.toLocaleString();
        },
        addToWishlistButton(product) {
            // Set the selected product before calling addToWishlist
            this.selectedProduct = product;
            this.addToWishlist();
        },
        addToCartButton(product) {
            // Set the selected product before calling addToCart
            this.selectedProduct = product;
            this.addToCart();
        },
        addToWishlist() {
            // Use the selectedProduct property instead of passing product as a parameter
            const product = this.selectedProduct;

            if (product && product.ProductName && product.Price && product.ProductID) {
                axios.post('http://localhost:3000/addToWishlist', product)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                console.error('Invalid product data for wishlist:', product);
            }
        },
        addToCart() {
            // Use the selectedProduct property instead of passing product as a parameter
            const product = this.selectedProduct;

            if (product && product.ProductName && product.Price) {
                axios.post('http://localhost:3000/addToCart', product)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                console.error('Invalid product data for cart:', product);
            }
        },
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
        async fetchProductsByCategory(CategoryID) {
            try {

                const response = await axios.get(`http://localhost:3000/api/category/id?CategoryID=${CategoryID}`);

                this.products = Array.from(response.data) || [];

            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
    },
    computed: {
        selectedCategoryName() {


            const selectedCategory = this.categories.find(category => String(category.CategoryID) === String(this.selectedCategoryId));


            return selectedCategory ? selectedCategory.CategoryName : '';
        },
        filteredProducts() {
            return this.products.filter(product => String(product.CategoryID) === this.selectedCategoryId);
        },
    },
    watch: {
        '$route.params.CategoryID'(newCategoryId) {
            this.selectedCategoryId = newCategoryId;
            this.fetchProductsByCategory(newCategoryId);
        },
    },
    mounted() {



        // Fetch initial data
        this.fetchData();

        // Set selected category ID from route parameter
        this.selectedCategoryId = this.$route.params.id;

        // Only fetch products if a category is selected
        if (this.selectedCategoryId) {

            this.fetchProductsByCategory(this.selectedCategoryId);
        }
    },
};
</script>
  
<style scoped>
/* Add Tailwind CSS classes or your custom styles here */
</style>
  