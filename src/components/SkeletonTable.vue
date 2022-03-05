<script setup lang="ts">
defineProps({
  header: {
    type: Boolean,
    default: true,
  },
  row: {
    type: Number,
    default: 3,
  },
  col: {
    type: Number,
    default: 3,
  },
});
</script>

<template>
  <table class="table w-full animate-pulse">
    <thead v-if="header">
      <tr>
        <th v-for="i in Math.max(col, 1)" />
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in Math.max(row, 1)">
        <td v-for="j in Math.max(col, 1)" class="py-6">
          <div class="h-4 w-1/5 rounded bg-slate-300" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
