<script setup lang="ts">
import { reactive } from "vue";
import { useTitle } from "@vueuse/core";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useSession } from "../stores/session";
import { formatTime } from "../utils/formatTime";
import api from "../models/api";
import { useRouter } from "vue-router";
import { useAxios } from "@vueuse/integrations/useAxios";
import { fetcher } from "../models/api";
import axios from "axios";

useTitle("Home | Normal OJ");
const session = useSession();
const router = useRouter();

const { data: posts, error, isLoading } = useAxios<PostList>("/ann", fetcher);

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
    if (axios.isAxiosError(error)) {
      loginForm.isError = true;
    } else {
      throw error;
    }
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
          <div class="my-2" />
          <div v-if="error" class="alert alert-error shadow-lg">
            <div>
              <i-uil-times-circle />
              <span>Oops! Something went wrong when loading announcements.</span>
            </div>
          </div>
          <skeleton-table v-else-if="isLoading" :col="3" :row="5" />
          <table v-else class="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Create At</th>
                <th v-if="session.isAdmin"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="{ title, createTime, annId } in posts" :key="annId" class="hover">
                <td>
                  <router-link :to="`/announcements/${annId}`" class="link-hover link">
                    {{ title }}
                  </router-link>
                </td>
                <td>{{ formatTime(createTime) }}</td>
                <td v-if="session.isAdmin">
                  <div class="tooltip" data-tip="Edit">
                    <router-link
                      class="btn btn-ghost btn-sm btn-circle"
                      :to="`/course/Public/announcements/${annId}/edit`"
                    >
                      <i-uil-edit class="lg:h-5 lg:w-5" />
                    </router-link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
              <button :class="['btn btn-primary', loginForm.isLoading && 'loading']" @click="login">
                Sign In
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
