<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { use } from "echarts/core";
import VChart from "vue-echarts";
import { TooltipComponent, LegendComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { formatTime } from "../../../../../utils/formatTime";
import { useTheme } from "../../../../../stores/theme";
import { SUBMISSION_COLOR, SUBMISSION_STATUS } from "../../../../../constants";
import { useAxios } from "@vueuse/integrations/useAxios";
import { useRoute } from "vue-router";
import queryString from "query-string";
import { fetcher } from "../../../../../models/api";
import { useTitle } from "@vueuse/core";

const route = useRoute();
useTitle(`Problem Stats - ${route.params.id} - ${route.params.name} | Normal OJ`);
const { data, error, isLoading } = useAxios(
  `/submission?${queryString.stringify({
    offset: 0,
    count: -1,
    course: route.params.name as string,
    problemId: Number(route.params.id),
  })}`,
  fetcher,
);
const submissions = computed<Submission[]>(() => (data.value as any)?.submissions || []);

use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout]);

const theme = useTheme();
const resultCounts = ref(
  SUBMISSION_STATUS.map((status, index) => ({
    name: status,
    value: 0,
    itemStyle: { color: SUBMISSION_COLOR[index] },
  })),
);
const numOfUsersTried = ref<number>(-1);
const numOfACUsers = ref<number>(-1);
const avgScore = ref<number>(-1);
const top10RunTime = ref<Submission[]>([]);
const top10MemoryUsage = ref<Submission[]>([]);

watchEffect(() => {
  const ACSubmissions: Submission[] = [];
  const triedUsernames: string[] = [];
  let scoreSum: number = 0;
  resultCounts.value = resultCounts.value.map((v) => ({ ...v, value: 0 }));
  for (const submission of submissions.value) {
    if (submission.status === 0) {
      ACSubmissions.push(submission);
    } else {
      triedUsernames.push(submission.user.username);
    }
    resultCounts.value[submission.status + 1].value++;
    scoreSum += submission.score;
  }
  numOfUsersTried.value = new Set(triedUsernames).size;
  ACSubmissions.forEach((v) => {
    if (v.user.username === "91099208Y") {
      console.log(v);
    }
  });
  const ACUsernames: string[] = ACSubmissions.map((v) => v.user.username);
  numOfACUsers.value = new Set(ACUsernames).size;
  avgScore.value = scoreSum / submissions.value.length;
  top10RunTime.value = ACSubmissions.sort((a, b) => a.runTime - b.runTime).slice(0, 10);
  top10MemoryUsage.value = ACSubmissions.sort((a, b) => a.memoryUsage - b.memoryUsage).slice(0, 10);
});

const option = computed(() => ({
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
}));
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title md:text-2xl lg:text-3xl">Stats for problem #{{ $route.params.id }}</div>

        <div class="my-2" />

        <skeleton-card v-if="isLoading" />
        <div v-else-if="error" class="alert alert-error shadow-lg">
          <div>
            <i-uil-times-circle />
            <span>Oops! Something went wrong when loading problem stats.</span>
          </div>
        </div>
        <template v-else>
          <div class="stats stats-vertical lg:stats-horizontal">
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
              :theme="theme.isDark ? 'dark' : ''"
              :option="option"
            />
          </div>
        </template>

        <div class="my-2" />

        <div class="card-title md:text-xl lg:text-2xl">Top 10 Run Time</div>
        <div class="my-1" />
        <skeleton-table v-if="isLoading" :col="4" :row="10" />
        <table v-else class="table-compact table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Run Time</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(subm, index) in top10RunTime">
              <td>{{ index + 1 }}</td>
              <td>{{ subm.user.username }}</td>
              <td>{{ subm.runTime }} ms</td>
              <td>{{ formatTime(subm.timestamp) }}</td>
            </tr>
          </tbody>
        </table>

        <div class="my-5" />

        <div class="card-title md:text-xl lg:text-2xl">Top 10 Memory Usage</div>
        <div class="my-1" />
        <skeleton-table v-if="isLoading" :col="4" :row="10" />
        <table v-else class="table-compact table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Memory Usage</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(subm, index) in top10MemoryUsage">
              <td>{{ index + 1 }}</td>
              <td>{{ subm.user.username }}</td>
              <td>{{ subm.memoryUsage }} KB</td>
              <td>{{ formatTime(subm.timestamp) }}</td>
            </tr>
          </tbody>
        </table>

        <div class="my-5" />
      </div>
    </div>
  </div>
</template>
