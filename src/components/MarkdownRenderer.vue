<script setup lang="ts">
import renderMarkdown from "../utils/renderMarkdown";

interface Props {
  md?: string;
}
withDefaults(defineProps<Props>(), {
  md: "",
});
</script>

<template>
  <div
    class="prose-sm prose min-w-full prose-pre:bg-zinc-800 prose-pre:text-white md:prose-base"
    v-html="renderMarkdown(md)"
  />
</template>
