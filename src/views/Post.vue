<template>
  <div>
    <h2>{{ getPostsById.title }}</h2>
    <p>{{ getPostsById.body }}</p>
    <br />
    <h3>Comments:</h3>
    <ul>
      <li v-for="Comment in getComments" :key="Comment.id">
        <span> {{ Comment.body }} </span>
      </li>
    </ul>
    <br />
    <h3>Add Comments:</h3>
    <form class="formstyle" @submit.prevent="onSubmit">
      <label>Name</label>
      <input
        type="text"
        id="newpost"
        v-model="newComment.name"
        placeholder="Comment name"
        autocomplete="off"
      /><label>Body</label>
      <input
        type="text"
        id="newpost"
        v-model="newComment.body"
        placeholder="Comment Body"
        autocomplete="off"
      />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      newComment: {
        name: "",
        body: "",
        postId: this.$route.params.id,
      },
    };
  },
  computed: {
    ...mapGetters({
      getComments: "getComments",
      isLoggedIn: "isLoggedIn",
    }),
    getPostsById() {
      return this.$store.getters.getPostsById(this.$route.params.id);
    },
  },
  methods: {
    onSubmit() {
      this.$store.commit("addComments", this.newComment);
    },
  },
  mounted() {
    !this.isLoggedIn ? this.$router.replace("/") : null;
  },
};
</script>

<style scoped>
h1,
h2,
h3,
p {
  margin: 8px;
  padding: 5px;
}
form > * {
  margin: 10px;
  padding: 5px;
}
ul {
  list-style: none;
  margin: 4px;
  padding: 6px;
}
li {
  background-color: bisque;
  margin: 4px;
  padding: 6px;
}
</style>