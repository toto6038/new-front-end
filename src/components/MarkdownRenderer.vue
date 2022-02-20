<script setup lang="ts">
import renderMarkdown from "../utils/renderMarkdown";

defineProps({
  md: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    class="prose prose-sm min-w-full prose-pre:bg-zinc-800 prose-pre:text-white md:prose-base"
    v-html="renderMarkdown(md)"
  />
</template>
