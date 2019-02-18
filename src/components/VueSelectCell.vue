<template>
  <mdc-layout-cell :span="span">
    <v-select class="v-select-custom" :value="selected" @input="selectHandler" :options="options"></v-select>
  </mdc-layout-cell>
</template>

<script>
import vSelect from "vue-select";

export default {
  name: "VueSelectCell",
  props: {
    options: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      default: 0
    },
    span: {
      type: Number,
      default: 12
    }
  },
  data() {
    return {
      selected: '',
    }
  },
  methods: {
    selectHandler(value) {
      console.log(value)
      this.selected = value;
      this.$emit('selectedValue', {
        value
      })
    }
  },
};
</script>