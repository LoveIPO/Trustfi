<template>
  <div class="invest">
    <div class="head flex-wrap jc">
      <div class="nav flex-wrap">
        <p :class="{ act: nav == 1 }" @click="navtab(1)">{{ $t('invest.lang1') }}</p>
        <p :class="{ act: nav == 2 }" @click="navtab(2)">{{ $t('invest.lang2') }}</p>
      </div>
    </div>
    <div class="tabs_box">
      <div class="tabs_box1">
        <van-tabs v-model:active="active" :before-change="beforeChange">
          <van-tab title="BSC" name="0">
          </van-tab>
          <van-tab title="ETH" name="1">
          </van-tab>
          <van-tab title="Tron" name="2">
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="box" v-if="nav == 1">
      <investCar :list="newList" :pid="pid" :type="active" :typeId="typeId" @chacnge="select" :invest_days="invest_days"
        :invest_ratio="invest_ratio" :address="address" @reloads="getdata" v-if="newList && active >= 0 && typeId">
      </investCar>
      <div class="list">
        <vItem :title="$t('invest.lang7')" :list="invest_list" @link="link" :more="more"></vItem>
      </div>
    </div>
    <div class="con" v-else>
      <div class="car flex-wrap a-items">
        <p class="icon flex-wrap"><img src="../assets/img/invest/tzjl.png" alt=""></p>
        <div class="name flex-wrap flex-con jb a-items" @click="log()">
          <p>{{ $t('invest.lang7') }}</p>
          <p class="ricon flex-wrap"><img src="../assets/img/invest/rightback.png" alt=""></p>
        </div>
      </div>
      <div class="lists">
        <div class="item" v-for="(i, index) in fast_list_data" :key="index">
          <div class="title flex-wrap a-items ">
            <p class="flex-wrap u-icon"><img :src="i.coin_ico" alt=""></p>
            <p class="t-name">{{ $t('invest.lang8') }}：{{ i.serial_number }}</p>
          </div>
          <div class="con-box">
            <div class="flex-wrap jb">
              <p>{{ $t('invest.lang9') }}：{{ i.coin_name }}</p>
              <p>{{ $t('invest.lang10') }}：{{ i.total }}</p>
            </div>
            <div class="flex-wrap jb">
              <p>{{ $t('invest.lang11') }}：{{ i.days }}{{ $t('invest.lang12') }}</p>
              <p>{{ $t('invest.lang13') }}：{{ i.profit_ratio * 100 }}%</p>
            </div>
          </div>
          <div class="item_b  flex-wrap jb a-items">
            <p>{{ $t('invest.lang14') }}：{{ $toFixedsNum(i.ratio * 100) }}%</p>
            <div><van-button color="linear-gradient(149deg, #00FF01 0%, #90FF9F 100%)" @click="investment(i.id)">{{
              $t('tab.lang2') }}</van-button></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Home from "../http/index.js";
