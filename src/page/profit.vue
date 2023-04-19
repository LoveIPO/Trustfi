<template>
  <div class="profit">
    <vHead :title="$t('tab.lang4')" :back="back" background="transparent" :left="{ state: false }"></vHead>
    <div class="box">
      <div class="flex-wrap a-items jc" style="padding-top: 0.22rem;" @click="profitLog(1)">
        <p class="msg">{{$t('invest.lang25')}}(USDT)</p>
        <p class="flex-wrap a-items"><img src="../assets/img/invest/right.png" alt=""
            style="width: 0.05rem;height: 0.11rem;margin-left: 0.08rem;"></p>
      </div>
      <p class="number">{{ total }}</p>
      <div class="content flex-wrap">
        <div class="div  flex-con" @click="profitLog(2)">
          <div class="flex-wrap a-items jc">
            <p class="dmsg">{{$t('tab.lang14')}}</p>
            <p class="flex-wrap a-items"><img src="../assets/img/invest/right.png" alt=""
                style="width: 0.05rem;height: 0.11rem;margin-left: 0.08rem;"></p>
          </div>
          <p class="dval">{{ invest }}</p>
        </div>
        <div class="div flex-con" @click="profitLog(3)">
          <div class="flex-wrap a-items jc">
            <p class="dmsg">{{$t('tab.lang15')}}</p>
            <p class="flex-wrap a-items"><img src="../assets/img/invest/right.png" alt=""
                style="width: 0.05rem;height: 0.11rem;margin-left: 0.08rem;"></p>
          </div>
          <p class="dval">{{ team }}</p>
        </div>
        <div class="div flex-con" @click="profitLog(4)">
          <div class="flex-wrap a-items jc">
            <p class="dmsg">{{$t('tab.lang16')}}</p>
            <p class="flex-wrap a-items"><img src="../assets/img/invest/right.png" alt=""
                style="width: 0.05rem;height: 0.11rem;margin-left: 0.08rem;"></p>
          </div>
          <p class="dval">{{ node }}</p>
        </div>
      </div>
    </div>
    <div class="car1">
      <div class="title flex-wrap">
        <p>{{$t('profit.lang4')}}</p>
      </div>
      <div class="block">
        <div class="row flex-wrap jb">
          <div class="col" @click="balance(1)">
            <div class="flex-wrap a-items jc">
              <p class="dmsg">{{$t('profit.lang5')}}(USDT)</p>
              <p class="flex-wrap a-items"><img src="../assets/img/invest/right.png" alt=""
                  style="width: 0.05rem;height: 0.11rem;margin-left: 0.08rem;"></p>
            </div>
            <p class="num">≈ {{ total_bnb_usdt }}</p>
          </div>
          <div class="col" @click="balance(2)">
            <div class="flex-wrap a-items jc">
              <p class="dmsg">{{$t('profit.lang6')}}(USDT)</p>
              <p class="flex-wrap a-items"><img src="../assets/img/invest/right.png" alt=""
                  style="width: 0.05rem;height: 0.11rem;margin-left: 0.08rem;"></p>
            </div>
            <p class="num">≈ {{ total_eth_usdt }}</p>
          </div>
        </div>
        <div class="row flex-wrap jb">
          <div class="col" @click="balance(3)">
            <div class="flex-wrap a-items jc">
              <p class="dmsg">{{$t('profit.lang7')}}(USDT)</p>
              <p class="flex-wrap a-items"><img src="../assets/img/invest/right.png" alt=""
                  style="width: 0.05rem;height: 0.11rem;margin-left: 0.08rem;"></p>
            </div>
            <p class="num">≈ {{ total_trx_usdt }}</p>
          </div>
          <div class="col" @click="balance(4)">
            <div class="flex-wrap a-items jc">
              <p class="dmsg">{{$t('profit.lang8')}}(USDT)</p>
              <p class="flex-wrap a-items"><img src="../assets/img/invest/right.png" alt=""
                  style="width: 0.05rem;height: 0.11rem;margin-left: 0.08rem;"></p>
            </div>
            <p class="num">≈ {{ total_btc_usdt }}</p>
          </div>
        </div>
      </div>
      <div class="btn">
        <van-button block color="linear-gradient(149deg, #00FF01 0%, #90FF9F 100%)" @click="draw">{{$t('profit.lang9')}}</van-button>
      </div>
    </div>
    <div class="car1" style="padding-bottom: 0;" @click="teamlist()">
      <div class="title flex-wrap jb">
        <p>{{$t('profit.lang10')}}</p>
        <p class="flex-wrap a-items"><img src="../assets/img/invest/right.png" alt=""
            style="width: 0.05rem;height: 0.11rem;margin-left: 0.08rem;"></p>
      </div>
      <van-grid :border="true" :column-num="2">
        <van-grid-item>
          <div>
            <p class="key">{{$t('profit.lang11')}}</p>
            <p class="val">{{ push_count }}</p>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div>
            <p class="key">{{$t('profit.lang12')}}</p>
            <p class="val">{{ team_count }}</p>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div>
            <p class="key">{{$t('profit.lang13')}}(USDT)</p>
            <p class="val">{{ my_kpi }}</p>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div>
            <p class="key">{{$t('profit.lang14')}}(USDT)</p>
            <p class="val">{{ team_kpi }}</p>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

  </div>
</template>

