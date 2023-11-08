<template>
    <div class="bg-yellow-50">
        <div class="pt-32">
            <h1 class="text-center text-2xl font-bold text-gray-800">Your Cart</h1>
        </div>
        <div class="container mx-auto my-8">
            <div class="flex flex-col md:flex-row">
                <div class="md:w-2/3 pr-8">

                    <div v-if="cart.length === 0" class="text-center text-gray-500">
                        Your cart is empty.
                    </div>
                    <div v-else>
                        <div class="flex flex-wrap -mx-4">
                            <div v-for="(product, index) in cart" :key="index"
                                class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-4">
                                <div class="bg-white p-6 rounded shadow">
                                    <div class="w-16 h-16 bg-gray-300 rounded-full mr-4">
                                        <img :src="product.image" :alt="product.name" class="w-full h-full object-cover">
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="text-lg font-semibold">{{ product.name }}</h3>
                                        <p class="text-green-500 font-semibold">${{ product.price }}</p>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <div class="flex justify-between items-center mt-2">
                                            <button @click="decreaseQuantity(index)"
                                                class="px-3 py-1 bg-gray-200 rounded-full">-</button>
                                            <span class="mx-2">{{ product.quantity }}</span>
                                            <button @click="increaseQuantity(index)"
                                                class="px-3 py-1 bg-gray-200 rounded-full">+</button>
                                        </div>
                                        <div>
                                            <span class="font-semibold">Total:</span> ${{ (product.quantity *
                                                product.price).toFixed(2) }}
                                        </div>
                                    </div>
                                    <button @click="removeProduct(index)"
                                        class="mt-4 text-red-500 hover:text-red-700">Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="md:w-1/3">
                    <div class="bg-white p-6 rounded shadow">
                        <div v-for="(product, index) in cart" :key="index" class="flex justify-between mb-2">
                            <span>{{ product.name }} ({{ product.quantity }} x ${{ product.price.toFixed(2) }})</span>
                            <span>${{ (product.quantity * product.price).toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between mb-2">
                            <span>Shipping Fee</span>
                            <span>${{ shippingFee.toFixed(2) }}</span>
                        </div>
                        <div v-if="cart.length > 0">
                            <div class="flex justify-between border-t pt-2 mt-4">
                                <span class="font-semibold">Total</span>
                                <span class="text-xl">${{ (totalCost + shippingFee).toFixed(2) }}</span>
                            </div>
                            <button
                                class="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                                @click="checkout">
                                Checkout
                            </button>
                        </div>
                        <div v-else>
                            <a href="/shop"
                                class="w-full mt-4 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
                                Shop Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

export default {
    name: 'CartPage',
    data() {
        return {
            cart: [
                { name: "Product 1", description: "Description 1", quantity: 1, price: 10, image: "/products/rednikeshoe.png" },
                { name: "Product 2", description: "Description 2", quantity: 2, price: 15, image: "/products/rednikeshoe.png" },
                { name: "Product 3", description: "Description 3", quantity: 3, price: 20, image: "/products/rednikeshoe.png" },
                { name: "Product 4", description: "Description 4", quantity: 4, price: 25, image: "/products/rednikeshoe.png" },
                { name: "Product 5", description: "Description 5", quantity: 5, price: 30, image: "/products/rednikeshoe.png" }
                // Add more products as needed
            ],
            shippingFee: 5, // Sample shipping fee
        };
    },
    computed: {
        totalCost() {
            return this.cart.reduce((total, product) => total + product.quantity * product.price, 0);
        },
    },
    methods: {
        removeProduct(index) {
            this.cart.splice(index, 1);
        },
        decreaseQuantity(index) {
            if (this.cart[index].quantity > 1) {
                this.cart[index].quantity--;
            }
        },
        increaseQuantity(index) {
            this.cart[index].quantity++;
        },

    },
};



</script>
<style></style>