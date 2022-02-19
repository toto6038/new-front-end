<script setup lang="ts">
import { useRoute } from "vue-router";

defineEmits(["toggle-dark-mode"]);
defineProps({
  dark: {
    type: Boolean,
    default: false,
  },
});
const route = useRoute();
const matchRoute = (path: string) => {
  return route.matched.some((r) => r.path === path);
};
</script>

<template>
  <label for="noj-drawer" class="drawer-overlay"></label>
  <ul class="menu w-96 flex-col overflow-y-auto bg-primary py-4 text-white lg:w-28">
    <div class="my-2 flex justify-center">
      <img src="../assets/logo.svg" alt="NOJ Logo" class="mb-2 w-14" />
    </div>
    <li>
      <div
        :class="['btn btn-primary btn-lg rounded-none p-2', { 'btn-active': matchRoute('/') }]"
        @click="$router.push('/')"
      >
        <div class="flex flex-col items-center">
          <i-uil-home class="h-6 w-6" />
          <span class="text-sm">Home</span>
        </div>
      </div>
    </li>
    <li>
      <div
        :class="['btn btn-primary btn-lg rounded-none p-2', { 'btn-active': matchRoute('/courses') }]"
        @click="$router.push('/courses')"
      >
        <div class="flex flex-col items-center">
          <i-uil-book-alt class="h-6 w-6" />
          <span class="text-sm">Course</span>
        </div>
      </div>
    </li>
    <li>
      <div
        :class="['btn btn-primary btn-lg rounded-none p-2', { 'btn-active': matchRoute('/about') }]"
        @click="$router.push('/about')"
      >
        <div class="flex flex-col items-center">
          <i-uil-map-marker-info class="h-6 w-6" />
          <span class="text-sm">About</span>
        </div>
      </div>
    </li>

    <div class="flex-1" />

    <li class="mb-4">
      <div class="btn btn-primary btn-circle mx-auto" @click="$emit('toggle-dark-mode')">
        <div>
          <i-uil-sun v-if="dark" class="h-6 w-6" />
          <i-uil-moon v-else class="h-6 w-6" />
        </div>
      </div>
    </li>
    <li>
      <div
        :class="['btn btn-primary btn-lg rounded-none p-2', { 'btn-active': matchRoute('/admin') }]"
        @click="$router.push('/admin')"
      >
        <div class="flex flex-col items-center">
          <i-uil-wrench class="h-6 w-6" />
          <span class="text-sm">Admin</span>
        </div>
      </div>
    </li>
    <li>
      <div
        :class="['btn btn-primary btn-lg rounded-none p-2', { 'btn-active': matchRoute('/profile') }]"
        @click="$router.push('/profile')"
      >
        <div class="flex flex-col items-center">
          <i-uil-user class="h-6 w-6" />
          <span class="text-sm">Profile</span>
        </div>
      </div>
    </li>
  </ul>
</template>
