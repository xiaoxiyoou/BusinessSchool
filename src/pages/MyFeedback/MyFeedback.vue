<template>
  <div class="container">
    <div class="content">
      <p class="title">请留下您宝贵的意见，我们会认真对待您的任何反馈。</p>
      <div class="item border-bottom-1px">
        <p class="itemTitle">满意度</p>
        <!-- 满意度选项 -->
        <div class="courseDetail row a-c" v-for="(item, index) in options" :key="index" @click="selcet(item.value, index)">
          <div class="selectCon  col a-c j-c" :class="defaultIdndex == index ? 'selectCon-hover' : ''">
            <div class="select" :class="defaultIdndex == index ? 'selectHover' : ''"></div>
          </div>
          <div class="courseName">{{ item.value }}</div>
        </div>
      </div>
      <div class="item border-bottom-1px">
        <p class="itemTitle">您最喜欢我们的什么课程？</p>
        <div class="courseDetail row a-c" v-for="(item, index) in coerseList" :key="index" @click="selcetCouerse(item.VideoCategoryId, index)">
          <div class="selectCon  col a-c j-c" :class="selcetIdndex == index ? 'selectCon-hover' : ''">
            <div class="select" :class="selcetIdndex == index ? 'selectHover' : ''"></div>
          </div>
          <div class="courseName">{{ item.VideoCategoryName }}</div>
        </div>
      </div>

      <div class="item border-bottom-1px">
        <p class="itemTitle">您给我们提出的建议是？</p>
        <textarea :placeholder="placeholder" v-model="opinionVal" class="opinion"></textarea>
      </div>
      <div class="item">
        <p class="itemTitle">希望获得联系</p>
        <p class="itemDesc">如果您希望我们联系您，可留下您的手机号码</p>
        <input @blur="getHeight" v-model="phone" class="phone" />
      </div>
      <button class="submit" @click="_sendUserOpinion">提交</button>
      <div class="bar"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { sendUserOpinion, getList } from 'api/index'
import BScroll from 'better-scroll'
import { Toast } from 'vant'

export default {
  data() {
    return {
      selected: '非常满意',
      selected2: '',
      defaultIdndex: 0,
      selcetIdndex: 0,
      options: [
        { value: '非常满意' },
        { value: '满意' },
        { value: '一般' },
        { value: '不满意' },
        { value: '非常不满意' }
      ],
      options2: [],
      value: '',
      opinionVal: '',
      placeholder: '请输入内容',
      autoExpand: true,
      coerseList: [],
      phone: ''
    }
  },

  mounted() {


    this._getList()
    // window.addEventListener('resize', () => {
    //   this.$nextTick(() => {
    //     this.$refs.scroll.refresh()
    //   })
    // })
    // 超出滚动
    this.$nextTick(() => {
      this.scroll = new BScroll('.container', { click: true })
    })
  },
  methods: {
    getHeight() {
      document.body.scrollTop = document.body.scrollHeight;
    },
    selcet(value, index) {
      this.defaultIdndex = index;
      console.log('value', value)
      this.selected = value
    },
    selcetCouerse(id, index) {
      this.selcetIdndex = index;
      console.log(id)
      this.selected2 = id
    },
    showToast(txt) {
      this.$createToast({
        txt,
        type: 'warning',
        time: 1000
      }).show()
    },
    inspectItem() {
      switch (true) {
        case !this.selected:
          Toast('选择满意度')
          break
        case !this.selected2:
          Toast('请选择课程')
          break
        case !this.opinionVal:
          Toast('填写建议')
          break
        default:
          sendUserOpinion({
            videoCateId: this.selected2,
            contentment: this.selected,
            suggest: this.opinionVal,
            userTel: this.phone
          }).then(res => {
            console.log(res)
            if (res.code === 0) {
              Toast('感谢您的反馈！')
              this.opinionVal = ''
            }
          })
      }
    },
    _sendUserOpinion() {
      this.inspectItem()
    },
    _getList() {
      getList().then(res => {
        console.log(res)
        if (res.code === 0) {
          this.coerseList = res.data
          this.selected2 = res.data[0].VideoCategoryId
          console.log('selected2', this.selected2)
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
  font-size: 0.25rem;
  background: #ffffff;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
}
.title {
  padding-top: 0.2rem;
  padding-left: 0.5rem;
  padding-bottom: 0.2rem;
  border-bottom: 0.01rem solid #f2f2f2;
  font-size: 0.26rem;
  color: #808080;
}
.item {
  padding: 0.24rem 0.4rem;
}
.item .itemTitle {
  font-size: 0.3rem;
  color: #2d2d2d;
  padding-left: 0.13rem;
  border-left: 0.06rem solid #c5a064;
  margin-bottom: 0.2rem;
}
.courseDetail {
  text-align: left;
  width: 92%;
  margin-top: 0.3rem;
}
.selectCon {
  width: 0.25rem;
  height: 0.25rem;
  background: #dfdede;
  border-radius: 50%;
  border: 0.01rem solid #dfdede;
}
.select {
  width: 0.13rem;
  height: 0.13rem;
  background: #dfdede;
  border-radius: 50%;
  /* position: relative; */
  z-index: 0;
}
.selectCon-hover {
  width: 0.25rem;
  height: 0.25rem;
  background: #ffffff;
  border-radius: 50%;
  border: 0.01rem solid #c5a064;
}
.courseName {
  font-size: 0.25rem;
  margin-left: 0.2rem;
}
.selectHover {
  width: 0.13rem;
  height: 0.13rem;
  background: #c5a064;
  border-radius: 50%;
  /* position: relative; */
  z-index: 0;
}
/* 组件单选框样式 */
.van-radio__icon > img {
  width: 0.4rem;
  height: 0.4rem;
}
/* 组件单选框样式 */
.item .opinion {
  width: 6.5rem;
  height: 1.1rem;
  border-radius: 0.05rem;
  padding: 0.15rem;
  font-size: 0.28rem;
  color: #666;
  border: 0.01rem solid #dfdede;
}
.item .itemDesc {
  font-size: 0.26rem;
  color: #808080;
}
.item .phone {
  width: 6.5rem;
  height: 0.7rem;
  margin-top: 0.16rem;
  padding-left: 0.2rem;
  font-size: 0.28rem;
  color: #666;
  border: 0.01rem solid #dfdede;
  /* position: absolute; */
}
.submit {
  display: block;
  width: 4.7rem;
  height: 0.66rem;
  line-height: 0.66rem;
  margin: 0 auto;
  text-align: center;
  font-size: 0.32rem;
  color: #f5f5f5;
  border-radius: 0.14rem;
  background-color: #c5a064;
}
.bar {
  width: 100%;

  height: 8rem;
}
.position {
  position: absolute;
}
</style>
