
// 导入组件，组件必须声明 name
import Prefecture from './index.vue'

// 为组件添加 install 方法，用于按需引入
Prefecture.install = function (Vue) {
  Vue.component(Prefecture.name, Prefecture)
}

export default Prefecture