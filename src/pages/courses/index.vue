<script setup lang="ts">
import { useTitle } from "@vueuse/core";

useTitle("Courses | Normal OJ");
const courses = [
  {
    course: "Public",
    teacher: {
      displayedName: "the first admin",
      md5: "f1911eb6f6121582b644a7eb968461bc",
      role: 0,
      username: "first_admin",
    },
  },
  {
    course: "Test",
    teacher: {
      displayedName: "the first admin",
      md5: "f1911eb6f6121582b644a7eb968461bc",
      role: 0,
      username: "first_admin",
    },
  },
  {
    course: "aaaaaaaa",
    teacher: {
      displayedName: "the first admin",
      md5: "f1911eb6f6121582b644a7eb968461bc",
      role: 0,
      username: "first_admin",
    },
  },
  {
    course: "Computer-Programming-I",
    teacher: { displayedName: "", md5: "3a7e8007ee6c3647d0562836e9726d1b", role: 1, username: "hlwang" },
  },
  {
    course: "Algorithms-in-Daily-Lives",
    teacher: { displayedName: "", md5: "3a7e8007ee6c3647d0562836e9726d1b", role: 1, username: "hlwang" },
  },
  {
    course: "AlgorithmTest",
    teacher: {
      displayedName: "\u52a9\u6559_\u4e8e\u5b50\u7def",
      md5: "c222b446affb0f9262a45d2e73fd714f",
      role: 0,
      username: "TA_TzuWei_Yu",
    },
  },
  {
    course: "Algorithm2021",
    teacher: {
      displayedName: "",
      md5: "d63a05e314f9ce93da32f4fb1eff0968",
      role: 1,
      username: "Algorithm2021",
    },
  },
  {
    course: "Computer-Programming-II",
    teacher: { displayedName: "", md5: "3a7e8007ee6c3647d0562836e9726d1b", role: 1, username: "hlwang" },
  },
  {
    course: "Computer-Programming-2021-Summer",
    teacher: { displayedName: "", md5: "3a7e8007ee6c3647d0562836e9726d1b", role: 1, username: "hlwang" },
  },
  {
    course: "110-Computer-Programming-I",
    teacher: { displayedName: "", md5: "3a7e8007ee6c3647d0562836e9726d1b", role: 1, username: "hlwang" },
  },
];
</script>

<template>
  <div class="card mx-auto max-w-5xl shadow-xl">
    <div class="card-body">
      <div class="card-title">Course List</div>

      <div class="mt-8 overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>Course</th>
              <th>Teacher</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="{ course, teacher } in courses"
              :key="course"
              class="hover cursor-pointer"
              @click="$router.push(`/course/${course}`)"
            >
              <td>{{ course }}</td>
              <td>{{ teacher.username }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
