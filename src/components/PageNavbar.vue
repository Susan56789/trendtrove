<template>
    <nav class="fixed z-10 w-full bg-white md:absolute md:bg-transparent">
      <div class="container m-auto px-2 md:px-12 lg:px-7">
        <div class="flex flex-wrap items-center justify-between py-3 gap-6 md:py-4 md:gap-0">
          <div class="w-full px-6 flex justify-between lg:w-max md:px-0">
            <a href="/" aria-label="logo" class="flex space-x-2 items-center">
              <img :src="imageUrl" class="w-12" alt="tailus logo" width="200" height="200">
              <span class="text-2xl font-bold text-yellow-900">Trend <span class="text-yellow-700">Trove</span></span>
            </a>
  
            <button aria-label="hamburger" id="hamburger" class="relative w-10 h-10 -mr-2 lg:hidden" @click="toggleMobileMenu">
              <div aria-hidden="true" id="line" class="inset-0 w-6 h-0.5 m-auto rounded bg-yellow-900 transition duration-300"></div>
              <div aria-hidden="true" id="line2" class="inset-0 w-6 h-0.5 mt-2 m-auto rounded bg-yellow-900 transition duration-300"></div>
            </button>
          </div>
  
          <div v-if="isMobileMenuOpen || isLargeScreen" class="w-full lg:flex flex-wrap justify-end items-center space-y-6 p-6 rounded-xl bg-white md:space-y-0 md:p-0 md:flex-nowrap md:bg-transparent lg:w-7/12">
            <div class="text-gray-600 lg:pr-4">
              <ul class="space-y-6 tracking-wide font-medium text-sm md:flex md:space-y-0">
                <li>
                  <a href="/shop" class="block md:px-4 transition hover:text-yellow-700">
                    <span>Shop</span>
                  </a>
                </li>
                <li>
                  <a href="/sale" class="block md:px-4 transition hover:text-yellow-700">
                    <span>Today's Deals</span>
                  </a>
                </li>
                <li>
                  <a href="/wishlist" class="block md:px-4 transition hover:text-yellow-700">
                    <span>Wishlist</span>
                  </a>
                </li>
                <li>
                  <a href="/cart" @click.prevent="navigateTo('/cart')" class="block md:px-4 transition hover:text-yellow-700">
                    <span>Cart</span>
                  </a>
                </li>
              </ul>
            </div>
  
            <div class="w-full space-y-2 border-yellow-200 lg:space-y-0 md:w-max lg:border-l">
              <a href="/signup" type="button" title="Start buying" class="w-full py-3 px-6 text-center rounded-full transition active:bg-yellow-200 focus:bg-yellow-100 sm:w-max">
                <span class="block text-yellow-800 font-semibold text-sm">
                  Sign up
                </span>
              </a>
              <a href="/login" type="button" title="Start buying" class="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max">
                <span class="block text-yellow-900 font-semibold text-sm">
                  Login
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </template>
<script>
import Logo from '../assets/logo2.png'


export default {
    name: "PageNavbar",
    data() {
        return {
            imageUrl: Logo,
            isMobileMenuOpen: false,
      isLargeScreen: window.innerWidth >= 1024,
      

        }
    },
    methods: {
        toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
        navigateTo(route) {
            this.$router.push(route);
        },
        handleResize() {
      this.isLargeScreen = window.innerWidth >= 1024; // Adjust the breakpoint as needed
    },
    },
    mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  }
 
}

</script>