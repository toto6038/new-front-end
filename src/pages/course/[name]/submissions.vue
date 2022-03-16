<script setup lang="ts">
import { useAxios } from "@vueuse/integrations/useAxios";
import { useRoute } from "vue-router";
import { computed, reactive, ref, watchEffect } from "vue";
import queryString from "query-string";
import { fetcher } from "../../../models/api";
import { useSession } from "../../../stores/session";
import { LANG, SUBMISSION_STATUS } from "../../../constants";
import { formatTime } from "../../../utils/formatTime";
import { timeFromNow } from "../../../utils/timeFromNow";
import { useTitle } from "@vueuse/core";

const route = useRoute();
const session = useSession();
useTitle(`Submissions - ${route.params.name} | Normal OJ`);

const page = ref(1);
const searchUsername = ref("");
const filter = reactive<UserDefinedSubmissionQuery>({
  problemId: null,
  status: null,
  language: null,
  username: null,
});
const getSubmissionsUrl = computed(() => {
  const query: SubmissionQuery = {
    offset: (page.value - 1) * 10,
    count: 10,
    course: route.params.name as string,
  };
  for (const key in filter) {
    //@ts-ignore FIXME
    if (filter[key] !== null) {
      //@ts-ignore FIXME
      query[key] = filter[key];
    }
  }
  const qs = queryString.stringify(query);
  return `/submission?${qs}`;
});
const { execute, data, error, isLoading } = useAxios(fetcher);
const { data: problems } = useAxios(`/problem?offset=0&count=-1&course=${route.params.name}`, fetcher);
watchEffect(() => {
  execute(getSubmissionsUrl.value);
});
const submissions = computed(() => (data.value as any)?.submissions);
const submissionCount = computed(() => (data.value as any)?.submissionCount);
const maxPage = computed(() => {
  return submissionCount.value ? Math.ceil(submissionCount.value / 10) : 1;
});
const problemSelections = computed(() => {
  if (!problems.value) return [];
  return problems.value.map(({ problemId, problemName }: any) => ({
    value: problemId,
    text: `${problemId} - ${problemName}`,
  }));
});
const problemNameTable = computed(() => {
  if (!problems.value) return {};
  return Object.fromEntries(problems.value.map((p: any) => [p.problemId.toString(), p.problemName]));
});
const submissionStatus = SUBMISSION_STATUS.map((status, index) => ({
  text: status,
  value: index - 1,
}));
const languages = [
  { text: "c", value: 0 },
  { text: "cpp", value: 1 },
  { text: "py3", value: 2 },
  { text: "Handwritten", value: 3 },
];
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title justify-between">
          Submissions

          <input
            v-if="session.isAdmin"
            v-model="searchUsername"
            type="text"
            placeholder="Username (exact match)"
            class="input-bordered input w-full max-w-xs"
            @keydown.enter="filter.username = searchUsername || null"
          />
        </div>

        <div class="my-2" />
        <div class="mb-4 flex items-end gap-x-4">
          <select v-model="filter.problemId" class="select-bordered select w-full flex-1">
            <option :value="null" selected>Problem</option>
            <option v-for="{ text, value } in problemSelections" :value="value">{{ text }}</option>
          </select>

          <select v-model="filter.status" class="select-bordered select w-full flex-1">
            <option :value="null" selected>Status</option>
            <option v-for="{ text, value } in submissionStatus" :value="value">{{ text }}</option>
          </select>

          <select v-model="filter.language" class="select-bordered select w-full flex-1">
            <option :value="null" selected>Language</option>
            <option v-for="{ text, value } in languages" :value="value">{{ text }}</option>
          </select>
        </div>

        <skeleton-table v-if="isLoading" :col="9" :row="5" />
        <div v-else-if="error" class="alert alert-error shadow-lg">
          <div>
            <i-uil-times-circle />
            <span>Oops! Something went wrong when loading submissions.</span>
          </div>
        </div>
        <table v-else class="table w-full">
          <thead>
            <tr>
              <th>id</th>
              <th>pid</th>
              <th>user</th>
              <th>result</th>
              <th>score</th>
              <th>run time</th>
              <th>memory</th>
              <th>lang</th>
              <th>time</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="submission in submissions"
              :key="submission.submissionId"
              class="hover cursor-pointer"
              @click="$router.push(`/course/${$route.params.name}/submission/${submission.submissionId}`)"
            >
              <td>{{ submission.submissionId.slice(-6) }}</td>
              <td>
                <div
                  class="tooltip tooltip-bottom"
                  :data-tip="problemNameTable[`${submission.problemId}`] || 'loading...'"
                >
                  <span>{{ submission.problemId }}</span>
                </div>
              </td>
              <td>
                <div class="tooltip tooltip-bottom" :data-tip="submission.user.displayedName">
                  <span>{{ submission.user.username }}</span>
                </div>
              </td>
              <td><judge-status :status="submission.status" /></td>
              <td>{{ submission.score }}</td>
              <td>{{ submission.runTime }} ms</td>
              <td>{{ submission.memoryUsage }} KB</td>
              <td>{{ LANG[submission.languageType] }}</td>
              <td>
                <div class="tooltip tooltip-bottom" :data-tip="formatTime(submission.timestamp)">
                  <span>{{ timeFromNow(submission.timestamp) }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="card-actions mt-5">
          <pagination-buttons v-model="page" :maxPage="maxPage" />
        </div>
      </div>
    </div>
  </div>
</template>
