<script setup lang="ts">
import { useAxios } from "@vueuse/integrations/useAxios";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { fetcher } from "../../../../models/api";
import { useSession } from "../../../../stores/session";

const session = useSession();
const route = useRoute();
const getHomeworkUrl = computed(() => `/course/${route.params.name}/homework`);
const { data: homeworks, error, isLoading } = useAxios(getHomeworkUrl.value, fetcher);
const { data: problems } = useAxios(`/problem?offset=0&count=-1&course=${route.params.name}`, fetcher);

function getProblemMeta(ids: number[]): {
  [key: string]: {
    name: string;
    quota: number | string;
  };
} {
  if (!problems.value) return {};
  return Object.fromEntries(
    ids.map((pid) => {
      const p = problems.value.find((p: Problem) => p.problemId === pid);
      return [pid.toString(), p ? { name: p.problemName, quota: p.quota } : { name: "-", quota: "-" }];
    }),
  );
}
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title mb-5 justify-between">
          Homeworks
          <div
            v-if="session.isAdmin"
            class="btn btn-success"
            @click="$router.push(`/course/${$route.params.name}/homeworks/new`)"
          >
            <i-uil-plus-circle class="mr-1 lg:h-5 lg:w-5" /> New
          </div>
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
