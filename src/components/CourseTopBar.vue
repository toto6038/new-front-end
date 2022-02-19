<script setup lang="ts">
defineProps({
  name: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="navbar border-b border-gray-600 px-6">
    <div class="breadcrumbs flex-1 text-sm">
      <ul>
        <li><a>Home</a></li>
        <li><a>Documents</a></li>
        <li>Add Document</li>
      </ul>
    </div>
    <div class="flex flex-1 justify-center">{{ name }}</div>
    <div class="flex-1" />
  </div>
</template>
