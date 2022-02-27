<script setup lang="ts">
import { useTitle } from "@vueuse/core";
import { formatTime } from "../utils/formatTime";

useTitle("Home | Normal OJ");

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
];
</script>

<template>
  <div class="mx-auto flex max-w-7xl gap-8 p-4">
    <div class="card-container">
      <div class="card min-w-full">
        <div class="card-body">
          <div class="card-title mb-3">Announcement</div>
          <div class="mt-8 overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Create At</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="{ title, creator, createTime, annId } in posts"
                  class="hover cursor-pointer"
                  @click="$router.push(`/announcements/${annId}`)"
                >
                  <td>{{ title }}</td>
                  <td>{{ creator.displayedName }}</td>
                  <td>{{ formatTime(createTime) }}</td>
                  <td>
                    <div
                      class="btn btn-sm"
                      @click.stop="$router.push(`/course/Public/announcements/${annId}/edit`)"
                    >
                      <i-uil-edit class="mr-1" /> Edit
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="card-container">
      <div class="card min-w-full">
        <div class="card-body">
          <div class="card-title mb-2">Sign in</div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input type="text" placeholder="email" class="input-bordered input" />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input type="text" placeholder="password" class="input-bordered input" />
            <label class="label">
              <a href="#" class="link-hover label-text-alt link">Forgot password?</a>
            </label>
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary">Sign In</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
