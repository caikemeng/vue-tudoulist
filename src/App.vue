<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputVal" @change="inputValChange"/>
    <a-button type="primary" @click="addItemList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e)=>{checkboxChange(e,item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="delItemList(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{getDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey === 'all' ? 'primary' : 'default'"  @click="changeKey('all')">全部</a-button>
          <a-button :type="viewKey === 'undone' ? 'primary' : 'default'"  @click="changeKey('undone')">未完成</a-button>
          <a-button :type="viewKey === 'done' ? 'primary' : 'default'" @click="changeKey('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="cleanItem">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
    }
  },
  created() {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['inputVal', 'viewKey']),
    ...mapGetters(['getDoneLength', 'infoList'])
  },
  methods: {
    // 监听输入框内容的变化
    inputValChange (e) {
      console.log(e.target.value)
      this.$store.commit('getInputVal', e.target.value)
    },
    // 点击按钮添加事项
    addItemList () {
      if (this.inputVal.trim().length <= 0) {
        return this.$message.warning('请输入内容')
      }
      this.$store.commit('addItem')
    },
    // 点击按钮删除事项
    delItemList(id) {
      if (confirm('你确定要删除吗') === true) {
        this.$store.commit('delItem', id)
        return this.$message.warning('已删除所选项')
      }
    },
    // 复选框状态改变事件
    checkboxChange (e, id) {
      console.log(e.target.checked)
      let params = {
        id: id,
        done: e.target.checked
      }
      this.$store.commit('getCheckboxChange', params)
    },
    // 清除已完成事项
    cleanItem () {
      if (confirm('你确定要清除吗') === true) {
        this.$store.commit('cleanList')
        return this.$message.warning('已清除完成事项')
      }
    },
    // 点击切换高亮效果
    changeKey (key) {
      this.$store.commit('changeViewKey', key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
