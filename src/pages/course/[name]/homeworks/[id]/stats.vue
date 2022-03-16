<script setup lang="ts">
import { useTitle } from "@vueuse/core";
import { useRoute } from "vue-router";

const route = useRoute();
useTitle(`Homework Stats - ${route.params.id} - ${route.params.name} | Normal OJ`);
</script>

<template>hw stats</template>
