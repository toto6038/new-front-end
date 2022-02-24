<template>
  <div class="drawer-mobile drawer h-screen w-full">
    <input id="noj-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <top-bar class="lg:hidden" />
      <router-view />
    </div>
    <div class="drawer-side">
      <side-bar />
    </div>
  </div>
</template>
