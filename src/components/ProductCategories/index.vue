<template>
    <div class="bg-yellow-50 p-32">
        <h2 class="text-center text-2xl font-bold text-gray-800">Category: {{ selectedCategoryName }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="product in filteredProducts" :key="product.ProductID"
                class="bg-white border rounded-lg shadow-md p-4">

                <div class="image-container relative flex items-end overflow-hidden rounded-xl">
                    <router-link :to="'/product/' + product.ProductName">
                        <img :src="product.ImagePath" :alt="product.ProductName"
                            class="mx-auto h-200 w-200 object-cover mb-4" /></router-link>
                    <div class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                        <i class="fas fa-star text-yellow-400"></i>
                        <span class="ml-1 text-sm text-gray-700">{{ product.Rating }}</span>
                    </div>
                </div>
                <h2 class="text-slate-700">{{ product.ProductName }}</h2>

                <div class="mt-3 flex items-end justify-between">
                    <router-link :to="'/product/' + product.ProductName">
                        <p v-if="product.DiscountedPrice" class="text-green-500 font-semibold">KES. {{
                                                    formatNumber(product.DiscountedPrice) }} </p>
                        <p v-else class="text-green-500 font-semibold">KES. {{ formatNumber(product.Price) }}</p>
                    </router-link>
                    <div
                        class="flex items-center space-x-1.5 rounded-lg bg-indigo-500 px-4 py-1.5 text-white duration-100 hover:bg-indigo-600">

                        <button @click="addToCartButton(product)" class="text-sm"><i class="fas fa-cart-plus"></i></button>
                    </div>
                    <button @click="addToWishlistButton(product)"
                        class="bg-green-500 text-white px-2 py-1.5 rounded-lg duration-100 hover:bg-green-700">
                        <i class="fas fa-heart"></i>
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

            this.selectedProduct = product;
            this.addToWishlist();
        },
        addToCartButton(product) {

            this.selectedProduct = product;
            this.addToCart();
        },
        addToWishlist() {

            const product = this.selectedProduct;

            if (product && product.ProductName && product.Price && product.ProductID) {
                axios.post('http://localhost:3000/api/addToWishlist', product)
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

            const product = this.selectedProduct;

            if (product && product.ProductName && product.Price) {
                axios.post('http://localhost:3000/api/addToCart', product)
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




        this.fetchData();


        this.selectedCategoryId = this.$route.params.id;


        if (this.selectedCategoryId) {

            this.fetchProductsByCategory(this.selectedCategoryId);
        }
    },
};
</script>
  
<style scoped></style>
  