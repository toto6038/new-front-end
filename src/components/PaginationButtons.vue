<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue: number;
  maxPage: number;
  radius: number;
}
const { modelValue, maxPage, radius = 2 } = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const leftTruncated = computed(() => {
  return modelValue - radius - 1 > 2;
});
const rightTruncated = computed(() => {
  return maxPage - (modelValue + radius) > 2;
});
const pages = computed(() => {
  const l = leftTruncated.value ? modelValue - radius : 1;
  const r = rightTruncated.value ? modelValue + radius : maxPage;
  const arr = [];
  for (let i = l; i <= r; ++i) arr.push(i);
  return arr;
});

function navigateTo(page: number) {
  emit("update:modelValue", page);
}
</script>

<template>
  <div class="btn-group">
    <button :class="['btn', { 'btn-disabled': modelValue === 1 }]" @click="navigateTo(modelValue - 1)">
      «
    </button>
    <template v-if="leftTruncated">
      <button class="btn" @click="navigateTo(1)">1</button>
      <button class="btn-disabled btn">...</button>
    </template>

    <template v-for="p in pages">
      <button :class="['btn', modelValue === p && 'btn-info']" @click="navigateTo(p)">
        {{ p }}
      </button>
    </template>

    <template v-if="rightTruncated">
      <button class="btn-disabled btn">...</button>
      <button class="btn" @click="navigateTo(maxPage)">{{ maxPage }}</button>
    </template>
    <button :class="['btn', { 'btn-disabled': modelValue === maxPage }]" @click="navigateTo(modelValue + 1)">
      »
    </button>
  </div>
</template>
