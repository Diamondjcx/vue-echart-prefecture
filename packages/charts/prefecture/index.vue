<template>
  <div :style="{width: '100%',height:height + 'px'}"></div>
</template>

<script>
import echarts from 'echarts'
import theme from '../../plugins/theme.js'
import resize from '../resize'


const Municipality = ['北京', '重庆', '天津', '上海'];
export default {
  name: 'Prefecture',
  mixins: [resize],
  data () {
    return {
      chart: {},
      prefectureData: null,

    }
  },
  props: {
    chartData: {},
    height: {
      type: Number,
      default: 400
    },
    municipality: Array
  },
  watch: {
    chartData: {
      deep: true,
      handler (val) {
        this.setOptions(val)
        this.hoverChange();
      }
    }
  },
  computed: {
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
      this.hoverChange();
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
    initChart () {
      this.chart = echarts.init(this.$el, theme)
      this.setOptions(this.chartData)
    },
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
    handlePrefectureData (chartData) {
      const fullMunicipality = ['北京市', '重庆市', '天津市', '上海市'];
      const { province_name } = chartData;
      // const temp = objDeepCopy(res.cities_counties)
      const temp = chartData.data;
      if (fullMunicipality.includes(province_name)) {
        this.handleMunicipalityPieData(temp)
      } else {
        this.handlePieData(temp)
      }
    },
    // 处理直辖市数据
    handleMunicipalityPieData (temp) {
      if (!(temp && temp.length)) {
        return
      }
      const count = temp[0] && temp[0].count
      const proportion = temp[0] && (temp[0].proportion * 100).toFixed(1)
      const province_name = this.handleData(this.chartData.province_name)
      const res_children = this.municipality.find((item) => {
        return item.name === this.chartData.province_name
      }).cities;
      this.prefectureData = res_children.map((val) => {
        const obj = {
          province_name,
          proportion,
          fullName: val.name,
          value: count,
        };
        // 重庆数据处理
        if (val.name === '梁平区') {
          return { name: '梁平县', ...obj }
        } else if (val.name === '武隆区') {
          return { name: '武隆县', ...obj }
        }
        return { name: val.name, ...obj }
      });
    },
    // 处理非直辖市数据
    handlePieData (pie_data) {
      if (pie_data && pie_data.length !== 0) {
        this.prefectureData = pie_data.map((item) => {
          const obj = {
            fullName: item.name,
            value: item.count,
            proportion: (item.proportion * 100).toFixed(1)
          };
          if (this.province_name === '西藏自治区' && item.name === '那曲市') {
            return { name: '那曲地区', ...obj }
          }
          return { name: item.name, ...obj }
        })
      } else {
        this.prefectureData = []
      }
    },
    setOptions (chartData) {
      const _this = this;
      // let max = chartData.data[0].value;
      // for (let i = 0; i < chartData.data.length - 1; i++) {
      //     max = max < chartData.data[i+1].value ? chartData.data[i+1].value : max
      // }
      // 如果选择的是直辖市，需要做数据处理
      this.handlePrefectureData(chartData);
      this.chart.setOption(
        {
          title: {
            top: 25,
            left: 'center',
            textStyle: {
              fontSize: 25,
              fontWeight: 650,
              color: '#fff'
            }
          },
          // 提示框组件
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              if (Municipality.includes(chartData.name)) {
                return `${chartData.name}：${_this.prefectureData[0].value}（${_this.prefectureData[0].proportion}%）`
              } else {
                if (params.data) {
                  return `${params.data.fullName}：${params.data.value}（${params.data.proportion}%）`
                } else {
                  return params.name
                }
              }
            }
          },
          // 视觉映射组件
          visualMap: {
            type: 'continuous',
            show: true, // 是否显示 visualMap-continuous 组件 如果设置为 false，不会显示，但是数据映射的功能还存在
            min: 0,
            max: 100,
            range: [0, 100],
            text: [100, 0],
            realtime: false,
            inRange: {
              // 图元的颜色
              color: ['#eaf4fd', '#51a6eb'],
            }
          },
          series: [
            {
              type: 'map',
              map: this.chartData.name,  // 传入对应省份的名字  不包括'省字'
              // 地图类型
              mapType: 'province',
              roam: false,
              top: 30,
              label: {
                show: false
              },
              itemStyle: {
                borderWidth: 0.5,
                borderColor: 'rgba(0, 0, 0, 0.2)',
                borderType: 'solid'
              },
              // 高亮状态
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
              data: this.prefectureData
            }
          ]
        }
      )
    },
    hoverChange () { // 处理直辖市，鼠标hover的时候，整个地图显示直辖市的名字以及数据
      const _this = this
      if (Municipality.includes(this.chartData.name)) {
        this.chart.on("mouseover", function (params) {
          if (Municipality.includes(params.data && params.data.province_name)) {
            _this.chart.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              seriesName: 'series0',
            });
          }
        });
        this.chart.on("mouseout", function (params) {
          if (Municipality.includes(params.data && params.data.province_name)) {
            _this.chart.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
              seriesName: 'series0',
            });
          }
        });
      }
    }
  }
}
</script>
