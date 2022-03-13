<script setup lang="ts">
import { useTitle } from "@vueuse/core";
import { useAxios } from "@vueuse/integrations/useAxios";
import { useRoute } from "vue-router";
import { fetcher } from "../../models/api";

useTitle("Announcements | Normal OJ");
const route = useRoute();
const { data: posts, error, isLoading } = useAxios(`/ann/${route.params.id}`, fetcher);
</script>

<template>
  <div class="mx-auto flex max-w-7xl gap-8 p-4">
    <div class="btn btn-sm mb-10" @click="$router.push('/')">
      <i-uil-left-arrow-to-left class="mr-1" /> Back
    </div>

    <post-card :isLoading="isLoading" :error="error" :post="posts && posts[0]" />
  </div>
</template>
