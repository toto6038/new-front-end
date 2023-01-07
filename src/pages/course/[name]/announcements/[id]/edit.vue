<script setup lang="ts">
import dayjs from "dayjs";
import { ref, reactive } from "vue";
import { useTitle } from "@vueuse/core";
import { useRoute } from "vue-router";

const route = useRoute();
useTitle(`Edit Announcement - ${route.params.id} - ${route.params.name} | Normal OJ`);
const post = {
  annId: "5fe6c3331117bf688d986cab",
  createTime: 1608958771,
  creator: { displayedName: "bogay", md5: "4d8a688b2637fcf029e8d6dd8458bab3", role: 0, username: "bogay" },
  markdown:
    "\u5404\u4f4d\u540c\u5b78\u5927\u5bb6\u597d\uff0c\n\u4eca\u65e5\u4e2d\u5348\u56e0\u70ba\u516c\u9928\u6821\u5340\u7a81\u7136\u505c\u96fb\uff0c\u9020\u6210\u6211\u5011\u7684\u4e3b\u6a5f\u95dc\u6a5f\u4e86\u4e00\u9663\u5b50\uff0c\u73fe\u5728\u670d\u52d9\u5df2\u7d93\u4e0a\u7dda\u3002\n\n",
  pinned: false,
  title: "\u516c\u9928\u6821\u5340\u505c\u96fb",
  updateTime: 1608958771,
  updater: { displayedName: "bogay", md5: "4d8a688b2637fcf029e8d6dd8458bab3", role: 0, username: "bogay" },
};
const editedPost = reactive<AnnouncementForm>({
  title: post.title,
  markdown: post.markdown,
  pinned: post.pinned,
});
const previewPostMockMeta = {
  creator: post.creator,
  createTime: post.createTime,
  updateTime: dayjs().unix(),
};

function update<K extends keyof AnnouncementForm>(key: K, value: AnnouncementForm[K]) {
  editedPost[key] = value;
}

const openPreview = ref<boolean>(false);
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title mb-3 flex-wrap justify-between lg:flex-nowrap">
          Edit Announcement
          <div class="flex gap-x-3">
            <button class="btn-outline btn-error btn-sm btn lg:btn-md">
              <i-uil-trash-alt class="mr-1 lg:h-5 lg:w-5" /> Delete
            </button>
            <button class="btn-warning btn-sm btn lg:btn-md">
              <i-uil-times-circle class="mr-1 lg:h-5 lg:w-5" /> Discard Changes
            </button>
            <button class="btn-success btn-sm btn lg:btn-md">
              <i-uil-save class="mr-1 lg:h-5 lg:w-5" /> Save
            </button>
          </div>
        </div>

        <div class="alert alert-warning">
          <div>
            <i-uil-exclamation-octagon />
            <span>This page in under development</span>
          </div>
        </div>

        <!-- <announcement-form :value="editedPost" @update="update" /> -->

        <div class="divider" />

        <div class="card-title mb-3">
          Preview
          <input v-model="openPreview" type="checkbox" class="toggle" />
        </div>

        <!-- <announcement-card v-show="openPreview" :post="{ ...previewPostMockMeta, ...editedPost }" /> -->
      </div>
    </div>
  </div>
</template>
