<script setup lang="ts">
import dayjs from "dayjs";
import { reactive } from "vue";
import { useTitle } from "@vueuse/core";
import { useRoute } from "vue-router";

const route = useRoute();
useTitle(`New Announcement - ${route.params.name} | Normal OJ`);
const newPost = reactive<Post>({
  title: "Example",
  markdown: `_Markdown_ & $\\text{katex}$ are supported.\n![](https://64.media.tumblr.com/2e2d5f1e4f0667c181c3afa9ef8cca1b/tumblr_mu4kbwQ0eY1qki7dgo1_500.gifv)`,
  pinned: false,
});
const previewPostMockMeta = {
  creator: { displayedName: "bogay" },
  createTime: dayjs().unix(),
  updateTime: dayjs().unix(),
};

function update<K extends keyof Post>(key: K, value: Post[K]) {
  newPost[key] = value;
}
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title mb-3 justify-between">
          New Announcement
          <div class="btn"><i-uil-file-upload-alt class="mr-1 lg:h-5 lg:w-5" /> Submit</div>
        </div>

        <post-form :value="newPost" @update="update" />

        <div class="divider" />

        <div class="card-title mb-3">Preview</div>

        <post-card :post="{ ...previewPostMockMeta, ...newPost }" />
      </div>
    </div>
  </div>
</template>
