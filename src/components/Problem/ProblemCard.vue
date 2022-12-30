<script setup lang="ts">
interface Props {
  problem: Problem;
  isLoading?: boolean;
  error?: any;
  preview?: boolean;
}
withDefaults(defineProps<Props>(), {
  isLoading: false,
  error: null,
  preview: false,
});
</script>

<template>
  <div class="card min-w-full">
    <div class="card-body">
      <skeleton-post v-if="isLoading || !problem" class="w-1/2" />
      <div v-else-if="error" class="alert alert-error shadow-lg">
        <div>
          <i-uil-times-circle />
          <span>Oops! Something went wrong when loading announcements.</span>
        </div>
      </div>

      <template v-else>
        <div class="flex flex-wrap items-start justify-between gap-y-4">
          <div class="flex flex-col gap-4">
            <div class="card-title md:text-2xl lg:text-3xl">
              Problem #{{ $route.params.id }} - {{ problem.problemName }}
            </div>
            <div class="flex">
              <span class="badge-info badge mr-1" v-for="tag in problem.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-y-4">
            <div class="stats">
              <div class="stat place-items-center py-0">
                <div class="stat-title">Quota</div>
                <div class="stat-value">
                  <span>{{ problem.quota - problem.submitCount }}</span>
                  <span class="text-sm font-normal">{{ ` / ${problem.quota}` }}</span>
                </div>
              </div>
              <div class="stat place-items-center py-0">
                <div class="stat-title">Score</div>
                <div class="stat-value">
                  <span>{{ problem.highScore }}</span>
                  <span class="text-sm font-normal">{{ " / 100" }}</span>
                </div>
              </div>
            </div>
            <router-link
              v-if="!preview"
              class="btn ml-3 md:btn-md lg:btn-lg"
              :to="`/course/${$route.params.name}/problem/${$route.params.id}/submit`"
            >
              <i-uil-file-upload-alt class="mr-1 lg:h-5 lg:w-5" /> Submit
            </router-link>
            <router-link
              v-if="!preview"
              class="btn ml-3 md:btn-md lg:btn-lg"
              :to="`/course/${$route.params.name}/problem/${$route.params.id}/stats`"
            >
              <i-uil-chart-line class="mr-1 lg:h-5 lg:w-5" /> Stats
            </router-link>
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
      </template>
    </div>
  </div>
</template>
