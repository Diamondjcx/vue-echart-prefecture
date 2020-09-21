##### 地图
###### 省级
- 接口返回的包含省字，但是地图中不需要'省'字，需对name进行处理为不包含'省'的名字，地图中才会将省显示出来
```
eg：
接口返回：广东省    地图中需要的字段是：广东
[广东省-广东]
[内蒙古自治区-内蒙古]
[宁夏回族自治区-宁夏]
fun：
    handleData(name) {
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
```
- 将带有'省'字的名字fullName也需要传递进去，tooltip的时候，要和右边表格保持一致
```
      const temp = chartData.data
      let res = temp.map((item) => {
          const name = this.handleData(item.name) // 传入的名字不包含省字，地图才会显示出来
          return { name: name, fullName: item.name, value: item.count, proportion: (item.proportion*100).toFixed(1) }
      })
```
- 省级地图使用的是geo生成，需与series中的geoIndex匹配
###### 地级
- 处理直辖市的数据，如果为直辖市，整个省的数据是一样的，接口返回的是整个的数据，要将直辖市下面的地区筛选出来，将数据填充进去，这样整个地图才会将value显示出来。
  - 处理直辖市中接口返回与地图不一样的数据

```
    const fullMunicipality = ['北京市', '重庆市', '天津市', '上海市'];
    // municipality 直辖市集合
    {
      label: "北京市"
      value: "110100000000",
      children: [
        {
          label: "东城区",
          value: "110101000000",
        },
        ....等区
      ],
    }
    
    handleMunicipalityPieData(temp) {
      if (!(temp&&temp.length)) {
        return
      }
      const count = temp[0] && temp[0].count
      const proportion = temp[0] && (temp[0].proportion*100).toFixed(1)
      const province_name = this.handleData(this.chartData.province_name)
      // 将直辖市下面的区域筛选出来
      const res_children = this.municipality.find((item) => {
        return item.label === this.chartData.province_name
      }).children;
      // 将数据塞进区域中
      this.prefectureData = res_children.map((val) => {
          const obj = {
              province_name,
              proportion,
              fullName: val.label,
              value: count,
          };
          // 重庆数据因名字不同需单独处理
          if(val.label==='梁平区') {
            return {name: '梁平县', ...obj}
          } else if (val.label==='武隆区') {
            return {name: '武隆县', ...obj}
          }
          return {name: val.label, ...obj}
        });
    },
```
  - 处理非直辖市接口返回与地图不一样的数据
  ```
  非直辖市中，西藏 那曲市 - 》 那曲地区
  ```
- 鼠标hover的时候，只需要显示一个name和value
```
      formatter: function (params) {
        // 直辖市，鼠标hover时 只显示直辖市的name和value   北京: 12
        if(Municipality.includes(chartData.name)) {
          return `${chartData.name}：${_this.prefectureData[0].value}（${_this.prefectureData[0].proportion}%）` 
        } else {
        // 非直辖市，显示各个地区的name和value
          if (params.data) {
            return`${params.data.fullName}：${ params.data.value}（${ params.data.proportion}%）` 
          } else {
            return params.name
          }
        }              
      }
```
- 当选择为直辖市时，鼠标hover时，要将整个区域都置为hover
```
    hoverChange() { // 处理直辖市，鼠标hover的时候，整个地图显示直辖市的名字以及数据
      const _this = this
      if (Municipality.includes(this.chartData.name)) {
        this.chart.on("mouseover", function (params){ // 图表绑定鼠标移入事件
                if(Municipality.includes(params.data&&params.data.province_name)){
                        _this.chart.dispatchAction({ // echarts的api  设置区域高亮
                            type: 'highlight',
                            seriesIndex: 0,
                            seriesName: 'series0',
                        });
                    }
                });
            this.chart.on("mouseout", function (params){ // 图表绑定鼠标移出事件
                  if(Municipality.includes(params.data&&params.data.province_name)){
                      _this.chart.dispatchAction({ // echarts的api  设置区域高亮恢复
                          type: 'downplay',
                          seriesIndex: 0,
                          seriesName: 'series0',
                      });
                  }
              });
          }
      }
```
