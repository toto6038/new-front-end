<script setup lang="ts">
import { useTitle } from "@vueuse/core";
import { useAxios } from "@vueuse/integrations/useAxios";
import { useRoute } from "vue-router";
import { fetcher } from "../../../../../models/api";

const route = useRoute();
useTitle(`Announcement - ${route.params.id} - ${route.params.name} | Normal OJ`);
const {
  data: posts,
  error,
  isLoading,
} = useAxios<PostList>(`/ann/${route.params.name}/${route.params.id}`, fetcher);
</script>

<template>
  <div class="mx-auto flex max-w-7xl gap-8 p-4">
    <post-card :isLoading="isLoading" :error="error" :post="posts && posts[0]" />
  </div>
</template>
