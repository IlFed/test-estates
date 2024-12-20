<script setup lang="ts">
import { onMounted, ref, type Ref, computed } from 'vue';
import { useEstates } from '@/composables';
import { type Estate } from '@/types';

interface EstateQuery {
  search: string;
  type?: string;
}

const { error, estates, loadEstates, loading } = useEstates() as {
  error: Ref<string | null>;
  estates: Ref<Estate[]>;
  loadEstates: (query: EstateQuery) => Promise<void>;
  loading: Ref<boolean>;
};

const headers = [
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

const searchByAddress = async () => {
  await loadFilteredEstates();
};

const highlightText = (text: string, search: string) => {
  if (!text || !search) return text;
  const regex = new RegExp(`(${search})`, 'gi');

  return text.replace(
    regex,
    '<span style="background-color: yellow">$1</span>'
  );
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
      <div class="table_management">
        <input
          type="text"
          placeholder="Поиск по адресу"
          v-model="searchQuery"
          @input="searchByAddress"
        />
        <button class="btn primary small" @click="clearFilters">
          Сбросить все фильтры
        </button>
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="loading">Загрузка...</div>
      <table v-else>
        <thead>
          <tr>
            <th v-for="(header, index) in headers" :key="index">
              {{ header.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(estate, index) in estates"
            :key="index"
            :class="{ 'highlight-index': index % 2 }"
          >
            <td v-for="header in headers" :key="header.key">
              <span v-if="header.key === 'city'" class="row">
                {{ estate[header.key] }}
                <button class="small info" @click="filterByCity(estate.city)">
                  ⚙️
                </button>
              </span>
              <span v-else-if="header.key === 'address'">
                <span
                  v-html="highlightText(estate[header.key], searchQuery)"
                ></span>
              </span>
              <span v-else>
                {{ estate[header.key as keyof Estate] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

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
.btn {
  flex-shrink: 0;
  margin-left: 1rem;
}
.container {
  padding: 0 2rem;
}
.panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table_management {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.highlight-index {
  background-color: rgb(213, 222, 243);
}

.highlight {
  background-color: yellow !important;
  font-weight: bold !important;
  color: red !important;
}
</style>
