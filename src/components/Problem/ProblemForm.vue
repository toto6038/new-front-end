<script setup lang="ts">
import { PropType, ref, watchEffect, computed } from "vue";
import * as zip from "@zip.js/zip.js";
import { useSourceLang } from "../../composables/useSourceLang";

const props = defineProps({
  value: {
    type: Object as PropType<Problem>,
    required: true,
  },
});
const emit = defineEmits<{
  (e: "update", key: keyof Problem, value: Problem[typeof key]): void;
}>();

const isDrag = ref(false);
const allowedLanguageSelectModalOpen = ref(false);
const file = ref<File | null>(null);
watchEffect(() => {
  isDrag.value = false;
  if (!file.value) {
    emit("update", "testCase", []);
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
    emit("update", "testCase", testCase);
  });
});

const { selectLangMap, readableLang, selectedLang } = useSourceLang(props.value.allowedLanguage);
watchEffect(() => {
  emit("update", "allowedLanguage", selectedLang.value);
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
        :value="value.problemName"
        @input="emit('update', 'problemName', ($event.target as HTMLInputElement).value)"
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
          :value="value.status"
          @input="emit('update', 'status', Number(($event.target as HTMLInputElement).value))"
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
        :value="value.quota"
        @input="emit('update', 'quota', Number(($event.target as HTMLInputElement).value))"
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
        :value="value.tags.join(',')"
        @input="emit('update', 'tags', ($event.target as HTMLInputElement).value.split(','))"
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
        :value="value.type"
        @input="emit('update', 'type', Number(($event.target as HTMLSelectElement).value))"
      >
        <option value="0">Programming</option>
        <option value="2">File Upload</option>
      </select>
    </div>

    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Allowed Languages</span>
      </label>
      <input
        type="text"
        class="input-bordered input w-full max-w-xs"
        :value="readableLang"
        @focus="allowedLanguageSelectModalOpen = true"
      />
    </div>
    <input
      v-model="allowedLanguageSelectModalOpen"
      type="checkbox"
      id="select-langs-modal"
      class="modal-toggle"
    />
    <AllowedLanguageSelectModel v-model:select-lang-map="selectLangMap" />

    <div class="form-control col-span-2 w-full">
      <label class="label">
        <span class="label-text">Description</span>
      </label>
      <textarea
        class="textarea-bordered textarea h-24"
        :value="value.description.description"
        @input="emit('update', 'description', {
          ...value.description,
          description: ($event.target as HTMLTextAreaElement).value
        })"
      />
    </div>

    <div class="form-control col-span-2 w-full">
      <label class="label">
        <span class="label-text">Input</span>
      </label>
      <textarea
        class="textarea-bordered textarea h-24"
        :value="value.description.input"
        @input="emit('update', 'description', {
          ...value.description,
          input: ($event.target as HTMLTextAreaElement).value
        })"
      />
    </div>

    <div class="form-control col-span-2 w-full">
      <label class="label">
        <span class="label-text">Output</span>
      </label>
      <textarea
        class="textarea-bordered textarea h-24"
        :value="value.description.output"
        @input="emit('update', 'description', {
          ...value.description,
          output: ($event.target as HTMLTextAreaElement).value
        })"
      />
    </div>

    <div class="form-control col-span-2 w-full">
      <label class="label">
        <span class="label-text">Hint</span>
      </label>
      <textarea
        class="textarea-bordered textarea h-24"
        :value="value.description.hint"
        @input="emit('update', 'description', {
          ...value.description,
          hint: ($event.target as HTMLTextAreaElement).value
        })"
      />
    </div>

    <template v-for="(no, i) in value.description.sampleInput.length">
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Sample Input {{ no }}</span>
        </label>
        <textarea
          class="textarea-bordered textarea h-24"
          :value="value.description.sampleInput[i]"
          @input="
            emit('update', 'description', {
              ...value.description,
              sampleInput: [
                ...value.description.sampleInput.slice(0, i),
                ($event.target as HTMLInputElement).value,
                ...value.description.sampleInput.slice(i + 1),
              ],
            })
          "
        />
      </div>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Sample Output {{ no }}</span>
        </label>
        <textarea
          class="textarea-bordered textarea h-24"
          :value="value.description.sampleOutput[i]"
          @input="
            emit('update', 'description', {
              ...value.description,
              sampleOutput: [
                ...value.description.sampleOutput.slice(0, i),
                ($event.target as HTMLInputElement).value,
                ...value.description.sampleOutput.slice(i + 1),
              ],
            })
          "
        />
      </div>
    </template>

    <div class="col-span-2 mx-auto">
      <div class="tooltip" data-tip="append new sample">
        <div
          class="btn btn-sm mr-3"
          @click="
            emit('update', 'description', {
              ...value.description,
              sampleInput: [...value.description.sampleInput, ''],
              sampleOutput: [...value.description.sampleOutput, ''],
            })
          "
        >
          <i-uil-plus class="mr-1" />
        </div>
      </div>
      <div class="tooltip" data-tip="remove last sample">
        <div
          class="btn btn-sm"
          @click="
            emit('update', 'description', {
              ...value.description,
              sampleInput: value.description.sampleInput.slice(0, -1),
              sampleOutput: value.description.sampleOutput.slice(0, -1),
            })
          "
        >
          <i-uil-minus class="mr-1" />
        </div>
      </div>
    </div>

    <div class="form-control col-span-2 w-full">
      <label class="label justify-start">
        <span class="label-text">Testdata</span>
        <label for="testdata-description" class="modal-button btn btn-xs ml-3">How to pack testdata</label>
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
            <button class="btn btn-sm" @click="file = null">
              <i-uil-times />
            </button>
          </div>
        </template>
      </div>
    </div>

    <template v-for="(no, i) in value.testCase.length">
      <div class="grid grid-cols-2">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">testcases in subtask {{ no }}</span>
          </label>
          <input
            type="text"
            class="input-bordered input w-full max-w-xs"
            :value="value.testCase[i].caseCount"
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
            :value="value.testCase[i].taskScore"
            @input="emit('update', 'testCase', [
              ...value.testCase.slice(0, i),
              {
                ...value.testCase[i],
                taskScore: Number(($event.target as HTMLInputElement).value),
              },
              ...value.testCase.slice(i + 1),
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
            :value="value.testCase[i].memoryLimit"
            @input="emit('update', 'testCase', [
              ...value.testCase.slice(0, i),
              {
                ...value.testCase[i],
                memoryLimit: Number(($event.target as HTMLInputElement).value),
              },
              ...value.testCase.slice(i + 1),
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
            :value="value.testCase[i].timeLimit"
            @input="emit('update', 'testCase', [
              ...value.testCase.slice(0, i),
              {
                ...value.testCase[i],
                timeLimit: Number(($event.target as HTMLInputElement).value),
              },
              ...value.testCase.slice(i + 1),
            ])"
          />
        </div>
      </div>
    </template>

    <TestdataDescriptionModal />
  </div>
</template>
