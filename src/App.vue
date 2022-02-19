<script setup lang="ts">
import { watchEffect } from "vue";
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);

watchEffect(() => {
  const htmlEl = document.querySelector("html");
  htmlEl?.setAttribute("data-theme", isDark.value ? "dark" : "light");
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
      <side-bar :dark="isDark" @toggle-dark-mode="toggleDark" />
    </div>
  </div>
</template>
