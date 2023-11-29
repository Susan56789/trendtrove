<template>
    <section>
        <article class="mt-50">
            <h2 class="text-2xl font-extrabold text-gray-900">Top Categories</h2>

            <section class="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8">
                <article v-for="category in topCategories" :key="category.id"
                    class="relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
                    :style="{ backgroundImage: 'url(' + category.imageUrl + ')' }">
                    <div
                        class="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out">
                    </div>
                    <div class="relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center">
                        <h3 class="text-center">
                            <router-link :to="'/category/' + category.id" class="text-white text-2xl font-bold text-center">
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
import categories from './categories.json';
import products from '../ProductsPage/products.json';

export default {
    name: 'PopularCategories',
    data() {
        return {
            categories: categories,
            products: products
        };
    },
    computed: {
        topCategories() {
            // Count the number of products in each category
            const categoryCounts = this.categories.map(category => ({
                ...category,
                productCount: this.products.filter(product => product.category === category.name).length
            }));

            // Sort categories by the number of products in descending order
            const sortedCategories = categoryCounts.sort((a, b) => b.productCount - a.productCount);

            // Get the top 3 categories
            return sortedCategories.slice(0, 3);
        }
    }
};
</script>
