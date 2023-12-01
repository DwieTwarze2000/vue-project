<template>
  <div
    class="d-flex flex-column align-items-center justify-content-center mt-5 mb-5"
  >
    <h1 class="mb-3">Miłej rozmowy!</h1>
    <div class="text fs-4 mb-3">
      Trwa połączenie<span class="saving fs-2"
        ><span>.</span><span>.</span><span>.</span></span
      >
    </div>
    <div class="text fs-2 mt-2">{{ timer }}</div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { formatSeconds, saveCallDuration } from '../utils/phone.utils';

const timer = ref('00:00:00');
const interval = ref(null);

onMounted(() => {
  let seconds = 0;
  interval.value = setInterval(() => {
    seconds++;
    timer.value = formatSeconds(seconds);
  }, 1000);
});

onUnmounted(() => {
  saveCallDuration(timer.value);
  clearInterval(interval.value);
});
</script>
<style scoped>
@keyframes blink {
  0% {
    opacity: 0.2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}

.saving span {
  animation-name: blink;
  animation-duration: 1.4s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

.saving span:nth-child(2) {
  animation-delay: 0.2s;
}

.saving span:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
