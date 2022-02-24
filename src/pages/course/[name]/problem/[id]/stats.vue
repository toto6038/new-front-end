<script setup lang="ts">
import { ref, computed } from "vue";
import { use } from "echarts/core";
import VChart from "vue-echarts";
import { TooltipComponent, LegendComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import submissions from "./data.json";
import { formatTime } from "../../../../../utils/formatTime";
import { useThemeStore } from "../../../../../stores/theme";
import { SUBMISSION_COLOR, SUBMISSION_STATUS } from "../../../../../constants";

use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout]);

const themeStore = useThemeStore();
const triedUsernames = ref<string[]>([]);
const ACUsernames = ref<string[]>([]);
const ACSubmissions = ref<unknown[]>([]);
const scoreSum = ref<number>(0);
const resultCounts = ref<{ name: string; value: number }[]>(
  SUBMISSION_STATUS.map((status, index) => ({
    name: status,
    value: 0,
    itemStyle: { color: SUBMISSION_COLOR[index] },
  })),
);

for (const submission of submissions) {
  if (submission.status === 0) {
    ACUsernames.value.push(submission.user.username);
    ACSubmissions.value.push(submission);
  } else {
    triedUsernames.value.push(submission.user.username);
  }
  resultCounts.value[submission.status + 1].value++;
  scoreSum.value += submission.score;
}

const numOfUsersTried = new Set(triedUsernames.value).size;
const numOfACUsers = new Set(ACUsernames.value).size;
const avgScore = scoreSum.value / submissions.length;
const top10RunTimeSubmissions = submissions.sort((a, b) => a.runTime - b.runTime).slice(0, 10);
const top10MemoryUsageSubmissions = submissions.sort((a, b) => a.memoryUsage - b.memoryUsage).slice(0, 10);
const option = computed(() => {
  return {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "0",
      data: resultCounts.value.filter((item) => item.value > 0).map((item) => item.name),
    },
    series: [
      {
        name: "Submission Result",
        type: "pie",
        radius: ["30%", "70%"],
        data: resultCounts.value.filter((item) => item.value > 0),
      },
    ],
    textStyle: {
      fontSize: 14,
    },
  };
});
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <h2 class="card-title md:text-2xl lg:text-3xl">Stats for problem #{{ $route.params.id }}</h2>

        <div class="stats stats-vertical mt-4 lg:stats-horizontal">
          <div class="stat place-items-center">
            <div class="stat-title">Num of users tried</div>
            <div class="stat-value">{{ numOfUsersTried }}</div>
          </div>
          <div class="stat place-items-center">
            <div class="stat-title">Num of AC users</div>
            <div class="stat-value">{{ numOfACUsers }}</div>
          </div>
          <div class="stat place-items-center">
            <div class="stat-title">Average Score</div>
            <div class="stat-value">{{ avgScore.toFixed(2) }}</div>
          </div>
        </div>

        <div class="mt-10 flex justify-center">
          <v-chart
            class="mx-auto h-[400px] w-[600px] lg:w-[1000px]"
            :theme="themeStore.isDark ? 'dark' : ''"
            :option="option"
          />
        </div>

        <h2 class="card-title mb-2 md:text-xl lg:text-2xl">Top 10 Run Time</h2>
        <table class="table-compact mb-10 table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Run Time</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(subm, index) in top10RunTimeSubmissions">
              <td>{{ index + 1 }}</td>
              <td>{{ subm.user.username }}</td>
              <td>{{ subm.runTime }} ms</td>
              <td>{{ formatTime(subm.timestamp) }}</td>
            </tr>
          </tbody>
        </table>

        <h2 class="card-title mb-2 md:text-xl lg:text-2xl">Top 10 Memory Usage</h2>
        <table class="table-compact mb-10 table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Memory Usage</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(subm, index) in top10MemoryUsageSubmissions">
              <td>{{ index + 1 }}</td>
              <td>{{ subm.user.username }}</td>
              <td>{{ subm.memoryUsage }} KB</td>
              <td>{{ formatTime(subm.timestamp) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
