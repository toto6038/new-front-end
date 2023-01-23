<script setup lang="ts">
import { useTitle } from "@vueuse/core";
import { useAxios } from "@vueuse/integrations/useAxios";
import { fetcher } from "@/models/api";

useTitle("Courses | Normal OJ");
const { data: courses, error, isLoading } = useAxios<CourseList>("/course", fetcher);
</script>

<template>
  <div class="card mx-auto max-w-5xl shadow-xl">
    <div class="card-body">
      <div class="card-title">Course List</div>

      <div class="my-2" />

      <data-status-wrapper :error="error" :is-loading="isLoading">
        <template #loading>
          <skeleton-table :col="2" :row="5" />
        </template>
        <template #data>
          <table class="table w-full">
            <thead>
              <tr>
                <th>Course</th>
                <th>Teacher</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="{ course, teacher } in courses" :key="course" class="hover">
                <td>
                  <router-link :to="`/course/${course}`" class="link-hover link">{{ course }}</router-link>
                </td>
                <td>{{ teacher.username }}</td>
              </tr>
            </tbody>
          </table>
        </template>
      </data-status-wrapper>
    </div>
  </div>
</template>
