// 引入 vue.js 的默认值
import Vue from 'vue'
// 引入 App.vue 的默认值
import App from './App'
import router from './router'
import './directives'
import './components'
import store from './store'
import VueSweetalert2 from './plugins/vue-sweetalert2'
import Message from './plugins/message'
import './filters'
import { mockArticles} from './mock/data'
import ls from './utils/localStorage'

Vue.use(VueSweetalert2)
Vue.use(Message)

// 测试数据
const AddMockData = (() => {
    // 是否加入测试数据
    const isAddMockData = true
    // 用户数据
    let userArticles = ls.getItem('articles')

    if (Array.isArray(userArticles)) {
        userArticles = userArticles.filter(article => parseInt(article.uid) === 1)
    } else {
        userArticles = []
    }

    if (isAddMockData) {
        // 合并用户数据和测试数据，使用合并值作为所有文章
        store.commit('UPDATE_ARTICLES', [...userArticles, ...mockArticles(50)])
    } else {
        // 使用用户数据作为所有文章
        store.commit('UPDATE_ARTICLES', userArticles)
    }
})()
// 测试数据结束

// 设置 false 以阻止 Vue 在启动时生成生产提示
Vue.config.productionTip = false

// eslint 配置，允许 new 一个实例后不赋值，我们没有使用 eslint，如果有，则下一行注释不可缺少
/* eslint-disable no-new */
// 创建一个新的 Vue 实例
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
