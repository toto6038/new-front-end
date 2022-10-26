<script setup lang="ts">
import { useAxios } from "@vueuse/integrations/useAxios";
import { useRoute, useRouter } from "vue-router";
import { computed, reactive, ref, watch, watchEffect } from "vue";
import queryString from "query-string";
import { fetcher } from "../../../models/api";
import { useSession } from "../../../stores/session";
import { LANG, SUBMISSION_STATUS } from "../../../constants";
import { formatTime } from "../../../utils/formatTime";
import { timeFromNow } from "../../../utils/timeFromNow";
import { useTitle, useClipboard } from "@vueuse/core";

const route = useRoute();
const router = useRouter();
const session = useSession();
useTitle(`Submissions - ${route.params.name} | Normal OJ`);
const { data: problems } = useAxios(`/problem?offset=0&count=-1&course=${route.params.name}`, fetcher);
// url is the single source of truth
// 1. grab query parameters from url, store into local states used by inputs
// 2. when related states changed, replace url with new query parameters
// 3. when url changed, fetch new data with new query parameters
function toNumberOrNull(value: string): number | null {
  const numericValue = Number(value);
  return !isNaN(numericValue) ? numericValue : null;
}
const routeQuery = computed(() => ({
  page: toNumberOrNull(route.query.page as string) || 1,
  filter: {
    problemId: toNumberOrNull(route.query.problemId as string),
    status: toNumberOrNull(route.query.status as string),
    languageType: toNumberOrNull(route.query.languageType as string),
    username: (route.query.username as string) ?? null,
  },
}));
const page = ref(routeQuery.value.page);
const filter = ref<UserDefinedSubmissionQuery>({ ...routeQuery.value.filter });
watchEffect(() => {
  // effect function runs after page changed or filter changed
  // TODO: type query
  const query: any = {};
  let key: keyof UserDefinedSubmissionQuery;
  for (key in filter.value) {
    if (filter.value[key] != null) {
      query[key] = filter.value[key];
      // if filter did change, reset page to 1
      if (filter.value[key] !== routeQuery.value.filter[key]) {
        page.value = 1;
      }
    }
  }
  query.page = page.value;
  router.replace({ query });
});
const getSubmissionsUrl = computed(() => {
  const qs = queryString.stringify(
    {
      ...routeQuery.value.filter,
      offset: (page.value - 1) * 10,
      count: 10,
      course: route.params.name as string,
    },
    { skipNull: true },
  );
  return `/submission?${qs}`;
});
const { execute, data, error, isLoading } = useAxios(fetcher);
watch(
  getSubmissionsUrl,
  (url) => {
    execute(url);
  },
  { immediate: true },
);
const searchUsername = ref("");
const submissions = computed(() => (data.value as any)?.submissions);
const submissionCount = computed(() => (data.value as any)?.submissionCount);
const maxPage = computed(() => {
  return submissionCount.value ? Math.ceil(submissionCount.value / 10) : 1;
});
const problemIds = computed(() => {
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
const languageTypes = [
  { text: "c", value: 0 },
  { text: "cpp", value: 1 },
  { text: "py3", value: 2 },
  { text: "Handwritten", value: 3 },
];
function clearFilter() {
  let key: keyof UserDefinedSubmissionQuery;
  for (key in filter.value) {
    filter.value[key] = null;
  }
}
const { copy, copied, isSupported } = useClipboard();
function copySubmissionLink(path: string) {
  copy(new URL(path, window.location.origin).href);
}
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
            <option v-for="{ text, value } in problemIds" :value="value">{{ text }}</option>
          </select>

          <select v-model="filter.status" class="select-bordered select w-full flex-1">
            <option :value="null" selected>Status</option>
            <option v-for="{ text, value } in submissionStatus" :value="value">{{ text }}</option>
          </select>

          <select v-model="filter.languageType" class="select-bordered select w-full flex-1">
            <option :value="null" selected>Language</option>
            <option v-for="{ text, value } in languageTypes" :value="value">{{ text }}</option>
          </select>

          <div
            v-show="filter.problemId != null || filter.status != null || filter.languageType != null"
            class="btn"
            @click="clearFilter"
          >
            <i-uil-filter-slash class="mr-1" /> Clear
          </div>
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
            <tr v-for="submission in submissions" :key="submission.submissionId" class="hover">
              <td>
                <div class="flex items-center">
                  <div class="tooltip tooltip-bottom" data-tip="show details">
                    <router-link
                      :to="`/course/${$route.params.name}/submission/${submission.submissionId}`"
                      class="link"
                    >
                      {{ submission.submissionId.slice(-6) }}
                    </router-link>
                  </div>
                  <div
                    v-if="isSupported"
                    class="tooltip tooltip-bottom"
                    :data-tip="copied ? 'copied!' : 'copy link'"
                  >
                    <i-uil-link
                      class="ml-2 h-4 w-4 cursor-pointer"
                      @click="
                        copySubmissionLink(
                          `/course/${$route.params.name}/submission/${submission.submissionId}`,
                        )
                      "
                    />
                  </div>
                </div>
              </td>
              <td>
                <div
                  class="tooltip tooltip-bottom"
                  :data-tip="problemNameTable[`${submission.problemId}`] || 'loading...'"
                >
                  <router-link
                    :to="`/course/${$route.params.name}/problem/${submission.problemId}`"
                    class="link"
                  >
                    {{ submission.problemId }}
                  </router-link>
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
