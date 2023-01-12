<script setup lang="ts">
import { ref, reactive } from "vue";
import { useTitle } from "@vueuse/core";
import { useRoute } from "vue-router";

const route = useRoute();
useTitle(`Edit Problem - ${route.params.id} - ${route.params.name} | Normal OJ`);
const problem: ProblemForm = {
  allowedLanguage: 3,
  // courses: ["Algorithm2021"],
  // defaultCode: "",
  // owner: "TA_TzuWei_Yu",
  // submitCount: 0,
  description: {
    description:
      "Welcome to the course! We prepared a simple problem for you to warm up, and familiar with the interface of Normal Online Judge also.\n\nInstead of the A+B problem (it's too boring right? even your grandma can solve it), we are going to solve a problem about [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).\n\nGiven the $n$-th and $(n+1)$-th Fibonacci number, answer the $(n+2)$-th Fibonacci number.",
    hint: "wolfrevo",
    input:
      "The first line contains a single number $N$.\nFor the next $N$ lines, each line contains two space-separated numbers $F_n$ and $F_{n+1}$, representing the $n$-th and $(n+1)$-th Fibonacci number.\n\nFor all test data, it is guaranteed:\n- $1 \\leq N \\leq 10^5$\n- $0 \\leq F_n,\\ F_{n+1} \\leq 2^{31}-1$\n#### Subtask1 (50%)\n- $0 \\leq F_n,\\ F_{n+1} \\leq 10$\n#### Subtask2 (50%)\n- No other restrictions.\n",
    output: "For $N$ lines of input, output the answers in each line respectively.\n",
    sampleInput: ["1\n3 5", "2\n13 21\n39088169 63245986"],
    sampleOutput: ["8", "34\n102334155"],
  },
  problemName: "Getting Started",
  quota: 10,
  status: ProblemStatus.Offline,
  tags: ["HW0"],
  testCase: [
    { caseCount: 10, memoryLimit: 134218, taskScore: 50, timeLimit: 1000 },
    { caseCount: 10, memoryLimit: 134218, taskScore: 50, timeLimit: 1000 },
  ],
  type: 0,
};
const editedProblem = reactive<ProblemForm>({ ...problem });

function update<K extends keyof ProblemForm>(key: K, value: ProblemForm[K]) {
  editedProblem[key] = value;
}

const openPreview = ref<boolean>(false);
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title mb-3 justify-between">
          Edit Problem
          <button class="btn"><i-uil-file-upload-alt class="mr-1 lg:h-5 lg:w-5" /> Submit</button>
        </div>

        <div class="alert alert-warning">
          <div>
            <i-uil-exclamation-octagon />
            <span>This page in under development</span>
          </div>
        </div>

        <!-- <problem-form :value="editedProblem" @update="update" /> -->

        <div class="divider" />

        <div class="card-title mb-3">
          Preview
          <input v-model="openPreview" type="checkbox" class="toggle" />
        </div>

        <!-- <problem-card v-show="openPreview" :problem="editedProblem" preview /> -->
      </div>
    </div>
  </div>
</template>
