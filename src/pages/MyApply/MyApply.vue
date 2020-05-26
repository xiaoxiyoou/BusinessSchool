<template>
  <div class="container">
    <div class="content">
      <nav class="tab row a-c">
        <div class="item" v-for="(item, index) in tabList" :key="index" @click="switchItem(index)">
          <span :class="{ on: curIndex === index }">{{ item.txt }}</span>
        </div>
      </nav>
      <div class="videoListCon">
        <ul class="videoList" ref="videoList"  :class="{ minHeight: hasVerticalScroll}">
          <li @click="handleList(item.VideoSectionId, item.VideoId)" class="item row border-bottom-1px j-c a-c" v-for="(item, index) in videoList" :key="index">
            <img class="itemImg" :src="item.VideoConver" alt="" />
            <div class="itemInfo col j-b">
              <div class="infoTitle">
                <div class="title">{{ item.VideoName }}</div>
                <div class="desc">{{ item.VideoDesc }}</div>
              </div>
              <div class="infoData row j-b">
                <!-- <div class="integral">{{item.VideoPrice}}积分</div> -->
                <div class="viewNum">已观看{{ item.viewtotal }}次</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="noinfoCon col a-c j-c" v-if="noinfoShow">
        <img class="noinfo" src="./../../assets/img/noInfo.png" alt="" />
        <div>暂无内容</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { alredyBuyList, alredyPayCourse } from 'api/index'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      videoList: [],
      tabList: [
        { txt: '付费课程' },
        { txt: '积分课程' }
      ],
      curIndex: 0,
      pageIndex: 1,
      hasVerticalScroll: false,
      noinfoShow: false,
      pageSize: 1000


    }
  },
  mounted() {
    this._alredyPayCourse()
    // 超出滚动
    this.$nextTick(() => {
      this.scroll = new BScroll('.videoListCon', { click: true, mouseWheel: true })
      console.log(this.scroll)
      this.hasVerticalScroll = !this.scroll.hasVerticalScroll
      console.log(' this.hasVerticalScroll ', this.hasVerticalScroll )
    })

  },
  methods: {
    switchItem(index) {
      this.curIndex = index
      if (index == 0) {
        this._alredyPayCourse()
      } else {
        this._getVideoList()

      }

    },
    _getVideoList() {
      alredyBuyList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.videoList = res.data
          this.noinfoShow = false
        } else {
          this.videoList = ''
          this.noinfoShow = true
        }
      })
    },
    _alredyPayCourse() {
      alredyPayCourse({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.videoList = res.data
          this.noinfoShow = false
        } else {
          this.videoList = ''
          this.noinfoShow = true
        }
      })
    },
    // 进入课程详情
    handleList(VideoSectionId, videoId) {
      if (VideoSectionId > 0) {
        this.$router.push({
          path: '/NunVideoDetail',
          query: { id: videoId }
        })

      } else {
        this.$router.push({
          path: '/videodetail',
          query: { id: videoId }
        })

      }

    }
  },
  components: {

  }
}
</script>
<style scoped>
.container {
  font-size: 0.28rem;
  background: #ffffff;
  height: 100%;
  width: 100%;
  position: absolute;
}
.content {
}
.videoListCon {
  height: 100%;
  width: 100%;
  position: absolute;
  overflow: hidden;
}
.minHeight{
   min-height: 15rem; 
}
.videoList {
  margin-top: 0.05rem;
  /* min-height: 15rem; */
  padding-bottom: 2rem;
}
.tab {
  width: 100%;
  height: 1rem;
  background-color: #fff;
  position: relative;
  top: 0;
  z-index: 10;
}
.tab > .item {
  width: 50%;
  line-height: 1rem;
  text-align: center;
  font-size: 0.28rem;
  color: #505050;
}
.tab > .item > span {
  display: inline-block;
}

.on {
  color: #c5a064;
  border-bottom: 2px solid #c5a064;
}
.videoList > .item {
  height: 2.31rem;
}
.videoList > .item > .itemImg {
  width: 2.9rem;
  height: 1.65rem;
  border-radius: 0.05rem;
}
.videoList > .item > .itemInfo {
  height: 1.65rem;
  width: 3.2rem;
  margin-left: 0.43rem;
}
.videoList > .item > .itemInfo > .infoTitle > .title {
  color: #2d2d2d;
  font-weight: 700;
  font-size: 0.3rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
}
.videoList > .item > .itemInfo > .infoTitle > .desc {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  color: #8a898a;
}
.videoList > .item > .itemInfo > .infoData > .viewNum {
  color: #8a898a;
}
.videoList > .item > .itemInfo > .infoData > .integral {
  color: #ec8c4b;
}
.noinfo {
  width: 100%;
  height: auto;
}
.noinfoCon {
  color: #8a898a;
  position: absolute;
}
</style>
