<script setup lang="ts">
import dayjs from "dayjs";
import { ref, watchEffect, computed } from "vue";
import { useTitle } from "@vueuse/core";
import { useAxios } from "@vueuse/integrations/useAxios";
import { useRoute, useRouter } from "vue-router";
import api, { fetcher } from "../../../../../models/api";
import axios from "axios";

const route = useRoute();
const router = useRouter();
useTitle(`Edit Announcement - ${route.params.id} - ${route.params.name} | Normal OJ`);

const isLoading = ref(false);
const errorMsg = ref("");

const {
  data: announcements,
  error: fetchError,
  isLoading: isFetching,
} = useAxios<AnnouncementList>(`/ann/${route.params.id}`, fetcher);
const announcement = computed(() => announcements.value && announcements.value[0]);

const edittingAnnouncement = ref<AnnouncementForm>();
watchEffect(() => {
  if (announcement) {
    edittingAnnouncement.value = announcement.value;
  }
});

function update<K extends keyof AnnouncementForm>(key: K, value: AnnouncementForm[K]) {
  if (!edittingAnnouncement.value) return;
  edittingAnnouncement.value[key] = value;
}

const openPreview = ref<boolean>(false);
const previewPostMockMeta = computed(() => ({
  creator: announcement.value?.creator,
  createTime: announcement.value?.createTime,
  updateTime: dayjs().unix(),
}));

async function submit() {
  if (!edittingAnnouncement.value) return;

  isLoading.value = true;
  try {
    await api.Announcement.modify({
      ...edittingAnnouncement.value,
      annId: route.params.id as string,
    });
    router.push(`/course/${route.params.name}/announcements/${route.params.id}`);
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
    await api.Announcement.delete({ annId: route.params.id as string });
    router.push(`/course/${route.params.name}/announcements`);
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
  router.push(`/course/${route.params.name}/announcements`);
}
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title mb-3 flex-wrap justify-between lg:flex-nowrap">
          Edit Announcement
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

        <div v-if="fetchError" class="alert alert-error shadow-lg">
          <div>
            <i-uil-times-circle />
            <span>Oops! Something went wrong when loading announcement.</span>
          </div>
        </div>
        <skeleton-card v-else-if="isFetching || !edittingAnnouncement" />
        <template v-else>
          <announcement-form
            :value="edittingAnnouncement"
            :is-loading="isLoading"
            :error-msg="errorMsg"
            @update="update"
            @submit="submit"
          />

          <div class="divider" />

          <div class="card-title mb-3">
            Preview
            <input v-model="openPreview" type="checkbox" class="toggle" />
          </div>

          <announcement-card
            v-show="openPreview"
            :post="{ ...previewPostMockMeta, ...edittingAnnouncement }"
            class="rounded border-2 border-slate-300"
          />
        </template>
      </div>
    </div>
  </div>
</template>
