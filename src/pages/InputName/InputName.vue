<template>
  <div class="container">
    <input v-model="name" class="phone" type="text" :placeholder="placeholderTxt" @blur="getHeight" />
    <div class="confirm" @click="_submitPersonInfo">
      确认修改
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { amendNickName, amendName, getUserInfo } from 'api/index'

export default {
  data() {
    return {
      placeholderTxt: '',
      name: ''
    }
  },
  mounted() {
    if (this.$route.query.id === 1) {
      this.placeholderTxt = '请您修改昵称'
    } else {
      this.placeholderTxt = '请您修改真实姓名'
    }
    this._getUserInfo()
  },
  methods: {
    // 获取用户信息
    _getUserInfo() {
      getUserInfo().then(res => {
        console.log('用户信息', res)
        if (res.code === 0) {
          //

          if (this.$route.query.id === 1) {
            this.name = res.data.NickName
          } else {
            this.name = res.data.TrueName
          }

        }
      })
    },
    // 解决输入框高度bug不稳定问题
    getHeight() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    _submitPersonInfo() {
      if (this.$route.query.id === 1) {
        amendNickName({
          videoUserName: this.name
        }).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$router.go(-1)
          }
        })
      } else {
        amendName({
          videoUserName: this.name
        }).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$router.go(-1)
          }
        })
      }
    }
  },
  computed: {
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
  padding: 0 0.3rem 0 0.45rem;
  font-size: 0.28rem;
}
.phone {
  width: 100%;
  height: 1.08rem;
  margin-top: 0.44rem;
  padding-left: 0.33rem;
  border-radius: 0.1rem;
  border: 0.01rem solid #d6d6d6;
  font-size: 0.32rem;
  color: #666666;
  touch-action: none;
}
.confirm {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: 0.36rem;
  color: #f5f5f5;
  background-color: #c5a064;
  border-radius: 0.1rem;
  margin-top: 0.52rem;
}
</style>
