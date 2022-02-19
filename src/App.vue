<script setup lang="ts">
import { ref, watchEffect } from "vue";

const enableDarkMode = ref<Boolean>(
  (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ||
    localStorage.getItem("dark-theme") === "true",
);
if (window.matchMedia) {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    enableDarkMode.value = event.matches;
  });
}
const toggleDarkMode = () => {
  enableDarkMode.value = !enableDarkMode.value;
  localStorage.setItem("dark-theme", enableDarkMode.value.toString());
};
watchEffect(() => {
  const htmlEl = document.querySelector("html");
  htmlEl?.setAttribute("data-theme", enableDarkMode.value ? "dark" : "light");
});
</script>

<template>
  <div class="drawer-mobile drawer h-screen w-full">
    <input id="noj-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <top-bar class="lg:hidden" />
      <router-view />
    </div>
    <div class="drawer-side">
      <side-bar :dark="enableDarkMode" @toggle-dark-mode="toggleDarkMode" />
    </div>
  </div>
</template>
