<template>
  <button class="small info" @click="$emit('filterByCity', city)">⚙️</button>
</template>

<script setup lang="ts">
defineProps({
  city: String,
});

defineEmits(['filterByCity']);
</script>

<style scoped>
button {
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 14px;
}
</style>
