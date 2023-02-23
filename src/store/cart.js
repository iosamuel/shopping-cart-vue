import { ref } from "vue";

export const cartStore = ref(
  JSON.parse(window.localStorage.getItem("cart")) || []
);

export const CART_ACTION_TYPES = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
};

// update localStorage with state for cart
export const updateLocalStorage = (state) => {
  window.localStorage.setItem("cart", JSON.stringify(state));
};

const UPDATE_STATE_BY_ACTION = {
  [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
    console.log("action", action);
    const { id } = action.payload;
    const productInCartIndex = state.findIndex((item) => item.id === id);

    if (productInCartIndex >= 0) {
      cartStore.value[productInCartIndex].quantity += 1;
      updateLocalStorage(cartStore.value);
      return cartStore.value;
    }

    cartStore.value.push({
      ...action.payload, // product
      quantity: 1,
    });

    updateLocalStorage(cartStore.value);
    return cartStore.value;
  },
  [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
    const { id } = action.payload;
    cartStore.value = state.filter((item) => item.id !== id);
    updateLocalStorage(cartStore.value);
    return cartStore.value;
  },
  [CART_ACTION_TYPES.CLEAR_CART]: () => {
    cartStore.value = [];
    updateLocalStorage([]);
    return [];
  },
};

export function dispatch(action) {
  UPDATE_STATE_BY_ACTION[action.type](cartStore.value, action);
}
