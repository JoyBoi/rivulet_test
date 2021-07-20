<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <login />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Login from "@/components/Login2.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld
    Login,
  },
};
</script>
<style>
/* html,
body {
  width: 100%;
  height: 100%;
  margin: 0px;
  font-family: "Work Sans", sans-serif;
}
body {
  /* background-image: url("https://images-assets.nasa.gov/image/6900952/6900952~orig.jpg"); 
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
} */
</style>