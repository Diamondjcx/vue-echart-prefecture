const contrastColor = 'rgba(191, 191, 191, 1)';
const black = '#000';
const color = 'rgba(84,84,84,1)';
const color1 = 'rgba(233, 233, 233, 1)';
var axisCommon = function () {
  return {
    axisLine: {
      lineStyle: {
        color: contrastColor
      }
    },
    axisTick: {
      lineStyle: {
        color: '#fff'
      }
    },
    axisLabel: {
      textStyle: {
        color: color
      }
    },
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: color1
      }
    },
    splitArea: {
      areaStyle: {
        color: contrastColor
      }
    }
  };
};

var colorPalette = ['rgb(104, 158, 247)','#fd5d93','#ff8d72','#00f2c3','#e14eca','#ff1334','#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78', '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42'];
var theme = {
  color: colorPalette,
  backgroundColor: '#fff',
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: contrastColor
      },
      crossStyle: {
        color: contrastColor
      }
    }
  },
  legend: {
    textStyle: {
      color: contrastColor
    }
  },
  textStyle: {
    color: color
  },
  title: {
    textStyle: {
      color: black,
      fontWeight:400
    }
  },
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: contrastColor
      }
    }
  },
  dataZoom: {
    textStyle: {
      color: contrastColor
    },
    "backgroundColor": "transparent",
    "dataBackgroundColor": "#ffffff",
    "fillerColor": "rgba(167,183,204,0.4)",
    "handleColor": "#a7b7cc",
  },
  visualMap: {
    textStyle: {
      color: contrastColor
    }
  },
  timeline: {
    lineStyle: {
      color: contrastColor
    },
    itemStyle: {
      normal: {
        color: colorPalette[1]
      }
    },
    label: {
      normal: {
        textStyle: {
          color: contrastColor
        }
      }
    },
    controlStyle: {
      normal: {
        color: contrastColor,
        borderColor: contrastColor
      }
    }
  },
  timeAxis: axisCommon(),
  logAxis: axisCommon(),
  valueAxis: axisCommon(),
  categoryAxis: axisCommon(),
  line: {
    symbol: 'circle'
  },
  graph: {
    color: colorPalette
  },
  gauge: {
    title: {
      textStyle: {
        color: contrastColor
      }
    }
  },
  candlestick: {
    itemStyle: {
      normal: {
        color: '#FD1050',
        color0: '#0CF49B',
        borderColor: '#FD1050',
        borderColor0: '#0CF49B'
      }
    }
  }
};
theme.categoryAxis.splitLine.show = false;
var _default = theme;
export default _default;
