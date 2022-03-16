<script setup lang="ts">
import { useAxios } from "@vueuse/integrations/useAxios";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import { fetcher } from "../../../models/api";
import { useSession } from "../../../stores/session";
import { useTitle } from "@vueuse/core";

const session = useSession();
const route = useRoute();
useTitle(`Problems - ${route.params.name} | Normal OJ`);
const {
  data: problems,
  error,
  isLoading,
} = useAxios(`/problem?offset=0&count=-1&course=${route.params.name}`, fetcher);

const page = ref(1);
const maxPage = computed(() => {
  return problems.value ? Math.ceil(problems.value.length / 10) : 1;
});
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title justify-between">
          Problems

          <div
            v-if="session.isAdmin"
            class="btn btn-success"
            @click="$router.push(`/course/${$route.params.name}/problem/new`)"
          >
            <i-uil-plus-circle class="mr-1 lg:h-5 lg:w-5" /> New
          </div>
        </div>

        <div class="mt-4 overflow-x-auto">
          <skeleton-table v-if="isLoading" :col="5" :row="5" />
          <div v-else-if="error" class="alert alert-error shadow-lg">
            <div>
              <i-uil-times-circle />
              <span>Oops! Something went wrong when loading problems.</span>
            </div>
          </div>
          <table v-else class="table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Tags</th>
                <th>Quota</th>
                <th>Score</th>
                <th v-if="session.isAdmin"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="{ problemId, problemName, tags, quota, score } in problems.slice(
                  (page - 1) * 10,
                  page * 10,
                )"
                :key="problemId"
                class="hover cursor-pointer"
                @click="$router.push(`/course/${$route.params.name}/problem/${problemId}`)"
              >
                <td>{{ problemId }}</td>
                <td>{{ problemName }}</td>
                <td>
                  <span class="badge badge-info mr-1" v-for="tag in tags" :key="tag">{{ tag }}</span>
                </td>
                <td>{{ quota }}</td>
                <td>{{ score }}</td>
                <td v-if="session.isAdmin">
                  <div
                    class="btn btn-sm"
                    @click.stop="$router.push(`/course/${$route.params.name}/problem/${problemId}/edit`)"
                  >
                    <i-uil-edit class="mr-1" /> Edit
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="card-actions mt-5">
          <pagination-buttons v-model="page" :maxPage="maxPage" />
        </div>
      </div>
    </div>
  </div>
</template>
