<script setup lang="ts">
import { ref, watchEffect, inject } from "vue";
import * as zip from "@zip.js/zip.js";

// TODO: handling error when problem is undefined
const problem = inject<EditableProblem>("problem") as EditableProblem;
// TODO: handling error when updateProblem is undefined
const updateProblem = inject<ProblemUpdater>("updateProblem") as ProblemUpdater;

const isDrag = ref(false);
const file = ref<File | null>(null);
watchEffect(() => {
  isDrag.value = false;
  if (!file.value) {
    updateProblem("testCase", []);
    return;
  }
  const reader = new zip.ZipReader(new zip.BlobReader(file.value));
  reader.getEntries().then((entries) => {
    const filenames = entries.map(({ filename }) => filename);
    const inputs = filenames.filter((filename) => filename.endsWith(".in"));
    const outputs = filenames.filter((filename) => filename.endsWith(".out"));
    if (inputs.length !== outputs.length) {
      alert(`Input and output files are not matched. (got ${inputs.length} .in, ${outputs.length} .out)`);
      file.value = null;
      return;
    }
    let i = 0;
    const testCase = [];
    while (true) {
      const caseCount = inputs.filter((filename) => filename.startsWith(`0${i}`.slice(-2))).length;
      if (caseCount > 0) {
        testCase.push({ caseCount, memoryLimit: 134218, taskScore: 0, timeLimit: 1000 });
        i++;
      } else {
        break;
      }
    }
    updateProblem("testCase", testCase);
  });
});
</script>

<template>
  <div class="grid grid-cols-2 gap-y-4">
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Name</span>
      </label>
      <input
        type="text"
        class="input-bordered input w-full max-w-xs"
        :value="problem.problemName"
        @input="updateProblem('problemName', ($event.target as HTMLInputElement).value)"
      />
      <label class="label">
        <span class="label-text-alt">At most 64 alphanumeric characters</span>
      </label>
    </div>

    <div class="form-control">
      <label class="label cursor-pointer justify-start gap-x-4">
        <span class="label-text">Hidden</span>
        <input
          type="checkbox"
          class="toggle"
          :true-value="1"
          :false-value="0"
          :value="problem.status"
          @change="updateProblem('status', (problem.status ^ 1) as 0 | 1)"
        />
      </label>
    </div>

    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Quota</span>
      </label>
      <input
        type="text"
        class="input-bordered input w-full max-w-xs"
        :value="problem.quota"
        @input="updateProblem('quota', Number(($event.target as HTMLInputElement).value))"
      />
      <label class="label">
        <span class="label-text-alt">Set -1 for unlimited quota</span>
      </label>
    </div>

    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Tags</span>
      </label>
      <input
        type="text"
        class="input-bordered input w-full max-w-xs"
        :value="problem.tags.join(',')"
        @input="updateProblem('tags', ($event.target as HTMLInputElement).value.split(','))"
      />
      <label class="label">
        <span class="label-text-alt">Separate with COMMA, e.g. HW1,HW2</span>
      </label>
    </div>

    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Type</span>
      </label>
      <select
        class="select-bordered select w-full max-w-xs"
        :value="problem.type"
        @input="updateProblem('type', Number(($event.target as HTMLSelectElement).value) as 0 | 1 | 2)"
      >
        <option value="0">Programming</option>
        <option value="2">File Upload</option>
      </select>
    </div>

    <ProblemAllowedLanguageSelector />

    <ProblemDescriptionForm />

    <div class="form-control col-span-2 w-full">
      <label class="label justify-start">
        <span class="label-text">Testdata</span>
        <label for="testdata-description" class="modal-button btn-xs btn ml-3">How to pack testdata</label>
      </label>
      <div
        :class="['textarea-bordered textarea min-h-[96px] w-full p-4', isDrag ? 'border-accent' : '']"
        @drop.prevent="file = ($event.dataTransfer as any).files[0]"
        @dragover.prevent="isDrag = true"
        @dragleave="isDrag = false"
      >
        <template v-if="!file">
          <span class="mb-6 mr-6 text-sm">Drop File here or Choose File to upload</span>
          <input
            type="file"
            id="file-uploader"
            accept=".zip"
            @change="file = ($event.target as any).files[0]"
          />
        </template>
        <template v-else>
          <div class="flex">
            <span class="mr-3">{{ file.name }}</span>
            <button class="btn-sm btn" @click="file = null">
              <i-uil-times />
            </button>
          </div>
        </template>
      </div>
    </div>

    <template v-for="(no, i) in problem.testCase.length">
      <div class="grid grid-cols-2">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">testcases in subtask {{ no }}</span>
          </label>
          <input
            type="text"
            class="input-bordered input w-full max-w-xs"
            :value="problem.testCase[i].caseCount"
            readonly
          />
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Score of subtask {{ no }}</span>
          </label>
          <input
            type="text"
            class="input-bordered input w-full max-w-xs"
            :value="problem.testCase[i].taskScore"
            @input="updateProblem('testCase', [
              ...problem.testCase.slice(0, i),
              {
                ...problem.testCase[i],
                taskScore: Number(($event.target as HTMLInputElement).value),
              },
              ...problem.testCase.slice(i + 1),
            ])"
          />
        </div>
      </div>
      <div class="grid grid-cols-2">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Memory Limit (KB)</span>
          </label>
          <input
            type="text"
            class="input-bordered input w-full max-w-xs"
            :value="problem.testCase[i].memoryLimit"
            @input="updateProblem('testCase', [
              ...problem.testCase.slice(0, i),
              {
                ...problem.testCase[i],
                memoryLimit: Number(($event.target as HTMLInputElement).value),
              },
              ...problem.testCase.slice(i + 1),
            ])"
          />
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Time Limit (ms)</span>
          </label>
          <input
            type="text"
            class="input-bordered input w-full max-w-xs"
            :value="problem.testCase[i].timeLimit"
            @input="updateProblem('testCase', [
              ...problem.testCase.slice(0, i),
              {
                ...problem.testCase[i],
                timeLimit: Number(($event.target as HTMLInputElement).value),
              },
              ...problem.testCase.slice(i + 1),
            ])"
          />
        </div>
      </div>
    </template>

    <ProblemTestdataDescriptionModal />
  </div>
</template>
