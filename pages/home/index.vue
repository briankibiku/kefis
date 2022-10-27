<template>
    <div>
        <div style="margin: 0 auto; min-height: 100vh">
            
            <div class="center-container">
                <div>
                    <h3>Where would you like to visit today?</h3>
                </div>
                <div class="row-flex">
                    <HomeActionCard title="Store" route="/store" />
                    <p style="padding-inline: 20px">or</p>
                    <HomeActionCard title="Warehouse" route="'/warehouse"  />
                </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Home from '../../components/Home.vue';
import HomeActionCard from '../../components/HomeActionCard.vue';

    export default {
        data(){
            return {
                
            }
        },
  computed: {
    ...mapState({userName: "userName"}),
  },
  mounted(){
    this.saveUserName('Kim')
  },
        methods: {
    ...mapActions({
        persistUsername: "persistUsername"}),
            async saveUserName(name) {
                await this.persistUsername(name);
            }
        },
    components: { Home, HomeActionCard }
}
</script>

<style scoped>

.center-container {
  width: 100%; 
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
}
.row-flex{
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
}
</style>