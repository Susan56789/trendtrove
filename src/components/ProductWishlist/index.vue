<template>
    <div class="bg-yellow-50 p-32">
        <div class="flex bg-white rounded-md shadow-2xl p-5">
            <!-- Wishlist Items -->
            <div class="w-3/4">
                <h1 class="text-2xl mb-4">Wishlist</h1>
                <ul v-if="wishlistItems.length > 0" class="space-y-4">
                    <li v-for="(item, index) in wishlistItems" :key="index" class="flex items-center justify-between">
                        <div class="flex items-center">
                            <router-link :to="'/product/' + item.ProductName">
                                <img :src="item.ImagePath" :alt="item.ProductName" class="h-16 w-16 object-cover mr-4" />
                            </router-link>
                            <div>
                                <router-link :to="'/product/' + item.ProductName">
                                    <p class="text-lg">{{ item.ProductName }}</p>
                                </router-link>
                                <p class="text-lg">KES. {{ formatNumber(item.DiscountedPrice || item.Price) }}</p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <button @click="addToCart(index)" class="text-blue-500 px-2 mr-2">Add to Cart</button>
                            <button @click="removeFromWishlist(index)" class="text-red-500 px-2">Remove</button>
                        </div>
                    </li>
                </ul>
                <p v-else class="text-gray-500">No items in the wishlist.</p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'ProductWishlist',
    data() {
        return {
            wishlistItems: [],
        };
    },
    methods: {
        formatNumber(value) {
            return value.toLocaleString();
        },
        fetchWishlistItems() {

            axios.get('http://localhost:3000/api/getWishlistItems')
                .then(response => {
                    this.wishlistItems = response.data;
                    console.log(response.data)
                })
                .catch(error => {
                    console.error(error);
                });
        },
        addToCart(index) {

            if (index >= 0 && index < this.wishlistItems.length) {
                const product = this.wishlistItems[index];


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
            } else {
                console.error('Invalid index for wishlist item:', index);
            }
        },
        removeFromWishlist(index) {

            const itemId = this.wishlistItems[index].id;
            axios.delete(`http://localhost:3000/api/removeFromWishlist/${itemId}`)
                .then(response => {
                    console.log(response.data);

                    this.wishlistItems.splice(index, 1);
                })
                .catch(error => {
                    console.error(error);
                });
        },
    },
    created() {
        this.fetchWishlistItems();
    },
};
</script>
  