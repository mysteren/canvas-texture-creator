<template>
  <div class="control-panel">
    <div class="row">
      <div class="col-lg-4 col-md-6">
        <div class="form-group">
          <label for="sel1">Размер:</label>
          <SelectInput
            v-bind:options="sizesList"
            v-bind:selected="size"
            @change="setSize"
          ></SelectInput>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="form-group">
          <label for="sel1">Укладка:</label>
          <SelectInput
            v-bind:options="layingList"
            v-bind:selected="laying"
            @change="setLaying"
          ></SelectInput>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="form-group">
          <label for="sel1">Метод обрезки:</label>
            <SelectInput
              v-bind:options="cropMethodsList"
              v-bind:selected="cropMethod"
              @change="setCropMethod"
            >
            </SelectInput>
        </div>
      </div>
      <div class="col-md-12 form-group">
        <div class="input-group">
          <label class="input-group-btn">
            <span class="btn btn-primary">
              Загрузить &hellip;
              <input
                type="file"
                class="file-input"
                style="display: none;"
                multiple
                v-on:input="uploadFile">
            </span>
          </label>
          <input type="text" class="form-control file-name-input " readonly :value="fileNames">
        </div>
      </div>
      <div class="col-md-12 form-group">
        <input type="file" accept="image/*" class="file-input-from-camera" capture="camera" v-on:input="uploadFile2">
      </div>
      <div class="col-md-12">
        <button class="btn btn-primary" v-on:click="render">Генерация</button>
        &nbsp;
        <button
          class="btn btn-success"
          v-on:click="save">
          Сохранить
        </button>
        &nbsp;
      </div>
    </div>
  </div>
</template>

<script>
import SelectInput from './SelectInput.vue';

export default {
  name: 'ControlPanel',
  components: {
    SelectInput,
  },
  props: [
    'layingList',
    'sizesList',
    'cropMethodsList',
    'laying',
    'size',
    'cropMethod',
  ],
  data() {
    return {
      files: [],
    };
  },
  computed: {
    fileNames() {
      /* if (this.files.lenght) {
        return this.files.name;
      } */
      
      if (this.files.length) {
        let result = '';
        this.files.forEach(function (item) {
          result += item.name + ', ';
        });
        return result.slice(0, -2);
      }
      return '';
    },
  },
  methods: {
    setSize(result) {
      this.$emit('setSize', result);
    },
    setLaying(result) {
      this.$emit('setLaying', result);
    },
    setCropMethod(result) {
      this.$emit('setCropMethod', result);
    },
    render() {
      this.$emit('render', this.files);
    },
    uploadFile() {
      const fileInput = this.$el.querySelector('.file-input');
      if (fileInput.files.length) {
        this.files = Array.from(fileInput.files);
        this.$emit('addFiles', Array.from(this.files));
      }
    },
    uploadFile2() {
      const fileInput = this.$el.querySelector('.file-input-from-camera');
      if (fileInput.files.length) {
        this.files = Array.from(fileInput.files);
        this.$emit('addFiles', Array.from(this.files));
      }
    },
    save() {
      if (this.files) {
        this.$emit('save');
      }
    },
  },
};
</script>

<style lang="scss">
</style>
