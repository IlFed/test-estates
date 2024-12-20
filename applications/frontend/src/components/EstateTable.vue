<template>
  <table>
    <thead>
      <tr>
        <th v-for="(column, index) in header" :key="index">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(estate, index) in estates"
        :key="index"
        :class="{ 'highlight-index': index % 2 }"
      >
        <td v-for="column in header" :key="column.key">
          <span v-if="column.key === 'city'" class="row">
            {{ estate[column.key] }}
            <CityFilterButton
              :city="estate.city"
              @filterByCity="$emit('filterByCity', $event)"
            />
          </span>
          <span v-else-if="column.key === 'address'">
            <span
              v-html="highlightText(estate[column.key], searchQuery)"
            ></span>
          </span>
          <span v-else>
            {{ estate[column.key] }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import CityFilterButton from '@/components/CityFilterButton.vue';
import { type Estate, type Header } from '@/types';

defineProps<{
  header: Header;
  estates: Estate[];
  searchQuery: string;
}>();

defineEmits(['filterByCity']);

const highlightText = (text: string, search: string) => {
  if (!text || !search) return text;
  const regex = new RegExp(`(${search})`, 'gi');
  return text.replace(
    regex,
    '<span style="background-color: yellow">$1</span>'
  );
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px 12px;
  border: 1px solid #ccc;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

.highlight-index {
  background-color: rgb(213, 222, 243);
}
.row {
  display: flex;
  justify-content: space-between;
}
</style>
