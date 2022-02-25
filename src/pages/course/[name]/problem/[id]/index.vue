<script setup lang="ts">
const problem = {
  allowedLanguage: 3,
  courses: ["Algorithm2021"],
  defaultCode: "",
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
  owner: "TA_TzuWei_Yu",
  problemName: "Getting Started",
  quota: 10,
  status: 0,
  submitCount: 0,
  tags: ["HW0"],
  testCase: [
    { caseCount: 10, memoryLimit: 134218, taskScore: 50, timeLimit: 1000 },
    { caseCount: 10, memoryLimit: 134218, taskScore: 50, timeLimit: 1000 },
  ],
  type: 0,
};
</script>

<template>
  <div class="card-container pb-40">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="flex flex-wrap items-start justify-between">
          <div class="flex flex-col gap-4">
            <h2 class="card-title md:text-2xl lg:text-3xl">
              Problem #{{ $route.params.id }} - {{ problem.problemName }}
            </h2>
            <span class="badge badge-info mr-1" v-for="tag in problem.tags" :key="tag">{{ tag }}</span>
          </div>

          <div class="flex items-center">
            <div class="stats">
              <div class="stat py-0">
                <div class="stat-title">Quota</div>
                <div class="stat-value">{{ problem.quota }}</div>
              </div>
            </div>
            <div
              class="btn ml-3 md:btn-md lg:btn-lg"
              @click="$router.push(`/course/${$route.params.name}/problem/${$route.params.id}/submit`)"
            >
              <i-uil-file-upload-alt class="mr-1 lg:h-5 lg:w-5" /> Submit
            </div>
            <div
              class="btn ml-3 md:btn-md lg:btn-lg"
              @click="$router.push(`/course/${$route.params.name}/problem/${$route.params.id}/stats`)"
            >
              <i-uil-chart-line class="mr-1 lg:h-5 lg:w-5" /> Stats
            </div>
          </div>
        </div>

        <div class="divider" />

        <div class="card min-w-full rounded-none">
          <div class="card-body p-0">
            <div class="card-title md:text-xl lg:text-2xl">Description</div>
            <markdown-renderer class="mb-10" :md="problem.description.description" />

            <div class="card-title md:text-xl lg:text-2xl">Input</div>
            <markdown-renderer class="mb-10" :md="problem.description.input" />

            <div class="card-title md:text-xl lg:text-2xl">Output</div>
            <markdown-renderer class="mb-10" :md="problem.description.output" />

            <div class="card-title md:text-xl lg:text-2xl">Examples</div>
            <div class="mb-10">
              <table class="table w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Input</th>
                    <th>Output</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="i in problem.description.sampleInput.length">
                    <td class="align-top">{{ i }}</td>
                    <td class="align-top">
                      <sample-code-block :code="problem.description.sampleInput[i - 1]"></sample-code-block>
                    </td>
                    <td class="align-top">
                      <sample-code-block :code="problem.description.sampleOutput[i - 1]"></sample-code-block>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="card-title md:text-xl lg:text-2xl">Hint</div>
            <markdown-renderer class="mb-10" :md="problem.description.hint" />

            <div class="card-title md:text-xl lg:text-2xl">Subtasks</div>
            <table class="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Time Limit</th>
                  <th>Memory Limit</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="({ memoryLimit, timeLimit, taskScore }, index) in problem.testCase" :key="index">
                  <td>{{ index }}</td>
                  <td>{{ timeLimit }} ms</td>
                  <td>{{ memoryLimit }} KB</td>
                  <td>{{ taskScore }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
