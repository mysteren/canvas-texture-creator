<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="area">
      <canvas id="canvas"></canvas>
    </div>
    <ControlPanel
      @upload-file="uploadFile"
      @save="saveFile"
    ></ControlPanel>
  </div>
</template>

<script>
import ControlPanel from './components/ControlPanel.vue';

export default {
  name: 'app',
  data: () => ({
    title: 'Редактор текстур',
    file: null,
  }),
  components: {
    ControlPanel,
  },
  methods: {
    getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
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
