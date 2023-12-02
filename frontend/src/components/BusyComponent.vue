<template>
  <div class="d-flex flex-column align-items-center mt-5 mb-5">
    <div class="text fs-4">{{ $t('callUsModal.busy') }}</div>
    <button class="mt-4 btn main-button active" @click="callAgain()">
      {{ $t('callUsModal.start.callAgain') }}
    </button>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { defaultPost } from '../services/api.service';
import { CallStatus, PhoneCallData } from '../types/call.type';
import { getPhoneNumber } from '../utils/phone.utils';

const store = useStore();

const callAgain = (): void => {
  store.commit('setPhoneCallStatus', CallStatus.START);
};

onMounted(async (): Promise<void> => {
  const phoneCallData: PhoneCallData = {
    phoneNumber: getPhoneNumber(),
    status: CallStatus.BUSY,
  };

  await defaultPost('phoneCall/add', phoneCallData, true);
});
</script>
