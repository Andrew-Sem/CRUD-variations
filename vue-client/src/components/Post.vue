<script lang="ts">
import type {PropType} from "vue";
import {defineComponent} from "vue";
import type {IPost} from "@/models/Post";

export default defineComponent({
  props: {
    post: Object as PropType<IPost>
  },
  data() {
    return {}
  },
})
</script>

<template>
  <div class="bg-neutral-800 rounded px-4 py-2 ">
    <div>{{ post.title }}</div>
  </div>
</template>