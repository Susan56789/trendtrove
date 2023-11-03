<template>
  <div id="app">
    <HomePageVue />
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue';


export default {
  name: 'App',
  components: {
    HomePageVue: HomePage,
  },
};
</script>


