<template>
    <div class="pt-32 relative w-full bg-yellow-50">
        <!-- Displaying router view and form for searching -->
        <router-view></router-view>

        <div class="container m-auto px-6 pt-32 md:px-12 lg:pt-[4.8rem] lg:px-7">
            <div class="flex items-center flex-wrap px-2 md:px-0">
                <!-- Left section with search bar and products -->
                <div class="relative lg:w-6/12 lg:py-24 xl:py-32">
                    <h1 class="font-bold text-4xl text-yellow-900 md:text-5xl lg:w-10/12">One Order Away!</h1>

                    <!-- Search form -->
                    <form action="" class="w-full mt-12">
                        <div class="relative flex p-1 rounded-full bg-white border border-yellow-200 shadow-md md:p-2">
                            <!-- Dropdown for category selection -->
                            <select v-model="selectedCategory" @change="filterProducts">
                                <option value="">All Categories</option>
                                <option v-for="category in categories" :key="category">{{ category }}</option>
                            </select>

                            <!-- Input for search query -->
                            <input v-model="searchQuery" type="text" placeholder="Search Products"
                                class="w-full p-4 rounded-full">

                            <!-- Search button -->
                            <button type="button" @click="submitSearch" title="Start buying" class="ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b 
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
                    <div v-if="searchSubmitted && filteredProducts.length > 0" class="grid grid-cols-3 gap-4">
                        <div v-for="product in filteredProducts" :key="product.ProductID"
                            class="p-4 border rounded shadow-md hover:shadow-lg transition duration-300">
                            <article>
                                <a href="#">
                                    <div class="mt-1 p-2">
                                        <div class="image-container relative flex items-end overflow-hidden rounded-xl">
                                            <img :src="product.ImagePath" :alt="product.ProductName"
                                                class="mx-auto h-100 w-100 object-cover mb-4 ">
                                            <div
                                                class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400"
                                                    viewBox="0 0 20 20" fill="currentColor">
                                                    <path
                                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span class="ml-1 text-sm text-gray-700">{{ product.Rating }}</span>
                                            </div>
                                        </div>
                                        <h2 class="text-slate-700">{{ product.ProductName }}</h2>
                                        <!-- <p class="mt-1 text-sm text-slate-400">{{ product.Prod_Description }}</p> -->

                                        <div class="mt-3 flex items-end justify-between">
                                            <p v-if="product.DiscountedPrice" class="text-gray-500 line-through">KES. {{
                                                formatNumber(product.Price) }}</p>
                                            <p v-if="product.DiscountedPrice" class="text-green-500 font-semibold">KES. {{
                                                formatNumber(product.DiscountedPrice)
                                            }}</p>
                                            <p v-else class="text-green-500 font-semibold">KES. {{ formatNumber(
                                                product.Price) }}</p>
                                            <div
                                                class="flex items-center space-x-1.5 rounded-lg bg-indigo-500 px-2 py-1 text-white duration-100 hover:bg-indigo-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="h-3 w-3">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                </svg>
                                                <button @click="addToCartButton(product)" class="text-sm"> Add to
                                                    Cart</button>

                                            </div>
                                            <button @click="addToWishlistButton(product)"
                                                class="bg-green-500 text-white px-2 py-1.5 rounded-lg duration-100 hover:bg-green-700">
                                                Add to Wishlist
                                            </button>
                                        </div>
                                    </div>



                                </a>
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
                <div class="lg:w-6/12 lg:-mb-56 ">
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
            if (this.searchQuery && this.selectedCategory) {
                const lowerCaseQuery = this.searchQuery.toLowerCase();
                return this.products.filter(product =>
                    product.ProductName.toLowerCase().includes(lowerCaseQuery) &&
                    product.CategoryName === this.selectedCategory
                );
            }
            return [];
        }
    },
    methods: {
        formatNumber(value) {
            // Use toLocaleString to format the number with comma separators
            return value.toLocaleString();
        },
        async fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/api/products');
                this.products = response.data;
                this.categories = [...new Set(this.products.map(product => product.CategoryName))];

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        submitSearch() {
            this.searchSubmitted = true;
            this.searchQuery = ''
        },
        addToWishlistButton(product) {
            this.addToWishlist(product);
        },
        addToCartButton(product) {
            this.addToCart(product);
        },
        addToWishlist(product) {
            // Check if product is defined and has the required properties
            if (product && product.ProductName && product.Price /* Add other required properties */) {
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
        addToCart(product) {
            // Check if product is defined and has the required properties
            if (product && product.ProductName && product.Price /* Add other required properties */) {
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
  