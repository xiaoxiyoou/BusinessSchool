<template>
  <div class="container">
    <!-- <div class="video" v-if="VideoObj.VideoCaseFilePath">
      <video id="video" webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-video-orientation="h5" x5-video-player-fullscreen="true" x5-playsinline preload="auto" controlslist="nodownload" style="width:100%; height:4.2rem; object-fit: fill" controls="false" ref="video" :src="VideoObj.VideoCaseFilePath" :poster="VideoObj.VideoCaseBgImg">
      </video>
    </div> -->
    <!-- 视频 -->
    <!-- <video-player v-if="VideoObj.VideoCaseFilePath" ref="videoPlayer" style="width:100%; height:4.2rem; object-fit: fill" class="video-player vjs-custom-skin" :playsinline="playsinline" :options="playerOptions" @canplay="onPlayerCanplay($event)" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" /> -->
    <video-player ref="videoPlayer" style="width:100%; height:4.2rem; object-fit: fill" class="video-player vjs-custom-skin" :playsinline="playsinline" :options="playerOptions" @canplay="onPlayerCanplay($event)" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" />
    <!-- 音频 -->
    <!-- <div v-else>
      <img class="bgcover" :src="VideoObj.VideoCaseBgImg" alt="">
      <audio class="audio" controls="controls" :src="VideoObj.VideoCaseAudioPath">
        <source :src="VideoObj.VideoCaseAudioPath" type="MP3">
      </audio>
    </div> -->
    <div class="detalItem border-bottom-1px" ref="detailHeight">
      <p class="title">{{VideoObj.VideoCaseTitle}}</p>
      <p class="desc" v-html="VideoObj.VideoCaseRemark">
      </p>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
import { witnessListDetail } from 'api/index'
import { Toast } from 'vant';
export default {
  data() {
    return {
      playerOptions: {
        autoplay: false,
        muted: false,
        loop: false,
        preload: 'auto',
        language: 'zh-CN',
        aspectRatio: '16:9',
        fluid: true,
        sources: [
          {
            type: 'video/mp4',
            src: 'http://school.fg1413.com/tradercollegevideo/img/defalut.mp4'
          }
        ],
        hls: true,
        poster: '',
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true
        }
      },
      VideoObj: {},
      evaluateList: [],
      HeadImg: '',
      count: '',
      pageIndex: 1,
      pageSize: 1000,
      quiztext: '',
      isShowQuiz: false

    }
  },
  computed: {

    player() {
      return this.$refs.videoPlayer.player//自定义播放
    },
    playsinline() {
      var ua = navigator.userAgent.toLocaleLowerCase();
      //x5内核
      if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        return false
      } else {
        //ios端
        return true
      }
    }
  },
  created() {
    this._witnessListDetail()

  },
  mounted() {


  },
  methods: {

    onPlayerPlay(player) {
      if (!this.VideoObj.VideoCaseFilePath  ) {
        setTimeout(() => { player.pause() }, 100);
        Toast('暂无内容，敬请期待')
        return false
      }

      console.log('播放', player)

    },
    onPlayerPause(player) {
      console.log('暂停', player)

    },
    _witnessListDetail() {
      witnessListDetail({
        videoCaseId: this.$route.query.id
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
          let data = res.data
          this.VideoObj = Object.assign({}, data)
          console.log('this.VideoObj', this.VideoObj)
          if (this.VideoObj.VideoCaseFilePath) {
            this.playerOptions['sources'][0]['src'] = this.VideoObj.VideoCaseFilePath
          }
          this.playerOptions['poster'] = this.VideoObj.VideoCaseBgImg
        }
      })
    },
    onPlayerCanplay(player) {
      console.log('player Canplay!', player)
      var ua = navigator.userAgent.toLocaleLowerCase();
      if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        $('body').find('video').attr('x-webkit-airplay', true).attr('x5-playsinline', true).attr('webkit-playsinline', true).attr('playsinline', true)
      } else {
        $('body').find('video').attr('webkit-playsinline', "true").attr('playsinline', "true")
      }
    },


  }
}
</script>
<style scoped>
.container {
  font-size: 0.28rem;
}
.container .sendBtn {
  width: 100%;
  height: 1.16rem;
  background-color: #fff;
}

