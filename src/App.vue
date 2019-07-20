<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="area">
      <canvas id="canvas"></canvas>
    </div>
    <ControlPanel
      @upload-file="uploadFile"
    ></ControlPanel>
  </div>
</template>

<script>
import ControlPanel from './components/ControlPanel.vue';

export default {
  name: 'app',
  data: () => {
    return {
      title: 'Редактор текстур',
      file: null
    };
  },
  components: {
    ControlPanel
  },
  methods: {
    uploadFile (file) {
      const canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        img = new Image(),
        reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onloadend = function () {
        img.src = reader.result;
        console.log([ctx, img, img.src]);
        ctx.drawImage(img, 0, 0, img.width, img.height);
        // console.log('defrf');
      };
      /* img.onload = function () {
      } */
      /* console.log(reader.result) */
    }
  }
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
  border: 2px dashed red;
}
</style>
