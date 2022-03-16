<script setup lang="ts">
import { useAxios } from "@vueuse/integrations/useAxios";
import { useRoute } from "vue-router";
import { fetcher } from "../../../../models/api";
import { formatTime } from "../../../../utils/formatTime";
import { useSession } from "../../../../stores/session";
import { useTitle } from "@vueuse/core";

const session = useSession();
const route = useRoute();
useTitle(`Announcements - ${route.params.name} | Normal OJ`);
const { data: posts, error, isLoading } = useAxios(`/course/${route.params.name}/ann`, fetcher);
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title justify-between">
          Announcements
          <div
            v-if="session.isAdmin"
            class="btn btn-success"
            @click="$router.push(`/course/${$route.params.name}/announcements/new`)"
          >
            <i-uil-plus-circle class="mr-1 lg:h-5 lg:w-5" /> New
          </div>
        </div>
        <div class="my-2" />
        <skeleton-table v-if="isLoading" :col="3" :row="5" />
        <div v-else-if="error" class="alert alert-error shadow-lg">
          <div>
            <i-uil-times-circle />
            <span>Oops! Something went wrong when loading announcements.</span>
          </div>
        </div>
        <table v-else class="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Create At</th>
              <th v-if="session.isAdmin"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="{ title, creator, createTime, annId } in posts"
              class="hover cursor-pointer"
              @click="$router.push(`/course/${$route.params.name}/announcements/${annId}`)"
            >
              <td>{{ title }}</td>
              <td>{{ creator.displayedName }}</td>
              <td>{{ formatTime(createTime) }}</td>
              <td v-if="session.isAdmin">
                <div
                  class="btn btn-sm"
                  @click.stop="$router.push(`/course/${$route.params.name}/announcements/${annId}/edit`)"
                >
                  <i-uil-edit class="mr-1" /> Edit
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
