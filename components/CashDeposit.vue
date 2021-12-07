<template>
  <main>
    <figure class="text-center">
      <svg width="57" height="46" viewBox="0 0 57 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.0792 15.725L24.3917 10.025C25.3417 9.55 26.2917 9.3125 27.2417 9.3125H36.2667C37.9292 9.3125 39.3542 10.2625 40.3042 11.6875L41.2542 13.1125C42.2042 14.5375 42.2042 16.2 41.4917 17.625L40.7792 19.05C39.8292 20.95 37.6917 21.9 35.5542 21.6625L27.9542 20.2375C27.4792 20.2375 27.0042 20.2375 26.7667 20.475C24.8667 21.6625 24.1542 23.8 24.8667 25.9375V26.175L38.8792 31.4C39.8292 31.875 41.0167 31.875 41.9667 31.4L55.7417 27.125" stroke="#160D3D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M55.5042 8.125L44.8167 1.7125C44.1042 1.2375 42.9167 1 41.9667 1L24.8667 1.95C23.9167 1.95 22.7292 2.425 22.0167 3.1375L13.7042 10.7375C12.9917 11.2125 12.5167 11.925 12.2792 12.875L11.0917 16.2" stroke="#160D3D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M29.8542 33.0627C28.6667 39.2377 23.6792 43.9877 17.5042 44.7002C11.3292 45.4127 5.15421 42.3252 2.54171 36.6252C-0.30829 30.9252 0.879211 24.2752 5.39171 19.7627C9.90421 15.4877 16.7917 14.3002 22.2542 17.3877" stroke="#160D3D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15.1292 24.2751V21.9001" stroke="#160D3D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.6917 24.2751H13.9417C12.5167 24.2751 11.0917 25.4626 10.8542 26.8876C10.6167 28.3126 11.3292 29.9751 12.7542 30.4501L17.7417 32.3501C19.1667 32.8251 19.8792 34.4876 19.6417 35.9126C19.4042 37.3376 17.9792 38.5251 16.5542 38.5251H11.5667" stroke="#160D3D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15.1292 40.9001V38.5251" stroke="#160D3D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </figure>
    <p class="text-center user-title text-mswali mb-0 pt-xl-1">{{username}}</p>
    <p class="text-center label text-mswali pt-xl-2">{{request}} {{action}}</p>
  </main>
</template>
<style scoped>
.text-mswali{
  color: #160D3D;
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
.label{
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
  props: {
    username:{
      type:String,
      default:'John Doe'
    },
    action: {
      type: String,
      default: 'Withdraw'
    }
  },
  data () {
    return {
      request: 'How Much would you wish to '
    }
  }
}
</script>