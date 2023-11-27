<template>
  <div class="login-page">
    <h1 class="text-center title">Zaloguj się do systemu!</h1>

    <div class="d-flex flex-column align-items-center mt-4">
      <div class="mb-3">
        <label>Login:</label>
        <input type="text" class="form-control login-input" />
      </div>
      <div class="mb-4">
        <label>Hasło: </label>
        <div class="password-input-container">
          <input
            :type="passwordVisible ? 'text' : 'password'"
            class="form-control login-input"
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
      </div>
      <button class="btn main-button active">Zaloguj się</button>
    </div>
    <div class="mt-4">
      Nie masz jeszcze konta?
      <span
        class="fw-bold register"
        @click="$router.push({ name: 'register' })"
      >
        Zarejestruj się za darmo!</span
      >
    </div>
    <div class="without-account mt-3" @click="$router.push({ name: 'start' })">
      Kontynuuj bez konta
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const passwordVisible = ref(false);

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
  height: 100vh;
  margin-top: -10%;
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
