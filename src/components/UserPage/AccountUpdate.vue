<template>
    <div class="w-full lg:w-8/12 px-4 mx-auto mt-6 pt-32">
        <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div class="rounded-t bg-white mb-0 px-6 py-6">
                <div class="text-center flex justify-between">
                    <h6 class="text-blueGray-700 text-xl font-bold">
                        My account
                    </h6>
                    <a href="/myaccount"
                        class="bg-orange-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button">
                        View Profile
                    </a>
                </div>
            </div>
            <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form action="#" class="p-0">
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
                        <input type="text"
                            class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                            placeholder="First Name">
                    </div>

                    <div class="mt-5">
                        <input type="text"
                            class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                            placeholder="Last Name">
                    </div>
                    <div class="mt-5">
                        <input type="text"
                            class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                            placeholder="Address">
                    </div>
                    <div class="mt-5">
                        <input type="text"
                            class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                            placeholder="City">

                    </div>
                    <div class="mt-5">
                        <input type="text"
                            class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                            placeholder="Country">

                    </div>
                    <div class="mt-5">
                        <input type="text"
                            class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                            placeholder="Postal Code">

                    </div>

                    <div class="mt-5">
                        <input type="text"
                            class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                            placeholder="Phone Number">

                    </div>

                    <div class="mt-5">
                        <input type="password"
                            class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent  "
                            placeholder="Password">
                    </div>
                    <div class="mt-10">
                        <input type="submit" value="Update"
                            class="py-3 bg-green-500 text-white w-full rounded hover:bg-green-600">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'AccountUpdate',

}

</script>
