<script setup lang="ts">
import { SUBMISSION_STATUS, SUBMISSION_COLOR } from "../constants";
defineProps({
  status: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <span :style="{ color: SUBMISSION_COLOR[status + 1] }">
    {{ SUBMISSION_STATUS[status + 1] }}
  </span>
</template>
