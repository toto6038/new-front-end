<script setup lang="ts">
import { marked } from "marked";
defineProps({
  post: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div tabindex="0" class="collapse rounded-box border border-base-300 bg-base-100">
    <input type="checkbox" />
    <div class="collapse-title text-xl font-medium">
      {{ post.title }}
    </div>
    <div class="collapse-content">
      <div v-html="marked(post.markdown)" />

      <div class="mt-4 flex items-center gap-2 text-sm text-gray-500">
        Last updated: {{ post.updateTime }}
      </div>
      <div class="mt-2 flex items-center gap-2 text-sm text-gray-500">
        Posted by {{ post.creator.displayedName }} at {{ post.createTime }}
      </div>
    </div>
  </div>
</template>
