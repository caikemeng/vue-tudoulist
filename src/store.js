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
    nextId: 5,
    // 事项完成高亮
    viewKey: 'all'
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
    },
    // 删除事项
    delItem(state, id) {
      // 根据ID获取索引值
      let index = state.list.findIndex(x => x.id === id)
      // 根据索引值删除对应事项
      state.list.splice(index, 1)
    },
    // 改变复选框状态
    getCheckboxChange(state, params) {
      // 根据ID获取索引值
      let index = state.list.findIndex(x => x.id === params.id)
      // 根据索引值改变对应事项复选框的状态
      state.list[index].done = params.done
    },
    // 清除已完成事项
    cleanList (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    // 点击切换高亮效果
    changeViewKey(state, key) {
      state.viewKey = key
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
  },
  getters: {
    // 统计未完成事项
    getDoneLength(state) {
      return state.list.filter(x => x.done === false).length
    }
  }
})
