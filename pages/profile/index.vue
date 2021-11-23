<template>
  <div class="painted-background">
    <LogoPurple style="margin: 30px 0px 30px; text-align: center" />
    <div class="centered-bordered-container" style="margin-top: 0px">
      <div class="avatar"></div>
      <div class="form">
        <form style="text-align: center">
          <div class="row">
            <div class="col">
              <br />
              <input type="text" onin :value="userName" />
              <br /><br />
              <input type="text" onin :value="phoneNumber" />
              <br /><br />
              <input type="text" onin :value="email" style="" />
              <br /><br />
              <b-button class="primary-button" href="/home">Save</b-button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: this.$store.state.visitor_info[0].username,
      phoneNumber: this.$store.state.visitor_info[0].phone,
      email: this.$store.state.visitor_info[0].email,
    };
  },
};
</script>

<style scoped>
form {
  width: 300px;
}
.user-info {
  width: 320px;
}
input {
  border: 1px solid;
  border-color: #f5f5f7;
  padding: 10px;
  border-radius: 8px;
  background-color: #ebebed;
}
h6 {
  font-weight: 600;
  font-family: "Work sans";
}
.centered-bordered-container {
  /* top: 20%; */
  padding: 20px 30px 20px 30px;
  height: 450px;

  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
