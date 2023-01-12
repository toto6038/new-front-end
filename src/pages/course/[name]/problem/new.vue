<script setup lang="ts">
import { ref, provide } from "vue";
import { useTitle } from "@vueuse/core";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import api from "../../../../models/api";

const route = useRoute();
const router = useRouter();
useTitle(`New Problem - ${route.params.name} | Normal OJ`);

const isLoading = ref(false);
const errorMsg = ref("");

const newProblem = ref<ProblemForm>({
  problemName: "",
  description: {
    description: "",
    input: "",
    output: "",
    hint: "",
    sampleInput: [""],
    sampleOutput: [""],
  },
  tags: [],
  allowedLanguage: 1,
  quota: 10,
  type: 0,
  status: 1,
  testCase: [],
});
function update<K extends keyof ProblemForm>(key: K, value: ProblemForm[K]) {
  newProblem.value[key] = value;
}
provide<ProblemForm>("problem", newProblem.value);

async function submit() {
  isLoading.value = true;
  try {
    await api.Problem.create({
      ...newProblem.value,
    });
    router.push(`/course/${route.params.name}/homeworks`);
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

const openPreview = ref<boolean>(false);
const mockProblemMeta = {
  highScore: 0,
  submitCount: 0,
};

const openJSON = ref<boolean>(false);
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title mb-3 justify-between">
          New Problem
          <button class="btn" @click="submit">
            <i-uil-file-upload-alt class="mr-1 lg:h-5 lg:w-5" /> Submit
          </button>
        </div>

        <problem-form @update="update" />

        <div class="divider" />

        <div class="card-title mb-3">
          Preview
          <input v-model="openPreview" type="checkbox" class="toggle" />
        </div>

        <problem-card v-if="openPreview" :problem="{ ...newProblem, ...mockProblemMeta }" preview />

        <div class="divider my-4" />

        <div class="card-title mb-3">
          JSON
          <input v-model="openJSON" type="checkbox" class="toggle" />
        </div>

        <pre v-if="openJSON">{{ JSON.stringify(newProblem, null, 2) }}</pre>

        <div class="mb-[50%]" />
      </div>
    </div>
  </div>
</template>
