<script setup lang="ts">
import { useAxios } from "@vueuse/integrations/useAxios";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { fetcher } from "../../../models/api";
import { ROLE } from "../../../constants";
import { useTitle } from "@vueuse/core";

const route = useRoute();
useTitle(`Members - ${route.params.name} | Normal OJ`);
const sortBy = ref<"username" | "displayedName" | "role">("username");
const { data, error, isLoading } = useAxios(`/course/${route.params.name}`, fetcher);
const members = computed(() =>
  [data.value.teacher, ...data.value?.students, ...data.value?.TAs].sort((a, b) => {
    if (sortBy.value === "username") {
      return a.username.localeCompare(b.username);
    } else if (sortBy.value === "displayedName") {
      return a.displayedName.localeCompare(b.displayedName);
    } else if (sortBy.value === "role") {
      return a.role - b.role;
    }
  }),
);
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title">Members</div>

        <div class="my-2" />
        <div class="mb-4">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Sort By</span>
            </label>
            <select v-model="sortBy" class="select-bordered select w-full max-w-xs">
              <option value="username">Username</option>
              <option value="displayedName">Display Name</option>
              <option value="role">Role</option>
            </select>
          </div>
        </div>
        <skeleton-table v-if="isLoading" :col="3" :row="5" />
        <div v-else-if="error" class="alert alert-error shadow-lg">
          <div>
            <i-uil-times-circle />
            <span>Oops! Something went wrong when loading members.</span>
          </div>
        </div>
        <table v-else class="table w-full">
          <thead>
            <tr>
              <th>username</th>
              <th>display name</th>
              <th>role</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{ username, displayedName, role } in members" :key="username" class="hover">
              <td>{{ username }}</td>
              <td>{{ displayedName }}</td>
              <td>{{ ROLE[role] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
