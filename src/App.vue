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
    getRandomArbitrary (min, max) {
      return Math.random() * (max - min) + min;
    },
    uploadFile (file) {
      const canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        img = new Image(),
        reader = new FileReader();
      img.width = 40;
      img.style.objectFit = 'contain';
      
      canvas.height = 320;
      canvas.width = 320;

      reader.readAsDataURL(file);
      
      reader.onload = () => {
        img.src = reader.result;
        img.onload = () => {
          // console.log([ctx, img, img.src, img.width, img.height]);
          for (let i = 0; i <= canvas.width; i += img.width) {
            // let start = ,
            
            let j = this.getRandomArbitrary(0, -img.height);
            // elOffset = img.height * 0.5;
            for (; j <= canvas.height;) {
              let elHeight = this.getRandomArbitrary(canvas.height * 0.25, canvas.height * 0.7);
              // let eloffset =
              ctx.drawImage(img, 0, 0, img.width, elHeight, i, j, img.width, elHeight);
              j += elHeight;
            }
          }
        };
      };
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
  border: 1px dashed red;
}
</style>
