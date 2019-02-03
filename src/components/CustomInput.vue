<template>
  <mdc-layout-cell :span="cells">
    <mdc-textfield
      v-model="text"
      :label="label"
      :fullwidth="isFullWidth"
      :multiline="isMultiLine"
      :rows="rows"
      :required="isRequired"
    ></mdc-textfield>
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

