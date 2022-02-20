<script setup lang="ts">
import renderMarkdown from "../utils/renderMarkdown";

const md = `
#include <iostream>
using namespace std;
int main() {

  return 0;
}
`;
const html = renderMarkdown(md);
</script>

<template>
  <span>ABOUT</span>
  <code-editor :code="md" />
</template>
