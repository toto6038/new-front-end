<script setup lang="ts">
import { formatTime } from "@/utils/formatTime";
import { useI18n } from "vue-i18n";

interface Props {
  announcement: AnnouncementListItem | AnnouncementPreviewForm;
}
defineProps<Props>();

const { t } = useI18n();
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title mb-8">{{ announcement.title }}</div>
        <markdown-renderer :md="announcement.markdown" />

        <div class="mt-4 flex items-center gap-2 text-sm">
          {{ t("components.ann.card.lastUpdate", { time: formatTime(announcement.updateTime) }) }}
        </div>
        <div class="mt-2 flex items-center gap-2 text-sm">
          {{
            t("components.ann.card.postBy", {
              author: announcement.creator.displayedName,
              time: formatTime(announcement.createTime),
            })
          }}
        </div>
      </div>
    </div>
  </div>
</template>
