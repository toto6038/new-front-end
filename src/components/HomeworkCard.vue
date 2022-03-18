<script setup lang="ts">
import { computed } from "vue";
import { useSession } from "../stores/session";
import { formatTime } from "../utils/formatTime";

const props = defineProps({
  homework: {
    type: Object,
    required: true,
  },
  problems: {
    type: Object,
    required: true,
  },
  preview: {
    type: Boolean,
    default: false,
  },
});

const session = useSession();
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
</script>

<template>
  <div class="card mx-auto w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="flex items-start justify-between">
        <div class="lg:text-2x card-title mb-8 md:text-xl">
          {{ homework.name }}
          <div :class="['badge', STATUS_CLASS[state]]">{{ state }}</div>
        </div>
        <due-countdown v-if="state === STATUS_LABEL.RUNNING" class="mt-2" :due="homework.end" />
      </div>

      <div class="flex flex-wrap lg:flex-nowrap lg:gap-x-8">
        <div class="mb-8 w-full lg:flex-[2_1_0%]">
          <div class="card-title">Availability</div>
          <div class="mt-2 flex flex-wrap overflow-x-auto lg:flex-nowrap">
            <table class="table-compact table w-full">
              <thead>
                <tr>
                  <th>From</th>
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

        <div class="mb-8 w-full lg:flex-[3_1_0%]">
          <div class="card-title">Problems</div>
          <table class="table-compact mt-2 table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>PID</th>
                <th>Name</th>
                <th>Quota</th>
                <th>Score</th>
                <th>Stats</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(pid, index) in homework.problemIds">
                <td>{{ index + 1 }}</td>
                <td>
                  <a class="link" :href="`/course/${$route.params.name}/problem/${pid}`">{{ pid }}</a>
                </td>
                <td>
                  <ui-spinner v-if="!problems[pid.toString()]" />
                  <span v-else>{{ (problems[pid.toString()] as any).name }}</span>
                </td>
                <td>
                  <ui-spinner v-if="!problems[pid.toString()]" />
                  <span v-else>{{ (problems[pid.toString()] as any).quota }}</span>
                </td>
                <td>
                  {{
                    (
                      homework.studentStatus[session.username] &&
                      homework.studentStatus[session.username][pid.toString()]
                    )?.score || "-"
                  }}
                </td>
                <td>
                  <div class="tooltip" data-tip="Stats">
                    <div
                      class="btn btn-ghost btn-xs"
                      @click="$router.push(`/course/${$route.params.name}/problem/${pid}/stats`)"
                    >
                      <i-uil-chart-line class="lg:h-5 lg:w-5" />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex flex-wrap lg:flex-nowrap lg:gap-x-8">
        <div class="w-full lg:flex-1">
          <div class="card-title">Description</div>
          <markdown-renderer class="mt-2" :md="homework.markdown" />
        </div>
      </div>

      <div v-if="homework.id && !preview && session.isAdmin" class="card-actions justify-end">
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
