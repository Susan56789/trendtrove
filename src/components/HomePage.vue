<template>
    <!-- component -->
    <div class="relative w-full">
        <router-view></router-view>

        <div class="relative bg-yellow-50">
            <div class="container m-auto px-6 pt-32 md:px-12 lg:pt-[4.8rem] lg:px-7">
                <div class="flex items-center flex-wrap px-2 md:px-0">
                    <div class="relative lg:w-6/12 lg:py-24 xl:py-32">
                        <h1 class="font-bold text-4xl text-yellow-900 md:text-5xl lg:w-10/12">All your shopping at one go!
                        </h1>
                        <form action="" class="w-full mt-12">
                            <div class="relative flex p-1 rounded-full bg-white border border-yellow-200 shadow-md md:p-2">
                                <select class="hidden p-3 rounded-full bg-transparent md:block md:p-4" name="domain"
                                    id="domain">
                                    <option value="design">Electronics</option>
                                    <option value="development">Beauty</option>
                                    <option value="marketing">Grocery</option>
                                    <option value="seo">Fashion</option>


                                </select>
                                <input placeholder="Your one stop shop" class="w-full p-4 rounded-full" type="text">
                                <button type="button" title="Start buying" class="ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b 
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
                        <p class="mt-8 text-gray-700 lg:w-10/12">Sit amet consectetur adipisicing elit. <a href="#"
                                class="text-yellow-700">connection</a> tenetur nihil quaerat suscipit, sunt dignissimos.</p>
                    </div>
                    <div class="ml-auto -mb-24 lg:-mb-56 lg:w-6/12">
                        <img :src="heroUrl" class="relative" alt="food illustration" loading="lazy" width="4500"
                            height="4500">
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
  
<script>

import Hero from '../assets/shop2.png'



export default {
    name: "HomePage",
    data() {
        return {
            heroUrl: Hero,
        };
    },
};

</script>
  
<style>
#hamburger:focus~#line {
    transform: rotate(-45deg) translate(-0.5rem, 0.5rem);
}
</style>
  