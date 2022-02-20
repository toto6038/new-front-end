<script setup lang="ts">
import dayjs from "dayjs";

defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const formatTime = (time: number) => {
  return dayjs(time * 1000).format("YYYY-MM-DD HH:mm");
};
</script>

<template>
  <div tabindex="0" class="collapse rounded-box border border-base-300">
    <input type="checkbox" />
    <div class="collapse-title text-xl font-medium">
      {{ post.title }}
    </div>
    <div class="collapse-content">
      <markdown-renderer :md="post.markdown" />

      <div class="mt-4 flex items-center gap-2 text-sm">Last updated: {{ formatTime(post.updateTime) }}</div>
      <div class="mt-2 flex items-center gap-2 text-sm">
        Posted by {{ post.creator.displayedName }} at {{ formatTime(post.createTime) }}
      </div>
    </div>
  </div>
</template>
