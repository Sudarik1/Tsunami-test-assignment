import { ref } from 'vue';
import { getContactsData } from '../utils/getContactsData';

const globalState = ref([]);
const isInitialized = ref(false);

export const useGlobalState = () => {
  const initializeState = async () => {
    if (!isInitialized.value) {
      globalState.value = await getContactsData();
      isInitialized.value = true;
    }
  };

  return { globalState, initializeState };
};
