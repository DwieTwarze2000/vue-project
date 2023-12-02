<template>
  <div>
    <nav v-if="showNavigation()" class="navbar navbar-expand-sm">
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
          <button
            class="btn main-button active"
            @click="$router.push({ name: 'login' })"
            v-if="!isLogged"
          >
            {{ $t('navigation.login') }}
          </button>
          <button
            class="btn main-button active"
            @click="logout()"
            v-if="isLogged"
          >
            {{ $t('navigation.logout') }}
          </button>
          <ul class="navbar-nav ms-auto m-2 d-flex align-items-center">
            <li class="nav-item mx-2 mx-sm-0">
              <router-link
                :to="{ name: 'home' }"
                class="nav-link"
                :class="{ active: $route.name === 'home' }"
                >{{ $t('navigation.home') }}</router-link
              >
            </li>
            <li class="nav-item mx-2 mx-sm-0" v-if="isLogged">
              <router-link
                :to="{ name: 'phoneCallHistory' }"
                class="nav-link"
                :class="{ active: $route.name === 'phoneCallHistory' }"
                >{{ $t('navigation.phoneCallHistory') }}</router-link
              >
            </li>
            <li class="nav-item mx-2 mx-sm-0">
              <router-link
                :to="{ name: 'settings' }"
                class="nav-link"
                :class="{ active: $route.name === 'settings' }"
                >{{ $t('navigation.settings') }}</router-link
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
import { removeToken } from './utils/auth.utils';
import { defaultPost } from './services/api.service';
import { LogoutResponse, logoutSuccess } from './types/auth.type';
import { useStore } from 'vuex';

const store = useStore();

const isLogged = ref(false);

watchEffect((): void => {
  const token = store.state.token;
  isLogged.value = !!token;
});

const logout = async (): Promise<void> => {
  const response: LogoutResponse = await defaultPost('auth/logout', {}, true);
  if (response.message === logoutSuccess) {
    store.commit('logout');
    removeToken();
  }
};

let activeTheme = ref(getTheme());
watchEffect((): void => {
  const theme: Theme = activeTheme.value;
  setThemeColors(theme);
});

const $route = useRoute();

const showNavigation = (): boolean => {
  const excludedRoutes = ['/login', '/register'];
  return !excludedRoutes.includes($route.path);
};
</script>
<style>
:root {
  --light-green: #2e9a53;
  --darker-green: #258346;
  --light-red: #f00e0e;
  --dark-red: #af0e0e;
  --orange: #ff7a00;
  --dark-orange: #e66e00;
  --purple: #a12da3;
  --dark-purple: #7f1f7f;
  /* --modal-bg-color: linear-gradient(168deg, #00008b 0%, #800080 79.17%); */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--bg-color);
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: white;
  font-family: 'Roboto', sans-serif;
}

.active {
  font-weight: bold;
}

.border-none {
  border: none;
}

.nav-link {
  cursor: pointer;
  color: white !important;
}

.nav-link:hover {
  color: var(--color);
}

.main-button {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  cursor: pointer;
  font-size: 16px;
  color: #ffffff;
  border: none;
  min-width: 150px;
}
.main-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}
.cancel {
  background-color: var(--light-red);
  color: #ffffff;
}

.cancel:hover {
  background-color: var(--dark-red);
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

.login-input {
  width: 400px;
}

@media (max-width: 420px) {
  .login-input {
    width: 100%;
  }
}

.error {
  color: var(--dark-red);
  font-weight: bold;
  font-size: 12px;
  margin-top: 4px;
}

.call-us-button {
  background-color: var(--orange);
}
.call-us-button:hover {
  background-color: var(--dark-orange);
}
</style>
