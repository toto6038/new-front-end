<script setup lang="ts">
import { ref, reactive } from "vue";
import { useTitle } from "@vueuse/core";
import { useRoute } from "vue-router";

const route = useRoute();
useTitle(`New Problem - ${route.params.name} | Normal OJ`);
const newProblem = reactive<EditableProblem>({
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
  allowedLanguage: 0,
  quota: 10,
  type: 0,
  status: 0,
  testCase: [],
});

function update<K extends keyof EditableProblem>(key: K, value: EditableProblem[K]) {
  newProblem[key] = value;
}

const openPreview = ref<boolean>(false);
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title mb-3 justify-between">
          New Problem
          <div class="btn"><i-uil-file-upload-alt class="mr-1 lg:h-5 lg:w-5" /> Submit</div>
        </div>

        <problem-form :value="newProblem" @update="update" />

        <div class="divider" />

        <div class="card-title mb-3">
          Preview
          <input v-model="openPreview" type="checkbox" class="toggle" />
        </div>

        <problem-card v-show="openPreview" :problem="newProblem" preview />

        <div class="mb-[50%]" />
      </div>
    </div>
  </div>
</template>
