<script lang="ts">

import {defineComponent} from "vue";
import PostList from "@/components/PostList.vue";
import type {IPost} from "@/models/Post";
import {PostService} from "@/services/PostService";

let posts: IPost[] = [
  {id: 1, title: "first post", content: "content 1", user_id: 1},
  {id: 2, title: "second post", content: "content 2", user_id: 1},
]
export default defineComponent({
  components: {PostList},
  data() {
    return {
      postTitle: "",
      posts,
    }
  },
  methods:{
    async fetchUsers(e:Event){
      e.preventDefault()
      this.posts = await PostService.fetchPosts()
    }
  }
})

</script>
<template>
  <form class="bg-neutral-700 rounded-lg p-5">
    <div class="space-x-4">
      <input class="rounded px-4 py-2 bg-neutral-900 outline-none" v-model="postTitle">
      <button class="px-4 py-2 bg-indigo-600 rounded-lg" @click="fetchUsers">Get posts</button>
    </div>
    <PostList :posts="posts"/>
  </form>
</template>