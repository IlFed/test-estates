<template>
  <div class="filter-panel">
    <input
      type="text"
      placeholder="Поиск по адресу"
      v-model="localSearchQuery"
      @input="updateSearchQuery"
    />
    <button class="btn primary small" @click="$emit('clearFilters')">
      Сбросить все фильтры
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  searchQuery: String,
});

const emit = defineEmits(['update:searchQuery', 'clearFilters']);

const localSearchQuery = ref(props.searchQuery);

watch(
  () => props.searchQuery,
  (newValue) => {
    localSearchQuery.value = newValue;
  }
);

const updateSearchQuery = () => {
  emit('update:searchQuery', localSearchQuery.value);
};
</script>

<style scoped>
.filter-panel {
  display: flex;
  gap: 10px;
}
.btn {
  flex-shrink: 0;
}
</style>
