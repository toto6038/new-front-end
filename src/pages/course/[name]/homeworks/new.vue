<script setup lang="ts">
import dayjs from "dayjs";
import { computed, reactive, ref, watchEffect } from "vue";

const newHomework = reactive({
  end: dayjs().add(7, "day").unix(),
  markdown: `_Markdown_ & $\\text{katex}$ are supported.\n![](https://64.media.tumblr.com/2e2d5f1e4f0667c181c3afa9ef8cca1b/tumblr_mu4kbwQ0eY1qki7dgo1_500.gifv)`,
  name: "Example",
  problemIds: [] as number[],
  start: dayjs().unix(),
});
const problems = [
  { problemId: 3, problemName: "A+B" },
  { problemId: 4, problemName: "A+B+C" },
  { problemId: 5, problemName: "A+B+D" },
];
const problemSelected = reactive(
  Object.fromEntries(
    problems.map(({ problemId }) => [problemId, newHomework.problemIds.includes(problemId)]),
  ),
);

const startDateTime = computed(() => dayjs(newHomework.start * 1000).format("YYYY-MM-DD\THH:mm"));
const endDateTime = computed(() => dayjs(newHomework.end * 1000).format("YYYY-MM-DD\THH:mm"));
const handleStartDateTimeInput = (event: any) => {
  newHomework.start = dayjs(event.target.value).valueOf() / 1000;
};
const handleEndDateTimeInput = (event: any) => {
  newHomework.end = dayjs(event.target.value).valueOf() / 1000;
};

watchEffect(() => {
  newHomework.problemIds = Object.entries(problemSelected)
    .filter(([, selected]) => selected)
    .map(([problemId]) => Number(problemId));
});

const modalOpen = ref(false);
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title mb-3 justify-between">
          New Homework
          <div class="btn"><i-uil-file-upload-alt class="mr-1 lg:h-5 lg:w-5" /> Submit</div>
        </div>

        <div class="grid grid-cols-1 gap-y-4 lg:grid-cols-2">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input v-model="newHomework.name" type="text" class="input-bordered input w-full max-w-xs" />
            <label class="label">
              <span class="label-text-alt">At most 64 alphanumeric characters</span>
            </label>
          </div>

          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Problems</span>
            </label>
            <input
              :value="newHomework.problemIds.join(', ')"
              @focus="modalOpen = true"
              type="text"
              class="input-bordered input w-full max-w-xs"
            />
          </div>

          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">From</span>
            </label>
            <input
              :value="startDateTime"
              class="input-bordered input w-full max-w-xs"
              type="datetime-local"
              @change="handleStartDateTimeInput"
            />
          </div>

          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Due</span>
            </label>
            <input
              :value="endDateTime"
              class="input-bordered input w-full max-w-xs"
              type="datetime-local"
              @change="handleEndDateTimeInput"
            />
          </div>

          <div class="form-control w-full lg:col-span-2">
            <label class="label">
              <span class="label-text">Description</span>
            </label>
            <textarea v-model="newHomework.markdown" class="textarea-bordered textarea h-24" />
          </div>
        </div>

        <div class="divider" />

        <div class="card-title mb-3">Preview</div>

        <homework-card :homework="newHomework" />
      </div>
    </div>
    <input v-model="modalOpen" type="checkbox" id="my-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Select problems</h3>
        <div class="h-[200px] overflow-y-auto py-4">
          <div v-for="{ problemId, problemName } in problems" class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">{{ problemId }} - {{ problemName }}</span>
              <input v-model="problemSelected[problemId]" type="checkbox" class="checkbox" />
            </label>
          </div>
        </div>
        <div class="modal-action">
          <label for="my-modal" class="btn">Done</label>
        </div>
      </div>
    </div>
  </div>
</template>
