<script setup lang="ts">
import { formatTime } from "@/utils/formatTime";
import { AxiosError } from "axios";

interface Props {
  announcement?: AnnouncementListItem | AnnouncementPreviewForm;
  isLoading?: boolean;
  error?: AxiosError<AnnouncementList>;
}
withDefaults(defineProps<Props>(), {
  isLoading: false,
});
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div v-if="error" class="alert alert-error shadow-lg">
          <div>
            <i-uil-times-circle />
            <span>Oops! Something went wrong when loading announcements.</span>
          </div>
        </div>
        <skeleton-post v-else-if="isLoading || !announcement" class="w-1/2" />
        <template v-else>
          <div class="card-title mb-8">{{ announcement.title }}</div>
          <markdown-renderer :md="announcement.markdown" />

          <div class="mt-4 flex items-center gap-2 text-sm">
            Last updated: {{ formatTime(announcement.updateTime) }}
          </div>
          <div class="mt-2 flex items-center gap-2 text-sm">
            Posted by {{ announcement.creator.displayedName }} at {{ formatTime(announcement.createTime) }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
