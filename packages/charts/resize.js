import {
  debounce
} from '../utils/tool.js'

export default {
  data() {
    return {
      $_resizeHandler: null
    }
  },
  mounted() {
    this.initListener()
  },
  beforeDestroy() {
    this.destroyListener()
  },
  methods: {
    $_sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.$_resizeHandler()
      }
    },
    initListener() {
      this.$_resizeHandler = debounce(() => {
        this.resize()
      }, 100)
      window.addEventListener('resize', this.$_resizeHandler)

    },
    destroyListener() {
      window.removeEventListener('resize', this.$_resizeHandler)
      this.$_resizeHandler = null
    },
    resize() {
      const {
        chart
      } = this
      chart && chart.resize()
    }
  }
}