<script setup lang="ts">
import { useRoute } from "vue-router";
import { useTheme } from "../stores/theme";
import { useDark, useToggle } from "@vueuse/core";
import { useSession } from "../stores/session";
import { watchEffect } from "vue";
import { useStorage } from "@vueuse/core";

const isDark = useDark({
  selector: "html",
  attribute: "data-theme",
  valueDark: "dark",
  valueLight: "light",
});
const toggleDark = useToggle(isDark);
const isMini = useStorage("mini-sidebar", false);
const theme = useTheme();
watchEffect(() => {
  theme.setIsDark(isDark.value);
});

const route = useRoute();
const matchRoute = (path: string) => {
  return route.matched.some((r) => r.path === path);
};

const session = useSession();
</script>

<template>
  <label for="noj-drawer" class="drawer-overlay"></label>
  <ul
    :class="['menu w-96 flex-col overflow-y-auto bg-primary py-4 text-white', isMini ? 'lg:w-14' : 'lg:w-28']"
  >
    <div class="my-2 flex justify-center">
      <img src="../assets/logo.svg" alt="NOJ Logo" :class="['mb-2', isMini ? 'w-10' : 'w-14']" />
    </div>
    <li>
      <side-bar-link :class="{ 'btn-lg': !isMini, 'btn-active': matchRoute('/') }" to="/">
        <i-uil-home class="h-6 w-6" />
        <span v-show="!isMini" class="text-sm">Home</span>
      </side-bar-link>
    </li>
    <li v-if="session.isLogin">
      <side-bar-link :class="{ 'btn-lg': !isMini, 'btn-active': matchRoute('/courses') }" to="/courses">
        <i-uil-book-alt class="h-6 w-6" />
        <span v-show="!isMini" class="text-sm">Course</span>
      </side-bar-link>
    </li>
    <li>
      <side-bar-link :class="{ 'btn-lg': !isMini, 'btn-active': matchRoute('/about') }" to="/about">
        <i-uil-map-marker-info class="h-6 w-6" />
        <span v-show="!isMini" class="text-sm">About</span>
      </side-bar-link>
    </li>

    <div class="flex-1" />

    <li v-if="session.isAdmin">
      <side-bar-link :class="{ 'btn-lg': !isMini, 'btn-active': matchRoute('/admin') }" to="/admin">
        <i-uil-wrench class="h-6 w-6" />
        <span v-show="!isMini" class="text-sm">Admin</span>
      </side-bar-link>
    </li>
    <li v-if="session.isLogin">
      <side-bar-link :class="{ 'btn-lg': !isMini, 'btn-active': matchRoute('/profile') }" to="/profile">
        <i-uil-user class="h-6 w-6" />
        <span v-show="!isMini" class="text-sm">Profile</span>
      </side-bar-link>
    </li>
    <li>
      <label class="swap swap-rotate">
        <input :value="isDark" type="checkbox" @input="() => toggleDark()" />
        <i-uil-sun class="swap-on h-6 w-6" />
        <i-uil-moon class="swap-off h-6 w-6" />
      </label>
    </li>
    <li>
      <label class="swap swap-rotate">
        <input v-model="isMini" type="checkbox" />
        <i-uil-angle-double-right class="swap-on h-6 w-6" />
        <i-uil-angle-double-left class="swap-off h-6 w-6" />
      </label>
    </li>
  </ul>
</template>
