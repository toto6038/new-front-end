<script setup lang="ts">
import { useAxios } from "@vueuse/integrations/useAxios";
import { useRoute } from "vue-router";
import api, { fetcher } from "../../../../../models/api";
import { useIntervalFn, useTitle } from "@vueuse/core";
import { watchEffect } from "vue";
import { computed } from "@vue/reactivity";

const route = useRoute();
useTitle(`Copycat - ${route.params.id} - ${route.params.name} | Normal OJ`);
const { data: course } = useAxios(`/course/${route.params.name}`, fetcher);
const { data, execute } = useAxios<MossReport>(
  `/copycat?course=${route.params.name}&problemId=${route.params.id}`,
  fetcher,
);
const isReportGenerated = computed(() => data.value && Object.values(data.value).some(Boolean));
const { pause, resume } = useIntervalFn(execute, 10000);
watchEffect(() => {
  if (isReportGenerated) {
    pause();
  }
});
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
    resume();
  } catch {}
}
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title md:text-2xl lg:text-3xl">Copycat of problem #{{ $route.params.id }}</div>

        <div v-if="!isReportGenerated">No report.</div>
        <div v-else>Report generating...</div>

        <button class="btn" @click="detect"><i-uil-file-upload-alt class="mr-1 h-5 w-5" /> Detect</button>

        <div v-if="data" v-html="data.cpp_report" />
      </div>
    </div>
  </div>
</template>
