<template>
  <div class="painted-background">
    <LogoPurple style="margin: 30px 0px 30px; text-align: center" />
    <div class="centered-bordered-container">
      <p class="heading2">| Signup</p>
      <form>
        <div class="row">
          <div class="col">
            <input
              type="text"
              class="underline-input-style"
              placeholder="Username"
            /><br /><br />
            <input
              type="text"
              class="underline-input-style"
              placeholder="Phone number"
            />
            <br /><br />
            <p>
              <b-form-checkbox
                id="checkbox-1"
                v-model="status"
                name="checkbox-1"
                value="accepted"
                unchecked-value="not_accepted"
              >
                Accept <a href="/terms">terms and conditions</a>
              </b-form-checkbox>
            </p>
            <div v-if="show_error" style="color: red">
              Make sure you have agreed to the terms
            </div>
            <button
              class="primary-button"
              @click="termsAccepted(status), showLoading()"
            >
              <div v-if="isLoading">
                <b-spinner
                  label="Loading..."
                  style="color: #160d3d"
                ></b-spinner>
              </div>
              <div v-else>Get me started</div>
            </button>
            <br /><br />
            <p>Already have an account? <a href="/login">Login</a></p>
            <a href="/" style="color: #bbb">Back</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: "not_accepted",
      show_error: false,
      isLoading: false,
    };
  },
  methods: {
    showLoading() {
      this.isLoading = true;
    },
    termsAccepted(status) {
      return this.$router.push("/home");
      if (status == "accepted") {
        console.log(value);
        console.log("Terms all accepted");
      } else {
        console.log(value);
        console.log("Terms ! accepted");
        show_error = true;
      }
    },
  },
};
</script>
