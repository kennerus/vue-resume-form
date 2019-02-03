<template>
  <mdc-layout-inner-grid>
    <mdc-layout-cell span="12">
      <mdc-title
        :class="{'invalid': this.employmentType.length < 1 && !this.isFormReady}"
      >Вид занятости</mdc-title>
      <mdc-caption
        :class="{'invalid': this.employmentType.length < 1  && !this.isFormReady}"
      >Отметьте хотя бы один вид занятости</mdc-caption>
    </mdc-layout-cell>

    <mdc-layout-cell span="12">
      <mdc-checkbox name="employmentType" value="Полная" label="Полная" v-model="employmentType"/>
    </mdc-layout-cell>

    <mdc-layout-cell span="12">
      <mdc-checkbox
        name="employmentType"
        value="Не полная"
        label="Не полная"
        v-model="employmentType"
      />
    </mdc-layout-cell>

    <mdc-layout-cell span="12">
      <mdc-checkbox
        name="employmentType"
        value="Удалённая"
        label="Удалённая"
        v-model="employmentType"
      />
    </mdc-layout-cell>
  </mdc-layout-inner-grid>
</template>

<script>
export default {
  name: "EmploymentType",
  props: {
    isFormReady: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      employmentType: []
    };
  },
  watch: {
    employmentType(employmentTypes) {
      this.$emit("employmentTypes", {
        keyIndex: "employmentType",
        value: employmentTypes
      });
    }
  }
};
</script>