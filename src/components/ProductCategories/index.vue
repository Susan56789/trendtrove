<template>
    <div class="bg-yellow-50 p-32">
        <h2 class="text-center text-2xl font-bold text-gray-800">Category: {{ selectedCategoryName }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="product in filteredProducts" :key="product._id"
                class="bg-white border rounded-lg shadow-md p-4">
                <div class="image-container relative flex items-end overflow-hidden rounded-xl">
                    <router-link :to="'/product/' + product._id">
                        <img :src="product.imageUrl" :alt="product.title"
                            class="mx-auto h-200 w-200 object-cover mb-4" />
                    </router-link>
                </div>
                <h2 class="text-slate-700">{{ product.title }}</h2>

                <div class="mt-3 flex items-end justify-between">
                    <router-link :to="'/product/' + product._id">
                        <p class="text-green-500 font-semibold">KES. {{ formatNumber(product.price) }}</p>
                    </router-link>
                    <div
                        class="flex items-center space-x-1.5 rounded-lg bg-indigo-500 px-4 py-1.5 text-white duration-100 hover:bg-indigo-600">
                        <button @click="addToCartButton(product)" class="text-sm"><i
                                class="fas fa-cart-plus"></i></button>
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

            if (product && product.title && product.price && product._id) {
                axios.post('https://posinet.onrender.com/api/addToWishlist', product)
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

            if (product && product.title && product.price) {
                axios.post('https://posinet.onrender.com/api/addToCart', product)
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
                    axios.get('https://posinet.onrender.com/api/products'),
                    axios.get('https://posinet.onrender.com/api/categories'),
                ]);

                this.products = productsResponse.data.map(product => ({
                    ...product,
                    imageUrl: product.images && product.images.length > 0
                        ? `data:${product.images[0].contentType};base64,${product.images[0].data}`
                        : null
                })) || [];
                this.categories = categoriesResponse.data || [];
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async fetchProductsByCategory(categoryId) {
            try {
                const response = await axios.get(`https://posinet.onrender.com/api/category/${categoryId}`);

                this.products = response.data.map(product => ({
                    ...product,
                    imageUrl: product.images && product.images.length > 0
                        ? `data:${product.images[0].contentType};base64,${product.images[0].data}`
                        : null
                })) || [];
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
    },
    computed: {
        selectedCategoryName() {
            const selectedCategory = this.categories.find(category => category._id === this.selectedCategoryId);
            return selectedCategory ? selectedCategory.name : '';
        },
        filteredProducts() {
            return this.products.filter(product => product.category === this.selectedCategoryId);
        },
    },
    watch: {
        '$route.params.id'(newCategoryId) {
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

<style scoped>
.image-container img {
    max-width: 100%;
    max-height: 100%;
}

.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
}
</style>