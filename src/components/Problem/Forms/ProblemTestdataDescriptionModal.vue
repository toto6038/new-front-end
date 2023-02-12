<template>
  <input type="checkbox" id="testdata-description" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ $t("components.problem.forms.howToPack") }}</h3>
      <p class="mt-4">
        {{ $t("components.problem.forms.testdataRule1") }}
      </p>
      <p class="mt-2">
        {{ $t("components.problem.forms.testdataRule2") }}
      </p>
      <p class="mt-2">
        {{ $t("components.problem.forms.testdataRule3") }}
      </p>
      <p class="mt-2">
        {{ $t("components.problem.forms.testdataRule4") }}
        <br />
        {{ $t("components.problem.forms.testdataRule5") }}
      </p>
      <pre class="mt-2"><code>{{ [
          "0000.in",
          "0000.out",
          "0001.in",
          "0001.out",
          "0002.in",
          "0002.out",
          "0100.in",
          "0100.out",
          "...",
          "0104.in",
          "0104.out",
          "0200.in",
          "0200.out",
          "...",
          "0214.in",
          "0214.out",
        ].join('\n') }}</code></pre>
      <div class="modal-action">
        <label for="testdata-description" class="btn">{{ $t("components.problem.forms.gotIt") }}</label>
      </div>
    </div>
  </div>
</template>
