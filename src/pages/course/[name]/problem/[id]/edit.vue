<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useTitle } from "@vueuse/core";
import { useAxios } from "@vueuse/integrations/useAxios";
import { useRoute, useRouter } from "vue-router";
import api, { fetcher } from "../../../../../models/api";
import axios from "axios";

const route = useRoute();
const router = useRouter();
useTitle(`Edit Problem - ${route.params.id} - ${route.params.name} | Normal OJ`);

const isLoading = ref(false);
const errorMsg = ref("");

const {
  data: problem,
  error: fetchError,
  isLoading: isFetching,
} = useAxios<Problem>(`/problem/view/${route.params.id}`, fetcher);

const edittingProblem = ref<Problem>();
watchEffect(() => {
  if (problem.value) {
    edittingProblem.value = { ...problem.value };
  }
});
function update<K extends keyof Problem>(key: K, value: Problem[K]) {
  if (!edittingProblem.value) return;
  edittingProblem.value[key] = value;
}
const testdata = ref<File | null>(null);

const openPreview = ref<boolean>(false);
const openJSON = ref<boolean>(false);

async function submit() {
  if (!edittingProblem.value) return;

  isLoading.value = true;
  try {
    await api.Problem.modify(route.params.id as string, edittingProblem.value);

    if (testdata.value) {
      const testdataForm = new FormData();
      testdataForm.append("case", testdata.value);
      await api.Problem.modifyTestdata(route.params.id as string, testdataForm);
      router.push(`/course/${route.params.name}/problem/${route.params.id}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      errorMsg.value = error.response.data.message;
    } else {
      errorMsg.value = "Unknown error occurred :(";
    }
    throw error;
  } finally {
    isLoading.value = false;
  }
}
async function discard() {
  if (!confirm("Are u sure?")) return;
  router.push(`/course/${route.params.name}/problems`);
}
async function delete_() {
  isLoading.value = true;
  if (!confirm("Are u sure?")) return;
  try {
    await api.Problem.delete(route.params.id as string);
    router.push(`/course/${route.params.name}/problems`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      errorMsg.value = error.response.data.message;
    } else {
      errorMsg.value = "Unknown error occurred :(";
    }
    throw error;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title mb-3 justify-between">
          Edit Problem: {{ $route.params.id }} - {{ edittingProblem?.problemName }}
          <div class="flex gap-x-3">
            <button
              :class="['btn-outline btn-error btn-sm btn lg:btn-md', isLoading && 'loading']"
              @click="delete_"
            >
              <i-uil-trash-alt class="mr-1 lg:h-5 lg:w-5" /> Delete
            </button>
            <button :class="['btn-warning btn-sm btn lg:btn-md', isLoading && 'loading']" @click="discard">
              <i-uil-times-circle class="mr-1 lg:h-5 lg:w-5" /> Discard Changes
            </button>
          </div>
        </div>

        <div v-if="fetchError" class="alert alert-error shadow-lg">
          <div>
            <i-uil-times-circle />
            <span>Oops! Something went wrong when loading problem.</span>
          </div>
        </div>
        <skeleton-card v-else-if="isFetching || !edittingProblem" />
        <template v-else>
          <div v-if="errorMsg" class="alert alert-error shadow-lg">
            <div>
              <i-uil-times-circle />
              <span>{{ errorMsg }}</span>
            </div>
          </div>

          <problem-form
            :is-loading="isLoading"
            v-model:testdata="testdata"
            @update="update"
            @submit="submit"
          />

          <div class="divider" />

          <div class="card-title mb-3">
            Preview
            <input v-model="openPreview" type="checkbox" class="toggle" />
          </div>

          <problem-card v-if="openPreview" :problem="{ ...edittingProblem }" preview />

          <div class="divider my-4" />

          <div class="card-title mb-3">
            JSON
            <input v-model="openJSON" type="checkbox" class="toggle" />
          </div>

          <pre v-if="openJSON">{{ JSON.stringify(edittingProblem, null, 2) }}</pre>

          <div class="mb-[50%]" />
        </template>
      </div>
    </div>
  </div>
</template>
