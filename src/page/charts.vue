<template>
  <div class="Trend">
    <vHead title="TFV" :back="back"></vHead>
    <div class="car_box">
      <div class="car flex-wrap jb a-items">
        <div class="flex-wrap a-items">
          <div class="icon flex-wrap"><img src="../assets/img/invest/A.png" alt=""></div>
          <p class="name">TFV</p>
        </div>
        <p>{{ $t('index.lang9') }}：{{ price }}</p>
      </div>
    </div>
    <div class="box">
      <div id="chart" style="width: 100%; height: 5rem;"></div>
    </div>
  </div>
</template>
<script>
import Home from "../http/index.js";
import vHead from "../components/vHead.vue";
import * as echarts from 'echarts';
export default {
  name: "App",
  components: {
    vHead
  },
  data() {
    return {
      date: [],
      data: [],
      price: "0.00"
    }
  },
  async mounted() {
    this.getdata()
  },
  methods: {
    chartinit() {
      let chart = echarts.init(document.getElementById('chart'));
      chart.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0];
            return params.value;
          },
        },
        title: {
          left: 'center',
          text: ''
        },
        grid: {
          left: 0,
          top: 30,
          right: 5,
          bottom: 60
        },
        xAxis: {
          type: 'category',
          data: this.date,
          min: this.date[0],
          max: this.date[this.date.length - 1],
          boundaryGap: false,
          axisLabel: {
            formatter: (value, index) => {
              if (value == this.date[0]) {
                return '      ' + value;
              } else {
                return value
              }
            },
            textStyle: {
              color: '#A0A2AA'
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(245,245,245,0.4)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(245,245,245,0.1)',
              width: 0.5
            },
            show: true
          },

        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          position: 'right',
          axisLine: {
            lineStyle: {
              color: 'rgba(245,245,245,0.4)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(245,245,245,0.1)',
              width: 0.5
            },
            show: true
          },
          axisLabel: {
            inside: true,
            textStyle: {
              color: '#A0A2AA'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: 0,
            start: 70,
            end: 100,
            zoomLock: false
          }
        ],
        series: [
          {
            name: '',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
              color: 'rgba(0,255,1,0.8)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(0, 255, 1,0.4)'
                },
                {
                  offset: 1,
                  color: 'rgba(144, 255, 159,0.4)'
                }
              ])
            },
            data: this.data
          }
        ]
      });
    },
    getdata() {
      Home.get_chart_info().then((res) => {
        if (res.code == 200) {
          let arr = ['0', '0', '0', '0',]
          let arr1 = [res.data.usdt[0], res.data.usdt[0], res.data.usdt[0], res.data.usdt[0],]
          this.price = res.data.price
          this.date = [...arr, ...res.data.date]
          this.data = [...arr1, ...res.data.usdt]
          for (var i = 0; i < 5; i++) {
            this.date.push('')
            this.data.push('')
          }
          console.log(this.data)
          this.chartinit()
        }
      });
    },
    back() {
      this.$router.go(-1)
    },
  },
};
</script>

<style lang="scss">
.Trend {
  width: 100%;
  height: 100%;
  background: #13172A;

  .car_box {
    width: 100%;
    box-sizing: border-box;
    padding: 0.15rem 0.13rem 0;
    font-size: 0.14rem;

    .car {
      background: #1A1F37;
      padding: 0.15rem 0.13rem;
      border-radius: 0.1rem;
      border: 1px solid rgba(0, 255, 1, 0.3);

      .icon {
        img {
          width: 0.28rem;
          height: 0.28rem;
          margin-right: 0.1rem;
        }
      }
    }

  }

  .box {
    padding: 0 0.13rem;
  }
}
</style>
