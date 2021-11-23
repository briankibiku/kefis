<template>
  <main>
    <div class="container-atm">
      <b-row>
        <b-col>
          <p class="text-center text-mswali label mb-0">{{currency}}</p>
          <p class="text-center text-mswali amount mb-0">{{amount}}</p>
          <p class="text-center text-mswali label">{{label1}}</p>
        </b-col>
      </b-row>
    </div>
  </main>
</template>
<style scoped>
.container-atm{
background: #FFFFFF;
border: 1px solid #1CEDED;
box-sizing: border-box;
border-radius: 6px;
padding-top: 1.6rem;
padding-right: 7rem;
padding-left: 7rem;
padding-bottom: 1.6rem;  
}
.text-mswali{
  color: #160D3D;
}
.amount{
  font-style: normal;
font-weight: 800;
font-size: 36px;
line-height: 61px;

/* or 169% */
text-align: center;
letter-spacing: 0.03em; 
}
.label{
  font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 14px;

/* identical to box height, or 117% */

letter-spacing: 0.02em;
}
</style>
<script>
export default {
  props: {
    currency:{
      type:String,
      default:'KSH'
    },
    amount: {
      type: Number,
      default: 1200
    }
  },
  data() {
    return {
      label1:'Wallet Balance'
    }
  }
}
</script>