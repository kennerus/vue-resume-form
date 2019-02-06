<template>
  <mdc-layout-inner-grid>
    <mdc-layout-cell span="12" class="flex">
      <mdc-title class="mr15">{{title}}</mdc-title>
      <mdc-button type="button" v-if="removeBtn" @click="emitIndex" outlined>
        <mdc-icon icon="close"></mdc-icon>
      </mdc-button>
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
    title: {
      type: String,
      default: "Опыт работы"
    },
    removeBtn: {
      type: Boolean,
      default: false
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
    },
    emitIndex() {
      this.$emit("experienceIndex", this.keyIndex);
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
.flex {
  display: flex;
  align-items: center;
}
.mdc-button .mdc-button__icon, .mdc-button .mdc-icon {
  height: 22px;
  margin-right: 6px;
}
</style>
