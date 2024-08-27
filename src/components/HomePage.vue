<template>
    <div class="pt-32 relative w-full bg-yellow-50">
        <router-view></router-view>
        <div class="container m-auto px-6 pt-32 md:px-12 lg:pt-[4.8rem] lg:px-7">
            <div class="flex items-center flex-wrap px-2 md:px-0">
                <!-- Left section with search bar and products -->
                <div class="relative lg:w-6/12 lg:py-24 xl:py-32">
                    <h1 class="font-bold text-4xl text-yellow-900 md:text-5xl lg:w-10/12">One Order Away!</h1>
                    <!-- Search form -->
                    <form @submit.prevent="submitSearch" class="w-full mt-12">
                        <div class="relative flex p-1 rounded-full bg-white border border-yellow-200 shadow-md md:p-2">
                            <!-- Dropdown for category selection -->
                            <select v-model="selectedCategory" @change="submitSearch" class="w-1/4 rounded-l-full">
                                <option value="">All Categories</option>
                                <option v-for="category in categories" :key="category">{{ category }}</option>
                            </select>
                            <!-- Input for search query -->
                            <input v-model="searchQuery" type="text" placeholder="Search Products"
                                class="w-full p-4 rounded-r-full">
                            <!-- Search button -->
                            <button type="submit" title="Start buying" class="ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b 
                       from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 
                       focus:from-red-400 md:px-12">
                                <span class="hidden text-yellow-900 font-semibold md:block">Search</span>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="w-5 mx-auto text-yellow-900 md:hidden bi bi-search" fill="currentColor"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                    <!-- Displaying search results or warnings based on conditions -->
                    <div v-if="searchSubmitted && filteredProducts.length > 0" class="grid grid-cols-3 gap-4 mt-4">
                        <div v-for="product in filteredProducts" :key="product._id"
                            class="p-4 border rounded shadow-md hover:shadow-lg transition duration-300">
                            <article>
                                <div class="mt-1 p-2">
                                    <div class="image-container relative flex items-end overflow-hidden rounded-xl">
                                        <router-link :to="'/product/' + product.title">
                                            <img :src="product.imageUrl" :alt="product.title"
                                                class="mx-auto h-100 w-100 object-cover mb-4" />
                                        </router-link>
                                        <div
                                            class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                                            <i class="fas fa-star text-yellow-400"></i>
                                            <span class="ml-1 text-sm text-gray-700">{{ product.price
                                                }}</span>
                                        </div>
                                    </div>
                                    <h2 class="text-slate-700">{{ product.title }}</h2>
                                    <div class="mt-3 flex items-end justify-between">
                                        <router-link :to="'/product/' + product.title">
                                            <p class="text-green-500 font-semibold">KES. {{ product.price
                                                }}</p>
                                        </router-link>
                                        <div
                                            class="flex items-center space-x-1.5 rounded-lg bg-indigo-500 px-2 py-1 text-white duration-100 hover:bg-indigo-600">
                                            <button @click="addToCartButton(product)" class="text-sm">
                                                <i class="fas fa-cart-plus"></i>
                                            </button>
                                        </div>
                                        <button @click="addToWishlistButton(product)"
                                            class="bg-green-500 text-white px-2 py-1.5 rounded-lg duration-100 hover:bg-green-700">
                                            <i class="fas fa-heart"></i>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                    <div v-else-if="searchSubmitted && filteredProducts.length === 0" class="mt-4">
                        <p class="text-gray-500">No products found in the selected category.</p>
                    </div>
                    <div v-else-if="searchSubmitted" class="mt-4">
                        <p class="text-gray-500">No products found.</p>
                    </div>
                </div>
                <!-- Right section with an illustration and top categories -->
                <div class="lg:w-6/12 lg:-mb-56">
                    <img src="../../public/products/13833.jpg" class="relative hero-pic" alt="food illustration"
                        loading="lazy" width="4500" height="4500">
                </div>
                <!-- Top categories -->
                <div class="mt-50 lg:w-70%">
                    <PopularCategories />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import PopularCategories from './ProductCategories/PopularCategories.vue';

export default {
    name: "HomePage",
    components: {
        PopularCategories,
    },
    data() {
        return {
            products: [],
            searchQuery: '',
            selectedCategory: '',
            categories: [],
            searchSubmitted: false,
        };
    },
    computed: {
        filteredProducts() {
            if (this.searchQuery || this.selectedCategory) {
                const lowerCaseQuery = this.searchQuery.toLowerCase();
                return this.products.filter(product =>
                    (!this.searchQuery || product.title.toLowerCase().includes(lowerCaseQuery)) &&
                    (!this.selectedCategory || product.category === this.selectedCategory)
                );
            }
            return this.products;
        }
    },
    methods: {
        async fetchData() {
            try {
                const response = await axios.get('https://posinet.onrender.com/api/products');
                this.products = response.data.map(product => ({
                    ...product,
                    imageUrl: product.images && product.images.length > 0
                        ? `data:${product.images[0].contentType};base64,${product.images[0].data}`
                        : 'default-image.jpg'
                }));
                this.categories = [...new Set(this.products.map(product => product.category))];
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        submitSearch() {
            this.searchSubmitted = true;
        },
        addToWishlistButton(product) {
            this.addToWishlist(product);
        },
        addToCartButton(product) {
            this.addToCart(product);
        },
        addToWishlist(product) {
            if (product && product.title && product.price) {
                axios.post('https://posinet.onrender.com/addToWishlist', product)
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
        addToCart(product) {
            if (product && product.title && product.price) {
                axios.post('https://posinet.onrender.com/addToCart', product)
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
    },
    created() {
        this.fetchData();
    }
};
</script>

<style>
#hamburger:focus~#line {
    transform: rotate(-45deg) translate(-0.5rem, 0.5rem);
}
</style>