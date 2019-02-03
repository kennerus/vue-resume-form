<template>
  <mdc-layout-inner-grid>
    <mdc-layout-cell v-if="haveTitle" span="12">
      <mdc-title>Образование</mdc-title>
    </mdc-layout-cell>

    <CustomInput @emitText="getInputText" keyIndex="university" label="Название"/>
    <CustomInput @emitText="getInputText" keyIndex="city" label="Город"/>
    <CustomInput @emitText="getInputText" keyIndex="faculty" label="Факультет"/>
    <CustomInput @emitText="getInputText" keyIndex="period" label="Период"/>
    <CustomInput @emitText="getInputText" keyIndex="description" :isMultiLine="true" label="Описание" :rows="5"/>
  </mdc-layout-inner-grid>
</template>

<script>
import CustomInput from "./CustomInput.vue";

export default {
  name: "Education",
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
      education: {
        university: "",
        city: "",
        faculty: "",
        period: "",
        description: ""
      }
    };
  },
  methods: {
    getInputText(data) {
      this.education[data.keyIndex] = data.value;
    }
  },
  watch: {
    education: {
      handler: function(education) {
        this.$emit("educationData", {
          education,
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
