<template>
    <div>
      <div class="overlay" v-if="loading">
        <div style="margin: 20px">
          <b-spinner variant="primary" label="Spinning"></b-spinner>
          <div>Loading...</div>
        </div>
      </div>
      <div id="row">
        <div id="col1" class="bg-image d-none d-lg-block">
          <MswaliExplained />
        </div>
        <div id="col2">
          <div style="margin: 0 auto; min-height: 100vh">
            <div class="centered-container">
              <div>
                <div>
                  <LogoPurple class="d-block d-sm-none" />
                  <br />
                  <div class="player-container"></div>
                </div>
                <br />
                <div class="heading2">Welcome to mSwali</div>
                <div class="text1">Enter your a username and your email to continue</div>
                <div class="column">
                  <input
                    class="rounded-border-input"
                    type="text"
                    v-model="userName"
                    placeholder="Enter Username"
                    style="margin-block: 20px"
                    v-on:keyup.enter="signUpuser"
                  />
                  <input
                    class="rounded-border-input"
                    type="email"
                    placeholder="janedoe@kq.co.ke"
                    v-model="emailAddress"
                    required
                    style="margin-bottom: 10px"
                    v-on:keyup.enter="signUpUserAndSendEmailOTP"
                  />
                </div>
                <div>
                  <RoundedCyanLoadingButton
                    buttonText="Proceed"
                    showIcon="true"
                    id="loginbtn"
                    @click="signUpUserAndSendEmailOTP()"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { mapGetters } from "vuex";
  import { mapState, mapActions } from "vuex";
  import MswaliExplained from "../../components/MswaliExplained.vue";
  import RoundedCyanArrowButton from "../../components/Buttons/RoundedCyanArrowButton.vue";
  import RoundedCyanLoadingButton from "../../components/Buttons/RoundedCyanLoadingButton.vue";
  export default {
    head: {
      title: "Login",
    },
    data() {
      return {
        emailAddress: "",
        userName: "",
        loading: false,
      };
    },
    mounted() {
      if (this.$store.state.isAuthenticated) {
        this.$router.push("/home");
      } 
    },
    computed: {
      ...mapGetters("products", ["maskedPhone"]),
      ...mapState({
        isExistingUser: "isExistingUser",
        loggedinUserPhone: "loggedinUserPhone",
        loggedinUserEmail: "loggedinUserEmail",
        newUserPhone: "newUserPhone",
        userDetails: "userDetails"
      }),
    },
    methods: {
      ...mapActions({
        peristIsExistingUSer: "peristIsExistingUSer",
        peristUserPhone: "peristUserPhone",
        persistupdateNewUserPhone: "persistupdateNewUserPhone",
        peristUserEmail: "peristUserEmail",
        persistuserDetails: "persistuserDetails"
      }),
      async signUpUserAndSendEmailOTP(){     
        if (!!this.emailAddress && !!this.userName) {
          try {
            // register user first before attempt to send otp
            const res = await axios.post(
              `/apiproxy/corporate-tunnel/create-user&username=${this.userName}&email=${this.emailAddress}`,
            ); 
            if(res.data.status_message === 'saved successfully'){
              // send OTP if user is saved
            const sendOTPres = await axios.get(
              `/apiproxy/corporate-tunnel/generate-otp&email=${this.emailAddress}`,
            );  
            if(sendOTPres.data == 202){
              let userDetailsObject = {
                'email': this.emailAddress,
                'username': this.userName
              }
              await this.persistuserDetails(userDetailsObject)
              // await this.$store.commit("updateUserDetails", userDetailsObject);
              this.$router.push('/email-otp')
            } else {
            this.sendOTPErrorToast();
            await this.$store.dispatch("delayTwoSeconds");
            window.location.reload();  
            }
  
            }   
          } catch (e) {
            console.log(e)
            this.sendOTPErrorToast();
            await this.$store.dispatch("delayTwoSeconds");
            window.location.reload();          
          }
        } else {
          this.showMissingFieldsToast();
          await this.$store.dispatch("delayTwoSeconds");
          window.location.reload();
        }
      },
      showMissingFieldsToast(toaster, variant = "danger") {
        this.$bvToast.toast("All fields are required, make sure to fill all before proceeding", {
          title: `Missing fields`,
          variant: variant,
          toaster: toaster,
          solid: true,
        });
      },
      sendOTPErrorToast(toaster, variant = "danger") {
        this.$bvToast.toast("Error while sending OTP", {
          title: `Could not send OTP`,
          variant: variant,
          toaster: toaster,
          solid: true,
        });
      },
      goToSignup() {
        return this.$router.push("/signup");
      },
      navigateToLogin() {
        return this.$router.push("/email-login");
      },
      validatePhoneNumber(input_str) {
        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  
        return re.test(input_str);
      },
      async checkUserExists() {
        const config = {
          headers: {
            Accept: "application/json",
          },
        };
  
        this.$router.push("/otp");
        if (!!this.emailAddress) {
          try {
            // start loading
            this.$nuxt.$loading.start();
            const res = await axios.get(
              `/apiproxy/email-tunnel/generate-otp&email=${this.emailAddress}`,
              config,
            );
            // check if user already exists
            if (!res.data.status) {
              // stop loading
              await this.peristUserEmail(this.emailAddress);
              await this.$store.commit("updateSignUpEmail", this.emailAddress);
              this.$router.push("/otp");
              // await this.persistupdateNewUserPhone(this.emailAddress);
            } else {
              // update state that the user is an existing user and not need to show modal
              await this.peristIsExistingUSer(true);
              // send user an OTP and direct them to verify
              const result = await axios.get(
                `/apiproxy/api/generate-otp&msisdn=${this.phoneNumber}`,
                config,
              );
              // stop loading
              await this.peristUserPhone(this.phoneNumber);
              await this.$store.commit("updateSignUpPhone", this.phoneNumber);
              await this.$store.commit("updateSignUpOTP", res);
              this.$router.push("/otp");
            }
          } catch (err) {
            this.sendOTPErrorToast();
            await this.$store.dispatch("delayTwoSeconds");
            window.location.reload();
          }
        } else {
          this.showMissingFieldsToast();
          await this.$store.dispatch("delayTwoSeconds");
          window.location.reload();
        }
      },
    },
    components: {
      MswaliExplained,
      RoundedCyanArrowButton,
      RoundedCyanLoadingButton,
    },
  };
  </script>
  
  <style>
  .bg-image-overlay {
    background-image: url("~/assets/overlay.png");
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    min-height: 100vh;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #160d3d;
    opacity: 68%;
    background: url(data:;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNUmK/OAAAAATSURBVBhXY2RgYNgHxGAAYuwDAA78AjwwRoQYAAAAAElFTkSuQmCC)
      repeat scroll transparent\9; /* ie fallback png background image */
    z-index: 9999;
    /*background-image: url("~/assets/overlay.png");*/
    background-repeat: no-repeat;
    background-size: cover;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  #col1 {
    width: 50%;
  }
  #col2 {
    width: 50%;
    color: #160d3d;
    background-color: #fff;
  }
  .heading2 {
    font-size: 24px;
    font-weight: 800;
    font-family: "Nunito Sans", sans-serif;
    color: #160d3d;
  }
  
  .text1 {
    font-size: 14px;
    font-weight: 500;
    font-family: "Nunito Sans", sans-serif;
    color: #160d3d;
  }
  .column{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  /* Small Devices, Phones and Desktop screens*/
  @media only screen and (max-width: 780px) {  
  #col2 {
    width: 100%;
    color: #fff;
    background-color: #160d3d;
  }
  .heading2 {
    font-size: 24px;
    font-weight: 800;
    font-family: "Nunito Sans", sans-serif;
    color: #fff;
  }
  
  .text1 {
    font-size: 14px;
    font-weight: 500;
    font-family: "Nunito Sans", sans-serif;
    color: #fff;
  }
  }
  </style>
  