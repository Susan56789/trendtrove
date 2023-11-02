<template>
  <div id="app">
    <md-app>
      <md-app-toolbar class="md-primary">
        <h2 class="md-title">E-Commerce Store</h2>
      </md-app-toolbar>
      <md-app-content>
        <md-list>
          <md-list-item v-for="product in products" :key="product.id">
            <md-card>
              <md-card-header>
                <md-card-header-text>
                  <div class="md-title">{{ product.name }}</div>
                  <div class="md-subhead">{{ product.price }}</div>
                </md-card-header-text>
              </md-card-header>
              <md-card-content>
                {{ product.description }}
              </md-card-content>
              <md-card-actions>
                <md-button class="md-raised md-primary" @click="addToCart(product)">
                  Add to Cart
                </md-button>
              </md-card-actions>
            </md-card>
          </md-list-item>
        </md-list>
      </md-app-content>
      <md-app-drawer>
        <md-list>
          <md-list-item v-for="item in cart" :key="item.id">
            {{ item.name }} - {{ item.price }}
          </md-list-item>
        </md-list>
      </md-app-drawer>
    </md-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        { id: 1, name: 'Product 1', price: '$10', description: 'Description for Product 1' },
        { id: 2, name: 'Product 2', price: '$20', description: 'Description for Product 2' },
        { id: 3, name: 'Product 3', price: '$30', description: 'Description for Product 3' }
      ],
      cart: []
    };
  },
  methods: {
    addToCart(product) {
      this.cart.push(product);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
