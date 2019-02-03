<template>
  <mdc-layout-cell :span="cells">
    <mdc-textfield
      v-model="text"
      :label="label"
      :fullwidth="isFullWidth"
      :multiline="isMultiLine"
      :rows="rows"
      :class="{'invalid': isRequired && !isValid && !isFormReady}"
    ></mdc-textfield>
    <mdc-caption
      v-if="isRequired && !isValid && !isFormReady"
      :class="{'invalid': isRequired && !isValid && !isFormReady}"
    >{{errorText}}</mdc-caption>
  </mdc-layout-cell>
</template>
<script>
export default {
  name: "hello",
  props: {
    label: {
      type: String,
      required: true
    },
    keyIndex: {
      type: [Number, String],
      default: 0
    },
    cells: {
      type: Number,
      default: 12
    },
    isFullWidth: {
      type: Boolean,
      default: true
    },
    isMultiLine: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 8
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    isValid: {
      type: Boolean,
      default: false
    },
    isFormReady: {
      type: Boolean,
      default: true
    },
    errorText: {
      type: String,
      default: "Заполните поле."
    }
  },
  data() {
    return {
      text: ""
    };
  },
  watch: {
    text(value) {
      this.$emit("emitText", {
        value,
        keyIndex: this.keyIndex
      });
    }
  }
};
</script>

<style scoped>
.content {
  padding: 32px;
  min-width: 100px;
  max-width: 800px;
  margin: auto;
}
</style>

