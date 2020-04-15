import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有列表项
    list: [],
    // 输入框内容
    inputVal: '111',
    // 事项ID
    nextId: 5
  },
  mutations: {
    // 给inputVal重新赋值
    inList(state, list) {
      state.list = list
    },
    getInputVal(state, val) {
      state.inputVal = val
    },
    // 添加事项
    addItem(state) {
      let obj = {
        id: state.nextId,
        info: state.inputVal,
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputVal = ''
    }
  },
  actions: {
    // 获取数据
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        console.log(data)
        context.commit('inList', data)
      })
    }
  }
})
