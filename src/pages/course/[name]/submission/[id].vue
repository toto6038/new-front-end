<script setup lang="ts">
import { LANG } from "../../../../constants";
import { formatTime } from "../../../../utils/formatTime";
import { useClipboard } from "@vueuse/core";
import { useAxios } from "@vueuse/integrations/useAxios";
import { useRoute } from "vue-router";
import { fetcher } from "../../../../models/api";
import { useSession } from "../../../../stores/session";
import { ref, watchEffect } from "vue";

const session = useSession();
const route = useRoute();
const {
  data: submission,
  error,
  isLoading,
} = useAxios<Submission>(`/submission/${route.params.id}`, fetcher);
const { copy, copied, isSupported } = useClipboard();

const expandTasks = ref<boolean[]>([]);

watchEffect(() => {
  if (submission.value != null && submission.value.tasks) {
    expandTasks.value = submission.value.tasks.map(() => false);
  }
});
</script>

<template>
  <div class="card-container pb-40">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="flex flex-wrap items-start justify-between">
          <div class="flex flex-col gap-4">
            <div class="card-title md:text-2xl lg:text-3xl">Submission {{ $route.params.id }}</div>
          </div>

          <div
            v-if="session.isAdmin"
            class="btn md:btn-md"
            @click="$router.push(`/course/${$route.params.name}/problem/${$route.params.id}/submit`)"
          >
            <i-uil-repeat class="mr-1" /> Rejudge
          </div>
        </div>

        <div class="divider" />

        <div class="card min-w-full rounded-none">
          <div class="card-body p-0">
            <div class="card-title mb-2 md:text-xl lg:text-2xl">General</div>
            <skeleton-table v-if="isLoading || !submission" :col="8" :row="1" />
            <div v-else-if="error" class="alert alert-error shadow-lg">
              <div>
                <i-uil-times-circle />
                <span>Oops! Something went wrong when loading submission.</span>
              </div>
            </div>
            <table v-else class="mb-10 table w-full">
              <thead>
                <tr>
                  <th>Problem</th>
                  <th>Username</th>
                  <th>Status</th>
                  <th>Run Time</th>
                  <th>Memory</th>
                  <th>Score</th>
                  <th>Lang</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ submission.problemId }}</td>
                  <td>{{ submission.user.username }}</td>
                  <td><judge-status :status="submission.status" /></td>
                  <td>{{ submission.runTime }} ms</td>
                  <td>{{ submission.memoryUsage }} KB</td>
                  <td>{{ submission.score }}</td>
                  <td>{{ LANG[submission.languageType] }}</td>
                  <td>{{ formatTime(submission.timestamp) }}</td>
                </tr>
              </tbody>
            </table>

            <div class="card-title mb-2 md:text-xl lg:text-2xl">Detail</div>
            <skelecton-table v-if="isLoading || !submission" :col="5" :row="5" />
            <table
              v-else
              class="table-compact mb-10 table w-full"
              v-for="(task, taskIndex) in submission.tasks"
            >
              <thead>
                <tr>
                  <th>#{{ taskIndex }}</th>
                  <th>Status</th>
                  <th>Run Time</th>
                  <th>Memory</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Overall</td>
                  <td><judge-status :status="task.status" /></td>
                  <td>{{ task.execTime }} ms</td>
                  <td>{{ task.memoryUsage }} KB</td>
                  <td>{{ task.score }}</td>
                </tr>
                <tr>
                  <td colspan="5">
                    <div
                      class="btn-outline btn btn-block btn-sm w-full"
                      @click="expandTasks[taskIndex] = !expandTasks[taskIndex]"
                    >
                      {{ expandTasks[taskIndex] ? "Hide all results" : "Show all results" }}
                    </div>
                  </td>
                </tr>
                <tr v-show="expandTasks[taskIndex]" v-for="(taskcase, caseIndex) in task.cases">
                  <td>{{ taskIndex }}-{{ caseIndex }}</td>
                  <td><judge-status :status="taskcase.status" /></td>
                  <td>{{ taskcase.execTime }} ms</td>
                  <td>{{ taskcase.memoryUsage }} KB</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <skeleton-card v-if="isLoading || !submission" />
        <div v-else class="card min-w-full rounded-none">
          <div class="card-body p-0">
            <div class="card-title mb-2 md:text-xl lg:text-2xl">
              Source
              <!-- ts check bug in `copy(submission.code)` -->
              <div v-if="isSupported" class="btn btn-info btn-xs ml-3" @click="copy(submission?.code || '')">
                {{ copied ? "Copied!" : "Copy" }}
              </div>
            </div>
            <code-editor v-model="submission.code" readonly />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
