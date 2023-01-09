<script setup lang="ts">
import { inject, ref, watchEffect } from "vue";
import { useSourceLang } from "@/composables/useSourceLang";

// TODO: handling error when problem is undefined
const problem = inject<EditableProblem>("problem") as EditableProblem;
// TODO: handling error when updateProblem is undefined
const updateProblem = inject<ProblemUpdater>("updateProblem") as ProblemUpdater;

const allowedLanguageSelectModalOpen = ref(false);
const { selectLangMap, readableLang, selectedLang } = useSourceLang(problem.allowedLanguage);
watchEffect(() => {
  updateProblem("allowedLanguage", selectedLang.value);
});
</script>

<template>
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">Allowed Languages</span>
    </label>
    <input
      type="text"
      class="input-bordered input w-full max-w-xs"
      :value="readableLang"
      @focus="allowedLanguageSelectModalOpen = true"
    />
  </div>
  <input
    v-model="allowedLanguageSelectModalOpen"
    type="checkbox"
    id="select-langs-modal"
    class="modal-toggle"
  />
  <div class="modal">
    <div class="modal-box">
      <div class="text-lg font-bold">Select Allowed Languages</div>
      <div class="h-[200px] overflow-y-auto py-4">
        <div v-for="(value, key) in selectLangMap" class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">{{ key }}</span>
            <input :value="value" type="checkbox" class="checkbox" @change="selectLangMap[key] = !value" />
          </label>
        </div>
      </div>
      <div class="modal-action">
        <label for="select-langs-modal" class="btn">Done</label>
      </div>
    </div>
  </div>
</template>
