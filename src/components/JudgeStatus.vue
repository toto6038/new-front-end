<script setup lang="ts">
defineProps({
  status: {
    type: Number,
    required: true,
  },
});

const SUBMISSION_STATUS: { [k: string]: string } = {
  "-1": "Pending",
  "0": "Accepted",
  "1": "Wrong Answer",
  "2": "Compile Error",
  "3": "Time Limit Exceed",
  "4": "Memory Limit Exceed",
  "5": "Runtime Error",
  "6": "Judge Error",
  "7": "Output Limit Exceed",
};

const SUBMISSION_COLOR: { [k: string]: string } = {
  "-1": "#9e675a",
  "0": "#00C853",
  "1": "#F44336",
  "2": "#DD2C00",
  "3": "#9c56a8",
  "4": "#FF9800",
  "5": "#2196F3",
  "6": "#a65a5c",
  "7": "#BF360C",
};
</script>

<template>
  <span :style="{ color: SUBMISSION_COLOR[String(status)] }">
    {{ SUBMISSION_STATUS[`${status}`] }}
  </span>
</template>
