<script setup lang="ts">
import { LANG } from "../../../../constants";
import { formatTime } from "../../../../utils/formatTime";

const submission = {
  code: "#include <iostream>\n#include <assert.h>\n#include <map>\n#define maxn 1005\n#define maxm 500005\nusing namespace std;\nint p[maxn];\nmap<pair<int,int>,bool> vis;\nmap<int,bool> used;\nint find(int x) {\n\treturn (p[x] == x ? x : (p[x]=find(p[x])));\n}\nint main() {\n\tint n, m, u, v, w;\n\tcin >> n >> m;\n\tfor ( int i=0; i<=n; ++i )\tp[i] = i;\n\tfor ( int i=0; i<m; ++i ) {\n\t\tcin >> u >> v >> w;\n\t\tassert(!used[w]);\n\t\tused[w] = true;\n    assert(!vis[make_pair(min(u, v), max(u, v))]);\n    vis[make_pair(min(u, v), max(u, v))] = true;\n\t\tint tu = find(u);\n\t\tint tv = find(v);\n\t\tp[tu] = tv;\n\t}\n\tint gg = find(1);\n\tfor ( int i=2; i<=n; ++i ) {\n\t\tassert(find(i) == gg);\n\t}\n\treturn 0;\t\n}",
  languageType: 1,
  lastSend: 1623672969.683,
  memoryUsage: 30680,
  problemId: 172,
  runTime: 409,
  score: 0,
  status: 1,
  submissionId: "60c74889032148778ebc5418",
  tasks: [
    {
      cases: [
        { execTime: 1, memoryUsage: 3356, status: 1 },
        { execTime: 1, memoryUsage: 3316, status: 1 },
        { execTime: 2, memoryUsage: 3436, status: 1 },
        { execTime: 0, memoryUsage: 3416, status: 1 },
        { execTime: 2, memoryUsage: 3416, status: 1 },
      ],
      execTime: 2,
      memoryUsage: 3436,
      score: 0,
      status: 1,
    },
    {
      cases: [
        { execTime: 1, memoryUsage: 3312, status: 1 },
        { execTime: 1, memoryUsage: 3288, status: 1 },
        { execTime: 1, memoryUsage: 3164, status: 1 },
        { execTime: 1, memoryUsage: 3332, status: 1 },
        { execTime: 0, memoryUsage: 3328, status: 1 },
      ],
      execTime: 1,
      memoryUsage: 3332,
      score: 0,
      status: 1,
    },
    {
      cases: [
        { execTime: 1, memoryUsage: 3412, status: 1 },
        { execTime: 1, memoryUsage: 3356, status: 1 },
        { execTime: 0, memoryUsage: 3444, status: 1 },
        { execTime: 1, memoryUsage: 3328, status: 1 },
        { execTime: 1, memoryUsage: 3284, status: 1 },
      ],
      execTime: 1,
      memoryUsage: 3444,
      score: 0,
      status: 1,
    },
    {
      cases: [
        { execTime: 3, memoryUsage: 3676, status: 1 },
        { execTime: 0, memoryUsage: 3676, status: 1 },
        { execTime: 0, memoryUsage: 3656, status: 1 },
        { execTime: 3, memoryUsage: 3668, status: 1 },
        { execTime: 4, memoryUsage: 3640, status: 1 },
      ],
      execTime: 4,
      memoryUsage: 3676,
      score: 0,
      status: 1,
    },
    {
      cases: [
        { execTime: 374, memoryUsage: 30652, status: 1 },
        { execTime: 409, memoryUsage: 30636, status: 1 },
        { execTime: 355, memoryUsage: 30644, status: 1 },
        { execTime: 401, memoryUsage: 30680, status: 1 },
        { execTime: 400, memoryUsage: 30676, status: 1 },
      ],
      execTime: 409,
      memoryUsage: 30680,
      score: 0,
      status: 1,
    },
  ],
  timestamp: 1623672969.623,
  user: {
    displayedName: "\u52a9\u6559_\u4e8e\u5b50\u7def",
    md5: "c222b446affb0f9262a45d2e73fd714f",
    role: 0,
    username: "TA_TzuWei_Yu",
  },
};
</script>

<template>
  <div class="card-container pb-40">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="flex flex-wrap items-start justify-between">
          <div class="flex flex-col gap-4">
            <h2 class="card-title md:text-2xl lg:text-3xl">Submission {{ $route.params.id }}</h2>
          </div>

          <div
            class="btn md:btn-md"
            @click="$router.push(`/course/${$route.params.name}/problem/${$route.params.id}/submit`)"
          >
            rejudge
          </div>
        </div>

        <div class="divider" />

        <div class="card min-w-full rounded-none">
          <div class="card-body p-0">
            <h2 class="card-title mb-2 md:text-xl lg:text-2xl">General</h2>
            <table class="mb-10 table w-full">
              <thead>
                <tr>
                  <th>Problem</th>
                  <th>Username</th>
                  <th>Status</th>
                  <th>Run Time</th>
                  <th>Memory</th>
                  <th>Score</th>
                  <th>Lang</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ submission.problemId }}</td>
                  <td>{{ submission.user.username }}</td>
                  <td><judge-status :status="submission.status" /></td>
                  <td>{{ submission.runTime }} ms</td>
                  <td>{{ submission.memoryUsage }} KB</td>
                  <td>{{ submission.score }}</td>
                  <td>{{ LANG[submission.languageType] }}</td>
                  <td>{{ formatTime(submission.timestamp) }}</td>
                </tr>
              </tbody>
            </table>

            <h2 class="card-title mb-2 md:text-xl lg:text-2xl">Detail</h2>
            <table class="table-compact mb-10 table w-full" v-for="(task, taskIndex) in submission.tasks">
              <thead>
                <tr>
                  <th>#{{ taskIndex }}</th>
                  <th>Status</th>
                  <th>Run Time</th>
                  <th>Memory</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Overall</td>
                  <td><judge-status :status="task.status" /></td>
                  <td>{{ task.execTime }} ms</td>
                  <td>{{ task.memoryUsage }} KB</td>
                  <td>{{ task.score }}</td>
                </tr>
                <tr v-for="(taskcase, caseIndex) in task.cases">
                  <td>{{ taskIndex }}-{{ caseIndex }}</td>
                  <td><judge-status :status="taskcase.status" /></td>
                  <td>{{ taskcase.execTime }} ms</td>
                  <td>{{ taskcase.memoryUsage }} KB</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card min-w-full rounded-none">
          <div class="card-body p-0">
            <h2 class="card-title mb-2 md:text-xl lg:text-2xl">Source</h2>
            <code-editor v-model="submission.code" readonly />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
