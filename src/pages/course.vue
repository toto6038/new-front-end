<script setup lang="ts"></script>

<template>
  <course-top-bar />
  <div class="flex">
    <course-side-bar />
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>
