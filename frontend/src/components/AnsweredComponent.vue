<template>
  <div class="d-flex flex-column text-center align-items-center mt-5 mb-5">
    <div class="text fs-4">{{ $t('callUsModal.answered.callEnded') }}</div>
    <div class="text mt-4 fs-4">
      {{ $t('callUsModal.answered.greetings') }}
    </div>
    <div class="text mt-4 fs-4">
      {{ $t('callUsModal.answered.callTime') }}
      <span class="call-duration fs-3">{{ formatSeconds(callDuration) }}</span>
    </div>
    <button class="mt-4 btn main-button active" @click="callAgain()">
      {{ $t('callUsModal.start.callAgain') }}
    </button>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { defaultPost } from '../services/api.service';
import { CallStatus, phoneCallData } from '../types/call.type';
import {
  deleteCallDuration,
  getCallDuration,
  getPhoneNumber,
  formatSeconds,
} from '../utils/phone.utils';

const store = useStore();

const callDuration = ref(0);

const callAgain = (): void => {
  deleteCallDuration();
  store.commit('setPhoneCallStatus', CallStatus.START);
};

onMounted(async (): Promise<void> => {
  callDuration.value = getCallDuration();

  const phoneCallData: phoneCallData = {
    phoneNumber: getPhoneNumber(),
    callDuration: getCallDuration(),
    status: CallStatus.ANSWERED,
  };

  await defaultPost('phoneCall/add', phoneCallData, true);
});
</script>
<style scoped>
.call-duration {
  color: var(--light-red);
  font-weight: bold;
}
</style>
