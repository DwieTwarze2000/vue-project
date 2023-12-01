<template>
  <div class="d-flex flex-column align-items-center mt-5 mb-5">
    <div class="text fs-4">
      {{ $t('callUsModal.ringing') }}
      <span class="saving fs-2"
        ><span>.</span><span>.</span><span>.</span></span
      >
    </div>
  </div>
</template>

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