<script>
import Home from "../http/index.js";
import vHead from "../components/vHead.vue";
import vItems from "../components/vItems.vue";
import { Dialog, Toast } from 'vant';
export default {
  name: "profit",
  components: {
    vHead,
    vItems,
  },
  data() {
    return {
      invest: '-',
      my_kpi: '-',
      push_count: '-',
      team: '-',
      node: '-',
      team_count: '-',
      team_kpi: '-',
      total: '-',
      total_bnb_usdt: '-',
      total_btc_usdt: '-',
      total_eth_usdt: '-',
      total_trx_usdt: '-',
    }
  },
  mounted() {
    this.getdata();
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    detail() {
      if (!this.$store.getters.getWalletid) {
        Toast({
          message: this.$t('pulb.lang26'),
          position: 'bottom',
        });
        return
      } 
      this.$router.push('/borrowingDetail')
    },
    logdetail() {
      if (!this.$store.getters.getWalletid) {
        Toast({
          message: this.$t('pulb.lang26'),
          position: 'bottom',
        });
        return
      } 
      this.$router.push('/bDetail')
    },
    log() {
      if (!this.$store.getters.getWalletid) {
        Toast({
          message: this.$t('pulb.lang26'),
          position: 'bottom',
        });
        return
      } 
      this.$router.push('/borrowingLog')
    },
    draw() {
      if (!this.$store.getters.getWalletid) {
        Toast({
          message: this.$t('pulb.lang26'),
          position: 'bottom',
        });
        return
      } 
      this.$router.push('/draw')
    },
    profitLog(type) {
      if (!this.$store.getters.getWalletid) {
        Toast({
          message: this.$t('pulb.lang26'),
          position: 'bottom',
        });
        return
      } 
      this.$router.push({
        path:'/profitLog',
        query:{
          type : type
        }
      })
    },
    balance(type) {
      if (!this.$store.getters.getWalletid) {
        Toast({
          message: this.$t('pulb.lang26'),
          position: 'bottom',
        });
        return
      } 
      this.$router.push({
        path:'/balance',
        query:{
          type : type
        }
      })
    },
    teamLog() {
      if (!this.$store.getters.getWalletid) {
        Toast({
          message: this.$t('pulb.lang26'),
          position: 'bottom',
        });
        return
      } 
      this.$router.push('/teamLog')
    },
    teamlist() {
      if (!this.$store.getters.getWalletid) {
        Toast({
          message: this.$t('pulb.lang26'),
          position: 'bottom',
        });
        return
      } 
      this.$router.push('/team')
    },

    getdata() {
      Home.profit().then((res) => {
        if (res.code == 200) {
          this.invest = res.data.invest
          this.my_kpi = res.data.my_kpi
          this.push_count = res.data.push_count
          this.team = res.data.team
          this.team_count = res.data.team_count
          this.team_kpi = res.data.team_kpi
          this.total = res.data.total
          this.total_bnb_usdt = res.data.total_bnb_usdt
          this.total_btc_usdt = res.data.total_btc_usdt
          this.total_eth_usdt = res.data.total_eth_usdt
          this.total_trx_usdt = res.data.total_trx_usdt
          this.node = res.data.node
        }
      });
    },
  },
};
</script>
<style >
.profit .btn .van-button {
  color: #333 !important;
  height: 0.48rem;
  font-size: 0.14rem;
  margin-top: 0.27rem;
}

.car1 .van-grid {
  margin-top: 0.16rem;
  padding-top: 0.1rem;
  background: #053D31;
}

.car1 .van-grid-item__content {
  padding: 0.1rem 0.05rem;
  text-align: center;
  background: #053D31;
  
}
.profit .van-hairline--top:after{
  border-width: 0;
}
.profit .van-grid-item__content:after{
  border-width: 0;
}
</style>
<style lang="scss">


.profit {
  width: 100%;
  min-height: 100%;
  position: relative;
  padding-bottom: 0.2rem;
  background: #13172A;
  .box {
    position: relative;
    z-index: 2;
    width: calc(100% - 0.26rem);
    margin-left: 0.13rem;
    margin-top: 0.1rem;
    border-radius: 0.1rem;
    padding-bottom: 0.23rem;
    border: 1px solid #22E988;

    .msg {
      text-align: center;
      font-size: 0.14rem;
      color: #A0A2AA;
    }

    .number {
      text-align: center;
      font-size: 0.4rem;
      font-weight: bold;
      margin-top: 0.13rem;
    }

    .content {
      margin-top: 0.33rem;

      .div {
        text-align: center;

        .dmsg {
          font-size: 0.14rem;
        }

        .dval {
          margin-top: 0.06rem;
          color: #A0A2AA;
          font-size: 0.12rem;
        }
      }

      .border-r {
        position: relative;
      }

      .border-r::before {
        content: '';
        width: 1px;
        position: absolute;
        top: 0;
        right: 0;
        height: 0.33rem;
        background: #F5F5F5;
      }
    }

    .btn {
      margin: 0.33rem 0.26rem 0;
    }
  }

  .car1 {
    width: calc(100% - 0.26rem);
    box-sizing: border-box;
    margin-left: 0.13rem;
    margin-top: 0.1rem;
    border-radius: 0.1rem;
    padding: 0.16rem 0 0.33rem;

    .title {
      font-size: 0.16rem;
      font-weight: bold;
    }

    .block {
      width: 100%;

      .row {
        width: 100%;
        margin-top: 0.18rem;

        .col {
          width: calc(50% - 0.1rem);
          box-sizing: border-box;
          padding: 0.17rem 0.1rem;
          background: #053D31;
          border-radius: 0.1rem;

          .dmsg {
            font-size: 0.12rem;
            color: #A0A2AA;
          }

          .num {
            text-align: center;
            font-size: 0.18rem;
            margin-top: 0.1rem;
          }
        }

      }
    }

    .key {
      font-size: 0.12rem;
      color: #A0A2AA;
    }

    .val {
      font-size: 0.16rem;
      margin-top: 0.05rem;
    }
  }
}

</style>
