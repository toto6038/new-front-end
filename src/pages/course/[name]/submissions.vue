<script setup lang="ts">
import dayjs from "dayjs";

const submissions = [
  {
    languageType: 1,
    lastSend: 1629875668.301,
    memoryUsage: 4284,
    problemId: 145,
    runTime: 8,
    score: 100,
    status: 0,
    submissionId: "6125edd4b07bd4ab4aad81c1",
    timestamp: 1629875668.226,
    user: {
      displayedName: "\u674e\u8056\u6f84",
      md5: "027c85d32010796c7ad342d4648adb81",
      role: 2,
      username: "40947031S",
    },
  },
  {
    languageType: 1,
    lastSend: 1629875621.882,
    memoryUsage: 3572,
    problemId: 145,
    runTime: 1,
    score: 30,
    status: 5,
    submissionId: "6125eda5b07bd4ab4aad81aa",
    timestamp: 1629875621.759,
    user: {
      displayedName: "\u674e\u8056\u6f84",
      md5: "027c85d32010796c7ad342d4648adb81",
      role: 2,
      username: "40947031S",
    },
  },
  {
    languageType: 0,
    lastSend: 1624631262.949,
    memoryUsage: 2176,
    problemId: 174,
    runTime: 8,
    score: 10,
    status: 2,
    submissionId: "60d5e7de032148778ebcbce5",
    timestamp: 1624631262.869,
    user: { displayedName: "", md5: "d1189e2842a272f6f2ed118c903e209b", role: 2, username: "40947903S" },
  },
];
const LANG = ["c", "cpp", "py3", ""];

const formatTime = (time: number) => {
  return dayjs(time * 1000).format("YYYY-MM-DD HH:mm");
};
</script>

<template>
  <div class="flex w-full justify-center">
    <div class="card min-w-full">
      <div class="card-body">
        <h2 class="card-title">Submission List</h2>

        <div class="mt-8 overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>id</th>
                <th>pid</th>
                <th>user</th>
                <th>result</th>
                <th>score</th>
                <th>run time</th>
                <th>memory</th>
                <th>lang</th>
                <th>time</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="submission in submissions"
                :key="submission.submissionId"
                class="hover cursor-pointer"
                @click="$router.push(`/course/${$route.params.name}/submission/${submission.submissionId}`)"
              >
                <td>{{ submission.submissionId.slice(-6) }}</td>
                <td>{{ submission.problemId }}</td>
                <td>{{ submission.user.username }}</td>
                <td><judge-status :status="submission.status" /></td>
                <td>{{ submission.score }}</td>
                <td>{{ submission.runTime }} ms</td>
                <td>{{ submission.memoryUsage }} KB</td>
                <td>{{ LANG[submission.languageType] }}</td>
                <td>{{ formatTime(submission.timestamp) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
