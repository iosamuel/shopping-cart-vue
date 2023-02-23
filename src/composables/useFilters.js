import { products } from "../mocks/products.json";

import { computed, reactive } from "vue";

export function useFilters() {
  const filters = reactive({
    category: "all",
    minPrice: 250,
  });

  const filteredProducts = computed(() => {
    return products.filter((product) => {
      return (
        product.price >= filters.minPrice &&
        (filters.category === "all" || product.category === filters.category)
      );
    });
  });

  return { filters, filteredProducts };
}
