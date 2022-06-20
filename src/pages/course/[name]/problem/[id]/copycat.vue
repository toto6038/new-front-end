<script setup lang="ts">
import { useAxios } from "@vueuse/integrations/useAxios";
import { useRoute } from "vue-router";
import api, { fetcher } from "../../../../../models/api";
import { useTitle } from "@vueuse/core";

const route = useRoute();
useTitle(`Copycat - ${route.params.id} - ${route.params.name} | Normal OJ`);
const { data, error, isLoading } = useAxios(
  `/copycat?course=${route.params.name}&problemId=${route.params.id}`,
  fetcher,
);
const { data: course } = useAxios(`/course/${route.params.name}`, fetcher);

async function detect() {
  const studentNicknames = Object.fromEntries(
    course.value.students.map((student: any) => [student.username, student.displayedName]),
  );
  const body = {
    course: route.params.name as string,
    problemId: Number(route.params.id),
    studentNicknames,
  };
  try {
    await api.Copycat.detect(body);
  } catch {
  } finally {
  }
}
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title md:text-2xl lg:text-3xl">Copycat of problem #{{ $route.params.id }}</div>

        <pre>{{ JSON.stringify(data, null, 2) }}</pre>

        <div class="btn" @click="detect"><i-uil-file-upload-alt class="mr-1 h-5 w-5" /> Detect</div>
      </div>
    </div>
  </div>
</template>
