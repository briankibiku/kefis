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
            <b-button class="primary-button" href="/home">Get me started</b-button>
            <br /><br />
            <p>Already have an account? <a href="/login">Login</a></p>
            <br />
            <a href="/" style="color: #bbb">Back</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
