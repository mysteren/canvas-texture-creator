<template>
  <div id="sources-list" class="">
    <table class="table">
      <tr v-for="(image, index) in images" >
        <td class="el">
          <img :src="image.src" class=""> 
        </td>
        <td>
          <a href="" class="btn btn-sm btn-danger" @click="deleteImage($event, index)">Удалить</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'SourcesList',
  props: [
    'images'
  ],
  methods: {
    deleteImage(e, index) {
      e.preventDefault();
      this.$emit('deleteImage', index);
    }
  }
};
</script>

<style lang="scss">
  #sources-list {
    td {
      padding: 5px 10px;
    }
    .el {
      position: relative;
      height: 60px;
      width: 75%;
      
      //overflow: hidden;
      overflow: hidden;
      img {
        position: absolute;
        top: 1px;
        bottom: 1px;
        left: 0px;
        //right: 0px;
        max-width: 60px;
        margin: auto;
        transform: rotate(90deg) translateY(-40%);
      }
    }
    
  }


</style>
