<script setup lang="ts">
import { useAxios } from "@vueuse/integrations/useAxios";
import { useRoute } from "vue-router";
import { fetcher } from "@/models/api";
import { useTitle } from "@vueuse/core";

const route = useRoute();
useTitle(`Problem - ${route.params.id} - ${route.params.name} | Normal OJ`);
const { data: problem, error, isLoading } = useAxios<Problem>(`/problem/view/${route.params.id}`, fetcher);
</script>

<template>
  <div class="card-container pb-40">
    <problem-card :problem="problem" :isLoading="isLoading" :error="error" />
  </div>
</template>
