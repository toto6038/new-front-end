<script setup lang="ts">
import { computed } from "vue";
import dayjs from "dayjs";

const props = defineProps({
  homework: {
    type: Object,
    required: true,
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

const formatTime = (time: number) => {
  return dayjs(time * 1000).format("YYYY-MM-DD HH:mm");
};
</script>

<template>
  <div class="card mx-auto w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">
        {{ homework.name }}
        <div :class="['badge', STATUS_CLASS[state]]">{{ state }}</div>
      </h2>

      <due-countdown v-if="state !== STATUS_LABEL.NOT_START" :due="homework.end" />

      <div class="mt-2 overflow-x-auto">
        <table class="table-compact table w-full">
          <thead>
            <tr>
              <th>Start</th>
              <th>End</th>
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

      <markdown-renderer :md="homework.markdown" />

      <div class="card-actions justify-end">
        <div class="btn">View Stats</div>
      </div>
    </div>
  </div>
</template>
