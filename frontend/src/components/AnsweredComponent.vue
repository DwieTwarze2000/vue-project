<template>
  <div class="d-flex flex-column text-center align-items-center mt-5 mb-5">
    <div class="text fs-4">{{ $t('callUsModal.answered.callEnded') }}</div>
    <div class="text mt-4 fs-4">
      {{ $t('callUsModal.answered.greetings') }}
    </div>
    <div class="text mt-4 fs-4">
      {{ $t('callUsModal.answered.callTime') }}
      <span class="call-duration fs-3">{{ callDuration }}</span>
    </div>
    <button class="mt-4 btn main-button active" @click="callAgain()">
      {{ $t('callUsModal.start.callAgain') }}
    </button>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { CallStatus } from '../types/call.type';
import { deleteCallDuration, getCallDuration } from '../utils/phone.utils';

const store = useStore();

const callDuration = ref('00:00:00');

const callAgain = (): void => {
  deleteCallDuration();
  store.commit('setPhoneCallStatus', CallStatus.START);
};

onMounted((): void => {
  callDuration.value = getCallDuration();
});
</script>
<style scoped>
.call-duration {
  color: var(--light-red);
  font-weight: bold;
}
</style>
