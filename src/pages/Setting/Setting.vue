<template>
  <div class="container">
    <router-view />
    <div class="avatar row a-c j-b border-bottom-1px">
      <span class="title">头像</span>
      <div class="right row a-c" @click="showAvatar()">
        <img :src='userObj.HeadImg' alt="" />
      </div>
    </div>
    <div class="item row a-c j-b border-bottom-1px" @click="toInputName(1)">
      <span class="title">昵称</span>
      <p class="text">{{ userObj.NickName ? userObj.NickName : '请输入昵称'}}</p>
      <van-icon name="arrow" />
    </div>
    <div class="item row a-c j-b border-bottom-1px" @click="toInputName(2)">
      <span class="title">真实姓名</span>
      <p class="text">{{ userObj.TrueName ? userObj.TrueName : '请输入真实姓名'}}</p>
      <van-icon name="arrow" />
    </div>
    <div class="item row a-c j-b border-bottom-1px" @click="toBoundPhone">
      <span class="title">手机号码绑定</span>
      <p class="text">{{ userObj.Telephone ? userObj.Telephone : '尚未绑定'}}</p>
      <van-icon name="arrow" />
    </div>
      <div class="item row a-c j-b border-bottom-1px" @click="toBoundAddress">
      <span class="title">地址信息</span>
      <p class="text">{{ userObj.Address ? userObj.Address : '尚未填写'}}</p>
      <van-icon name="arrow" />
    </div>
    <div class="item row a-c j-b border-bottom-1px">
      <span class="title">
        身份</span>
      <p class="text" v-if="userObj.groupName">{{ userObj.groupName}}</p>
      <p class="text" v-else>学员</p>

    </div>
  </div>

</template>
<script type="text/ecmascript-6">
import { getUserInfo } from 'api/index'
export default {
  data() {
    return {
      userObj: {},


    }
  },
  mounted() {
    this._getUserInfo()
  },
  methods: {
    _getUserInfo() {
      getUserInfo().then(res => {
        console.log(res)
        if (res.code === 0) {
          let data = res.data
          console.log('个人信息',data)
          this.userObj = Object.assign({}, data)
        }
      })
    },
    toBoundPhone() {
      this.$router.push({
        path: './phonebound'
      })
    },
    toBoundAddress() {
      this.$router.push({
        path: './Addressbound'
      })
    },
    toInputName(id) {
      this.$router.push({
        path: './inputname',
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
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 0 0.3rem 0 0.45rem;
  font-size: 0.28rem;
}

.container .crop-con {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}

.container .crop-con .return {
  position: absolute;
  right: 0.2rem;
  top: 0.2rem;
  padding: 0.12rem 0.16rem;
  background-color: #65a2e7;
  border-radius: 0.04rem;
  font-size: 0.32rem;
  color: #fff;
  z-index: 100;
}

.container .crop-con .bottom-button {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.1rem;
}

.container .crop-con .bottom-button .btn {
  padding: 0.04rem 0.06rem;
  background-color: #40ce53;
  border-radius: 0.04rem;
  font-size: 0.32rem;
  color: #fff;
}

.container .crop-con .bottom-button .uploading {
  width: 1.8rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  background: #40ce53;
  color: #fff;
  border-radius: 0.1rem;
  font-size: 0.32rem;
}

.container .crop-con .bottom-button .selectImg {
  width: 1.8rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  color: #fff;
  font-size: 0.32rem;
  background: #65a2e7;
  border-radius: 0.1rem;
  position: relative;
}

.container .crop-con .bottom-button .selectImg .text {
  z-index: 5;
}

.container .crop-con .bottom-button .selectImg .uploads {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.container .avatar {
  width: 100%;
  height: 1.4rem;
}

.container .avatar .title {
  font-size: 0.3rem;
  color: #666;
}

.container .avatar img {
  width: 0.84rem;
  height: 0.84rem;
  border-radius: 50%;
}

.container .item {
  width: 100%;
  height: 1rem;
}

.container .item .title {
  width: 30%;
  font-size: 0.3rem;
  color: #666;
}

.container .item .text {
  width: 70%;
  height: 100%;
  line-height: 1rem;
  text-align: right;
  color: #000;
}
</style>