<script setup lang="ts">
import { onMounted, ref, type Ref, computed } from 'vue';
import { useEstates } from '@/composables';
import FilterPanel from '@/components/FilterPanel.vue';
import EstateTable from '@/components/EstateTable.vue';
import { type Estate, type EstateQuery, type Header } from '@/types';

const { error, estates, loadEstates, loading } = useEstates() as {
  error: Ref<string | null>;
  estates: Ref<Estate[]>;
  loadEstates: (query: EstateQuery) => Promise<void>;
  loading: Ref<boolean>;
};

const header: Header = [
  { key: 'address', label: 'Адрес' },
  { key: 'city', label: 'Город' },
  { key: 'type', label: 'Тип' },
  { key: 'price', label: 'Цена' },
];

const searchQuery = ref('');
const cityFilter = ref<string | null>(null);

const query = computed(() => {
  return {
    search: searchQuery.value,
    city: cityFilter.value,
  };
});

const loadFilteredEstates = async () => {
  await loadEstates(query.value);
};

const filterByCity = async (city: string) => {
  cityFilter.value = city;
  await loadFilteredEstates();
};

const clearFilters = async () => {
  searchQuery.value = '';
  cityFilter.value = null;
  await loadFilteredEstates();
};

onMounted(async () => {
  await loadFilteredEstates();
  if (error.value) {
    console.error('Ошибка загрузки объектов:', error.value);
  }
});
</script>

<template>
  <div class="container">
    <div class="panel">
      <h1>Список объектов</h1>
      <FilterPanel
        class="filter-panel"
        :searchQuery="searchQuery"
        @update:searchQuery="
          (value) => {
            searchQuery = value;
            loadFilteredEstates();
          }
        "
        @clearFilters="clearFilters"
      />
    </div>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="loading">Загрузка...</div>
      <EstateTable
        :header="header"
        :estates="estates"
        :searchQuery="searchQuery"
        @filterByCity="filterByCity"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 0 2rem;
}

.panel,
.filter-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
