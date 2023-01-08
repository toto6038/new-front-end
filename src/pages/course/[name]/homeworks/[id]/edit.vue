<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useTitle } from "@vueuse/core";
import { useRoute, useRouter } from "vue-router";
import { useAxios } from "@vueuse/integrations/useAxios";
import api, { fetcher } from "@/models/api";
import axios from "axios";
import { useProblemSelection } from "@/composables/useProblemSelection";

const route = useRoute();
const router = useRouter();
useTitle(`Edit Homework - ${route.params.id} - ${route.params.name} | Normal OJ`);

const isLoading = ref(false);
const errorMsg = ref("");

const {
  data: homework,
  error: fetchError,
  isLoading: isFetching,
} = useAxios<Homework>(`/homework/${route.params.id}`, fetcher);

const edittingHomework = ref<Homework>();
watchEffect(() => {
  if (homework.value) {
    edittingHomework.value = { ...homework.value };
  }
});
function update<K extends keyof Homework>(key: K, value: Homework[K]) {
  if (!edittingHomework.value) return;
  edittingHomework.value[key] = value;
}

const {
  problemSelections,
  problemId2Meta,
  error: fetchProblemError,
  isLoading: isFetchingProblem,
} = useProblemSelection(route.params.name as string);

const openPreview = ref<boolean>(false);

async function submit() {
  if (!edittingHomework.value || !homework.value) return;

  isLoading.value = true;
  try {
    await api.Homework.modify(route.params.id as string, {
      ...edittingHomework.value,
      scoreboardStatus: 0,
      // TODO: backend bug
      name: edittingHomework.value.name === homework.value.name ? undefined : edittingHomework.value.name,
    });
    router.push(`/course/${route.params.name}/homeworks`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      errorMsg.value = error.response.data.message;
    } else {
      errorMsg.value = "Unknown error occurred :(";
    }
    throw error;
  } finally {
    isLoading.value = false;
  }
}
async function delete_() {
  isLoading.value = true;
  if (!confirm("Are u sure?")) return;
  try {
    await api.Homework.delete(route.params.id as string);
    router.push(`/course/${route.params.name}/homeworks`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      errorMsg.value = error.response.data.message;
    } else {
      errorMsg.value = "Unknown error occurred :(";
    }
    throw error;
  } finally {
    isLoading.value = false;
  }
}
function discard() {
  if (!confirm("Are u sure?")) return;
  router.push(`/course/${route.params.name}/homeworks`);
}
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title mb-3 justify-between">
          Edit homework: {{ edittingHomework?.name }}
          <div class="flex gap-x-3">
            <button
              :class="['btn-outline btn-error btn-sm btn lg:btn-md', isLoading && 'loading']"
              @click="delete_"
            >
              <i-uil-trash-alt class="mr-1 lg:h-5 lg:w-5" /> Delete
            </button>
            <button :class="['btn-warning btn-sm btn lg:btn-md', isLoading && 'loading']" @click="discard">
              <i-uil-times-circle class="mr-1 lg:h-5 lg:w-5" /> Discard Changes
            </button>
          </div>
        </div>

        <div v-if="fetchError || fetchProblemError" class="alert alert-error shadow-lg">
          <div>
            <i-uil-times-circle />
            <span>Oops! Something went wrong when loading announcement.</span>
          </div>
        </div>
        <skeleton-card v-else-if="isFetching || isFetchingProblem || !edittingHomework" />
        <template v-else>
          <div v-if="errorMsg" class="alert alert-error shadow-lg">
            <div>
              <i-uil-times-circle />
              <span>{{ errorMsg }}</span>
            </div>
          </div>

          <homework-form
            :form="edittingHomework"
            :problem-selections="problemSelections"
            :is-loading="isLoading"
            @update="update"
            @submit="submit"
          />

          <div class="divider" />

          <div class="card-title mb-3">
            Preview
            <input v-model="openPreview" type="checkbox" class="toggle" />
          </div>

          <homework-card
            v-show="openPreview"
            :homework="{ ...edittingHomework, id: route.params.id as string }"
            :problems="problemId2Meta"
            preview
          />
        </template>
      </div>
    </div>
  </div>
</template>
