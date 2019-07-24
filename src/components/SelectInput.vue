<template>
    <select class="form-control" v-model="result" @change="input">
        <option v-for="option in options" v-bind:key="option.value" v-bind:value="option.value">
            {{ option.text }}
        </option>
    </select>
</template>

<script>
export default {
  name: 'SelectInput',
  props: [
    'options',
    'selected',
  ],
  data() {
    return {
      result: this.selected
    }
  },
  methods: {
    input () {
      this.$emit('change', this.result);
    }
  }
};
</script>
