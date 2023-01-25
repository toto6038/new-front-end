<script setup lang="ts">
import { useAxios } from "@vueuse/integrations/useAxios";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetcher } from "@/models/api";
import { ROLE } from "@/constants";
import { useTitle } from "@vueuse/core";

const route = useRoute();
const router = useRouter();
useTitle(`Members - ${route.params.name} | Normal OJ`);
enum MemberTableColumn {
  USERNAME = "username",
  DISPLAYED_NAME = "displayedName",
  ROLE = "role",
}
const sortBy = ref<MemberTableColumn>(
  Object.values(MemberTableColumn).includes(route.query.sort as MemberTableColumn)
    ? (route.query.sort as MemberTableColumn)
    : MemberTableColumn.USERNAME,
);
watch(sortBy, () => {
  router.replace({ query: { sort: sortBy.value || MemberTableColumn.USERNAME } });
});
const { data, error, isLoading } = useAxios<Course>(`/course/${route.params.name}`, fetcher);
const members = computed(() => {
  if (!data.value) return [];
  return [data.value.teacher, ...data.value.students, ...data.value.TAs].sort((a, b) => {
    if (sortBy.value === "username") {
      return a.username.localeCompare(b.username);
    } else if (sortBy.value === "displayedName") {
      return a.displayedName.localeCompare(b.displayedName);
    } else {
      return a.role - b.role;
    }
  });
});
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title">
          Members <span v-if="data" class="text-sm opacity-70">({{ members.length }})</span>
        </div>

        <div class="mb-4">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Sort By</span>
            </label>
            <select v-model="sortBy" class="select-bordered select w-full max-w-xs">
              <option :value="MemberTableColumn.USERNAME">Username</option>
              <option :value="MemberTableColumn.DISPLAYED_NAME">Display Name</option>
              <option :value="MemberTableColumn.ROLE">Role</option>
            </select>
          </div>
        </div>
        <data-status-wrapper :error="error" :is-loading="isLoading">
          <template #loading>
            <skeleton-table :col="3" :row="5" />
          </template>
          <template #data>
            <table class="table w-full">
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
          </template>
        </data-status-wrapper>
      </div>
    </div>
  </div>
</template>
