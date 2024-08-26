<template>
    <div class="bg-yellow-50 p-32">
        <div class="justify-center mt-8">
            <div class="bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 class="text-slate-700">{{ product.title }}</h2>
                    <div class="image-container relative flex items-end overflow-hidden rounded-xl">
                        <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.title"
                            class="mx-auto h-200 w-200 object-cover mb-4" />
                        <span v-else>No image</span>
                    </div>

                    <p class="mt-1 text-sm text-slate-400">{{ product.description }}</p>
                    <div class="mt-3 flex items-end justify-between">
                        <p class="text-green-500 font-semibold">KES. {{ formatNumber(product.price) }}</p>

                        <div
                            class="flex items-center space-x-1.5 rounded-lg bg-indigo-500 px-4 py-1.5 text-white duration-100 hover:bg-indigo-600">
                            <button @click="addToCartButton" class="text-sm">
                                <i class="fas fa-cart-plus"></i>
                            </button>
                        </div>
                        <button @click="addToWishlistButton"
                            class="bg-green-500 text-white px-2 py-1.5 rounded-lg duration-100 hover:bg-green-700">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'ProductView',
    data() {
        return {
            product: {},
            selectedProduct: null,
        };
    },
    created() {
        this.fetchProductDetails();
    },
    methods: {
        formatNumber(value) {
            return value !== undefined && value !== null ? value.toLocaleString() : '';
        },
        addToWishlistButton() {
            this.selectedProduct = this.product;
            this.addToWishlist();
        },
        addToCartButton() {
            this.selectedProduct = this.product;
            this.addToCart();
        },
        addToWishlist() {
            const product = this.selectedProduct;

            if (product && product._id) {
                axios.post('https://posinet.onrender.com/api/addToWishlist', product)
                    .then(response => {
                        console.log('Added to wishlist:', response.data);
                    })
                    .catch(error => {
                        console.error('Error adding to wishlist:', error);
                    });
            } else {
                console.error('Invalid product data for wishlist:', product);
            }
        },
        addToCart() {
            const product = this.selectedProduct;

            if (product && product._id) {
                axios.post('https://posinet.onrender.com/api/addToCart', product)
                    .then(response => {
                        console.log('Added to cart:', response.data);
                    })
                    .catch(error => {
                        console.error('Error adding to cart:', error);
                    });
            } else {
                console.error('Invalid product data for cart:', product);
            }
        },
        fetchProductDetails() {
            const productId = this.$route.params.id;

            axios.get(`https://posinet.onrender.com/api/product/${productId}`)
                .then(response => {
                    this.product = this.mapProductData(response.data);

                })
                .catch(error => {
                    console.error('Error fetching product details:', error);
                });
        },
        mapProductData(product) {
            return {
                ...product,
                imageUrl: product.images && product.images.length > 0
                    ? `data:${product.images[0].contentType};base64,${product.images[0].data}`
                    : null
            };
        }
    }
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