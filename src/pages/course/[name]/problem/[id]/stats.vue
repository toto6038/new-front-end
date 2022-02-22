<script setup lang="ts">
import { ref } from "vue";
import { use } from "echarts/core";
import VChart from "vue-echarts";
import { TooltipComponent, LegendComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import submissions from "./data.json";

use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout]);

const triedUsernames = ref<string[]>([]);
const ACUsernames = ref<string[]>([]);
const scoreSum = ref<number>(0);
const resultCounts = ref<{ name: string; value: number }[]>([
  { value: 0, name: "Pending" },
  { value: 0, name: "Accepted" },
  { value: 0, name: "Wrong Answer" },
  { value: 0, name: "Compile Error" },
  { value: 0, name: "Time Limit Exceed" },
  { value: 0, name: "Memory Limit Exceed" },
  { value: 0, name: "Runtime Error" },
  { value: 0, name: "Judge Error" },
  { value: 0, name: "Output Limit Exceed" },
]);

for (const submission of submissions) {
  if (submission.status === 0) {
    ACUsernames.value.push(submission.user.username);
  } else {
    triedUsernames.value.push(submission.user.username);
  }
  resultCounts.value[submission.status + 1].value++;
  scoreSum.value += submission.score;
}

const numOfUsersTried = new Set(triedUsernames.value).size;
const numOfACUsers = new Set(ACUsernames.value).size;
const avgScore = scoreSum.value / submissions.length;

const option = ref({
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
          <v-chart class="mx-auto h-[400px] w-[600px] lg:w-[1000px]" :option="option" />
        </div>
      </div>
    </div>
  </div>
</template>
