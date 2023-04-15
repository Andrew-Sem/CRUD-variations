<script lang="ts">
import type {PropType} from "vue";
import {defineComponent} from "vue";
import type {IPost} from "@/models/Post";
import Post from "@/components/Post.vue";

export default defineComponent({
  components: {Post},
  props: {
    posts: Object as PropType<IPost[]>
  },
  data() {
    return {}
  }
})

</script>

<template>
  <div class="space-y-3 mt-6">
    <Post v-for="post in posts" :key="post.id" :post="post"/>
  </div>
</template>