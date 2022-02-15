<template>
  <div>
    <div style="padding: 40px">
      <div class="row" style="padding-left: 50px">
        <!--Big screen sidebar navigation starts here-->
        <div
          id="col1"
          class="d-none d-md-block d-lg-none d-none d-lg-block d-xl-none d-none d-xl-block"
          style="
            justify-content: center;
            align-items: center;
            text-align: center;
            width: 15%;
          "
        >
          <div style="text-align: left">
            <NuxtLink to="/home">
              <LogoPurple style="height: 27px; width: 120px" />
            </NuxtLink>
          </div>
          <LargeScreenNavBar />
        </div>
        <!--Big screen sidebar navigation starts here-->

        <!--Search bar / Start quiz button / Profile -->
        <div id="col2" style="width: 85%">
          <div class="centered-container">
            <div>
              <font-awesome-icon :icon="['fas', 'cog']" />
              <div class="heading3">Settings</div>
              <a href="/home" style="color: #bbb">Home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { show: false };
  },
};
</script>
