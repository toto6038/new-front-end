<script setup lang="ts"></script>

<template>
  <div class="navbar min-h-[2rem] border-b border-gray-600 px-6">
    <div class="breadcrumbs flex-1 text-sm">
      <ul>
        <li>
          <a :href="`/course/${$route.params.name}`">{{ $route.params.name }}</a>
        </li>
        <li>Homeworks</li>
      </ul>
    </div>
  </div>
</template>
