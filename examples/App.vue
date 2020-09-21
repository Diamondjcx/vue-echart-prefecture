<template>
  <div id="app">
    <div>
        <h4>省级分布</h4>
        <Provincial v-if="mapChartData.data.length > 0"
          :chartData="mapChartData"
          />
    </div>
    <div>
      <h4>地级分布---{{prefectureData.province_name}}</h4>
      <Prefecture 
      v-if="prefectureData.data.length > 0"
      :municipality='municipality'
      :chartData='prefectureData'
      />
    </div>
    
  </div>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      municipality: require('./mock/municipality'),
      prefectureData: {
        province_name:'重庆市',
        data: require('./mock/res_municipality'),
        name: '重庆'
      },
      mapChartData: {
        data: require('./mock/res_provinvial')
      },
    }
  },
  components: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
