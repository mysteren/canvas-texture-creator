<template>
  <div>
    <button class="btn btn-primary" v-on:click="generate">Генерация</button>
    <div class="area">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultTexture',
  props: [
  ],
  methods: {
    draw() {
      console.log('draw');
    }
  }
};
</script>