.container .sendBtn .btn {
  width: 4.7rem;
  height: 0.65rem;
  border-radius: 16rem;
  color: #fff;
  font-size: 0.3rem;
  background-color: #c5a064;
}
.container .detalItem {
  width: 100%;
  padding: 0.3rem;
  margin-top: 0.2rem;
  background-color: #fff;
}
.container .detalItem .title {
  font-size: 0.3rem;
  color: #2d2d2d;
  padding-left: 0.13rem;
  border-left: 0.06rem solid #c5a064;
  margin-bottom: 0.2rem;
}
.container .detalItem .desc {
  font-size: 0.24rem;
  color: #8a898a;
  line-height: 0.4rem;
}
.container .quizCon {
  width: 100%;
  height: 1rem;
  margin-top: 0.2rem;
  padding: 0.3rem;
  background-color: #fff;
  position: fixed;
  bottom: 5rem;
  z-index: 1;
}

.container .quizCon > .title {
  width: 100%;
}

.container .quizCon > .title .name {
  font-size: 0.28rem;
  color: #424242;
}

.container .quizCon > .title .num {
  font-size: 0.26rem;
  color: #a9a9a9;
}

.container .quizCon .quiz {
  width: 100%;
  height: 0.7rem;
  margin-top: 0.34rem;
}

.container .quizCon .quiz .quizImg {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.container .quizCon .quiz .quizBtn {
  flex: 1;
  height: 0.6rem;
  line-height: 0.6rem;
  margin-left: 0.2rem;
  text-align: center;
  font-size: 0.26rem;
  color: #a5a4a5;
  background-color: #f5f7f9;
  border-radius: 0.1rem;
}
.container .evaluateCon {
  width: 100%;
  padding: 0.3rem;
  padding-bottom: 0;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  height: 5rem;
}

.container .evaluateCon .item .avatar {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.container .evaluateCon .item .itemWrap {
  flex: 1;
  margin-left: 0.2rem;
}

.container .evaluateCon .item .itemWrap .title {
  font-size: 0.28rem;
  color: #5d5d5d;
}

.container .evaluateCon .item .itemWrap .time {
  display: inline-block;
  margin-top: 0.1rem;
  font-size: 0.24rem;
  color: #a9a9a9;
}

.container .evaluateCon .item .itemWrap .text {
  width: 100%;
  margin-top: 0.1rem;
  font-size: 0.28rem;
  color: #5d5d5d;
  line-height: 0.4rem;
}
.container .quizDialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  bottom: 0;
}

.container .quizDialog .mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(62, 54, 42, 0.4);
}

.container .quizDialog .quizWrap {
  position: fixed;
  left: 0;
  bottom: 6rem;
  width: 100%;
  height: 2.8rem;
  background-color: #fff;
  z-index: 1;
}

.container .quizDialog .quizWrap .quizText {
  width: 95%;
  margin: 0 2.5%;
  margin-top: 0.55rem;
  padding: 0.2rem;
  height: 1.2rem;
  color: #4d4e4d;
  font-size: 0.28rem;
  background-color: #f5f7f9;
  border-radius: 0.1rem;
}

.container .quizDialog .quizWrap .submit {
  position: absolute;
  right: 2.5%;
  bottom: 0.2rem;
  width: 1.5rem;
  height: 0.6rem;
  color: #fff;
  font-size: 0.28rem;
  border-radius: 0.3rem;
  background-color: #c5a064;
}

.container .quizDialog .quizWrap .close {
  position: absolute;
  right: 0.2rem;
  top: 0.2rem;
  width: 0.28rem;
}
/* 音频样式 */
.audio {
  width: 100%;
}
.bgcover {
  width: 100%;
  height: 4.2rem;
}
/*
  播放按钮换成圆形
  */
.container >>> .video-js .vjs-big-play-button {
  height: 2em;
  width: 2em;
  line-height: 2em;
  border-radius: 1em;
   margin-left: -1.1em;
}
.container >>> .video-js:hover .vjs-big-play-button {
  background: rgba(0, 0, 0, 0);
}
</style>