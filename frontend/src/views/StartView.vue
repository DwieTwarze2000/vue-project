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
import { defaultPost } from '../services/api.service';

const phoneNumber = ref('');
const router = useRouter();

const call = async (): Promise<void> => {
  let callData = await defaultPost('call/', {
    number: phoneNumber.value,
  });

  router.push({ name: 'ringing', params: { callsId: callData.id } });
};
</script>
