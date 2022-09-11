import { computed, ref } from "vue";
import { LANGUAGE_OPTIONS } from "../constants";

export type LangMap = {
  [langName: string]: boolean;
};

function initializeMap(allowedLanguages: number) {
  const m: { [k: string]: boolean } = {};
  for (const lang of LANGUAGE_OPTIONS) {
    m[lang.text] = Boolean(allowedLanguages & lang.mask);
  }
  return m;
}

export function useSourceLang(allowedLanguages: number = 0) {
  const selectLangMap = ref<LangMap>(initializeMap(allowedLanguages));
  const readableLang = computed<string>(() => {
    const l = [];
    for (const lang of LANGUAGE_OPTIONS) {
      if (selectLangMap.value[lang.text]) {
        l.push(lang.text);
      }
    }
    return l.join(", ");
  });
  const selectedLang = computed<number>(() => {
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
