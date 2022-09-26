<script setup lang="ts">
import { ref, provide } from "vue";
import { useTitle } from "@vueuse/core";
import { useRoute } from "vue-router";

const route = useRoute();
useTitle(`New Problem - ${route.params.name} | Normal OJ`);

const newProblem = ref<EditableProblem>({
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
function updateNewProblem<K extends keyof EditableProblem>(key: K, value: EditableProblem[K]) {
  newProblem.value[key] = value;
}
provide<EditableProblem>("problem", newProblem.value);
provide<typeof updateNewProblem>("updateProblem", updateNewProblem);

function submit() {
  console.log(JSON.stringify(newProblem.value, null, 2));
}

const openPreview = ref<boolean>(false);
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

        <problem-form />

        <div class="divider" />

        <div class="card-title mb-3">
          Preview
          <input v-model="openPreview" type="checkbox" class="toggle" />
        </div>

        <problem-card v-if="openPreview" :problem="newProblem" preview />

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
