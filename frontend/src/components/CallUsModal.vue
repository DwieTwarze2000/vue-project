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
              <div class="mt-4 fs-6 position-relative">
                <label for="form-number">
                  {{ $t('callUsModal.start.phoneNumber') }}
                </label>
                <input
                  v-model="phoneNumber"
                  class="form-control login-input text-center fs-4"
                  @input="phoneNumber = cleanPhoneNumber($event.target.value)"
                  :class="{ 'bottom-radius-0': showNumbers }"
                />
                <img
                  v-if="isLogged"
                  src="../assets/arrow-down.svg"
                  alt="arrow"
                  class="arrow"
                  :class="{ rotated: showNumbers }"
                  @click="showNumbers = !showNumbers"
                />
              </div>
              <div v-if="isLogged && showNumbers" class="animate-numbers">
                <div
                  class="numbers d-flex flex-column gap-2 align-items-center"
                >
                  <div
                    class="number py-2 with-separators"
                    @click="selectPhoneNumber(mainPhoneNumber)"
                  >
                    {{ $t('callUsModal.start.main') }} - {{ mainPhoneNumber }}
                  </div>
                  <div
                    class="number py-2 with-separators"
                    v-for="(phoneData, idx) in phoneNumbers"
                    :key="idx"
                    @click="selectPhoneNumber(phoneData.number)"
                  >
                    {{ `${phoneData.name} - ${phoneData.number}` }}
                  </div>
                </div>
              </div>
              <button
                class="btn main-button mt-4 mb-5 call-us-button"
                @click="call()"
              >
                {{ $t('callUsModal.start.call') }}
              </button>
            </div>
            <app-ringing v-else-if="status === CallStatus.RINGING" />
            <app-connected v-else-if="status === CallStatus.CONNECTED" />
            <app-failed v-else-if="status === CallStatus.FAILED" />
            <app-no-answer v-else-if="status === CallStatus.NO_ANSWER" />
            <app-busy v-else-if="status === CallStatus.BUSY" />
            <app-answered v-else-if="status === CallStatus.ANSWERED" />
            <app-bad-number v-if="status === CallStatus.BAD_NUMBER" />
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
import {
  cleanPhoneNumber,
  deleteCallDuration,
  savePhoneNumber,
} from '../utils/phone.utils';

import { useStore } from 'vuex';
import { getUser } from '../utils/auth.utils';
import { User } from '../types/auth.type';

const isOpen = ref(false);
const store = useStore();
const router = useRouter();
const phoneNumber = ref('');
const status = ref(CallStatus.START);
const canCloseModal = ref(true);
const isLogged = ref(false);
const showNumbers = ref(false);

const mainPhoneNumber = ref('');
const phoneNumbers = ref([]);

const call = async (): Promise<void> => {
  savePhoneNumber(phoneNumber.value);
  store.commit('setPhoneCallStatus', CallStatus.RINGING);
  await defaultPost('call', {
    number: phoneNumber.value,
  });
};

watchEffect((): void => {
  status.value = store.state.phoneCallStatus;
  console.log(status.value, 'stat val');
  if (
    status.value === CallStatus.CONNECTED ||
    status.value === CallStatus.RINGING
  ) {
    canCloseModal.value = false;
  } else {
    canCloseModal.value = true;
  }
});
const fetchUser = async (): Promise<void> => {
  const userData: User = await getUser();
  if (userData) {
    mainPhoneNumber.value = userData.mainPhoneNumber;
    phoneNumbers.value = userData.phoneNumbers;
  }
};

watchEffect((): void => {
  const token = store.state.token;
  isLogged.value = !!token;
  if (isLogged.value) {
    fetchUser();
  }
});

const openCallUsModal = (): void => {
  isOpen.value = true;
};

const closeModal = (): void => {
  isOpen.value = false;
  store.commit('setPhoneCallStatus', CallStatus.START);
  status.value = CallStatus.START;
  deleteCallDuration();
};

const selectPhoneNumber = (number: string): void => {
  phoneNumber.value = number;
  showNumbers.value = false;
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
  min-height: 400px;
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

@media (max-width: 768px) {
  .call-us-modal-content {
    width: 90%;
  }
}

.arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  cursor: pointer;
  height: 25px;
  transition: transform 0.5s ease;
}

.rotated {
  transform: rotate(180deg);
  transition: transform 0.5s ease;
}

.numbers {
  background-color: white;
  color: black;
  width: 400px;
  border-radius: 0 0 10px 10px;
}

.bottom-radius-0 {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: 1px solid black;
}

.number {
  cursor: pointer;
}
</style>
