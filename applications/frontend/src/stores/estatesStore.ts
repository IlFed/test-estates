import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getEstates } from '../api';

export const useEstateStore = defineStore('estates', () => {
  const properties = ref([]);
  const error = ref<string | null>(null);
  const loading = ref(false);

  const fetchProperties = async () => {
    loading.value = true;
    try {
      properties.value = await getEstates();
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = 'An unknown error occurred';
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    properties,
    error,
    loading,
    fetchProperties,
  };
});
