<script setup lang="ts">
import dayjs from "dayjs";
import { reactive } from "vue";

const newPost = reactive({
  title: "Example",
  markdown: `_Markdown_ & $\\text{katex}$ are supported.\n![](https://64.media.tumblr.com/2e2d5f1e4f0667c181c3afa9ef8cca1b/tumblr_mu4kbwQ0eY1qki7dgo1_500.gifv)`,
  pinned: false,
});

const previewPost = {
  creator: { displayedName: "bogay" },
  createTime: dayjs().unix(),
  updateTime: dayjs().unix(),
};
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title mb-3 justify-between">
          New Announcement
          <div class="btn"><i-uil-file-upload-alt class="mr-1 lg:h-5 lg:w-5" /> Submit</div>
        </div>

        <div class="grid grid-cols-1 gap-y-4 lg:grid-cols-2">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Title</span>
            </label>
            <input v-model="newPost.title" type="text" class="input-bordered input w-full max-w-xs" />
            <label class="label">
              <span class="label-text-alt">At most 64 alphanumeric characters</span>
            </label>
          </div>

          <div class="form-control w-full lg:col-span-2">
            <label class="label">
              <span class="label-text">Description</span>
            </label>
            <textarea v-model="newPost.markdown" class="textarea-bordered textarea h-24" />
          </div>
        </div>

        <div class="divider" />

        <div class="card-title mb-3">Preview</div>

        <post-card :post="{ ...previewPost, ...newPost }" />
      </div>
    </div>
  </div>
</template>
