<template>
  <div class="d-flex flex-column align-items-center mt-5">
    <h1>Zadzwonimy do Ciebie w ciągu kilku sekund!</h1>
    <div class="mt-4 fs-6">
      <label for="form-number"> Wprowadź numer </label>
      <input
        v-model="phoneNumber"
        class="form-control login-input"
        @input="phoneNumber = cleanPhoneNumber($event.target.value)"
      />
    </div>
    <button class="btn main-button mt-4 mb-5 call-us-button" @click="call()">
      Zadzwoń teraz
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { defaultPost } from '../services/api.service';
import { cleanPhoneNumber } from '../utils/phone.utils';

const phoneNumber = ref('');
const router = useRouter();

const call = async (): Promise<void> => {
  let callData = await defaultPost('call', {
    number: phoneNumber.value,
  });

  router.push({ name: 'ringing', params: { callsId: callData.id } });
};
</script>
<style scoped></style>
