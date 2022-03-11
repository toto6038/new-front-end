<script setup lang="ts">
const members = [
  {
    displayedName: "HIDDEN",
    md5: "fdc6e7701498a88b7bac02c80a9057e7",
    role: 2,
    username: "40712345S",
  },
  {
    displayedName: "HIDDEN",
    md5: "08e1658db6219a2e478eab75f594829c",
    role: 2,
    username: "40712346S",
  },
  {
    displayedName: "HIDDEN",
    md5: "4dae0195a700a5a5725e8e86710ebc43",
    role: 2,
    username: "40712347S",
  },
  {
    displayedName: "HIDDEN",
    md5: "fc320a3f24cca0333cbf3370cca8ce1f",
    role: 2,
    username: "40712348S",
  },
  {
    displayedName: "HIDDEN",
    md5: "9fae00c1a814de0b5862381f1b216c53",
    role: 2,
    username: "40712349S",
  },
];
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <div class="card-title">Members</div>

        <div class="mt-4 overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>username</th>
                <th>display name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="{ username, displayedName } in members" :key="username" class="hover">
                <td>{{ username }}</td>
                <td>{{ displayedName }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
