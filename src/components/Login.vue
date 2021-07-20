<template>
  <section id="login">
    <form>
      <h2>Login</h2>
      <br />
      <input type="email" v-model="login.email" placeholder="Email" />
      <button v-on:click="onSubmit">Log in</button>
    </form>
  </section>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login: {
        email: "",
      },
    };
  },
  computed: {},
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      //   alert(JSON.stringify(this.login));
      await this.$store.dispatch("logIn", this.login.email);
      await this.$store.dispatch("getPostsFromAPI");
      this.$router.push({ name: "Posts" });
    },
  },
};
</script>

<style scoped>
section {
  background-color: rgba(0, 0, 0, 0.72);
  width: 25%;
  min-height: 25%;
  display: flex;
  flex-direction: column;
  /*margin-left:auto;
	margin-right:auto;*/
}
form {
  display: flex;
  flex-direction: column;
  padding: 15px;
}
h2 {
  font-family: "Archivo Black", sans-serif;
  color: #e0dada;
  margin-left: auto;
  margin-right: auto;
}

p {
  margin: auto;
  padding: 9px;
}

input {
  height: 35px;
  padding: 5px 5px;
  margin: 10px 0px;
  background-color: #e0dada;
  border: none;
}
button {
  height: 40px;
  padding: 5px 5px;
  margin: 10px 0px;
  font-weight: bold;
  background-color: #be5256;
  border: none;
  color: #e0dada;
  cursor: pointer;
  font-size: 16px;
}
button:hover {
  background-color: #711f1b;
}

@media screen and (max-width: 1080px) {
  section {
    width: 90%;
  }
}
</style>