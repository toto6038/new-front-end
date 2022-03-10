<script setup lang="ts">
import { formatTime } from "../utils/formatTime";

defineProps({
  post: {
    type: Object,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Object,
    default: null,
  },
});
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <skeleton-post v-if="isLoading || !post" class="w-1/2" />
        <div v-else-if="error" class="alert alert-error shadow-lg">
          <div>
            <i-uil-times-circle />
            <span>Oops! Something went wrong when loading announcements.</span>
          </div>
        </div>
        <template v-else>
          <div class="card-title mb-8">{{ post.title }}</div>
          <markdown-renderer :md="post.markdown" />

          <div class="mt-4 flex items-center gap-2 text-sm">
            Last updated: {{ formatTime(post.updateTime) }}
          </div>
          <div class="mt-2 flex items-center gap-2 text-sm">
            Posted by {{ post.creator.displayedName }} at {{ formatTime(post.createTime) }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
