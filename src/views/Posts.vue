<template>
  <div>
    <span v-if="isLoggedIn">
      <h3>Add Post:</h3>
      <form @submit.prevent="onSubmit">
        <label>Title:</label>
        <input
          type="text"
          id="newpost"
          v-model="newPost.title"
          placeholder="Post Title"
          autocomplete="off"
        /><label>Body:</label>
        <input
          type="text"
          id="newpost"
          v-model="newPost.body"
          placeholder="Post Body"
          autocomplete="off"
        />
        <button type="submit">Submit</button>
      </form>
    </span>
    <br />
    <h3>Posts:</h3>
    <ul>
      <li v-for="Post in getPosts" :key="Post.id">
        <span @click.prevent="postClicked(Post)">
          <h4>{{ Post.title }}</h4>
          <p>{{ Post.body }}</p>
          <br />
        </span>
        <span v-if="Post.userId === 11">
          <button @click="deletePost(Post)">Delete</button>
          <br />
        </span>
        <!-- <span v-if="Post.userId === 11">
          <form @submit.prevent="editPost(Post)">
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
        </span> -->
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Posts",
  data() {
    return {
      newPost: {
        title: "",
        body: "",
        userId: 11,
      },
      // editData: {
      //   title: "",
      //   body: "",
      // },
    };
  },
  computed: {
    ...mapGetters({
      getPosts: "getPosts",
      isLoading: "isLoading",
      isLoggedIn: "isLoggedIn",
    }),
  },
  methods: {
    async postClicked(post) {
      //   event.preventDefault();
      //   alert(JSON.stringify(this.getPosts.length));
      await this.$store.dispatch("getCommwntsByID", post.id);
      this.$router.push({ name: "Post", params: { id: post.id } });
    },
    onSubmit() {
      this.$store.commit("addPosts", this.newPost);
      this.newPost.title = "";
      this.newPost.body = "";
    },
    deletePost(post) {
      if (confirm("Do you really want to delete the post?")) {
        // console.log(post);
        this.$store.commit("deletePost", post.id);
        alert("The post Has been Deleted");
      }
    },
    // editPost(post) {
    //   this.$store.commit("editPost", { ...this.editData, id: post.id });
    //   alert("The post Has been Updated");
    //   this.editData.title = "";
    //   this.editData.body = "";
    // },
  },
  mounted() {
    !this.getPosts ? this.$router.replace("/") : null;
  },
};
</script>

<style scoped>
h1,
h2,
h3,
h4 p {
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
  cursor: pointer;
}
</style>