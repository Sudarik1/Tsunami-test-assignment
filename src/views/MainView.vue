<template>
  <div class="content">
    <div class="header">
      <h1 class="header__h">Мои контакты</h1>
      <button class="header__add-btn" @click="addContactHandler">ДОБАВИТЬ +</button>
    </div>
    <table class="contacts-table" v-if="!isLoading">
      <thead>
        <tr>
          <th class="contacts-table__sort-btn" @click="toggleSortHandler">
            Имя
            <span>{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
          </th>
          <th>Email</th>
          <th>Телефон</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="contact in globalState"
          :key="contact.id"
          class="contact-row"
          @click="editContactHandler(contact.id)"
        >
          <td>{{ contact.name }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.phone }}</td>
        </tr>
      </tbody>
    </table>
    <p class="loading-message" v-else>Загрузка...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useGlobalState } from '../composables/useGlobalState';
import { useRouter } from 'vue-router';


const { globalState, initializeState } = useGlobalState();
const isLoading = ref(false);
const sortOrder = ref('asc');
const router = useRouter();


onMounted(async () => {
  isLoading.value = true;
  try {
    await initializeState();
    sortContacts(sortOrder.value);
  } finally {
    isLoading.value = false;
  }
});

const sortContacts = (order) => {
  globalState.value.sort((a, b) =>
    order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );
};

const toggleSortHandler = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  sortContacts(sortOrder.value);
};

const addContactHandler = () => {
  router.push('/add')
}

const editContactHandler = (id) => {
  router.push(`/edit/${id}`);
};
</script>

<style scoped>
.content {
  margin: 0 0 0 350px;
}

.header {
  display: flex;
  align-items: center;
  gap: 1em;
  
  margin-bottom: 20px;
}

.header__h {
  font-weight: 900;

  color: #2e2e41;
}

.header__add-btn{
  font-size: 0.75em;
  letter-spacing: 1.5px;
  font-weight: 600;

  padding: 1em 1.5em;

  border-radius: 50px;

  background-color: #ebebf6;
}

.header__add-btn:hover {
  cursor: pointer;
}

.contacts-table__sort-btn{
  cursor: pointer;
}

.contacts-table {
  width: 100%;
  
  margin-top: 20px;

  border-collapse: collapse;
}

.contacts-table th {
  font-weight: 100;

  padding: 10px 5px;

  text-align: left;
  
  color: #929292;
}

.contacts-table td {
  padding: 10px 5px;

  font-size: 1rem;

  border-bottom: 1px solid #f5f5f5;
}

.contacts-table .contacts-row:hover {
  background-color: #f9f9ff;

  cursor: pointer;
}

.loading-message {
  font-size: 1rem;
  
  text-align: center;

  color: #999;
}
</style>