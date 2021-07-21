import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            email: "",
        },
        posts: [],
        comments: [],
        loading: false,
    },
    mutations: {
        setUser: (state, payload) => {
            state.user.email = payload;
        },

        setPosts: (state, payload) => {
            state.posts = payload;
        },

        addPosts: (state, payload) => {
            state.posts.push({
                title: payload.title,
                body: payload.body,
                userId: payload.userId,
                id: Math.random()
                    .toString()
                    .slice(2),
            });
        },
        editPost: (state, payload) => {
            console.log(payload);
            let index = state.posts.findIndex((post) => post.id === payload.id);
            console.log(state.posts[index]);
            state.posts[index].title = payload.title;
            state.posts[index].body = payload.body;
        },

        deletePost: (state, payload) => {
            // console.log(payload);
            let index = state.posts.findIndex((post) => post.id === payload);
            // console.log(index);
            state.posts.splice(index, 1);
        },

        setLoading: (state, payload) => {
            state.loading = payload;
        },

        setComments: (state, payload) => {
            state.comments = payload;
        },
        addComments: (state, payload) => {
            state.comments.push({
                body: payload.body,
                email: state.user.email,
                id: state.comments.length + 1,
                name: payload.name,
                postId: payload.postId,
            });
        },
    },
    actions: {
        //API call to Posts
        async getPostsFromAPI({ commit }) {
            commit("setLoading", true);
            try {
                const res = await axios("https://jsonplaceholder.typicode.com/posts");
                commit("setPosts", res.data);
            } catch (error) {
                console.log(error);
            } finally {
                commit("setLoading", false);
            }
        },

        logIn({ commit }, payload) {
            commit("setUser", payload);
        },

        logOut({ commit }) {
            commit("setUser", "");
            router.replace("/");
        },

        async getCommwntsByID({ commit }, payload) {
            commit("setLoading", true);
            try {
                const res = await axios(
                    `https://jsonplaceholder.typicode.com/posts/${payload}/comments`
                );
                commit("setComments", res.data);
            } catch (error) {
                console.log(error);
            } finally {
                commit("setLoading", false);
            }
        },
    },
    modules: {},
    getters: {
        user: (state) => state.user,
        isLoggedIn: (state) => state.user.email !== "",
        getPosts: (state) => {
            return state.posts.slice().reverse();
        },
        getPostsById: (state) => (postId) => {
            let index = state.posts.findIndex((post) => post.id === postId);
            return state.posts[index];
        },
        isLoading: (state) => state.loading,
        getComments: (state) => state.comments,
    },
});