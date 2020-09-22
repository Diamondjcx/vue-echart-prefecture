# 地图组件 vue-echart-map
vue-echart-map
## 简介
vue-echart-map是一个关于地图的公共组件，包括省级地图以及地级地图，它基于[vue](https://github.com/vuejs/vue) 和 [echarts](https://github.com/apache/incubator-echarts)实现。主要功能是通过简单操作直接在项目中集成省级和地级地图
- [github](https://github.com/Diamondjcx/vue-echarts-map)
## 组件
- Provincial 省级地图
- Prefecture 地级地图

## 安装
```cmd
# 使用yarn 
yarn add vue-echarts-map

# 使用npm 
npm i vue-echarts-map --save
```

## 引入组件
``` javascript
// 在main.js引入

import Map from 'vue-echarts-map'
Vue.use(Map)
```

## 使用组件
``` html
<template>
  <div>
      <div>
        <h4>省级分布</h4>
        <Provincial v-if="mapChartData.data.length > 0"
                    :chartData="mapChartData" 
                    :height='500'
                    />
      </div>
      <div>
        <h4>地级分布---{{this.prefectureData.province_name}}</h4>
        <Prefecture v-if="prefectureData.data.length > 0"
                    :municipality='municipality'
                    :chartData='prefectureData' 
                    :height='500'
                    />
      </div>
  </div>
</template>
```

``` javascript
传入的数据格式
mapChartData
[{
  "name": "成都市",
  "level": "city",
  "count": 0,
  "proportion": 0
}, {
  "name": "自贡市",
  "level": "city",
  "count": 0,
  "proportion": 0
}, ...]

prefectureData
[{
  "name": "重庆市",
  "level": "city",
  "count": 6,
  "proportion": 1
}]

```