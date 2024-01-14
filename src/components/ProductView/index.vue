<template>
    <div class="bg-yellow-50 p-32">
        <div class=" justify-center mt-8">
            <div class=" bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 class="text-slate-700">{{ product.ProductName }}</h2>
                    <div class="image-container relative flex items-end overflow-hidden rounded-xl">
                        <img :src="product.ImagePath" :alt="product.ProductName"
                            class="mx-auto h-200 w-200 object-cover mb-4" />
                        <div class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                            <i class="fas fa-star text-yellow-400"></i>
                            <span class="ml-1 text-sm text-gray-700">{{ product.Rating }}</span>
                        </div>
                    </div>

                    <p class="mt-1 text-sm text-slate-400">{{ product.Prod_Description }}</p>
                    <div class="mt-3 flex items-end justify-between">
                        <p v-if="product.DiscountedPrice" class="text-green-500 font-semibold">KES. {{
                            formatNumber(product.DiscountedPrice) }} </p>
                        <p v-else class="text-green-500 font-semibold">KES. {{ formatNumber(product.Price) }}</p>

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
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'ProductView',
    data() {
        return {
            product: {},
        };
    },
    created() {
        // Fetch product details when the component is created
        this.fetchProductDetails();
    },
    methods: {
        formatNumber(value) {
            if (value !== undefined && value !== null) {
                return value.toLocaleString();
            }
            return ''; // or return some default value if you prefer
        }, addToWishlistButton(product) {
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
                axios.post('http://worldempiresafaris.co.ke/addToWishlist', product)
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
                axios.post('http://worldempiresafaris.co.ke/addToCart', product)
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

        fetchProductDetails() {
            const productName = this.$route.params.name;

            // Fetch product details based on the product name from the route
            axios.get(`http://worldempiresafaris.co.ke/product/${productName}`)
                .then(response => {
                    this.product = response.data[0]; // Access the first item
                    console.log('Product Details:', this.product);
                })
                .catch(error => {
                    console.error(error);
                });
        },
    },
};
</script>
  