<template>
    <div class="container mx-auto mt-5">
        <div class="mb-4 flex items-center">
            <input v-model="searchQuery" @input="filterProducts" type="text" class="p-2 border rounded mr-2"
                placeholder="Search products...">
            <select v-model="selectedCategory" @change="filterProducts" class="p-2 border rounded">
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category">{{ category }}</option>
            </select>
        </div>
        <div v-if="filteredProducts.length > 0" class="grid grid-cols-3 gap-4">
            <div v-for="product in filteredProducts" :key="product.id"
                class="p-4 border rounded shadow-md hover:shadow-lg transition duration-300">
                <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
                <p class="text-gray-500 mb-2">$ {{ product.price }}</p>
                <!-- Add more product details here -->
            </div>
        </div>
        <div v-else class="mt-4">
            <p class="text-gray-500">No products found.</p>
        </div>
    </div>
</template>

<script>
import products from './products.json'

export default {
    name: "ProductsSearch",
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
            }, [])
        }
    },

    computed: {
        filteredProducts() {
            let filteredProducts = this.products;

            if (this.searchQuery) {
                const lowerCaseQuery = this.searchQuery.toLowerCase();
                filteredProducts = filteredProducts.filter(product =>
                    product.name.toLowerCase().includes(lowerCaseQuery)
                );
            }

            if (this.selectedCategory) {
                filteredProducts = filteredProducts.filter(product =>
                    product.category === this.selectedCategory
                );
            }

            return filteredProducts;
        }
    },
    methods: {
        filterProducts() {
            // Call this method if you need to perform additional actions on filtering
        }
    }
};


</script>