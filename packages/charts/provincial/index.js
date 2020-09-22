// 导入组件，组件必须声明 name
import Provincial from './index.vue'

// 为组件添加 install 方法，用于按需引入
Provincial.install = function (Vue) {
  Vue.component(Provincial.name, Provincial)
}

export default Provincial