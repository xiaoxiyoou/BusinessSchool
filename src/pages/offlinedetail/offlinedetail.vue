<template>
  <div class="container">
    <div ref="wrap" class="wrap">
      <div class="top">
        <div class="item">
          <img class="coverImg" :src="offLineObj.OfflineCourseConver" alt="">
          <p>{{offLineObj.OfflineCourseName}}</p>
          <span class="desc">活动时间：{{offLineObj.StartTime}}-{{offLineObj.EndTime}}</span>
          <span class="desc">活动地点：{{offLineObj.Address}}</span>
        </div>
      </div>
      <div class="detailContent">
        <div class="detalItem border-bottom-1px">
          <div class="title">课程介绍</div>
          <p class="desc">
            {{offLineObj.CourseDesc}}
          </p>
        </div>
        <div class="detalItem">
          <div class="title">主讲导师介绍</div>
          <div class="subTitle">吴帝伯—导师</div>
          <p class="desc">
            {{offLineObj.TeacherDesc}}
          </p>
        </div>
        <div class="detalItem">
          <div class="title">痛点现状</div>
          <p class="desc">
            {{offLineObj.Painpoints}}
          </p>
        </div>
        <div class="detalItem">
          <div class="title">学完课程你将可以怎样</div>
          <p class="desc">
            {{offLineObj.Reward}}
          </p>
        </div>
        <div class="detalItem">
          <div class="title">上课内容</div>
          <p class="desc">
            {{offLineObj.CoureseContent}}
          </p>
          <div class="imgList row f-w j-b">
            <img class="imgItem" v-for="(item,index) in offLineObj.imgList" :key="index" :src="item" alt="">

          </div>
          <p class="worth">{{offLineObj.Worth}}</p>
        </div>
        <div class="detalItem">
          <div class="title">课程学习对象</div>
          <p class="desc">
            {{offLineObj.Suitable}}
          </p>
        </div>
      </div>

    </div>
    <div class="bottomTab row  border-top-1px">
      <div class="phone row a-c j-c border-right-1px">
        <img src="./img/dianhua.png" alt="">
      </div>
      <div class="price row a-c j-c border-right-1px">
        <span>￥</span>{{offLineObj.CoursePrice}}/期
      </div>
      <div class="offlineBtn" @click="toSignClass(offLineObj.OfflineCourseId)">
        报名参加
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getOfflineDetail } from 'api/index'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      offLineObj: {}
    }
  },
  created() {
    this._getOfflineDetail()

  },
  mounted() {
    // 超出滚动
    this.$nextTick(() => {
      this.scroll = new BScroll('.container', { click: true })
    })
  },
  methods: {

    _getOfflineDetail() {
      getOfflineDetail({
        offlineCourseId: this.$route.query.id
      }).then(res => {
        console.log('详情', res)
        if (res.code === 0) {
          let data = res.data
          this.offLineObj = Object.assign({}, data)

        }
      })
    },

    toSignClass(id) {
      this.$router.push({
        path: './signclass',
        query: {
          id: id
        }
      })
    }
  },
  components: {

  }
}
</script>

<style scoped>
.container {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  font-size: 0.28rem;
}
.wrap{
  padding-bottom: 2rem;
}
.top > .item {
  width: 100%;
  position: relative;
  background-color: #fff;
  padding-bottom: 0.25rem;
  margin-bottom: 0.25rem;
}
.top > .item > .coverImg {
  width: 100%;
  height: 4.2rem;
}
.top > .item > p {
  font-size: 0.34rem;
  color: #2d2d2d;
  padding-left: 0.25rem;
  font-weight: 700;
}
.top > .item > span {
  display: block;
  font-size: 0.25rem;
  color: #8a898a;
  margin-top: 0.2rem;
  padding-left: 0.25rem;
}
.detailContent {
  width: 100%;
  background-color: #fff;
}
.detailContent > .detalItem {
  padding: 0.3rem;
}
.detailContent > .detalItem > .title {
  font-size: 0.3rem;
  color: #2d2d2d;
  padding-left: 0.1rem;
  border-left: 0.06rem solid #c5a064;
  font-weight: 700;
}
.detailContent > .detalItem > .subTitle {
  font-size: 0.3rem;
  color: #2d2d2d;
  padding-left: 0.15rem;
  margin-top: 0.2rem;
  font-weight: 700;
}
.detailContent > .detalItem >.desc {
  font-size: 0.25rem;
  color: #8a898a;
  padding-left: 0.15rem;
  text-indent: 0.5rem;
  line-height: .5rem;
}
.detailContent > .detalItem > .imgList >img {
    width: 49%;
    height:2.11rem;
    margin-top: 0.2rem;
    /* border-radius: 0.1rem; */
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
}
.detailContent > .detalItem > .worth  {
  color: #2d2d2d;
  font-size: .3rem;
  text-indent: 0.6rem;
  text-align: justify;
}
.bottomTab {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.87rem;
  z-index: 20;
  background-color: #fff;
}
.phone {
  width: 20%;
  height: 0.87rem;
}
.phone > img {
  display: block;
  width: 0.38rem;
}
.price {
  width: 40%;
  height: 0.87rem;
  /* font-size: 0.25rem; */
  color: #c5a064;
}
.offlineBtn {
  width: 40%;
  height: 0.87rem;
  line-height: 0.8125rem;
  text-align: center;
  background-color: #c5a064;
  /* font-size: 0.25rem; */
  color: #fff;
}
</style>