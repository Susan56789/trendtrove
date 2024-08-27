<template>
    <section>
        <article class="mt-50">
            <h2 class="text-2xl font-extrabold text-gray-900">Popular Categories</h2>
            <section v-if="loading" class="flex justify-center items-center h-64">
                <p class="text-lg font-semibold text-gray-500">Loading...</p>
            </section>
            <section v-else class="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8">
                <article v-for="category in popularCategories" :key="category.name"
                    class="relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
                    :style="{ backgroundImage: 'url(' + category.RandomImageUrl + ')' }">
                    <div
                        class="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out">
                    </div>
                    <div class="relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center">
                        <h3 class="text-center">
                            <router-link :to="'/category/' + category.name"
                                class="text-white text-2xl font-bold text-center">
                                <span class="absolute inset-0"></span>
                                {{ category.name }}
                            </router-link>
                        </h3>
                    </div>
                </article>
            </section>
        </article>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: 'PopularCategories',
    data() {
        return {
            products: [],
            categories: [],
            loading: true, // Loading state
        };
    },
    methods: {
        async fetchData() {
            try {
                const response = await axios.get('https://posinet.onrender.com/api/products');
                this.products = response.data.map(product => ({
                    ...product,
                    imageUrl: product.images && product.images.length > 0
                        ? `data:${product.images[0].contentType};base64,${product.images[0].data}`
                        : 'default-image.jpg' // Ensure this fallback image is in your assets
                }));

                // Derive unique categories from products
                this.categories = [...new Set(this.products.map(product => product.category))];
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                this.loading = false; // Stop loading when data is fetched
            }
        },
        // Picks a random image URL from the products in the given category
        getRandomImageUrl(productsInCategory) {
            if (productsInCategory.length === 0) {
                return 'default-image.jpg'; // Ensure this path is correct
            }

            const randomProduct = productsInCategory[Math.floor(Math.random() * productsInCategory.length)];
            return randomProduct.imageUrl;
        },
    },
    computed: {
        popularCategories() {
            // Group products by category and calculate product count
            const categoryMap = this.categories.map(categoryName => {
                const productsInCategory = this.products.filter(product => product.category === categoryName);
                return {
                    name: categoryName,
                    productCount: productsInCategory.length,
                    RandomImageUrl: this.getRandomImageUrl(productsInCategory)
                };
            });

            // Sort by product count in descending order
            const sortedCategories = categoryMap.sort((a, b) => b.productCount - a.productCount);

            // Return the top 3 categories
            return sortedCategories.slice(0, 3);
        }
    },
    mounted() {
        this.fetchData();
    }
};
</script>
