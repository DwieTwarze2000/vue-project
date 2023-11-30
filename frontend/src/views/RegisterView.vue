<template>
  <div class="register-page mt-5">
    <h1 class="text-center title">{{ $t('register.title') }}</h1>

    <div class="d-flex flex-column align-items-center mt-4">
      <div class="mb-3">
        <label>{{ $t('register.login') }}:</label>
        <input type="text" class="form-control login-input" v-model="login" />
        <div v-if="loginError" class="error fs-6">{{ loginError }}</div>
      </div>
      <div class="mb-3">
        <label>{{ $t('register.password') }}: </label>
        <div class="password-input-container">
          <input
            type="password"
            class="form-control login-input"
            v-model="password"
          />
          <div v-if="passwordError" class="error fs-6">{{ passwordError }}</div>
        </div>
      </div>
      <div class="mb-3">
        <label>{{ $t('register.repeatPassword') }}: </label>
        <div class="password-input-container">
          <input
            type="password"
            class="form-control login-input"
            v-model="passwordRepeat"
          />
          <div v-if="passwordRepeatError" class="error fs-6">
            {{ passwordRepeatError }}
          </div>
        </div>
      </div>
      <div class="mb-4">
        <label>{{ $t('register.phoneNumber') }}: </label>
        <input
          type="text"
          class="form-control login-input"
          v-model="phoneNumber"
          @input="phoneNumber = cleanPhoneNumber($event.target.value)"
        />
        <div v-if="phoneNumberError" class="error fs-6">
          {{ phoneNumberError }}
        </div>
      </div>
      <button class="btn main-button active" @click="register()">
        {{ $t('register.register') }}
      </button>
      <div class="mt-4">
        {{ $t('register.doYouHaveAccount') }}
        <span class="fw-bold register" @click="$router.push({ name: 'login' })">
          {{ $t('register.loginNow') }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';

import { defaultPost } from '../services/api.service';
import { cleanPhoneNumber } from '../utils/phone.utils';
import {
  RegisterData,
  RegisterError,
  RegisterResponse,
  RegisterResponseFail,
} from '../types/auth.type';

import { i18n } from '../main';

const instance = getCurrentInstance();

const login = ref('');
const password = ref('');
const passwordRepeat = ref('');
const phoneNumber = ref('');

const loginError = ref('');
const passwordError = ref('');
const passwordRepeatError = ref('');
const phoneNumberError = ref('');

const router = useRouter();

const t = (key: string): string => {
  return i18n.global.t(key).toString();
};

const register = async (): Promise<void> => {
  loginError.value = '';
  passwordError.value = '';
  passwordRepeatError.value = '';
  phoneNumberError.value = '';

  if (password.value !== passwordRepeat.value) {
    passwordRepeatError.value = t('errors.passwordsNotMatch');
    return;
  }

  const registerData: RegisterData = {
    login: login.value,
    password: password.value,
    mainPhoneNumber: phoneNumber.value,
  };

  let registerResponse: RegisterResponse | RegisterResponseFail =
    await defaultPost('auth/register', registerData);

  if (registerResponse?.error) {
    if (registerResponse.error.includes(RegisterError.LOGIN_ALREADY_EXISTS)) {
      loginError.value = t('errors.loginExists');
    }
    if (registerResponse.error.includes(RegisterError.LOGIN_REQUIRED)) {
      loginError.value = t('errors.loginRequired');
    }

    if (registerResponse.error.includes(RegisterError.PASSWORD_REQUIRED)) {
      passwordError.value = t('errors.passwordRequired');
    }
    if (registerResponse.error.includes(RegisterError.PHONE_REQUIRED)) {
      phoneNumberError.value = t('errors.phoneNumberRequired');
    }
    return;
  }

  if (registerResponse) {
    router.push({ name: 'login' });
  }
};
</script>

<style scoped>
.title,
label {
  color: white;
}
.register-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

label {
  font-size: 12px;
}

.password-input-container {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.without-account {
  font-size: 13px;
  cursor: pointer;
}

.register {
  cursor: pointer;
}
</style>
