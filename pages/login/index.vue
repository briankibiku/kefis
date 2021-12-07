<template>
  <div class="painted-background">
    <LogoPurple style="margin: 30px 0px 30px; text-align: center" />
    <div class="centered-bordered-container">
      <p class="heading2">| Login</p>
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
            <b-button class="primary-button" href="/otp">Go</b-button>
            <br /><br />
            <p>New to mSwali? <a href="/signup">Sing Up</a></p>
            <br />
            <a href="/" style="color: #bbb">Back</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>