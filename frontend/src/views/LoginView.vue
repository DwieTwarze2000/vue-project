<template>
  <div class="login-page mt-5">
    <h1 class="text-center title">{{ $t('login.title') }}</h1>

    <div class="d-flex flex-column align-items-center mt-4">
      <div class="mb-3">
        <label>{{ $t('login.login') }}:</label>
        <input type="text" class="form-control login-input" v-model="login" />
        <div v-if="loginError" class="error fs-6">{{ loginError }}</div>
      </div>
      <div class="mb-4">
        <label>{{ $t('login.password') }}: </label>
        <div class="password-input-container">
          <input
            :type="passwordVisible ? 'text' : 'password'"
            class="form-control login-input"
            v-model="password"
          />
          <img
            v-if="passwordVisible"
            src="../assets/show-password.png"
            alt="eye"
            class="password-toggle"
            @click="togglePasswordVisibility()"
          />
          <img
            v-else
            src="../assets/hide-password.png"
            alt="eye"
            class="password-toggle"
            @click="togglePasswordVisibility()"
          />
        </div>
        <div v-if="passwordError" class="error fs-6">{{ passwordError }}</div>
      </div>
      <button class="btn main-button active" @click="loginToSystem()">
        {{ $t('login.loginButton') }}
      </button>
      <div v-if="authError" class="error fs-6 mt-3">{{ authError }}</div>
    </div>
    <div class="mt-4">
      {{ $t('login.doYouHaveAccount') }}
      <span
        class="fw-bold register"
        @click="$router.push({ name: 'register' })"
      >
        {{ $t('login.registerNow') }}</span
      >
    </div>
    <div class="without-account mt-3" @click="$router.push({ name: 'start' })">
      {{ $t('login.withoutAccount') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { defaultPost } from '../services/api.service';
import { LoginData, LoginResponse } from '../types/auth.type';
import { saveToken } from '../utils/auth.utils';
import { i18n } from '../main';

const passwordVisible = ref(false);

const login = ref('');
const password = ref('');

const loginError = ref('');
const passwordError = ref('');
const authError = ref('');

const router = useRouter();

const t = (key: string): string => {
  return i18n.global.t(key).toString();
};

const loginToSystem = async (): Promise<void> => {
  loginError.value = '';
  passwordError.value = '';
  authError.value = '';

  if (!login.value) {
    loginError.value = t('errors.loginRequired');
  }

  if (!password.value) {
    passwordError.value = t('errors.passwordRequired');
  }

  if (loginError.value || passwordError.value) {
    return;
  }

  const loginData: LoginData = {
    login: login.value,
    password: password.value,
  };

  let loginResponse: LoginResponse = await defaultPost('auth/login', loginData);

  if (loginResponse.error) {
    authError.value = t('errors.authError');
    return;
  }

  if (loginResponse) {
    saveToken(loginResponse.token);
    router.push({ name: 'start' });
  }
};

const togglePasswordVisibility = (): void => {
  passwordVisible.value = !passwordVisible.value;
};
</script>

<style scoped>
.title,
label {
  color: white;
}
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login-input {
  width: 400px;
}

@media (max-width: 420px) {
  .login-input {
    width: 100%;
  }
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
