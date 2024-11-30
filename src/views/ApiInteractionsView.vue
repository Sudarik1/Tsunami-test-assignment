<template>
  <div class="content">
    <h1 class="header">{{ isEdit ? 'Изменить контакт' : 'Новый контакт' }}</h1>
    <form class="form" @submit.prevent="handleSubmit">
      <label class="form__label">Имя <span class="form--asterisk-blue">*</span></label>
      <input 
      class="form__input" 
      v-model="contact.name" 
      placeholder="Иванов Иван Иванович" 
      required type="text" 
      pattern="^[a-zA-Zа-яА-ЯёЁ\s'-]+$"
      />
      <label class="form__label">Email <span class="form--asterisk-blue">*</span></label>
      <input class="form__input" 
      v-model="contact.email" 
      placeholder="example@mail.com" 
      required type="email" 
      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
      />
      <label class="form__label">Телефон <span class="form--asterisk-blue">*</span></label>
      <input class="form__input" 
      v-model="contact.phone" 
      placeholder="+7 999 999-99-99" 
      required type="tel"
      pattern="^\+?[0-9\s\-\(\)]{7,17}$"
      />
      <button class="form__btn" type="submit">{{ isEdit ? 'ИЗМЕНИТЬ КОНТАКТ' : 'ДОБАВИТЬ КОНТАКТ' }}</button>
    </form>
  </div>
</template>
  
<script setup>
import axios from 'axios';

import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGlobalState } from '../composables/useGlobalState';

const route = useRoute();
const router = useRouter();
const { globalState } = useGlobalState();

const isEdit = route.params.id !== undefined || route.path === '/edit/';
const contact = ref({ name: '', phone: '', email: '' });

onMounted(() => {
  if (isEdit) {
    const existingContact = globalState.value.find((c) => c.id === Number(route.params.id));
    if (existingContact) {
      contact.value = { ...existingContact };
    }
  }
});

const handleSubmit = async () => {
  if (isEdit) {
    const index = globalState.value.findIndex((c) => c.id === Number(route.params.id));
    if (index !== -1) {
      globalState.value[index] = { ...contact.value };
    }
  } else {
    const newContact = { ...contact.value, id: Date.now() };
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);
    globalState.value.push(response.data);
  }
  router.push('/');
};
</script>

<style scoped>
.content{  
  display: flex;
  flex-direction: column;

  width: 40%;
  margin: 10% 25%;

  color: #2e2e41;
}

.header{
  font-size: 2.25em;
  font-weight: 900;
}

.form{
  display: flex;
  flex-direction: column;
}

.form__label{
  font-weight: 600;

  margin: 15px 0 5px 0;
}

.form--asterisk-blue{
  color: #6d6dff;
}

.form__input{
  border: 1px solid  #b6b6c1;
  border-radius: 10px;

  padding: 15px;
}

.form__btn{
  align-self: start;

  font-size: 1em;
  font-weight: 600;
  letter-spacing: 1.5px;
  
  margin-top: 20px;
  
  padding: 20px;
  
  border-radius: 50px;

  color: whitesmoke;
  background-color: #6d6dff;
}
</style>

  