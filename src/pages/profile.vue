<script setup lang="ts">
import { useRouter } from "vue-router";
import api from "../models/api";
import { useSession } from "../stores/session";
import { useTitle } from "@vueuse/core";

useTitle("Profile | Normal OJ");
const router = useRouter();
const session = useSession();
const ROLE = ["Admin", "Teacher", "Student"];

async function logout() {
  await api.Auth.logout();
  router.push("/");
  session.validateSession();
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
          <div class="btn-outline btn btn-error" @click="logout">Sign out</div>
        </div>
      </div>
    </div>
  </div>
</template>
