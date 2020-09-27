<template>
  <div class="container">
    <div>
      <img class="banner" :src="VideoSectionBgimg" @click="banerDetail()" alt="">
      <ul class="videoList" ref="videoList">
        <li @click="handleList(item.VideoId)" class="item row border-bottom-1px j-c a-c" v-for="(item, index) in videoList" :key="index">
          <img class="itemImg" :src="item.VideoConver" alt="">
          <div class="itemInfo col j-b">
            <div class="infoTitle">
              <div class="title">{{item.VideoName}}</div>
              <div class="desc">{{item.VideoDesc}}</div>
            </div>
            <div class="infoData row j-b">
              <div class="integral" v-if="videoSectionId == 3">100积分</div>
              <div class="integral" v-else>{{item.SalePrice}}元</div>
              <div class="viewNum" v-if="videoSectionId == 3"></div>
              <div class="viewNum"  v-else>{{item.ViewTotal}}人观看</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { NumCategory } from 'api/index'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      videoList: [],
      pageIndex: 1,
      VideoSectionBgimg: '',
      pageSize: 1000,
      videoSectionId:''


    }
  },
  created() {
    this._NumCategory()

  },
  mounted() {
    this.videoSectionId =  this.$route.query.id
    localStorage.setItem('videoSectionId', this.$route.query.id)
    // 超出滚动
    this.$nextTick(() => {
      this.scroll = new BScroll('.container', { click: true })
    })
  },
  methods: {
    _NumCategory() {
      NumCategory({
        // pageIndex: this.pageIndex,
        // pageSize: this.pageSize,
        videoSectionId: this.$route.query.id
      }).then(res => {
        console.log('课程列表', res)
        if (res.code === 0) {
          this.VideoSectionBgimg = res.data.VideoSectionBgimg
          this.videoList = res.data.VideoListView
        }
      })
    },
    // 进入课程详情
    handleList(videoId) {
      if (this.$route.query.id == 3) {
        window.location.href = "http://union.app.jzb768.com/#/LoginIn"
      } else {
        this.$router.push({
          path: '/NunVideoDetail',
          query: { id: videoId }
        })
      }
    },
    //banner详情
    banerDetail() {
      if (this.$route.query.id != 3) {
        this.$router.push({
          path: '/banerDetail',
          query: { id: this.$route.query.id }
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
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;

  font-size: 0.28rem;
  background: #ffffff;
}
.banner {
  height: 3.2rem;
  width: 100%;
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