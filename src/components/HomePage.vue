<template>
    <!-- component -->
    <div class="relative w-full">
        <router-view></router-view>

        <div class="relative bg-yellow-50">
            <div class="container m-auto px-6 pt-32 md:px-12 lg:pt-[4.8rem] lg:px-7">
                <div class="flex items-center flex-wrap px-2 md:px-0">
                    <div class="relative lg:w-6/12 lg:py-24 xl:py-32">
                        <h1 class="font-bold text-4xl text-yellow-900 md:text-5xl lg:w-10/12">One Order Away!
                        </h1>
                        <form action="" class="w-full mt-12">
                            <div class="relative flex p-1 rounded-full bg-white border border-yellow-200 shadow-md md:p-2">
                                <select v-model="selectedCategory" @change="filterProducts">
                                    <option value="">All Categories</option>
                                    <option v-for="category in categories" :key="category">{{ category }}</option>


                                </select>
                                <input v-model="searchQuery" type="text" placeholder="Search Products"
                                    class="w-full p-4 rounded-full">
                                <button type="button" @click="submitSearch" title="Start buying"
                                    class="ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b 
                                                                                                                                        from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 
                                                                                                                                        focus:from-red-400 md:px-12">
                                    <span class="hidden text-yellow-900 font-semibold md:block">
                                        Search
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="w-5 mx-auto text-yellow-900 md:hidden bi bi-search" fill="currentColor"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                        <div v-if="searchSubmitted && filteredProducts.length > 0" class="grid grid-cols-3 gap-4">
                            <div v-for="product in filteredProducts" :key="product.id"
                                class="p-4 border rounded shadow-md hover:shadow-lg transition duration-300">
                                <article>
                                    <a href="#">
                                        <div class="mt-1 p-2">
                                            <div class="image-container relative flex items-end overflow-hidden rounded-xl">
                                                <img :src="product.image" :alt="product.name"
                                                    class="mx-auto h-100 w-100 object-cover mb-4 ">
                                                <div
                                                    class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400"
                                                        viewBox="0 0 20 20" fill="currentColor">
                                                        <path
                                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span class="ml-1 text-sm text-gray-700">{{ product.rating }}</span>
                                                </div>
                                            </div>
                                            <h2 class="text-slate-700">{{ product.name }}</h2>
                                            <p class="mt-1 text-sm text-slate-400">{{ product.description }}</p>

                                            <div class="mt-3 flex items-end justify-between">
                                                <p v-if="product.discountedPrice" class="text-gray-500 line-through">$ {{
                                                    product.price }}</p>
                                                <p v-if="product.discountedPrice" class="text-green-500 font-semibold">$ {{
                                                    product.discountedPrice
                                                }}</p>
                                                <p v-else class="text-green-500 font-semibold">$ {{ product.price }}</p>

                                            </div>
                                        </div>



                                    </a>
                                </article>

                            </div>

                        </div>
                        <div v-else-if="searchSubmitted | filteredProducts.length === 0" class="mt-4">
                            <p class="text-gray-500">No products found in the selected category.</p>
                        </div>
                        <div v-else-if="searchSubmitted" class="mt-4">
                            <p class="text-gray-500">No products found.</p>
                        </div>
                        <div v-else class="mt-4">
                            <p class="text-gray-500">Please enter a search query and select a category.</p>
                        </div>
                    </div>
                    <div class="ml-30 -mb-24 lg:-mb-56 lg:w-6/12">
                        <img src="../../public/products/13833.jpg"
                            class="relative hero-pic" alt="food illustration" loading="lazy" width="4500" height="4500">
                    </div>

                    <PopularCategories />


                </div>

            </div>
        </div>
    </div>
</template>
  
<script>
import products from './ProductsPage/products.json'
import PopularCategories from './ProductCategories/PopularCategories.vue';

export default {
    name: "HomePage",
    components: {
        PopularCategories
    },
    data() {
        return {
            products: products,
            searchQuery: '',
            selectedCategory: '',
            categories: products.reduce((categories, product) => {
                if (!categories.includes(product.category)) {
                    categories.push(product.category);
                }
                return categories;
            }, []),

            searchSubmitted: false,
        };
    },
    computed: {
        filteredProducts() {
            if (this.searchQuery && this.selectedCategory) {
                const lowerCaseQuery = this.searchQuery.toLowerCase();
                return this.products.filter(product =>
                    product.name.toLowerCase().includes(lowerCaseQuery) &&
                    product.category === this.selectedCategory
                );
            }
            return [];
        }
    },
    methods: {
        submitSearch() {
            this.searchSubmitted = true;
        }
    }
};
</script>
  
<style>
#hamburger:focus~#line {
    transform: rotate(-45deg) translate(-0.5rem, 0.5rem);
}
</style>
  