<template>
  <mdc-layout-inner-grid>
    <mdc-layout-cell span="12" class="flex">
      <mdc-title class="mr15">{{title}}</mdc-title>
      <mdc-button type="button" v-if="removeBtn" @click="emitIndex" outlined> 
        <mdc-icon icon="close"></mdc-icon>
        </mdc-button>
    </mdc-layout-cell>

    <CustomInput @emitText="getInputText" keyIndex="university" label="Название"/>
    <CustomInput @emitText="getInputText" keyIndex="city" label="Город"/>
    <CustomInput @emitText="getInputText" keyIndex="faculty" label="Факультет"/>
    <CustomInput @emitText="getInputText" keyIndex="period" label="Период"/>
    <CustomInput
      @emitText="getInputText"
      keyIndex="description"
      :isMultiLine="true"
      label="Описание"
      :rows="5"
    />
  </mdc-layout-inner-grid>
</template>

<script>
import CustomInput from "./CustomInput.vue";

export default {
  name: "Education",
  components: { CustomInput },
  props: {
    title: {
      type: String,
      default: "Образование"
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
    },
    emitIndex() {
      this.$emit("educationIndex", this.keyIndex);
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
.flex {
  display: flex;
  align-items: center;
}

.mdc-button .mdc-button__icon, .mdc-button .mdc-icon {
  height: 22px;
  margin-right: 6px;
}
</style>
