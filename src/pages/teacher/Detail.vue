<template>
  <div class="wrapperCon">
    <div class="wrapper">
    <img class="banner" src="./img/poster.png" alt="">
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
 
  mounted() {
    // 超出滚动
    this.$nextTick(() => {
      this.scroll = new BScroll('.wrapperCon', { click: true })
    })

  },
  methods: {

  },
  components: {

  }
}
</script>

<style scoped>
.wrapperCon {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  bottom: 0;
  padding: 0;
  margin: 0;
}
.banner {
  width: 100%;
  height: auto;
  vertical-align: bottom;
  margin: 0;
  padding-bottom: 2rem;
  background: #15254b;
}
</style>