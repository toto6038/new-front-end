<script setup lang="ts">
import { useClipboard } from "@vueuse/core";

defineProps({
  code: {
    type: String,
    default: "",
  },
});

const { copy, copied, isSupported } = useClipboard();
</script>

<template>
  <div class="relative">
    <pre class="rounded bg-zinc-800 py-2 px-4 text-white"><code>{{ code }}</code></pre>
    <div v-if="isSupported" class="btn btn-info btn-xs absolute right-1 top-1" @click="copy(code)">
      {{ copied ? "Copied!" : "Copy" }}
    </div>
  </div>
</template>
