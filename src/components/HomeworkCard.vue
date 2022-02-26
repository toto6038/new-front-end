<script setup lang="ts">
import { computed } from "vue";
import { formatTime } from "../utils/formatTime";

const props = defineProps({
  homework: {
    type: Object,
    required: true,
  },
  preview: {
    type: Boolean,
    default: false,
  },
});

const STATUS_LABEL = {
  RUNNING: "RUNNING",
  NOT_START: "NOT START",
  OVER: "OVER",
};
const STATUS_CLASS = {
  [STATUS_LABEL.RUNNING]: "badge-success",
  [STATUS_LABEL.NOT_START]: "",
  [STATUS_LABEL.OVER]: "badge-error",
};

const state = computed(() => {
  const { start, end } = props.homework;
  const now = Date.now();
  if (now < start * 1000) {
    return STATUS_LABEL.NOT_START;
  }
  if (now > end * 1000) {
    return STATUS_LABEL.OVER;
  }
  return STATUS_LABEL.RUNNING;
});
props.homework.start;
</script>

<template>
  <div class="card mx-auto w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="flex items-start justify-between">
        <h2 class="lg:text-2x card-title mb-8 md:text-xl">
          {{ homework.name }}
          <div :class="['badge', STATUS_CLASS[state]]">{{ state }}</div>
        </h2>
        <due-countdown v-if="state === STATUS_LABEL.RUNNING" class="mt-2" :due="homework.end" />
      </div>

      <div class="flex flex-wrap lg:flex-nowrap lg:gap-x-8">
        <div class="mb-8 w-full lg:flex-1">
          <h3 class="card-title">Availability</h3>
          <div class="mt-2 flex flex-wrap overflow-x-auto lg:flex-nowrap">
            <table class="table-compact table w-full">
              <thead>
                <tr>
                  <th>Allow submissions from</th>
                  <th>Due</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ formatTime(homework.start) }}</td>
                  <td>{{ formatTime(homework.end) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="mb-8 w-full lg:flex-1">
          <h3 class="card-title">Problems</h3>
          <table class="table-compact mt-2 table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>PID</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(pid, index) in homework.problemIds">
                <td>{{ String.fromCharCode(65 + index) }}</td>
                <td>{{ pid }}</td>
                <td>100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex flex-wrap lg:flex-nowrap lg:gap-x-8">
        <div class="w-full lg:flex-1">
          <h3 class="card-title">Description</h3>
          <markdown-renderer class="mt-2" :md="homework.markdown" />
        </div>
      </div>

      <div v-if="homework.id && !preview" class="card-actions justify-end">
        <div
          class="btn mr-3"
          @click="$router.push(`/course/${$route.params.name}/homeworks/${homework.id}/edit`)"
        >
          <i-uil-edit class="mr-1 lg:h-5 lg:w-5" /> Edit
        </div>
        <div
          class="btn"
          @click="$router.push(`/course/${$route.params.name}/homeworks/${homework.id}/stats`)"
        >
          <i-uil-chart-line class="mr-1 lg:h-5 lg:w-5" /> Stats
        </div>
      </div>
    </div>
  </div>
</template>
