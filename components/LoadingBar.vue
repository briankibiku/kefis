<template>
  <div class="spinner"></div>
</template>

<style lang="css">
.spinner {
  position: absolute;
  height: 60px;
  width: 60px;
  border: 3px solid transparent;
  border-top-color: var(--v-success-base);
  top: 50%;
  left: 50%;
  margin: -30px;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 100; 
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
