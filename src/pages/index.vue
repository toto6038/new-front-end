<script setup lang="ts">
import { reactive, ref } from "vue";
import { useTitle } from "@vueuse/core";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useSession } from "../stores/session";
import { formatTime } from "../utils/formatTime";
import api from "../models/api";
import { useRouter } from "vue-router";

useTitle("Home | Normal OJ");
const session = useSession();
const router = useRouter();

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
const loginForm = reactive({
  username: "",
  password: "",
  isLoading: false,
  isError: false,
});
const rules = {
  username: { required },
  password: { required },
};
const errorMessages = {
  username: "Please fill out this field.",
  password: "Please fill out this field.",
};
const v$ = useVuelidate(rules, loginForm);

async function login() {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  loginForm.isLoading = true;
  const body = {
    username: loginForm.username,
    password: loginForm.password,
  };
  try {
    await api.Auth.login(body);
    await session.validateSession();
    router.go(0);
  } catch (error) {
    loginForm.isError = true;
    throw error;
  } finally {
    loginForm.isLoading = false;
  }
}
</script>

<template>
  <div class="mx-auto flex max-w-7xl gap-8 p-4">
    <div class="card-container">
      <div class="card min-w-full">
        <div class="card-body">
          <div class="card-title mb-3">Announcement</div>
          <div class="mt-4 overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Create At</th>
                  <th v-if="session.isAdmin"></th>
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
                  <td v-if="session.isAdmin">
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
          <div v-if="session.isNotValidated" class="flex justify-center">
            <ui-spinner />
          </div>
          <div v-else class="card-title mb-2">
            {{ session.isLogin ? `Welcome back, ${session.displayedName}` : "Sign in" }}
          </div>
          <template v-if="session.isNotLogin">
            <div class="alert alert-error shadow-lg" v-if="loginForm.isError">
              <div>
                <i-uil-times-circle />
                <span>Login Failed: Your username/email or password is incorrect</span>
              </div>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Username / Email</span>
              </label>
              <input
                v-model="v$.username.$model"
                type="text"
                name="username"
                placeholder="username or email"
                :class="['input-bordered input', v$.username.$error && 'input-error']"
              />
              <label class="label" v-show="v$.username.$error">
                <span class="label-text-alt text-error-content" v-text="errorMessages.username" />
              </label>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                v-model="v$.password.$model"
                type="password"
                name="password"
                placeholder="password"
                :class="['input-bordered input', v$.password.$error && 'input-error']"
                @keydown.enter="login"
              />
              <label class="label flex-row-reverse">
                <a href="#" class="link-hover label-text-alt link">Forgot password?</a>
                <span
                  v-show="v$.password.$error"
                  class="label-text-alt text-error-content"
                  v-text="errorMessages.password"
                />
              </label>
            </div>
            <div class="form-control mt-6">
              <div :class="['btn btn-primary', loginForm.isLoading && 'loading']" @click="login">Sign In</div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
