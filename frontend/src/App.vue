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
          <ul class="navbar-nav ms-auto m-2">
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
  --active-button-bg-color: #2e9a53;
  --active-button-color: #ffffff;
  --active-button-hover-color: #258346;
  --unactive-button-bg-color: #af0e0e;
  --unactive-button-color: #ffffff;
  --unactive-button-hover-color: #f00e0e;
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
</style>
