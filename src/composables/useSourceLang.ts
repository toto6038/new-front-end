import { computed, ref } from "vue";
import { LANGUAGE_OPTIONS } from "../constants";

function initializeMap(allowedLanguages: number) {
  const m: { [k: string]: boolean } = {};
  for (const lang of LANGUAGE_OPTIONS) {
    m[lang.text] = Boolean(allowedLanguages & lang.mask);
  }
  return m;
}

export function useSourceLang(allowedLanguages: number = 0) {
  const selectLangMap = ref(initializeMap(allowedLanguages));
  const readableLang = computed(() => {
    const l = [];
    for (const lang of LANGUAGE_OPTIONS) {
      if (selectLangMap.value[lang.text]) {
        l.push(lang.text);
      }
    }
    return l.join(", ");
  });
  const selectedLang = computed(() => {
    let s = 0;
    for (const lang of LANGUAGE_OPTIONS) {
      if (selectLangMap.value[lang.text]) {
        s += lang.mask;
      }
    }
    return s;
  });

  return {
    selectLangMap,
    readableLang,
    selectedLang,
  };
}
