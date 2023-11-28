<template>
  <div class="register-page">
    <h1 class="text-center title">Zarejestruj się!</h1>

    <div class="d-flex flex-column align-items-center mt-4">
      <div class="mb-3">
        <label>Login:</label>
        <input type="text" class="form-control login-input" />
      </div>
      <div class="mb-3">
        <label>Hasło: </label>
        <div class="password-input-container">
          <input type="password" class="form-control login-input" />
        </div>
      </div>
      <div class="mb-3">
        <label>Powtórz hasło: </label>
        <div class="password-input-container">
          <input type="password" class="form-control login-input" />
        </div>
      </div>
      <div class="mb-4">
        <label>Numer telefonu: </label>
        <input type="text" class="form-control login-input" />
      </div>
      <button class="btn main-button active">Zarejestruj się</button>
      <div class="mt-4">
        Masz już konto?
        <span class="fw-bold register" @click="$router.push({ name: 'login' })">
          Zaloguj się!</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
  height: 100vh;
  margin-top: -10%;
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
