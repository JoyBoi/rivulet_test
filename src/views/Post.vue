<template>
  <div>
    <h2>{{ getPostsById.title }}</h2>
    <p>{{ getPostsById.body }}</p>
    <br />
    <span v-if="getPostsById.userId === 11 && isLoggedIn">
      <h3>Edit Post:</h3>
      <form @submit.prevent="editPost">
        <label>Title:</label>
        <input
          type="text"
          id="newpost"
          v-model="editData.title"
          placeholder="Post Title"
          autocomplete="off"
        /><label>Body:</label>
        <input
          type="text"
          id="newpost"
          v-model="editData.body"
          placeholder="Post Body"
          autocomplete="off"
        />
        <button type="submit">Edit</button>
      </form>
    </span>
    <br />
    <h3>Comments:</h3>
    <ul>
      <li v-for="Comment in getComments" :key="Comment.id">
        <span> {{ Comment.body }} </span>
      </li>
    </ul>
    <br />
    <span v-if="isLoggedIn">
      <h3>Add Comments:</h3>
      <form class="formstyle" @submit.prevent="onSubmit">
        <label>Name:</label>
        <input
          type="text"
          id="newpost"
          v-model="newComment.name"
          placeholder="Comment name"
          autocomplete="off"
        /><label>Body:</label>
        <input
          type="text"
          id="newpost"
          v-model="newComment.body"
          placeholder="Comment Body"
          autocomplete="off"
        />
        <button type="submit">Submit</button>
      </form>
    </span>
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
      editData: {
        title: "",
        body: "",
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
      this.newComment.name = "";
      this.newComment.body = "";
    },
    editPost() {
      if (confirm("Do you really want to change the post?")) {
        this.$store.commit("editPost", {
          ...this.editData,
          id: this.getPostsById.id,
        });
        alert("The post Has been Updated");
      }
      this.editData.title = "";
      this.editData.body = "";
    },
  },
  mounted() {
    !this.getPostsById.title ? this.$router.replace("/") : null;
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
span {
  margin: 4px;
  padding: 6px;
}
label {
  margin: 4px;
  padding: 4px;
}
button {
  margin: 5px;
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