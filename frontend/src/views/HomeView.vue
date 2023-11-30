<template>
  <div class="text-center">
    <div class="mt-5">
      <h1>{{ $t('home.welcome') }}</h1>
    </div>
    <div class="mt-4 fs-5 mx-auto description">
      {{ $t('home.welcomeDescription') }}
    </div>

    <div class="mt-4 fs-5">
      {{ $t('home.beFirst1') }}
      <span class="fs-3 number fw-bold">1</span> {{ $t('home.beFirst2') }}
    </div>
    <div>
      <button
        class="btn main-button mt-3 mb-5 call-us-button"
        @click="$router.push({ name: 'start' })"
      >
        {{ $t('home.callUs') }}
      </button>
    </div>
    <div v-if="!isLogged">
      <div class="mt-5">
        <h2>{{ $t('home.dontHaveAccount') }}</h2>
      </div>
      <div class="mt-4 fs-5 mx-auto description">
        {{ $t('home.dontHaveAccountDescription') }}
      </div>
      <div>
        <button
          class="btn main-button mt-3 mb-5 register-button"
          @click="$router.push({ name: 'register' })"
        >
          {{ $t('home.createAccount') }}
        </button>
      </div>
    </div>
    <div v-if="isLogged">
      <div class="mt-5">
        <h2>{{ $t('home.thanksForLoggingIn') }}</h2>
      </div>
      <div class="mt-4 fs-5 mx-auto description">
        {{ $t('home.thanksForLogginInDescription') }}
      </div>
      <div>
        <button
          class="btn main-button mt-3 mb-5 register-button"
          @click="$router.push({ name: 'settings' })"
        >
          {{ $t('home.goToSettings') }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isLogged = ref(false);

watchEffect((): void => {
  const token = store.state.token;
  isLogged.value = !!token;
});
</script>
<style scoped>
.description {
  width: 70%;
}
.number {
  color: var(--dark-red);
}

.register-button {
  background-color: var(--purple);
}
.register-button:hover {
  background-color: var(--dark-purple);
}
</style>