import investCar from "../components/investCar.vue"
import vItem from "../components/vItem.vue"
import { Dialog, Toast } from 'vant';
export default {
  name: "invest",
  components: {
    investCar,
    vItem,
  },
  data() {
    return {
      nav: 1,
      active: 0,
      typeId: this.$store.getters.getChain == 'trx' ? '41' : this.$store.getters.getChain == 'eth' ? '21' : '31',
      list: [],
      balance: "0",
      invest_days: "7",
      invest_ratio: "0",
      invest_list: [],
      fast_list_data: [],
      address: "",
      pid: ""
    }
  },
  computed: {
    newList() {
      if (this.active == 0) {
        let arr = this.list.filter((i) => {

          return i.id == 31
        })
        return arr
      }
      if (this.active == 1) {
        let arr = this.list.filter((i) => {

          return i.id == 21 || i.id == 2
        })
        return arr
      }
      if (this.active == 2) {
        let arr = this.list.filter((i) => {

          return i.id == 41
        })
        return arr
      }
      if (this.active == 3) {
        let arr = this.list.filter((i) => {

          return i.id == 1
        })
        return arr
      }

    },
  },
  created() {
    let getChain = this.$store.getters.getChain || 'bsc'
    if (getChain == 'bsc') {
      this.active = '0'
      this.typeId = '31'
    } else if (getChain == 'eth') {
      this.active = '1'
      this.typeId = '21'
    } else if (getChain == 'trx') {
      this.active = '2'
      this.typeId = '41'
    }
  },
  mounted() {
    this.getpid()
    this.getcoindata()
    this.getdata()
    this.fast_list()
  },
  methods: {
    getpid() {
      Home.get_user_info().then((res) => {
        if (res.code == 200) {
          this.pid = res.data.pid
        }
      });
    },
    getdata() {
      Home.investinfo().then((res) => {
        if (res.code == 200) {
          this.invest_list = res.data.invest_list
          let getChain = this.$store.getters.getChain || 'bsc'
          if (getChain == 'bsc') {
            this.invest_days = res.data.list.bsc.invest_days
            this.invest_ratio = res.data.list.bsc.invest_ratio
            this.address = res.data.list.bsc.address

          } else if (getChain == 'eth') {
            this.invest_days = res.data.list.eth.invest_days
            this.invest_ratio = res.data.list.eth.invest_ratio
            this.address = res.data.list.eth.address
          } else if (getChain == 'trx') {
            this.invest_days = res.data.list.tron.invest_days
            this.invest_ratio = res.data.list.tron.invest_ratio
            this.address = res.data.list.tron.address
          }
        }
      });

    },
    fast_list() {
      let getChain = this.$store.getters.getChain
      let parme = {
        type: getChain == 'bsc' ? '3' : getChain == 'eth' ? '2' : '4'
      }
      Home.fast_list(parme).then((res) => {
        if (res.code == 200) {
          this.fast_list_data = res.data
        }
      });
    },

    beforeChange() {
      Toast({
        message: this.$t('pulb.lang5'),
        position: 'bottom',
      });
      return false
    },
    select(e) {
      this.typeId = e
      this.balance = this.getbalance(e)
    },
    navtab(type) {
      if (this.nav != type) {
        this.nav = type
      }
    },
    getbalance(id) {
      if (id == 1) {
        return this.btc
      }
      if (id == 2) {
        return this.eth
      }
      if (id == 3) {
        return this.bnb
      }
      if (id == 4) {
        return this.trx
      }
      if (id == 21) {
        return this.eth_usdt
      }
      if (id == 31) {
        return this.bnb_usdt
      }
      if (id == 32) {
        return this.bnb_a
      }
      if (id == 33) {
        return this.bnb_b
      }
      if (id == 41) {
        return this.trx_usdt
      }
    },
    getcoindata() {
      Home.main_wallet_coin().then((res) => {

        if (res.code == 200) {
          this.list = res.data
        }
      });
    },
    investment(id) {
      if (!this.$store.getters.getWalletid) {
        Toast({
          message: this.$t('pulb.lang26'),
          position: 'bottom',
        });
        return
      }
      this.$router.push({
        path: '/investment',
        query: {
          id: id
        }
      })
    },
    log() {
      if (!this.$store.getters.getWalletid) {
        Toast({
          message: this.$t('pulb.lang26'),
          position: 'bottom',
        });
        return
      }
      this.$router.push('/investmentLog')
    },
    link(id) {
      this.$router.push({
        path: '/InvestmentDetails',
        query: {
          id: id
        }
      })
    },
    more() {
      if (!this.$store.getters.getWalletid) {
        Toast({
          message: this.$t('pulb.lang26'),
          position: 'bottom',
        });
        return
      }
      this.$router.push('/investmentLog')
    },

  },
};
</script>
<style>
.invest .van-tabs__line {
  background: linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);
}

.invest .van-tabs__nav {
  background: #13172A;
}

.invest .van-tab {
  color: #A0A2AA;
  font-weight: 400;
  font-size: 0.14rem;
  line-height: 0.3rem;
}

.invest .van-tab--active {
  color: #FFF;
}

.invest .van-button {
  color: #333 !important;
  height: 0.3rem;
  font-size: 0.12rem;
  padding: 0 0.17rem;
}
</style>

<style scoped lang="scss">
.invest {
  width: 100%;
  min-height: 100%;
  background: #13172A;

  .head {
    background: #13172A;
    padding-top: 0.1rem;

    .nav {
      color: #fff;
      font-size: 0.14rem;
      border-radius: 0.1rem;
      overflow: hidden;

      p {
        padding: 0.09rem 0.14rem;
        background: #053D31;
      }

      .act {
        color: #333333;
        font-weight: bold;
        background: linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);
      }
    }
  }

  .tabs_box {
    background: #13172A;
    padding: 0.2rem 0;
    border-radius: 0 0 0.2rem 0.2rem;
    border-bottom: 1px solid #22E988;
  }

  .box {
    width: 100%;
    box-sizing: border-box;
    padding: 0.1rem 0.13rem;
    height: 100%;

  }


  .log {
    .list {
      margin-top: 0.12rem;
      padding-bottom: 0.1rem;
    }
  }


  .con {
    padding: 0.2rem 0.13rem;

    .car {
      padding: 0 0.13rem;
      height: 0.48rem;
      background: linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);
      border-radius: 0.05rem;
      color: rgba(19, 23, 42, 1);

      .icon {
        margin-right: 0.11rem;

        img {
          width: 0.21rem;
          height: 0.21rem;
        }
      }

      .name {
        font-size: 0.14rem;

        .ricon {
          img {
            width: 0.08rem;
            height: 0.15rem;
          }
        }
      }
    }

    .lists {
      margin-top: 0.2rem;

      .item {
        background: rgba(26, 31, 55, 1);
        border-radius: 0.1rem;
        margin-bottom: 0.1rem;

        .title {
          font-size: 0.14rem;
          font-weight: bold;
          padding: 0.13rem 0.14rem;
        }

        .u-icon {
          margin-right: 0.11rem;

          img {
            width: 0.21rem;
            height: 0.21rem;
          }
        }

        .con-box {
          color: RGBA(163, 165, 175, 1);
          font-size: 0.12rem;
          padding: 0.12rem 0.14rem;
          line-height: 0.24rem;
        }

        .item_b {
          width: calc(100% - 0.28rem);
          margin: 0 auto;
          padding: 0.1rem 0 0.15rem;
          color: RGBA(163, 165, 175, 1);
        }
      }
    }
  }




}
</style>
