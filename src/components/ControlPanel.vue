<template>
  <div class="control-panel">
    <div class="row">
      <div class="col-md-6">
        <div class="input-group">
          <label class="input-group-btn">
            <span class="btn btn-primary">
              Открыть файл&hellip; <input type="file" class="file-input" style="display: none;" multiple v-on:change="uploadFile">
            </span>
          </label>
          <input type="text" class="form-control file-name-input" readonly :value="fileName">
        </div>
      </div>
      <div class="col-md-6">
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
      fileName: null
    }
  },
  methods: {
    uploadFile (e) {
      let fileInput = this.$el.querySelector('.file-input')
      let file = fileInput.files[0]
      if (file) {
        this.fileName = file.name
        this.$emit('upload-file', file)
      }
    }
  }
}
</script>

<style lang="scss">
</style>
