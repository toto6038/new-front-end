<script setup lang="ts">
import { ref, watchEffect } from "vue";
import hljs from "highlight.js";

const code = ref("");
const lang = ref<string | null>(null);

watchEffect(() => {
  const detectedLang = hljs.highlightAuto(code.value, ["c", "cpp", "python"]).language;
  // Since c and cpp are difficult to distinguish, we only detect python.
  if (detectedLang === "python") {
    lang.value = "py3";
  }
});
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <h2 class="card-title md:text-2xl lg:text-3xl">Submit to problem #{{ $route.params.id }}</h2>

        <h2 class="card-title mt-10 md:text-lg lg:text-xl">Paste your code here</h2>
        <code-editor v-model="code" class="mt-4" />

        <div class="mt-10 flex justify-between">
          <div class="form-control w-full max-w-xs">
            <select v-model="lang" class="select-bordered select">
              <option :value="null">Select language</option>
              <option value="c">c</option>
              <option value="cpp">cpp</option>
              <option value="py3">py3</option>
            </select>
          </div>

          <div class="btn"><i-uil-file-upload-alt class="mr-1 h-5 w-5" /> Submit</div>
        </div>
      </div>
    </div>
  </div>
</template>
