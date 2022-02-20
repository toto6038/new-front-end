<script setup lang="ts">
const problems = [
  {
    ACUser: 0,
    problemId: 118,
    problemName: "Getting Started",
    quota: 10,
    status: 0,
    submitCount: 0,
    submitter: 128,
    tags: ["HW0"],
    type: 0,
    score: 100,
  },
  {
    ACUser: 0,
    problemId: 124,
    problemName: "a_n",
    quota: 15,
    status: 0,
    submitCount: 0,
    submitter: 291,
    tags: ["HW1"],
    type: 0,
    score: 100,
  },
  {
    ACUser: 0,
    problemId: 125,
    problemName: "oo-pe\u030dh sort",
    quota: 15,
    status: 0,
    submitCount: 0,
    submitter: 615,
    tags: ["HW1", "BONUX"],
    type: 0,
    score: 100,
  },
];
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <h2 class="card-title">Problems</h2>

        <div class="mt-8 overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Tags</th>
                <th>Quota</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="{ problemId, problemName, tags, quota, score } in problems"
                :key="problemId"
                class="hover cursor-pointer"
                @click="$router.push(`/course/${$route.params.name}/problem/${problemId}`)"
              >
                <td>{{ problemId }}</td>
                <td>{{ problemName }}</td>
                <td>
                  <span class="badge badge-info mr-1" v-for="tag in tags" :key="tag">{{ tag }}</span>
                </td>
                <td>{{ quota }}</td>
                <td>{{ score }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
