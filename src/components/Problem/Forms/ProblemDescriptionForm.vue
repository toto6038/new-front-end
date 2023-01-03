<script setup lang="ts">
import { inject, Ref } from "vue";

// TODO: handling error when problem is undefined
const problem = inject<Ref<EditableProblem>>("problem") as Ref<EditableProblem>;
// TODO: handling error when updateProblem is undefined
const updateProblem = inject<ProblemUpdater>("updateProblem") as ProblemUpdater;
</script>

<template>
  <div class="form-control col-span-2 w-full">
    <label class="label">
      <span class="label-text">Description</span>
    </label>
    <textarea
      class="textarea-bordered textarea h-24"
      :value="problem.description.description"
      @input="updateProblem('description', {
          ...problem.description,
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
      :value="problem.description.input"
      @input="updateProblem('description', {
          ...problem.description,
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
      :value="problem.description.output"
      @input="updateProblem('description', {
          ...problem.description,
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
      :value="problem.description.hint"
      @input="updateProblem('description', {
          ...problem.description,
          hint: ($event.target as HTMLTextAreaElement).value
        })"
    />
  </div>

  <template v-for="(no, i) in problem.description.sampleInput.length">
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Sample Input {{ no }}</span>
      </label>
      <textarea
        class="textarea-bordered textarea h-24"
        :value="problem.description.sampleInput[i]"
        @input="
            updateProblem('description', {
              ...problem.description,
              sampleInput: [
                ...problem.description.sampleInput.slice(0, i),
                ($event.target as HTMLInputElement).value,
                ...problem.description.sampleInput.slice(i + 1),
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
        :value="problem.description.sampleOutput[i]"
        @input="
            updateProblem('description', {
              ...problem.description,
              sampleOutput: [
                ...problem.description.sampleOutput.slice(0, i),
                ($event.target as HTMLInputElement).value,
                ...problem.description.sampleOutput.slice(i + 1),
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
          updateProblem('description', {
            ...problem.description,
            sampleInput: [...problem.description.sampleInput, ''],
            sampleOutput: [...problem.description.sampleOutput, ''],
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
          updateProblem('description', {
            ...problem.description,
            sampleInput: problem.description.sampleInput.slice(0, -1),
            sampleOutput: problem.description.sampleOutput.slice(0, -1),
          })
        "
      >
        <i-uil-minus class="mr-1" />
      </div>
    </div>
  </div>
</template>
