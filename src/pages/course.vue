<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div>
    <course-top-bar :name="route.params.name" />
    <div class="flex">
      <course-side-bar :name="route.params.name" />
      <router-view />
    </div>
  </div>
</template>
