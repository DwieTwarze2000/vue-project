<template>
  <div>
    <div class="header clearfix">Zadzwonimy do Ciebie w ciągu 26 sekund.</div>
    <label class="form-label clearfix" for="form-number">
      Wprowadź numer
    </label>
    <input
      v-model="phoneNumber"
      class="form-number clearfix"
      id="form-number"
    />
    <div class="call-button" @click="call()">Zadzwoń teraz</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const phoneNumber = ref('');
const router = useRouter();

const call = async (): Promise<void> => {
  let responseStream = await fetch('http://localhost:3000/call/', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ number: phoneNumber.value }),
  });
  let response = await responseStream.json();

  router.push({ name: 'ringing', params: { callsId: response.id } });
};
</script>
