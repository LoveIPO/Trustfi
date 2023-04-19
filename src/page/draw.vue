<template>
  <div class="draw">
    <vHead :title="$t('profit.lang18')" :back="back"></vHead>
    <van-tabs v-model:active="active" @click-tab="onClickTab">
      <van-tab title="BSC" name="0">
      </van-tab>
      <van-tab title="ETH" name="1">
      </van-tab>
      <van-tab title="Tron" name="2">
      </van-tab>
      <van-tab title="BTC" name="3">
      </van-tab>
    </van-tabs>
    <div class="box">
      <drawCar :list="newList" @chacnge="select" :type="type" :balance="balance" :extract_fee_ratio="extract_fee_ratio"
        @extract="extract"></drawCar>
      <p class="tilp">{{ $t('profit.lang19', { ratio: extract_fee_ratio * 100 }) }}</p>
      <div class="list">
        <vItemDraw :title="$t('profit.lang20')" :link="link" :more="more" :list="log"></vItemDraw>
      </div>
    </div>


  </div>
</template>
<script>
import Home from "../http/index.js";
import drawCar from "../components/drawCar.vue"
import vItemDraw from "../components/vItemDraw.vue"
import vHead from "../components/vHead.vue"
import { Dialog, Toast } from 'vant';
export default {
  name: "App",
  components: {
    drawCar,
    vItemDraw,
    vHead,
  },
  data() {
    return {
      type: '',
      active: '0',
      amount: "",
      list: [],
      bnb: 0,
      bnb_a: 0,
      bnb_b: 0,
      bnb_usdt: 0,
      btc: 0,
      eth: 0,
      eth_usdt: 0,
      trx: 0,
      trx_usdt: 0,
      balance: 0,
      extract_fee_ratio: 0,
      log: [],
    }
  },
  computed: {
    newList() {
      if (this.active == 0) {
        let arr = this.list.filter((i) => {

          return i.id == 3 || i.id == 31 || i.id == 32 || i.id == 33
        })
        return arr
      }
      if (this.active == 1) {
        let arr = this.list.filter((i) => {

          return i.id == 2 || i.id == 21
        })
        return arr
      }
      if (this.active == 2) {
        let arr = this.list.filter((i) => {

          return i.id == 4 || i.id == 41
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
    let getChain = this.$store.getters.getChain
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
    this.getcoindata()
    this.get_user_info()
    this.extract_log()
  },
  methods: {
    onClickTab() {
      this.type = ''
    },
    select(e) {
      this.type = e
      this.balance = this.getbalance(e)
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
    async extract() {
      this.get_user_info(this.type)
      this.getcoindata()
      this.extract_log()
    },
    extract_log() {
      let parem = {
        type: 2
      }
      Home.extract_log(parem).then((res) => {
        
        if (res.code == 200) {
          this.log = res.data
        }
      });
    },
    getcoindata() {
      Home.main_wallet_coin().then((res) => {
        
        if (res.code == 200) {
          this.list = res.data
        }
      });
    },
    get_user_info(type) {
      Home.get_user_info().then((res) => {
        
        if (res.code == 200) {
          this.bnb = res.data.account.bnb
          this.bnb_a = res.data.account.bnb_a
          this.bnb_b = res.data.account.bnb_b
          this.bnb_usdt = res.data.account.bnb_usdt
          this.btc = res.data.account.btc
          this.eth = res.data.account.eth
          this.eth_usdt = res.data.account.eth_usdt
          this.trx = res.data.account.trx
          this.trx_usdt = res.data.account.trx_usdt
          this.extract_fee_ratio = res.data.extract_fee_ratio
          if (type) {
            this.balance = this.getbalance(type)
          }
        }
      });
    },
    navtab(type) {
      if (this.nav != type) {
        this.nav = type
      }
    },
    back() {
      this.$router.go('-1')
    },
    link() { },
    more() {
      this.$router.push('/drawLog')
    },
    getdata() {
      Home.getdata().then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
<style>
.draw .van-tabs__line {
  background: linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);
}

.draw .van-tab {
  color: #A0A2AA;
  font-weight: 400;
  font-size: 0.14rem;
  line-height: 0.3rem;
}

.draw .van-tab--active {
  color: #FFF;
}

.draw .van-tabs__nav {
  background: transparent;
}

.draw .van-tabs__wrap {
  background: #13172A;
  padding: 0.2rem 0;
  border-radius: 0 0 0.2rem 0.2rem;
  border-bottom: 1px solid #22E988;
}

.draw .van-button {
  color: #333 !important;
  height: 0.3rem;
  font-size: 0.12rem;
  padding: 0 0.17rem;
}
</style>

<style scoped lang="scss">
.draw {
  width: 100%;
  min-height: 100%;
  background: #13172A;

  .box {
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.16rem;

    .tilp {
      font-size: 0.14rem;
      color: #A0A2AA;
      margin: 0.1rem 0 0;
    }
  }


  .log {
    .list {
      margin-top: 0.12rem;
      padding-bottom: 0.1rem;
    }
  }


  .con {
    padding: 0.1rem 0.13rem;

    .car {
      background: #fff;
      border-radius: 0.1rem;
      height: 0.48rem;
      padding: 0 0.2rem 0 0.14rem;

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
      margin-top: 0.1rem;

      .item {
        background: #fff;
        border-radius: 0.1rem;

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
          color: #666666;
          font-size: 0.12rem;
          padding: 0.12rem 0.14rem;
          line-height: 0.24rem;
        }

        .item_b {
          width: calc(100% - 0.28rem);
          margin: 0 auto;
          padding: 0.1rem 0 0.15rem;
        }
      }
    }
  }




}
</style>
