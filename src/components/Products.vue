<script setup>
import { computed, inject } from "vue";
import { useCartStore } from "../store/cart";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons";

const cartStore = useCartStore();

const { filteredProducts } = inject("filters");

const productsMapped = computed(() => {
  return filteredProducts.value.map((product) => ({
    ...product,
    inCart: checkProductInCart(product),
  }));
});

const checkProductInCart = (product) => {
  return cartStore.cart.some((item) => item.id === product.id);
};
</script>

<template>
  <main class="products">
    <ul>
      <li v-for="product in productsMapped.slice(0, 10)" :key="product.id">
        <img :src="product.thumbnail" :alt="product.title" />
        <div>
          <strong>{{ product.title }}</strong> - ${{ product.price }}
        </div>
        <div>
          <button
            :style="{
              backgroundColor: product.inCart ? 'red' : '#09f',
            }"
            @click="
              () => {
                product.inCart
                  ? cartStore.removeFromCart(product)
                  : cartStore.addToCart(product);
              }
            "
          >
            <RemoveFromCartIcon v-if="product.inCart" />
            <AddToCartIcon v-else />
          </button>
        </div>
      </li>
    </ul>
  </main>
</template>

<style>
.products {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.products ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.products li {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background: #111;
  color: #fff;
  padding: 1rem;
}

.products h3 {
  margin: 0;
}

.products span {
  font-size: 1rem;
  opacity: 0.9;
}

.products img {
  border-radius: 4px;
  width: 100%;
  aspect-ratio: 16/9;
  display: block;
  object-fit: cover;
  background: #fff;
}
</style>
