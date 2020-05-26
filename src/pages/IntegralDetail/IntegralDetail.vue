<template>
  <div class="container">
    <div class="detailCon">
      <div class="title">积分使用规则</div>
      <!-- <p>1、进入给100积分，用积分学习。</p>
      <p>2、每个课有30节，观看每节消耗10积分。</p>
      <p>3、每天签到可获得5积分。</p>
      <p>4、完善信息可获得10积分。</p>
      <p>5、每天能转发5次，一次2分，每天最多可获得10积分。</p>
      <p>6、真实邀请可获得10积分，以邀请用户看完1个视频为准。</p> -->
     
      <p>1、每天签到可获得5积分。</p>
      <p>2、完善信息可获得10积分。</p>
      <p>3、每天能转发5次，一次2分，每天最多可获得10积分。</p>
      <p>4、真实邀请可获得10积分，以邀请用户看完1个视频为准。</p>
      <div class="desc">*以上规则解释权归孝子部落生命文化学院所有。</div>
    </div>
    <div class="toReturn" @click="toReturn">返回</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    toReturn() {
      this.$router.go(-1)
    }
  },
  components: {

  }
}
</script>
<style>
.container {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
.container .detailCon {
  width: 6.9rem;
  margin: 0 auto;
  margin-top: 0.4rem;
  padding: 0.3rem 0.3rem;
  border-radius: 0.2rem;
  background-color: #fff;
}
.container .detailCon .title {
  font-size: 0.32rem;
  color: #2d2d2d;
  font-weight: bold;
  border-left: 0.06rem solid #c5a064;
  padding-left: 0.1rem;
  margin-bottom: 0.2rem;
}
.container .detailCon p {
  padding-left: 0.16rem;
  font-size: 0.28rem;
  color: #474747;
  line-height: 0.5rem;
}
.container .detailCon .desc {
  font-size: 0.22rem;
  color: #8a898a;
  padding-left: 0.16rem;
  margin-top: 0.34rem;
}
.container .toReturn {
  width: 4.7rem;
  height: 0.66rem;
  line-height: 0.66rem;
  margin: 0 auto;
  margin-top: 0.44rem;
  text-align: center;
  font-size: 0.32rem;
  color: #f5f5f5;
  border-radius: 0.14rem;
  background-color: #c5a064;
}
</style>
