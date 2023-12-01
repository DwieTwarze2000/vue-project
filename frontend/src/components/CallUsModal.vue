<template>
  <div>
    <button
      class="btn main-button mt-3 mb-5 call-us-button"
      @click="openCallUsModal()"
    >
      {{ $t('home.callUs') }}
    </button>
    <Teleport to="body" v-if="isOpen">
      <div class="call-us-modal">
        <div class="call-us-modal-content">
          <div class="modal-header">
            <img
              src="../assets/x-symbol_white.svg"
              class="delete"
              @click="closeModal()"
              v-if="canCloseModal"
            />
          </div>
          <div class="modal-body pb-4">
            <div
              v-if="status === CallStatus.START"
              class="d-flex flex-column align-items-center mt-5"
            >
              <h1>{{ $t('callUsModal.start.callUs') }}</h1>
              <div class="mt-4 fs-6">
                <label for="form-number">
                  {{ $t('callUsModal.start.phoneNumber') }}
                </label>
                <input
                  v-model="phoneNumber"
                  class="form-control login-input text-center fs-4"
                  @input="phoneNumber = cleanPhoneNumber($event.target.value)"
                />
              </div>
              <button
                class="btn main-button mt-4 mb-5 call-us-button"
                @click="call()"
              >
                {{ $t('callUsModal.start.call') }}
              </button>
            </div>
            <app-ringing v-if="status === CallStatus.RINGING" />
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { defaultPost } from '../services/api.service';
import { Theme } from '../types/theme.type';
import { CallStatus } from '../types/call.type';
import { cleanPhoneNumber } from '../utils/phone.utils';

import { useStore } from 'vuex';

const isOpen = ref(false);
const store = useStore();
const phoneNumber = ref('');
const router = useRouter();
const status = ref(CallStatus.START);
const canCloseModal = ref(true);

const call = async (): Promise<void> => {
  await defaultPost('call', {
    number: phoneNumber.value,
  });
};

watchEffect((): void => {
  status.value = store.state.phoneCallStatus;

  if (
    status.value === CallStatus.CONNECTED ||
    status.value === CallStatus.RINGING
  ) {
    canCloseModal.value = false;
  } else {
    canCloseModal.value = true;
  }
});

const openCallUsModal = (): void => {
  isOpen.value = true;
};

const closeModal = (): void => {
  isOpen.value = false;
  store.commit('setPhoneCallStatus', CallStatus.START);
  status.value = CallStatus.START;
};
</script>
<style scoped>
.white {
  color: white;
}
.call-us-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

.call-us-modal-content {
  position: flex;
  width: 60%;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 4rem auto;
  background: var(--modal-bg-color);
}

.modal-header {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  border-bottom: 1px solid var(--modal-border-color);
}

.modal-header img {
  width: 15px;
  cursor: pointer;
}
</style>
