<template>
  <div class="container">

    <nav class="tab row a-c">
      <div class="item" v-for="(item ,index) in tabList" :key="index" @click="switchItem(index)">
        <span :class="{ on : curIndex === index }">{{item.txt}}</span>
      </div>
    </nav>
    <div class="programContent" ref="pronbit">
      <div class="content">
        <div class="item" @click="toOfflineDetail(item.OfflineCourseId)" v-for="(item, index) in programList" :key="index">
          <img :src="item.OfflineCourseConver" alt="">
          <p>{{item.OfflineCourseName}}</p>
          <div class="descCon ">
            <div class="row a-c">
              <img class="position" src="./time.png" alt="">
              <span class="desc">活动时间：{{item.StartTime}}-{{item.EndTime}}</span>
            </div>
            <div class="row a-c">
              <img class="position" src="./position.png" alt="">
              <span class="desc">活动地点：{{item.Address}}</span>
            </div>
          </div>
        </div>
      </div>

      <noMessage :noinfoShow="noinfoShow" />
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { getOfflineList } from 'api/index'
import BScroll from 'better-scroll'
import noMessage from 'components/noMessage'
export default {
  data() {
    return {
      curIndex: 0,
      tabList: [
        { txt: '预约活动' },
        { txt: '已结束' }
      ],
      pageIndex: 1,
      programList: [],
      noinfoShow: false,
      pageSize: 10


    }
  },
  created() {
    this._getOfflineList(0)
  },
  mounted() {
    // 超出滚动
    this.$nextTick(() => {
      this.scroll = new BScroll('.programContent', { click: true })
      console.log(this.scroll)

    })
  },
  methods: {
    scrollIntoView() {
      this.$refs.pronbit.scrollIntoView({
        behavior: "smooth",  // 平滑过渡
        block: "start"  // 上边框与视窗顶部平齐。默认值
      });

    },
    _getOfflineList(isfinish) {
      getOfflineList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        isfinish
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.pageCount = Math.ceil(res.count / 10)
          this.programList = res.data.concat(this.programList)
          this.noinfoShow = false

        } else {
          this.noinfoShow = true
          this.programList = []

        }

      })
    },
    // 切换
    switchItem(index) {
      // this.scrollIntoView()
      this.programList = []
      this.curIndex = index
      this._getOfflineList(index)
    },
    toOfflineDetail(id) {
      this.$router.push({
        path: './offlinedetail',
        query: { id: id }
      })
    }
  },
  components: {
    noMessage
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
.tab {
  width: 100%;
  height: 1rem;
  background-color: #fff;
  position: fixed;
  top: 0;
}
.tab > .item {
  width: 50%;
  line-height: 1rem;
  text-align: center;
  font-size: 0.32rem;
  color: #505050;
}
.tab > .item > span {
  display: inline-block;
}

.on {
  color: #c5a064;
  border-bottom: 0.025rem solid #c5a064;
}
.programContent {
  position: relative;
  top: 1rem;
  left: 0;
  overflow: hidden;
  margin-top: 0.17rem;
  width: 100%;
  height: 100%;
}
.programContent > .content {
  padding-bottom: 3rem;
}
.programContent > .content > .item {
  width: 100%;
  background-color: #fff;
  padding-bottom: 0.25rem;
  margin-bottom: 0.25rem;
}
.programContent > .content > .item > img {
  width: 100%;
  height: 4.2rem;
  margin-bottom: 0.2rem;
}
.programContent > .content > .item > p {
  font-size: 0.34rem;
  color: #000000;
  padding: 0 0.25rem;
  margin: 0;
}
.programContent > .content > .item > .descCon {
  padding: 0 0.25rem;
}
.programContent > .content > .item > .descCon > .row > span {
  display: block;
  font-size: 0.27rem;
  color: #8a898a;
  margin-top: 0.21rem;
}
.position {
  width: 0.32rem;
  height: 0.34rem;
  margin-right: 0.2rem;
  margin-top: 0.21rem;
}
</style>