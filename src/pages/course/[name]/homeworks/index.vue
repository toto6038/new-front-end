<script setup lang="ts">
import { useAxios } from "@vueuse/integrations/useAxios";
import { useRoute } from "vue-router";
import { fetcher } from "../../../../models/api";
import { useSession } from "../../../../stores/session";
import { useTitle } from "@vueuse/core";
import { computed } from "vue";

const session = useSession();
const route = useRoute();
useTitle(`Homeworks - ${route.params.name} | Normal OJ`);
const { data, error, isLoading } = useAxios<HomeworkList>(`/course/${route.params.name}/homework`, fetcher);
const { data: problems } = useAxios<ProblemList>(
  `/problem?offset=0&count=-1&course=${route.params.name}`,
  fetcher,
);
const homeworks = computed(() => {
  if (!data.value) return [];
  return data.value.sort((a, b) => b.start - a.start);
});

type ProblemMeta = Record<
  string,
  {
    name: string;
    quota: number | "-";
  }
>;
function getProblemMeta(ids: number[]): ProblemMeta {
  if (!problems.value) return {};
  const _problems = problems.value;
  return Object.fromEntries(
    ids.map((pid) => {
      const p = _problems.find((p) => p.problemId === pid);
      return [pid, p ? { name: p.problemName, quota: p.quota } : { name: "-", quota: "-" }];
    }),
  );
}
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title mb-4 justify-between">
          Homeworks
          <router-link
            v-if="session.isAdmin"
            class="btn btn-success"
            :to="`/course/${$route.params.name}/homeworks/new`"
          >
            <i-uil-plus-circle class="mr-1 lg:h-5 lg:w-5" /> New
          </router-link>
        </div>
        <skeleton-card v-if="isLoading" />
        <div v-else-if="error" class="alert alert-error shadow-lg">
          <div>
            <i-uil-times-circle />
            <span>Oops! Something went wrong when loading homeworks.</span>
          </div>
        </div>
        <homework-card
          v-else
          v-for="homework in homeworks"
          :key="homework.id"
          :homework="homework"
          :problems="getProblemMeta(homework.problemIds)"
          class="mb-2"
        />
      </div>
    </div>
  </div>
</template>
