<script setup lang="ts">
import { formatTime } from "../utils/formatTime";

defineProps({
  post: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title mb-8">{{ post.title }}</div>
        <markdown-renderer :md="post.markdown" />

        <div class="mt-4 flex items-center gap-2 text-sm">
          Last updated: {{ formatTime(post.updateTime) }}
        </div>
        <div class="mt-2 flex items-center gap-2 text-sm">
          Posted by {{ post.creator.displayedName }} at {{ formatTime(post.createTime) }}
        </div>
      </div>
    </div>
  </div>
</template>
