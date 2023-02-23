import { ref } from "vue";
import { defineStore } from "pinia";

function updateLocalStorage(cart) {
  window.localStorage.setItem("cart", JSON.stringify(cart));
}

export const useCartStore = defineStore("cart", () => {
  const cart = ref(JSON.parse(window.localStorage.getItem("cart")) || []);

  function addToCart(product) {
    const productInCartIndex = cart.value.findIndex(
      (item) => item.id === product.id
    );

    if (productInCartIndex >= 0) {
      cart.value[productInCartIndex].quantity += 1;
    } else {
      cart.value.push({
        ...product,
        quantity: 1,
      });
    }
    updateLocalStorage(cart.value);
  }

  function removeFromCart(product) {
    cart.value = cart.value.filter((item) => item.id !== product.id);
    updateLocalStorage(cart.value);
  }

  function clearCart() {
    cart.value = [];
    updateLocalStorage([]);
  }

  return { cart, addToCart, removeFromCart, clearCart };
});
