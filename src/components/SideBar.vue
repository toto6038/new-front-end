<script setup lang="ts">
import { useRoute } from "vue-router";
import { useThemeStore } from "../stores/theme";
import { useDark, useToggle } from "@vueuse/core";
import { watchEffect } from "vue";

const isDark = useDark({
  selector: "html",
  attribute: "data-theme",
  valueDark: "dark",
  valueLight: "light",
});
const toggleDark = useToggle(isDark);
const themeStore = useThemeStore();
watchEffect(() => {
  themeStore.setIsDark(isDark.value);
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
      <label class="swap swap-rotate">
        <input :value="isDark" type="checkbox" @input="() => toggleDark()" />
        <i-uil-sun class="swap-on h-6 w-6" />
        <i-uil-moon class="swap-off h-6 w-6" />
      </label>
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
