<script setup lang="ts">
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
  <ul class="menu menu-compact w-52 bg-base-100 p-2 lg:menu-normal">
    <li
      v-for="{ name, path } in navs"
      :class="[{ 'border-l-4 border-primary': $route.path === `/course/${$route.params.name}${path}` }]"
    >
      <a :href="`/course/${$route.params.name}${path}`">{{ name }}</a>
    </li>
  </ul>
</template>
