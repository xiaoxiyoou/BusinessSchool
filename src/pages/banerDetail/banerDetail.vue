<template>
  <div class="container">
    <div class="wrapper">
    <img class="banner" v-if="id == 1" src="./img/banner2.png" alt="">
    <img class="banner" v-if="id == 2"  src="./img/banner1.png" alt="">
   </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      id:1,
      isActive:false

    }
  },
  mounted() {
      this.id = this.$route.query.id
      console.log('this.id',this.id)
       // 超出滚动
    this.$nextTick(() => {
      this.scroll = new BScroll('.container', { click: true })
    })
    

  },
  methods: {
  },
  components: {

  }
}
</script>
<style scoped>
.container {
position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  bottom: 0;
  padding: 0;
  margin: 0;
 
}

.banner{
  width: 100%;
  height: auto;
  vertical-align: bottom;
  margin: 0;

}

</style>