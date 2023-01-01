<script setup lang="ts">
import { SUBMISSION_STATUS_CODES, SUBMISSION_STATUS_COLORS } from "../constants";

interface Props {
  status: SubmissionStatusCode;
}
defineProps<Props>();
</script>

<template>
  <span :style="{ color: SUBMISSION_STATUS_COLORS[`${status}`] }">
    {{ SUBMISSION_STATUS_CODES[`${status}`] }}
  </span>
</template>
