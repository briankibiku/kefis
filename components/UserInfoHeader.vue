<template>
  <div class="purple-container">
    <figure class="text-center">
      <svg
        width="61"
        height="61"
        viewBox="0 0 61 61"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M43.2083 53.375V48.2917C43.2083 45.5953 42.1372 43.0094 40.2305 41.1027C38.3239 39.1961 35.738 38.125 33.0416 38.125H12.7083C10.0119 38.125 7.42599 39.1961 5.51937 41.1027C3.61275 43.0094 2.54163 45.5953 2.54163 48.2917V53.375"
          stroke="#1CEDED"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M22.875 27.9583C28.4899 27.9583 33.0417 23.4066 33.0417 17.7917C33.0417 12.1768 28.4899 7.625 22.875 7.625C17.2601 7.625 12.7084 12.1768 12.7084 17.7917C12.7084 23.4066 17.2601 27.9583 22.875 27.9583Z"
          stroke="#1CEDED"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M58.4584 53.3749V48.2916C58.4567 46.039 57.7069 43.8507 56.3268 42.0704C54.9467 40.29 53.0145 39.0185 50.8334 38.4553"
          stroke="#1CEDED"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M40.6666 7.95532C42.8535 8.51525 44.7918 9.7871 46.176 11.5704C47.5602 13.3536 48.3116 15.5468 48.3116 17.8043C48.3116 20.0617 47.5602 22.2549 46.176 24.0382C44.7918 25.8215 42.8535 27.0933 40.6666 27.6532"
          stroke="#1CEDED"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </figure>
    <p class="text-light text-center user-title mb-0">{{ user.name }}</p>
    <p class="text-light text-center label">{{ label }}</p>
  </div>
</template>
<style scoped>
.user-title {
  font-size: 20px;
  justify-content: center;
  /* text-align-last:justify; */
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 36px;

  /* or 150% */
  letter-spacing: 0.03em;
}
.label {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;

  /* identical to box height, or 157% */
  text-align: center;
  letter-spacing: 0.02em;
}
</style>
<script>
export default {
  data() {
    return {
      user: {
        name: "Titus Mwaniki",
      },
      label: "Get ready to play!",
    };
  },
};
</script>
