<template>
    <mdc-layout-inner-grid class="mt20">
      <VueSelectCell :span="6" @selectedValue="selectLanguage" :options="languages"/>
      <VueSelectCell :span="6" @selectedValue="selectSkillLevel" :options="languageSkillLevels"/>
    </mdc-layout-inner-grid>
</template>

<script>
import VueSelectCell from "./VueSelectCell.vue";
export default {
  name: "LanguageLevel",
  components: { VueSelectCell },
  props: {
    keyIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      languages: ["Русский", "Украинский", "Английский", "Азербайджанский"],
      languageSkillLevels: [
        "Начальный",
        "Читаю профессиональную литературу",
        "Средний",
        "Могу проходить интервью",
        "Свободно владею"
      ],
      selectedLanguage: {
        language: "",
        skillLevel: ""
      }
    };
  },
    methods: {
      selectLanguage(value) {
        this.selectedLanguage.language = value.value;
      },
      selectSkillLevel(value) {
        this.selectedLanguage.skillLevel = value.value;
      },
  },
  watch: {
    selectedLanguage: {
      handler: function(selectedLanguage) {
        this.$emit("selectedLanguage", {
          language: selectedLanguage.language,
          skillLevel: selectedLanguage.skillLevel,
          keyIndex: this.keyIndex
        });
      },
      deep: true
    }
  }
};
</script>