<script setup lang="ts">
const homeworks = [
  {
    end: 1648268228,
    id: "603fe161dbc9fdbe448ed0a4",
    markdown:
      "Homework #0 \u4f9b\u540c\u5b78\u6e2c\u8a66\u4f7f\u7528\uff0c\u6c92\u6709\u8a08\u5206\uff0c\u4ea6\u4e0d\u4f54\u7528\u91d1\u724c\u3002\n\nIf there is any question please let us know.\n\nemail: [algota@noj.tw](mailto:algota@noj.tw)",
    name: "HW #0",
    problemIds: [118],
    start: 1614820200,
  },
  {
    end: 1658268228,
    id: "603fe161dbc9fdbe448ed0a5",
    markdown:
      "Homework #0 \u4f9b\u540c\u5b78\u6e2c\u8a66\u4f7f\u7528\uff0c\u6c92\u6709\u8a08\u5206\uff0c\u4ea6\u4e0d\u4f54\u7528\u91d1\u724c\u3002\n\nIf there is any question please let us know.\n\nemail: [algota@noj.tw](mailto:algota@noj.tw)",
    name: "HW #0",
    problemIds: [118],
    start: 1654620200,
  },
  {
    end: 1638268228,
    id: "603fe161dbc9fdbe448ed0a6",
    markdown:
      "Homework #0 \u4f9b\u540c\u5b78\u6e2c\u8a66\u4f7f\u7528\uff0c\u6c92\u6709\u8a08\u5206\uff0c\u4ea6\u4e0d\u4f54\u7528\u91d1\u724c\u3002\n\nIf there is any question please let us know.\n\nemail: [algota@noj.tw](mailto:algota@noj.tw)",
    name: "HW #0",
    problemIds: [118],
    start: 1614820200,
  },
];
</script>

<template>
  <div class="flex w-full justify-center">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title mb-3">Homeworks</div>
        <homework-card v-for="homework in homeworks" :key="homework.id" :homework="homework" class="mt-2" />
      </div>
    </div>
  </div>
</template>
