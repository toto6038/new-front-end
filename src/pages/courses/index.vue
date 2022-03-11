<script setup lang="ts">
import { useTitle } from "@vueuse/core";
import { useAxios } from "@vueuse/integrations/useAxios";
import { fetcher } from "../../models/api";

useTitle("Courses | Normal OJ");
const { data: courses, error, isLoading } = useAxios("/course", fetcher);
</script>

<template>
  <div class="card mx-auto max-w-5xl shadow-xl">
    <div class="card-body">
      <div class="card-title">Course List</div>

      <div class="mt-4 overflow-x-auto">
        <skeleton-table v-if="isLoading" :col="2" :row="5" />
        <div v-else-if="error" class="alert alert-error shadow-lg">
          <div>
            <i-uil-times-circle />
            <span>Oops! Something went wrong when loading courses.</span>
          </div>
        </div>
        <table v-else class="table w-full">
          <thead>
            <tr>
              <th>Course</th>
              <th>Teacher</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="{ course, teacher } in courses"
              :key="course"
              class="hover cursor-pointer"
              @click="$router.push(`/course/${course}`)"
            >
              <td>{{ course }}</td>
              <td>{{ teacher.username }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
