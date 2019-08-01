<template>
  <div id="app">
    <h2>Редактор текстур</h2>
    <h3>Панель управления</h3>
    <ControlPanel
      v-bind:layingList="layingList"
      v-bind:sizesList="sizesList"
      v-bind:cropMethodsList="cropMethodsList"
      v-bind:laying="laying"
      v-bind:size="size"
      v-bind:cropMethod="cropMethod"
      @setSize="setSize"
      @setLaying="setLaying"
      @setCropMethod="setCropMethod"
      @addFiles="addImages"
      @render="renderTexture"
      @save="saveFile"
    ></ControlPanel>
    <h3>Исходные файлы</h3>
    <SourcesList
      v-bind:images="images"
      @deleteImage="deleteImage"
    ></SourcesList>
    <hr>
    <h3>Текстура</h3>
    <div class="area">
      <canvas id="canvas-texture"></canvas>
    </div>
    <hr>
    <h3>Отображение</h3>
    <TextureViews></TextureViews>
  </div>
</template>

<script>
import ControlPanel from './components/ControlPanel.vue';
import SourcesList from './components/SourcesList.vue';
import TextureViews from './components/TextureViews.vue';
import TextureRender from './classes/TextureRender'; 

export default {
  name: 'app',
  data: () => ({
    layingList: [
      { text: 'Прамая', value: 'straight' },
      { text: 'Палубная', value: 'offset' },
      { text: 'Елка', value: 'tree' },
    ],
    sizesList: [
      { text: 'x1', value: 1 },
      { text: 'x2', value: 2 },
      { text: 'x3', value: 3 },
      { text: 'x4', value: 4 },
      { text: 'x5', value: 5 },
    ],
    cropMethodsList: [
      { text: 'Обычный', value: 'common' },
      { text: 'Автокоррекция', value: 'autocorrection' },
    ],
    laying: 'straight',
    size: 1,
    cropMethod: 'autocorrection',
    images: [],

  }),
  components: {
    ControlPanel,
    SourcesList,
    TextureViews
  },
  methods: {
    getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    },
    setSize(result) {
      this.size = result;
    },
    setLaying(result) {
      this.laying = result;
    },
    setCropMethod(result) {
      this.cropMethod = result;
    },
    addImages(files) {
      
      files.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.images.push({
            name: file.name, 
            src: reader.result,
          });
        };
      });
    },
    deleteImage(index) {
      this.images.splice(index, 1);
    },
    
    renderTexture() {
      const canvasTexture = document.getElementById('canvas-texture'),
        render = new TextureRender(canvasTexture, this.laying, this.size, this.cropMethod);
      // render.setImages(this.images)
      render.draw(this.images);
      console.log(render.images);
    },
    saveFile() {
      const canvas = document.getElementById('canvas');
      window.location.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    },
  },
};
</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding: 15px;
}

.area {
  margin: 15px;
}

#canvas-texture {
  display: block;
  margin: auto;
  border: 1px dashed red;
  max-width: 100%;
}

</style>
