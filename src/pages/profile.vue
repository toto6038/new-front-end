<script setup lang="ts">
import { reactive, toRef } from "vue";
import { useRouter } from "vue-router";
import api from "../models/api";
import { useSession } from "../stores/session";
import { useTitle } from "@vueuse/core";
import { required, sameAs } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

useTitle("Profile | Normal OJ");
const router = useRouter();
const session = useSession();
const ROLE = ["Admin", "Teacher", "Student"];

async function logout() {
  await api.Auth.logout();
  router.push("/");
  session.validateSession();
}

const changePasswordForm = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
  isLoading: false,
  errorMsg: "",
  isFinished: false,
});
const rules = {
  newPassword: { required },
  oldPassword: { required },
  confirmPassword: { required, sameAsRef: sameAs(toRef(changePasswordForm, "newPassword")) },
};
const errorMessages = {
  newPassword: "Please fill out this field.",
  oldPassword: "Please fill out this field.",
  confirmPassword: {
    required: "Please fill out this field.",
    sameAsRef: "Password does not match.",
  },
};
const v$ = useVuelidate(rules, changePasswordForm);

async function changePassword() {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  changePasswordForm.errorMsg = "";
  changePasswordForm.isFinished = false;
  changePasswordForm.isLoading = true;
  try {
    await api.Auth.changePassword({
      oldPassword: changePasswordForm.oldPassword,
      newPassword: changePasswordForm.newPassword,
    });
    clearForm();
  } catch (error: any) {
    if (error.response.data.message === "Wrong Password") {
      changePasswordForm.errorMsg = "Wrong Password";
    } else {
      changePasswordForm.errorMsg = "Operation failed, please try again later";
    }
    throw error;
  } finally {
    changePasswordForm.isLoading = false;
  }
}

function clearForm() {
  changePasswordForm.oldPassword = "";
  changePasswordForm.newPassword = "";
  changePasswordForm.confirmPassword = "";
  changePasswordForm.isFinished = true;
  v$.value.$reset();
}
</script>

<template>
  <div class="card-container">
    <div class="card">
      <div class="card-body">
        <div class="card-title justify-between">Profile</div>

        <div class="my-2" />
        <table class="table w-full">
          <thead>
            <tr>
              <th>Username</th>
              <th>Display Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ session.username }}</td>
              <td>{{ session.displayedName }}</td>
              <td>{{ session.email }}</td>
              <td>{{ ROLE[session.role] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-actions">
        <div class="mx-auto flex max-w-7xl gap-8 p-4">
          <button class="btn-outline btn btn-error" @click="logout">Sign out</button>
        </div>
      </div>

      <div class="card-body">
        <div class="card-title justify-between">Change Password</div>

        <div class="my-2" />

        <div class="alert alert-error shadow-lg" v-if="changePasswordForm.errorMsg">
          <div>
            <i-uil-times-circle />
            <span>{{ changePasswordForm.errorMsg }}</span>
          </div>
        </div>
        <div class="alert alert-success shadow-lg" v-else-if="changePasswordForm.isFinished">
          <div>
            <i-uil-check-circle />
            <span>Password has been successfully changed</span>
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">New Password</span>
          </label>
          <input
            v-model="v$.newPassword.$model"
            type="password"
            name="password"
            placeholder="new password"
            :class="['input-bordered input', v$.newPassword.$error && 'input-error']"
          />
          <label class="label" v-if="v$.newPassword.$error">
            <span class="label-text-alt text-error-content" v-text="errorMessages.newPassword" />
          </label>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Confirm New Password</span>
          </label>
          <input
            v-model="v$.confirmPassword.$model"
            type="password"
            name="password"
            placeholder="new password again"
            :class="['input-bordered input', v$.confirmPassword.$error && 'input-error']"
          />
          <label class="label" v-if="v$.confirmPassword.$error">
            <span class="label-text-alt text-error-content">
              {{
                v$.confirmPassword.$errors[0].$validator === "sameAsRef"
                  ? errorMessages.confirmPassword.sameAsRef
                  : errorMessages.confirmPassword.required
              }}
            </span>
          </label>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Current Password</span>
          </label>
          <input
            v-model="v$.oldPassword.$model"
            type="password"
            name="password"
            placeholder="current password"
            :class="['input-bordered input', v$.oldPassword.$error && 'input-error']"
            @keydown.enter="changePassword"
          />
          <label class="label" v-if="v$.oldPassword.$error">
            <span class="label-text-alt text-error-content" v-text="errorMessages.oldPassword" />
          </label>
        </div>
        <div class="form-control mt-6">
          <div
            :class="['btn btn-primary', changePasswordForm.isLoading && 'loading']"
            @click="changePassword"
          >
            Submit
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
