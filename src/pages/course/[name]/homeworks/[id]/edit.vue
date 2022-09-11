<script setup lang="ts">
import { ref, reactive } from "vue";
import { useTitle } from "@vueuse/core";
import { useRoute } from "vue-router";

const route = useRoute();
useTitle(`Edit Homework - ${route.params.id} - ${route.params.name} | Normal OJ`);
const homework = {
  end: 1648268228,
  id: "603fe161dbc9fdbe448ed0a4",
  markdown:
    "Homework #0 \u4f9b\u540c\u5b78\u6e2c\u8a66\u4f7f\u7528\uff0c\u6c92\u6709\u8a08\u5206\uff0c\u4ea6\u4e0d\u4f54\u7528\u91d1\u724c\u3002\n\nIf there is any question please let us know.\n\nemail: [algota@noj.tw](mailto:algota@noj.tw)",
  name: "HW #0",
  problemIds: [118],
  start: 1614820200,
  studentStatus: {},
};
const editedHomework = reactive<Homework>({ ...homework });
const problems = [
  { problemId: 118, problemName: "A+B" },
  { problemId: 119, problemName: "A+B+C" },
  { problemId: 120, problemName: "A+B+D" },
];

function update<K extends keyof Homework>(key: K, value: Homework[K]) {
  editedHomework[key] = value;
}

const openPreview = ref<boolean>(false);
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title mb-3 justify-between">
          Edit homework: {{ homework.name }}
          <button class="btn"><i-uil-save class="mr-1 lg:h-5 lg:w-5" /> Save</button>
        </div>

        <homework-form :value="editedHomework" :problems="problems" @update="update" />

        <div class="divider" />

        <div class="card-title mb-3">
          Preview
          <input v-model="openPreview" type="checkbox" class="toggle" />
        </div>

        <homework-card v-show="openPreview" :homework="editedHomework" preview />
      </div>
    </div>
  </div>
</template>
