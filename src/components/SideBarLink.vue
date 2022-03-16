<script setup lang="ts">
defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="btn btn-primary rounded-none p-2" @click="$router.push(to)">
    <div class="flex flex-col items-center">
      <slot />
    </div>
  </div>
</template>
