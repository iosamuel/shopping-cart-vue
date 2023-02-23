<script setup>
import { inject } from "vue";

const { filters } = inject("filters");
</script>

<template>
  <section class="filters">
    <div>
      <label for="minprice">Precio a partir de:</label>
      <input
        type="range"
        id="minprice"
        min="0"
        max="1000"
        v-model="filters.minPrice"
      />
      <span>${{ filters.minPrice }}</span>
    </div>

    <div>
      <label for="categoryfilterid">Categoría</label>
      <select id="categoryfilterid" v-model="filters.category">
        <option value="all">Todas</option>
        <option value="laptops">Portátiles</option>
        <option value="smartphones">Celulares</option>
      </select>
    </div>
  </section>
</template>

<style>
.filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 700;
}

.filters > div {
  display: flex;
  gap: 1rem;
}
</style>
