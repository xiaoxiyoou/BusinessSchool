<template>
  <div>
    <ly-tab v-if="this.items.length>0" v-model="selectedId" :items="items" :options="options" @change="switchItem"></ly-tab>
    <div class="container">
      <!-- <div class="" :class="{ wrapper: hasVerticalScroll}"> -->
      <ul class="videoList" ref="videoList">
        <li @click="handleList(item.VideoId,item.VideoSectionId)" class="item row border-bottom-1px j-c a-c" v-for="(item, index) in videoList" :key="index">
          <img class="itemImg" :src="item.VideoConver" alt="">
          <div class="itemInfo col j-b">
            <div class="infoTitle">
              <div class="title">{{item.VideoName}}</div>
              <div class="desc">{{item.VideoDesc}}</div>
            </div>
            <div class="infoData row j-b">
              <div class="integral">{{item.SalePrice}}元</div>
              <div class="viewNum">{{item.viewtotal}}人观看</div>
            </div>
          </div>
        </li>
      </ul>
      <noMessage :noinfoShow="noinfoShow" />
    </div>
    <!-- </div> -->
  </div>
</template>
<script type="text/ecmascript-6">
import { VideoCategory, getVideoList } from 'api/index'
import BScroll from 'better-scroll'
import noMessage from 'components/noMessage'
export default {
  data() {
    return {
      hasVerticalScroll: false,
      videoList: [],
      items: [],
      pageIndex: 1,
      index: 5,
      options: { // lytab 参数
        activeColor: '#ec8c4b',
        labelKey: 'VideoCategoryName'
      },
      selectedId: 0, // 默认选中分类
      noinfoShow: false,
      pageSize: 100


    }
  },
  created() {
    this._getVideoList('')
    this._VideoCategory()

  },
  mounted() {
    // 超出滚动
    this.$nextTick(() => {
      this.scroll = new BScroll('.container', { click: true })
      this.hasVerticalScroll = !this.scroll.hasVerticalScroll
    })
  },
  methods: {
    // 课程列表
    _getVideoList(cateId) {
      getVideoList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        cateId: cateId
      }).then(res => {
        console.log('课程列表', res)
        if (res.code === 0) {
          this.videoList = res.data
          this.noinfoShow = false
        } else if (res.code === 1) {
          this.videoList = []
          this.noinfoShow = true
        }
      })
    },
    // 课程导航
    _VideoCategory() {
      VideoCategory({
      }).then(res => {
        console.log('课程导航', res)
        if (res.code === 0) {
          this.items = res.data
        }
      })
    },

    // 进入课程详情
    handleList(videoId,VideoSectionId) {
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

    },
    onClick(name, title) {
      console.log(title);
      console.log(name);
    },
    // 切换分类
    ChangeTab(flag) {
      console.log(flag)
    },
    switchItem(item) {
      console.log('item', item.VideoCategoryId)
      this._getVideoList(item.VideoCategoryId)
    }

  },
  components: {
    noMessage

  }
}
</script>
<style scoped>
.ly-tab {
  height: 1rem;
  background: #ffffff;
  z-index: 2;
}
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  margin-top: 1rem;
  font-size: 0.28rem;
  background: #ffffff;
  z-index: -1;
  overflow: hidden;
}

.wrapper {
  padding-bottom: 2rem;
}
.videoList {
  position: absolute;
  /* top:2rem; */
  width: 100%;
  /* height: 100%; */
  overflow-y: scroll;
  padding-bottom: 2rem;
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
  color: #8a898a;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
}
.videoList > .item > .itemInfo > .infoData > .viewNum {
  color: #8a898a;
}
.videoList > .item > .itemInfo > .infoData > .integral {
  color: #ec8c4b;
}
</style>