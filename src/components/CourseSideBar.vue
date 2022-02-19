<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
});

const navs = [
  {
    name: "Announcements",
    path: "/announcements",
  },
  {
    name: "Homeworks",
    path: "/homeworks",
  },
  {
    name: "Problems",
    path: "/problems",
  },
  {
    name: "Submissions",
    path: "/submissions",
  },
  {
    name: "Members",
    path: "/members",
  },
];
</script>

<template>
  <ul class="menu rounded-box w-56 bg-base-100 p-2">
    <li v-for="{ name: label, path } in navs">
      <a :href="`/course/${name}${path}`">{{ label }}</a>
    </li>
  </ul>
</template>
