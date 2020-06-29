<template>
  <div id="product-one">
    this is product one
    <ul>
      <li v-for="product in products" v-bind:key="product">
        name:
        <span class="name">{{product.name}}</span>
        <br />price:
        <span class="price">{{product.price}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.state.products;
    }
  }
};
</script>