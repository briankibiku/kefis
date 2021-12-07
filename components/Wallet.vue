<template>
  <main class="container text-center">
    <figure class="text-center">
      <svg
        width="50"
        height="46"
        viewBox="0 0 50 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M35.375 26.7183C35.5833 26.7183 35.7916 26.9274 35.7916 27.1364C35.7916 27.3455 35.5833 27.5546 35.375 27.5546C35.1666 27.5546 34.9583 27.3455 34.9583 27.1364C34.9583 26.9274 35.1666 26.7183 35.375 26.7183Z"
          stroke="#160D3D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M42.6667 21.909V15.6363C42.6667 12.0817 39.9583 9.36353 36.4167 9.36353H7.25"
          stroke="#160D3D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M32.25 5.18188H7.25002C6.00002 5.18188 5.16669 6.01825 5.16669 7.27279C5.16669 8.52734 6.00002 9.3637 7.25002 9.3637"
          stroke="#160D3D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M42.6667 32.3636V38.6364C42.6667 42.1909 39.9583 44.9091 36.4167 44.9091H7.25C3.70833 44.9091 1 42.1909 1 38.6364V7.27273C1 3.71818 3.70833 1 7.25 1H32.25C35.5833 1 38.5 2.88182 38.5 5.18182V9.78182"
          stroke="#160D3D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.33331 38.6365H11.4166"
          stroke="#160D3D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.5833 38.6365H19.75"
          stroke="#160D3D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M23.9167 38.6365H28.0834"
          stroke="#160D3D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M32.25 38.6365H36.4167"
          stroke="#160D3D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.33331 15.6365H11.4166"
          stroke="#160D3D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.5833 15.6365H19.75"
          stroke="#160D3D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M23.9167 15.6365H28.0834"
          stroke="#160D3D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M32.25 15.6365H36.4167"
          stroke="#160D3D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M30.1667 26.091C30.1667 23.791 32.0417 21.9092 34.3334 21.9092H44.75C47.0417 21.9092 48.9167 23.791 48.9167 26.091V28.1819C48.9167 30.4819 47.0417 32.3637 44.75 32.3637H34.3334C32.0417 32.3637 30.1667 30.4819 30.1667 28.1819V26.091Z"
          stroke="#160D3D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </figure>
    <p class="text-center text-mswali user-title mb-40">{{ user.name }}</p>

    <b-row>
      <b-col>
        <p class="text-mswali text-label1">{{ label1 }}</p>
        <p class="text-mswali text-label3">{{ label2 }}</p>
        <p class="text-mswali text-label1 pb-2">{{ label3 }}</p>
      </b-col>
      <DividerVertical />
      <b-col cols="6" class="align-self-center">
        <button
          class="transact-container"
          @click.stop.prevent="makeToast('b-toaster-bottom-full', 'info')"
        >
          {{ label4 }}
        </button>
        <DividerHorizontal />
        <button
          class="transact-container"
          @click.stop.prevent="makeToast('b-toaster-bottom-full', 'info')"
        >
          {{ label5 }}
        </button>
      </b-col>

      <a href="/home" class="center-align-content" style="color: #bbb">Quit</a>
    </b-row>
  </main>
</template>
<script>
export default {
  data() {
    return {
      label1: "KSH",
      label2: "1,200",
      label3: "Wallet Balance",
      label4: "Deposit",
      label5: "Withdraw",
      user: {
        name: "Titus Mwaniki",
      },
    };
  },
  methods: {
    makeToast(toaster, variant = null) {
      this.$bvToast.toast("Dev at work to bring this feature", {
        title: `Coming soon!`,
        variant: variant,
        toaster: toaster,
        solid: true,
      });
    },
  },
};
</script>
<style scoped>
.transact-container {
  background-color: #fff;
  opacity: 80%;
  color: #160d3d;
  border-radius: 2em;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
  border: 1px solid;
  border-color: #160d3d;
}
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
.text-mswali {
  color: #160d3d;
}
.container {
  box-sizing: border-box;
  padding: 20px;
}
.text-label2 {
  font-style: normal;
  font-weight: 800;
  font-size: 36px;
  line-height: 61px;

  /* or 169% */
  text-align: center;
  letter-spacing: 0.03em;
}
.text-label3 {
  font-style: normal;
  font-weight: 800;
  font-size: 48px;
  line-height: 36px;

  /* identical to box height, or 75% */
  text-align: center;
  letter-spacing: 0.03em;
}
</style>
