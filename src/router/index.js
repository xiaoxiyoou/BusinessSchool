import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../pages/Login/Login.vue'
// import Login from './../pages/login/Login.vue'
import Login from 'pages/Login/Login.vue'
// import index from 'pages/Index/Index.vue'
import home from 'pages/Home/Home.vue'
import index from 'pages/Home/Index/Index.vue'
import Detail from 'pages/Home/Detail/Detail.vue'
import Myself from 'pages/Home/Myself/Myself.vue'
import information from 'pages/Information/Information.vue'
import extension from 'pages/Extension/Extension.vue'
// 同一个路由多次添加不被允许
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
const routes = [

    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        title:'繁星学社',
      }
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta:{
        title:'繁星学社',
        requireAuth: true,
      
       
        
      },
      children: [
        {
          path: 'index',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
          name: 'index',
          component: index,
          meta:{
            title:'繁星学社',
            requireAuth: true,
            keepAlive: true
            
           
          },
        },
        {
          path: 'Detail',
          name: 'Detail',
          component: Detail,
          meta:{
            title:'导师',
            requireAuth: true,
          },
        },
        {
          path: 'Myself',
          name: 'Myself',
          component: Myself,
          meta:{
            title:'我的',
            requireAuth: true,
          },
        } 
      ]
    },
    {
      path: '/extension',
      name: 'extension',
      component: extension,
      meta:{
        title:'推广',
        requireAuth: true,
        depth: 1
      }
    },
    {
      path: '/MyApply',
      name: 'MyApply',
      component: ()=> import('pages/MyApply/MyApply'),
      meta:{
        title:'已购课程',
        requireAuth: true,
        depth: 1
      }
    },
    {
      path: '/MyEnroll',
      name: 'MyEnroll',
      component: ()=> import('pages/MyEnroll/MyEnroll'),
      meta:{
        title:'线下报名',
        requireAuth: true,
        depth: 1
      }
    },
    {
      path: '/MyExtension',
      name: 'MyExtension',
      component: ()=> import('pages/MyExtension/MyExtension'),
      meta:{
        title:'我的推广',
        requireAuth: true,
        depth: 1
      }
    },
    {
      path: '/MyFeedback',
      name: 'MyFeedback',
      component: ()=> import('pages/MyFeedback/MyFeedback'),
      meta:{
        title:'意见反馈',
        requireAuth: true,
        depth: 1
      }
    },
    {
      path: '/MyGive',
      name: 'MyGive',
      component: ()=> import('pages/MyGive/MyGive'),
      meta:{
        title:'赠课资格',
        requireAuth: true,
        depth: 1
      }
    },
    {
      path: '/MyIntegral',
      name: 'MyIntegral',
      component: ()=> import('pages/MyIntegral/MyIntegral'),
      meta:{
        title:'我的积分',
        requireAuth: true,
        depth: 1
      }
    },
    {
      path: '/MyInvitation',
      name: 'MyInvitation',
      component: ()=> import('pages/MyInvitation/MyInvitation'),
      meta:{
        title:'我的邀请码',
        requireAuth: true,
        depth: 1
      }
    },
    {
      path: '/MyMember',
      name: 'MyMember',
      component: ()=> import('pages/MyMember/MyMember'),
      meta:{
        title:'我的团队',
        requireAuth: true,
        depth: 1
      }
    },
    {
      path: '/MyProfit',
      name: 'MyProfit',
      component: ()=> import('pages/MyProfit/MyProfit'),
      meta:{
        title:'我的收益',
        requireAuth: true,
        depth: 1
      }
    },
    {
      path: '/information',
      name: 'information',
      component: information,
      meta:{
        title:'手机绑定',
        requireAuth: true,
        depth: 1
      }
    },
    {
      path: '/CourseContent',
      name: 'CourseContent',
      component: ()=> import('pages/CourseContent/CourseContent'),
      meta:{
        title:'课程内容',
        requireAuth: true,
        depth: 1
      }
    },
    {
      path: '/OfflineCourses',
      name: 'OfflineCourses',
      component: ()=> import('pages/OfflineCourses/OfflineCourses'),
      meta:{
        title:'线下课程',
        requireAuth: true,
        depth: 1
      }
    },
    {
      path: '/offlinedetail',
      name: 'offlinedetail',
      component: ()=> import('pages/offlinedetail/offlinedetail'),
      meta:{
        title:'线下课程详情',
        requireAuth: true,
        depth: 1
      }
    },
    {
      path: '/SignClass',
      name: 'SignClass',
      component: ()=> import('pages/SignClass/SignClass'),
      meta:{
        title:'报名课程',
        requireAuth: true,
        depth: 1
      }
    },
    {
      path: '/VideoList',
      name: 'VideoList',
      component: ()=> import('pages/VideoList/VideoList'),
      meta:{
        title:'课程列表',
        requireAuth: true,
        depth: 1
      }
    },
    {
      path: '/VideoDetail',
      name: 'VideoDetail',
      component: ()=> import('pages/VideoDetail/VideoDetail'),
      meta:{
        title:'课程详情',
        requireAuth: true,
        depth: 1
      }
    },
    {
      path: '/FeedbackDetail',
      name: 'FeedbackDetail',
      component: ()=> import('pages/FeedbackDetail/FeedbackDetail'),
      meta:{
        title:'社员反馈',
        requireAuth: true,
        depth: 1
      }
    },
    {
      path: '/OpenClass',
      name: 'OpenClass',
      component: ()=> import('pages/OpenClass/OpenClass'),
      meta:{
        title:'9.9公开课',
        requireAuth: true,
        depth: 1
      }
    },
    {
        path: '/BecomingMember',
        name: 'BecomingMember',
        component: ()=> import('pages/BecomingMember/BecomingMember'),
        meta:{
          title:'成为社员',
          requireAuth: true,
          depth: 1
        }
      },
      {
        path: '/NumCategory',
        name: 'NumCategory',
        component: ()=> import('pages/NumCategory/NumCategory'),
        meta:{
          title:'课程列表',
          requireAuth: true,
          depth: 1
        }
      },
      {
        path: '/NunVideoDetail',
        name: 'NunVideoDetail',
        component: ()=> import('pages/NunVideoDetail/NunVideoDetail'),
        meta:{
          title:'课程详情',
          requireAuth: true,
          depth: 1
        }
      },
      {
        path: '/Setting',
        name: 'Setting',
        component: ()=> import('pages/Setting/Setting'),
        meta:{
          title:'设置',
          requireAuth: true,
          depth: 1
        }
      },
      {
        path: '/InputName',
        name: 'InputName',
        component: ()=> import('pages/InputName/InputName'),
        meta:{
          title:'设置',
          requireAuth: true,
          depth: 1
        }
      },
      {
        path: '/PhoneBound',
        name: 'PhoneBound',
        component: ()=> import('pages/PhoneBound/PhoneBound'),
        meta:{
          title:'设置',
          requireAuth: true,
          depth: 1
        }
      },
      {
        path: '/IntegralDetail',
        name: 'IntegralDetail',
        component: ()=> import('pages/IntegralDetail/IntegralDetail'),
        meta:{
          title:'设置',
          requireAuth: true,
          depth: 1
        }
      },
      {
        path: '/banerDetail',
        name: 'banerDetail',
        component: ()=> import('pages/banerDetail/banerDetail'),
        meta:{
          title:'详情',
          requireAuth: true,
          depth: 1
        }
      },
      {
        path: '/teacher',
        name: 'teacher',
        component: ()=> import('pages/teacher/Detail'),
        meta:{
          title:'导师详情',
          requireAuth: true,
          depth: 1
        }
      },
      {
        path: '/giveInformation',
        name: 'giveInformation',
        component: ()=> import('pages/giveInformation/giveInformation'),
        meta:{
          title:'填写信息',
          requireAuth: true,
          depth: 1
        }
      },
      {
        path: '/buyInformation',
        name: 'buyInformation',
        component: ()=> import('pages/buyInformation/buyInformation'),
        meta:{
          title:'填写信息',
          requireAuth: true,
          depth: 1
        }
      },
      {
        path: '/SettingTotal',
        name: 'SettingTotal',
        component: ()=> import('pages/SettingTotal/SettingTotal'),
        meta:{
          title:'完善信息',
          requireAuth: true,
          depth: 1
        }
      },
      {
        path: '/Addressbound',
        name: 'Addressbound',
        component: ()=> import('pages/Addressbound/Addressbound'),
        meta:{
          title:'地址选择',
          requireAuth: true,
          depth: 1
        }
      },
      {
        path: '/ExtensionTwo',
        name: 'ExtensionTwo',
        component: ()=> import('pages/ExtensionTwo/ExtensionTwo'),
        meta:{
          title:'推广',
          requireAuth: true,
          depth: 1
        }
      },
  


]
Vue.use(VueRouter)
const router = new VueRouter({
    routes
  })
export default router
  