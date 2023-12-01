<template>
  <div class="d-flex flex-column text-center align-items-center mt-5 mb-5">
    <div class="text fs-4">Połączenie zostało zakończone!</div>
    <div class="text mt-4 fs-4">
      Dziękujemy za skorzystanie z naszych usług! Mamy szczerą nadzieję, że
      rozmowa spełniła Twoje oczekiwania!
    </div>
    <div class="text mt-4 fs-4">
      Czas twojej rozmowy to:
      <span class="call-duration fs-3">{{ callDuration }}</span>
    </div>
    <button class="mt-4 btn main-button active" @click="callAgain()">
      Zadzwoń ponownie
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { CallStatus } from '../types/call.type';
import { deleteCallDuration, getCallDuration } from '../utils/phone.utils';

const store = useStore();

const callDuration = ref(getCallDuration());

const callAgain = (): void => {
  deleteCallDuration();
  store.commit('setPhoneCallStatus', CallStatus.START);
};
</script>
<style scoped>
.call-duration {
  color: var(--light-red);
  font-weight: bold;
}
</style>
