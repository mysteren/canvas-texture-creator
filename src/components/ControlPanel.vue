<template>
  <div class="control-panel">
    <div class="row">
      <div class="col-md-6">
        <div class="input-group">
          <label class="input-group-btn">
            <span class="btn btn-primary">
              Открыть файл&hellip; <input type="file" class="file-input" style="display: none;" multiple v-on:input="uploadFile">
            </span>
          </label>
          <input type="text" class="form-control file-name-input" readonly :value="fileName">
        </div>
      </div>
      <div class="col-md-6">
        <button class="btn btn-primary" v-on:click="refresh">Обновить</button>
        &nbsp;
        <button class="btn btn-success">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ControlPanel',
  props: {
    
  },
  data () {
    return {
      file: null
    };
  },
  computed: {
    fileName () {
      if (this.file) {
        return this.file.name;
      }
      return null;
    }
  },
  methods: {
    refresh () {
      this.$emit('upload-file', this.file);
    },
    uploadFile (e) {
      let fileInput = this.$el.querySelector('.file-input');
      if (fileInput.files[0]) {
        this.file = fileInput.files[0];
        this.$emit('upload-file', this.file);
      }
    }
  }
};
</script>

<style lang="scss">
</style>
