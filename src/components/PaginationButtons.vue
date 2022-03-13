<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  maxPage: {
    type: Number,
    required: true,
  },
  radius: {
    type: Number,
    default: 2,
  },
});
const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const leftTruncated = computed(() => {
  return props.modelValue - props.radius - 1 > 2;
});
const rightTruncated = computed(() => {
  return props.maxPage - (props.modelValue + props.radius) > 2;
});
const pages = computed(() => {
  const l = leftTruncated.value ? props.modelValue - props.radius : 1;
  const r = rightTruncated.value ? props.modelValue + props.radius : props.maxPage;
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
    <button
      :class="['btn', modelValue === 1 ? 'btn-disabled' : 'btn-outline']"
      @click="navigateTo(modelValue - 1)"
    >
      «
    </button>
    <template v-if="leftTruncated">
      <button class="btn-outline btn" @click="navigateTo(1)">1</button>
      <button class="btn-disabled btn">...</button>
    </template>

    <template v-for="p in pages">
      <button :class="['btn-outline btn', modelValue === p && 'bg-blue-400']" @click="navigateTo(p)">
        {{ p }}
      </button>
    </template>

    <template v-if="rightTruncated">
      <button class="btn-disabled btn">...</button>
      <button class="btn-outline btn" @click="navigateTo(maxPage)">{{ maxPage }}</button>
    </template>
    <button
      :class="['btn', modelValue === maxPage ? 'btn-disabled' : 'btn-outline']"
      @click="navigateTo(modelValue + 1)"
    >
      »
    </button>
  </div>
</template>
