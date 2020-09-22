<template>
  <div :style="{width: '100%',height:height + 'px'}"></div>
</template>

<script>
import echarts from 'echarts'
import theme from '../../plugins/theme.js'
import resize from '../resize'



export default {
  name: 'Provincial',
  mixins: [resize],
  data () {
    return {
      chart: {},
    }
  },
  props: {
    chartData: {},
    height: {
      type: Number,
      default: 390
    },
    colors: Array,
    type: String,
  },
  watch: {
    chartData: {
      deep: true,
      handler (val) {
        this.setOptions(val)
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    handleData (name) {
      let res_name = ''
      if (name.includes('省') || name.includes('市')) {
        res_name = (name).slice(0, -1)
      } else if (name === "内蒙古自治区") {
        res_name = '内蒙古'
      } else if (name === "广西壮族自治区") {
        res_name = '广西'
      } else if (name === "新疆维吾尔自治区") {
        res_name = '新疆'
      } else if (name === "西藏自治区") {
        res_name = '西藏'
      } else if (name === "宁夏回族自治区") {
        res_name = '宁夏'
      }
      return res_name
    },
    initChart () {
      this.chart = echarts.init(this.$el, theme)
      this.setOptions(this.chartData)
    },
    setOptions (chartData) {
      // 获取最大值max
      // let max = chartData.data[0].value;
      // for (let i = 0; i < chartData.data.length - 1; i++) {
      //     max = max < chartData.data[i+1].value ? chartData.data[i+1].value : max
      // }
      // 处理data
      const temp = chartData.data
      let res = temp.map((item) => {
        const name = this.handleData(item.name) // 传入的名字不包含省字，地图才会显示出来
        return { name: name, fullName: item.name, value: item.count, proportion: (item.proportion * 100).toFixed(1) }
      })
      this.chart.setOption(
        {
          tooltip: {
            formatter: function (params) {
              if (!params.data) {
                return
              }
              return `${params.data.fullName}：${params.data.value}（${params.data.proportion}%）`
            },
            backgroundColor: 'rgba(255,255,255,0.7)',
            borderColor: '#111',
            borderWidth: 1,
            textStyle: {
              color: '#353535',
              fontSize: 12
            }
          },
          visualMap: //手柄
          {
            min: 0,
            max: 100,
            left: 0,
            bottom: 0,
            range: [0, 100],
            text: [100, 0],
            inRange: {
              color: ['#eaf4fd', '#51a6eb'],
            },
            calculable: false,
            show: true,
          },
          geo: {
            map: 'china', // 中国
            roam: false,
            zoom: 1.23,
            label: {
              normal: {
                show: false, // 是否将省显示出来
                fontSize: '10',
                color: 'rgba(0,0,0,0.7)'
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.2)'
              },
              emphasis: {
                areaColor: '#F3B329', // hover上面的颜色
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            regions: [ // 将南海诸岛和台湾隐藏
              {
                name: "南海诸岛",
                value: 0,
                itemStyle: {
                  normal: {
                    opacity: 0,
                    label: {
                      show: false
                    }
                  }
                }
              },
              {
                name: "台湾",
                value: 0,
                itemStyle: {
                  normal: {
                    opacity: 0,
                    label: {
                      show: false
                    }
                  }
                }
              }
            ],
            emphasis: {
              areaColor: '#F3B329',
              label: {
                show: false,
                color: '#fff'
              },
              itemStyle: {
                areaColor: '#F3B329'
              }
            },
          },
          grid: {
            top: '1%',
            bottom: 20,
            left: '10%',
            right: '10%',
          },
          series: [
            {
              type: 'map',
              mapType: 'china',
              label: {
                show: false // 页面上是否显示对应地名
              },
              geoIndex: 0,
              data: res
            }
          ]
        }
      )
    }
  }
}
</script>
