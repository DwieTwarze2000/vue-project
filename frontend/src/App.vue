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
import { useRoute } from 'vue-router';

const $route = useRoute();
</script>
<style>
body {
  background: #aabff3;
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
}
</style>
