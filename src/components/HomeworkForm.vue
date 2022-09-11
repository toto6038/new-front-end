<script setup lang="ts">
import { ref, reactive, computed, PropType, watch } from "vue";
import dayjs from "dayjs";

const props = defineProps({
  value: {
    type: Object as PropType<Homework>,
    required: true,
  },
  problems: {
    type: Array as PropType<{ problemId: number; problemName: string }[]>,
    required: true,
  },
});
const emit = defineEmits<{
  (e: "update", key: keyof Homework, value: Homework[typeof key]): void;
}>();

const problemSelected = reactive(
  Object.fromEntries(
    props.problems.map(({ problemId }) => [problemId, props.value.problemIds.includes(problemId)]),
  ),
);
watch(problemSelected, (newProblemSelected) => {
  emit(
    "update",
    "problemIds",
    Object.entries(newProblemSelected)
      .filter(([, selected]) => selected)
      .map(([problemId]) => Number(problemId)),
  );
});
const modalOpen = ref(false);

const startDateTime = computed(() => dayjs(props.value.start * 1000).format("YYYY-MM-DD\THH:mm"));
const endDateTime = computed(() => dayjs(props.value.end * 1000).format("YYYY-MM-DD\THH:mm"));
function handleStartDateTimeInput(event: any) {
  emit("update", "start", dayjs(event.target.value).valueOf() / 1000);
}
function handleEndDateTimeInput(event: any) {
  emit("update", "end", dayjs(event.target.value).valueOf() / 1000);
}
</script>

<template>
  <div class="grid grid-cols-1 gap-y-4 lg:grid-cols-2">
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Name</span>
      </label>
      <input
        type="text"
        class="input-bordered input w-full max-w-xs"
        :value="value.name"
        @input="emit('update', 'name', ($event.target as HTMLInputElement).value)"
      />
      <label class="label">
        <span class="label-text-alt">At most 64 alphanumeric characters</span>
      </label>
    </div>

    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Problems</span>
      </label>
      <input
        type="text"
        class="input-bordered input w-full max-w-xs"
        :value="value.problemIds.join(', ')"
        @focus="modalOpen = true"
      />
    </div>

    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">From</span>
      </label>
      <input
        type="datetime-local"
        class="input-bordered input w-full max-w-xs"
        :value="startDateTime"
        @change="handleStartDateTimeInput"
      />
    </div>

    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Due</span>
      </label>
      <input
        type="datetime-local"
        class="input-bordered input w-full max-w-xs"
        :value="endDateTime"
        @change="handleEndDateTimeInput"
      />
    </div>

    <div class="form-control w-full lg:col-span-2">
      <label class="label">
        <span class="label-text">Description</span>
      </label>
      <textarea
        class="textarea-bordered textarea h-24"
        :value="value.markdown"
        @input="emit('update', 'markdown', ($event.target as HTMLTextAreaElement).value)"
      />
    </div>

    <input v-model="modalOpen" type="checkbox" id="select-problems-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <div class="text-lg font-bold">Select Problems</div>
        <div class="h-[200px] overflow-y-auto py-4">
          <div v-for="{ problemId, problemName } in problems" class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">{{ problemId }} - {{ problemName }}</span>
              <input v-model="problemSelected[problemId]" type="checkbox" class="checkbox" />
            </label>
          </div>
        </div>
        <div class="modal-action">
          <label for="select-problems-modal" class="btn">Done</label>
        </div>
      </div>
    </div>
  </div>
</template>
