<template>
  <div>
    <nav class="navbar navbar-expand-sm">
      <div class="container-fluid">
        <button
          class="navbar-toggler border-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <button class="btn main-button active">Zaloguj</button>
          <ul class="navbar-nav ms-auto m-2 d-flex align-items-center">
            <li class="nav-item mx-2 mx-sm-0">
              <router-link
                :to="{ name: 'start' }"
                class="nav-link"
                :class="{ active: $route.name === 'start' }"
                >Strona główna</router-link
              >
            </li>
            <li class="nav-item mx-2 mx-sm-0">
              <router-link :to="{ name: 'start' }" class="nav-link"
                >Historia połączeń</router-link
              >
            </li>
            <li class="nav-item mx-2 mx-sm-0">
              <router-link
                :to="{ name: 'settings' }"
                class="nav-link"
                :class="{ active: $route.name === 'settings' }"
                >Ustawienia</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { Theme } from './types/theme.type';
import { getTheme, setThemeColors } from './utils/theme.utils';

let activeTheme = ref(getTheme());
watchEffect((): void => {
  const theme: Theme = activeTheme.value;
  setThemeColors(theme);
});

const $route = useRoute();
</script>
<style>
:root {
  --light-green: #2e9a53;
  --darker-green: #258346;
  --light-red: #f00e0e;
  --dark-red: #af0e0e;
}

body {
  background: var(--bg-color);
  color: var(--color);
  font-family: 'Roboto', sans-serif;
}

.active {
  font-weight: bold;
  color: var(--color);
}

.border-none {
  border: none;
}

.nav-link {
  cursor: pointer;
  color: var(--color) !important;
}

.nav-link:hover {
  color: var(--color);
}

.main-button {
  background-color: var(--dark-red);
  border-radius: 16px;
  cursor: pointer;
  font-size: 16px;
  color: #ffffff;
  border: none;
  min-width: 150px;
}
.main-button:hover {
  background-color: var(--light-red);
  color: #ffffff;
}
.main-button:active {
  position: relative;
  top: 5px;
  color: #ffffff;
}

.main-button.active {
  background-color: var(--light-green);
  color: #ffffff;
  font-weight: 400;
}

.main-button.active:hover {
  background-color: var(--darker-green);
}
</style>
