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
      @upload-file="uploadFile"
      @save="saveFile"
    ></ControlPanel>
    <h3>Исходные файлы</h3>
    <SourcesList></SourcesList>
    <hr>
    <h3>Текстура</h3>
    <ResultTexture></ResultTexture>
    <div class="area">
      <canvas id="canvas"></canvas>
    </div>
    <hr>
    <h3>Отображение</h3>
    <TextureViews></TextureViews>
  </div>
</template>

<script>
import ControlPanel from './components/ControlPanel.vue';
import SourcesList from './components/SourcesList.vue';
import ResultTexture from './components/ResultTexture.vue';
import TextureViews from './components/TextureViews.vue';

export default {
  name: 'app',
  data: () => ({
    layingList: [
      { text: 'Прямой', value: 'straight' },
      { text: 'Со сдвигом', value: 'offset' },
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
    ResultTexture,
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
    uploadFile(file) {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      const reader = new FileReader();

      canvas.height = 320;
      canvas.width = 320;

      reader.readAsDataURL(file);
      reader.onload = () => {
        img.src = reader.result;
        img.onload = () => {
          const realImgWidth = img.width;
          const realImgHeight = img.height;
          img.width = 40;
          for (let i = 0; i <= canvas.width; i += img.width) {
            let j = this.getRandomArbitrary(0, -img.height);
            for (; j <= canvas.height;) {
              const k = this.getRandomArbitrary(0.3, 1);
              const elRealHeight = k * realImgHeight;
              const elHeight = elRealHeight * img.width / realImgWidth;
              ctx.drawImage(img, 0, 1, realImgWidth, elRealHeight, i, j, img.width, elHeight);
              j += elHeight;
            }
          }
        };
      };
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
  margin-bottom: 10px;
}

#canvas {
  display: block;
  margin: auto;
  border: 1px dashed red;
}
</style>
