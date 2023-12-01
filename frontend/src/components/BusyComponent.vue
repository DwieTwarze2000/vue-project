<template>
  <div class="d-flex flex-column align-items-center mt-5 mb-5">
    <div class="text fs-4">{{ $t('callUsModal.busy') }}</div>
    <button class="mt-4 btn main-button active" @click="callAgain()">
      {{ $t('callUsModal.start.callAgain') }}
    </button>
  </div>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';
import { CallStatus } from '../types/call.type';

const store = useStore();

const callAgain = (): void => {
  store.commit('setPhoneCallStatus', CallStatus.START);
};
</script>
