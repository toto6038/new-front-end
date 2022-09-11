<script setup lang="ts">
const props = defineProps({
  selectLangMap: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits<{
  (e: "update:selectLangMap", value: any): void;
}>();
</script>

<template>
  <div class="modal">
    <div class="modal-box">
      <div class="text-lg font-bold">Select Allowed Languages</div>
      <div class="h-[200px] overflow-y-auto py-4">
        <div v-for="(value, key) in selectLangMap" class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">{{ key }}</span>
            <input
              :value="value"
              type="checkbox"
              class="checkbox"
              @change="
                emit('update:selectLangMap', {
                  ...props.selectLangMap,
                  [key]: !value,
                })
              "
            />
          </label>
        </div>
      </div>
      <div class="modal-action">
        <label for="select-langs-modal" class="btn">Done</label>
      </div>
    </div>
  </div>
</template>
