import { ref } from 'vue';
import { getEstates } from '../api/estateApi';
import { type Estate } from '@/types';

export default function useEstates() {
  const estates = ref<Estate | []>([]);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);

  const filters = ref<{ city?: string; search?: string }>({});

  const loadEstates = async (params = {}) => {
    loading.value = true;
    try {
      filters.value = params;
      estates.value = await getEstates(params);
      error.value = null;
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

  const clearFilters = async () => {
    await loadEstates({});
  };

  return {
    estates,
    error,
    loading,
    loadEstates,
    clearFilters,
    filters,
  };
}
