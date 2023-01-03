<script setup lang="ts">
interface Props {
  value: Post;
}
defineProps<Props>();
const emit = defineEmits<{
  (e: "update", key: keyof Post, value: Post[typeof key]): void;
}>();
</script>

<template>
  <div class="grid grid-cols-1 gap-y-4 lg:grid-cols-2">
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Title</span>
      </label>
      <input
        type="text"
        class="input-bordered input w-full max-w-xs"
        :value="value.title"
        @input="emit('update', 'title', ($event.target as HTMLInputElement).value)"
      />
      <label class="label">
        <span class="label-text-alt">At most 64 alphanumeric characters</span>
      </label>
    </div>

    <div class="form-control">
      <label class="label cursor-pointer justify-start gap-x-4">
        <span class="label-text">Pin to top</span>
        <input
          type="checkbox"
          class="toggle"
          :value="value.pinned"
          @input="emit('update', 'pinned', ($event.target as HTMLInputElement).value)"
        />
      </label>
    </div>

    <div class="form-control w-full lg:col-span-2">
      <label class="label">
        <span class="label-text">Description</span>
      </label>
      <textarea
        class="textarea-bordered textarea h-24"
        :value="value.markdown"
        @input="emit('update', 'markdown', ($event.target as HTMLTextAreaElement).value)"
      />
    </div>
  </div>
</template>
