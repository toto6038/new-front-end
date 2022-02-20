<script setup lang="ts">
import renderMarkdown from "../utils/renderMarkdown";

const md = `
# Introduction

12345

\`\`\`=python
print('123')
\`\`\`
`;
const html = renderMarkdown(md);
</script>

<template>
  <span>ABOUT</span>
  <markdown-renderer />
  <!-- <div v-html="html"></div> -->
</template>
