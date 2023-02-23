<script setup>
import { provide } from "vue";
import Cart from "./components/Cart.vue";
import Header from "./components/Header.vue";
import Products from "./components/Products.vue";

import { useFilters } from "./composables/useFilters";

provide("filters", useFilters());
</script>

<template>
  <Header />
  <Cart />
  <Products />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
