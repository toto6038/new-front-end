<script setup lang="ts">
import { useTitle } from "@vueuse/core";
import { useAxios } from "@vueuse/integrations/useAxios";
import { useRoute } from "vue-router";
import { fetcher } from "../../models/api";

const route = useRoute();
useTitle(`Announcement - ${route.params.id} | Normal OJ`);
const {
  data: announcements,
  error,
  isLoading,
} = useAxios<AnnouncementList>(`/ann/${route.params.id}`, fetcher);
</script>

<template>
  <div class="mx-auto flex max-w-7xl gap-8 p-4">
    <router-link class="btn-sm btn mb-10" to="/">
      <i-uil-left-arrow-to-left class="mr-1" /> Back
    </router-link>

    <announcement-card
      :isLoading="isLoading"
      :error="error"
      :announcement="announcements && announcements[0]"
    />
  </div>
</template>
