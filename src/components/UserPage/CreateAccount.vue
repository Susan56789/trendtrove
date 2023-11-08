<template>
    <!-- url('/img/hero-pattern.svg') -->
    <div class="flex min-h-screen bg-yellow-50">

        <div class="w-1/2 bg-cover md:block hidden"
            style="background-image:  url(https://creazilla-store.fra1.digitaloceanspaces.com/emojis/46515/shopping-cart-emoji-clipart-md.png)">
        </div>
        <!-- <div class="bg-no-repeat bg-right bg-cover max-w-max max-h-8 h-12 overflow-hidden">
            <img src="log_in.webp" alt="hey">
        </div> -->


        <div class="md:w-1/2 max-w-lg mx-auto my-24 px-4 py-5 bg-white rounded-md shadow-2xl p-5">


            <form action="#" class="">
                <div class="text-left p-0 font-sans">

                    <h1 class=" text-gray-800 text-3xl font-medium">Create an account now!</h1>
                    <h3 class="p-1 text-gray-700">Track your orders any time.</h3>
                </div>
                <div class="mt-5">

                    <!-- <label for="email" class="sc-bqyKva ePvcBv">Email</label> -->
                    <input type="text"
                        class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                        placeholder="Email">
                </div>
                <div class="mt-5">
                    <input type="text"
                        class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                        placeholder="User-name">
                </div>
                <div class="mt-5">
                    <input type="password"
                        class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent  "
                        placeholder="Password">
                </div>

                <div class="mt-6 block p-5 text-sm md:font-sans text-xs text-gray-800">
                    <input type="checkbox" class="inline-block border-0  ">
                    <span display="inline" class="">By creating an account you are agreeing to our
                        <a class="" href="#" target="_blank" data-test="Link">
                            <span class="underline ">Terms and Conditions</span> </a> and
                        <a class="" href="#" target="_blank" data-test="Link">
                            <span class="underline">Privacy Policy</span> </a>
                    </span>
                </div>

                <div class="mt-10">
                    <input type="submit" value="Sign up"
                        class="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                </div>
            </form>
            <a class="" href="/login" data-test="Link"><span class="block  p-5 text-center text-gray-800  text-xs ">Already
                    have
                    an account?</span></a>
        </div>


    </div>
</template>

<script>
export default {
    name: 'CreateAccount',

}
</script>