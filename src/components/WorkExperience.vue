<template>
  <mdc-layout-inner-grid>
    <mdc-layout-cell v-if="haveTitle" span="12">
      <mdc-title>Опыт работы</mdc-title>
    </mdc-layout-cell>

    <CustomInput @emitText="getInputText" keyIndex="company" label="Название компании"/>
    <CustomInput @emitText="getInputText" keyIndex="city" label="Город"/>
    <CustomInput @emitText="getInputText" keyIndex="post" label="Должность"/>
    <CustomInput @emitText="getInputText" keyIndex="period" label="Период"/>
    <CustomInput
      @emitText="getInputText"
      keyIndex="duties"
      :isMultiLine="true"
      label="Обязаности"
      :rows="5"
    />
  </mdc-layout-inner-grid>
</template>

<script>
import CustomInput from "./CustomInput.vue";

export default {
  name: "WorkExperience",
  components: { CustomInput },
  props: {
    haveTitle: {
      type: Boolean,
      default: true
    },
    keyIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      experience: {
        company: "",
        city: "",
        post: "",
        period: "",
        duties: ""
      }
    };
  },
  methods: {
    getInputText(data) {
      this.experience[data.keyIndex] = data.value;
    }
  },
  watch: {
    experience: {
      handler: function(experience) {
        this.$emit("experienceData", {
          experience,
          keyIndex: this.keyIndex
        });
      },
      deep: true
    }
  }
};
</script>

<style scoped>
</style>
