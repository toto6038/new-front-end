<script setup lang="ts">
const posts = [
  {
    annId: "5fe6c3331117bf688d986cab",
    createTime: 1608958771,
    creator: { displayedName: "bogay", md5: "4d8a688b2637fcf029e8d6dd8458bab3", role: 0, username: "bogay" },
    markdown:
      "\u5404\u4f4d\u540c\u5b78\u5927\u5bb6\u597d\uff0c\n\u4eca\u65e5\u4e2d\u5348\u56e0\u70ba\u516c\u9928\u6821\u5340\u7a81\u7136\u505c\u96fb\uff0c\u9020\u6210\u6211\u5011\u7684\u4e3b\u6a5f\u95dc\u6a5f\u4e86\u4e00\u9663\u5b50\uff0c\u73fe\u5728\u670d\u52d9\u5df2\u7d93\u4e0a\u7dda\u3002\n\n",
    pinned: false,
    title: "\u516c\u9928\u6821\u5340\u505c\u96fb",
    updateTime: 1608958771,
    updater: { displayedName: "bogay", md5: "4d8a688b2637fcf029e8d6dd8458bab3", role: 0, username: "bogay" },
  },
  {
    annId: "5f7fd49d8624d322753e232f",
    createTime: 1602213021,
    creator: {
      displayedName: "AlaRduTP",
      md5: "7e0a69b95e518e89a2efb7f7d5365263",
      role: 0,
      username: "AlaRduTP",
    },
    markdown: "1. ABC\n2. DEF\n3. GHI",
    pinned: true,
    title: "\u7576\u5fd8\u8a18\u5bc6\u78bc\u6642\u22ef\u22ef",
    updateTime: 1614751480,
    updater: {
      displayedName: "\u52a9\u6559_\u4e8e\u5b50\u7def",
      md5: "c222b446affb0f9262a45d2e73fd714f",
      role: 0,
      username: "TA_TzuWei_Yu",
    },
  },
];
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title mb-3">Announcements</div>
        <post-card v-for="post in posts" :key="post.annId" :post="post" />
      </div>
    </div>
  </div>
</template>
