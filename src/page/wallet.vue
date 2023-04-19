<template>
  <div class="wallet">
    <vHead :title="$t('tab.lang5')" :back="back" background="transparent" :left="{ state: false }"></vHead>
    <div class="tabs_box">
      <div class="tabs_box1">
        <div class="head flex-wrap ja">
          <p :class="{ act: type == 1 }" @click="tab(1)">{{ $t('wallet.lang1') }}</p>
          <p :class="{ act: type == 2 }" @click="tab(2)" v-if="walletid">{{ $t('wallet.lang2') }}</p>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="flex-wrap a-items jc" style="padding-top: 0.22rem;">
        <p class="msg">{{ $t('wallet.lang3') }}</p>
      </div>
      <p class="number flex-wrap a-items jc"><span>$</span>{{ $toFixedsNum(total) }}</p>
      <div class="content flex-wrap a-items jc">
        <p>ID：{{ walletid ? $formdata(walletid) : "-" }}</p>
        <p class="flex-wrap a-items" v-if="walletid && level">
          <img src="../assets/img/team/leve1.png" alt="" v-if="level == 1"
            style="width: 0.2rem;height: 0.12rem;margin-left: 0.08rem;">
          <img src="../assets/img/team/leve2.png" alt="" v-if="level == 2"
            style="width: 0.2rem;height: 0.12rem;margin-left: 0.08rem;">
          <img src="../assets/img/team/leve3.png" alt="" v-if="level == 3"
            style="width: 0.2rem;height: 0.12rem;margin-left: 0.08rem;">
          <img src="../assets/img/team/leve4.png" alt="" v-if="level == 4"
            style="width: 0.2rem;height: 0.12rem;margin-left: 0.08rem;">
          <img src="../assets/img/team/leve5.png" alt="" v-if="level == 5"
            style="width: 0.2rem;height: 0.12rem;margin-left: 0.08rem;">
        </p>
        <p class="flex-wrap a-items" v-if="walletid"><img src="../assets/img/wallet/copy.png" alt=""
            style="width: 0.16rem;height: 0.16rem;margin-left: 0.13rem;" @click="copy(walletid)"></p>
      </div>
      <div class="content1 flex-wrap border-t" v-if="type == 2">
        <div class="div border-r flex-con">
          <div class="flex-wrap a-items jc" @click="loanWalletCollection">
            <p class="flex-wrap a-items"><img src="../assets/img/wallet/icon.png" alt=""
                style="width: 0.14rem;height: 0.14rem;margin-right: 0.08rem;"></p>
            <p class="dmsg">{{ $t('wallet.lang4') }}</p>
          </div>
        </div>
        <div class="div flex-con">
          <div class="flex-wrap a-items jc" @click="buy">
            <p class="flex-wrap a-items"><img src="../assets/img/wallet/icon1.png" alt=""
                style="width: 0.14rem;height: 0.14rem;margin-right: 0.08rem;"></p>
            <p class="dmsg">{{ $t('wallet.lang5') }}</p>

          </div>
        </div>
      </div>
    </div>
    <div class="car1">
      <div class="title flex-wrap">
        <p>{{ $t('wallet.lang6') }}</p>
      </div>
      <div class="ul">
        <div class="li flex-wrap a-items jb "  v-for="(i, index) in list"
          :key="index">
          <div class="flex-wrap a-items li_l">
            <p class="flex-wrap"><img :src="i.ico" alt=""></p>
            <p class="name">{{ i.name }}</p>
          </div>
          <div class="li_r">
            <p class="banlan">{{ getbalance(i.id) }}</p>
            <p class="" v-if="index != 7">${{ $toFixedsNum(getbalanceUsdt(i.id)) }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Home from "../http/index.js";
import vHead from "../components/vHead.vue";
import vItems from "../components/vItems.vue";
import { cheng } from "../assets/script/decimal"
import { Dialog, Toast } from 'vant';
import { getBtcBalance } from '../DApp/btc'
import { getBNBBalacne, getBNBUSDTBalacne, getEthBalance, getETHUSDTBalacne } from '../DApp/bsc'
import { gettexBalacne, getTrxBalacne } from '../DApp/trx'
export default {
  name: "wallet",
  components: {
    vHead,
    vItems,
  },
  data() {
    return {
      number: '',
      checked: false,
      list: [],
      type: 1,
      walletid: "",
      bnb: 0,
      bnb_a: 0,
      bnb_b: 0,
      bnb_usdt: 0,
      btc: 0,
      eth: 0,
      eth_usdt: 0,
      trx: 0,
      trx_usdt: 0,
      btc_usdt_price: 0,
      eth_usdt_price: 0,
      bnb_usdt_price: 0,
      trx_usdt_price: 0,
      a_usdt: 0,
      b_usdt: 0,
      level: "",
      loan_address: "",
      btc1: 0,
      eth1: 0,
      bnb1: 0,
      trx1: 0,
      eth_usdt1: 0,
      bnb_usdt1: 0,
      bnb_a1: 0,
      bnb_b1: 0,
      trx_usdt1: 0,
      state: null
    }
  },
  computed: {
    total() {
      let total = 0
      this.list.forEach(item => total += Number(this.getbalanceUsdt(item.id)))
      return total
    },
  },
  async mounted() {
    this.walletid = this.$store.getters.getWalletid
    this.getdata()
    this.get_user_info()
    this.get_coin_usdt()

  },
  methods: {
    onDecode(data) {
      this.state.data = data
    },
    getbalance(id) {
      if (this.type == 1) {
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
      } else {
        if (id == 1) {
          return this.btc1
        }
        if (id == 2) {
          return this.eth1
        }
        if (id == 3) {
          return this.bnb1
        }
        if (id == 4) {
          return this.trx1
        }
        if (id == 21) {
          return this.eth_usdt1
        }
        if (id == 31) {
          return this.bnb_usdt1
        }
        if (id == 32) {
          return this.bnb_a1
        }
        if (id == 33) {
          return this.bnb_b1
        }
        if (id == 41) {
          return this.trx_usdt1
        }

      }
    },
    getbalanceUsdt(id) {
      if (this.type == 1) {
        if (id == 1) {
          return cheng(this.btc, this.btc_usdt_price)
        }
        if (id == 2) {
          return cheng(this.eth, this.eth_usdt_price)
        }
        if (id == 3) {
          return cheng(this.bnb, this.bnb_usdt_price)
        }
        if (id == 4) {
          return cheng(this.trx, this.trx_usdt_price)
        }
        if (id == 21) {
          return this.eth_usdt
        }
        if (id == 31) {
          return this.bnb_usdt
        }
        if (id == 32) {
          return cheng(this.bnb_a, this.a_usdt)
        }
        if (id == 33) {
          return 0 
        }
        if (id == 41) {
          return this.trx_usdt
        }
      } else {
        if (id == 1) {
          return cheng(this.btc1, this.btc_usdt_price)
        }
        if (id == 2) {
          return cheng(this.eth1, this.eth_usdt_price)
        }
        if (id == 3) {
          return cheng(this.bnb1, this.bnb_usdt_price)
        }
        if (id == 4) {
          return cheng(this.trx1, this.trx_usdt_price)
        }
        if (id == 21) {
          return this.eth_usdt1
        }
        if (id == 31) {
          return this.bnb_usdt1
        }
        if (id == 32) {
          return cheng(this.bnb_a1, this.a_usdt)
        }
        if (id == 33) {
          return 0 
        }
        if (id == 41) {
          return this.trx_usdt1
        }
      }
    },
    get_coin_usdt() {
      Home.get_coin_usdt().then((res) => {
        
        if (res.code == 200) {
          this.btc_usdt_price = res.data.btc_usdt
          this.eth_usdt_price = res.data.eth_usdt
          this.bnb_usdt_price = res.data.bnb_usdt
          this.trx_usdt_price = res.data.trx_usdt
          this.a_usdt = res.data.a_usdt
          this.b_usdt = res.data.b_usdt
        }
      });
    },
    get_user_info() {
      Home.get_user_info().then(async (res) => {
        if (res.code == 200) {
          this.walletid = res.data.walletid
          this.level = res.data.level
          this.bnb = res.data.account.bnb
          this.bnb_a = res.data.account.bnb_a
          this.bnb_b = res.data.account.bnb_b
          this.bnb_usdt = res.data.account.bnb_usdt
          this.btc = res.data.account.btc
          this.eth = res.data.account.eth
          this.eth_usdt = res.data.account.eth_usdt
          this.trx = res.data.account.trx
          this.trx_usdt = res.data.account.trx_usdt
          this.loan_address = res.data.loan_address
          if (this.walletid) {
            this.btc1 = this.$toFixedsNum(await getBtcBalance(this.loan_address.btc3), 6)
            this.eth1 = this.$toFixedsNum(await getEthBalance(this.loan_address.eth), 6)
            this.bnb1 = this.$toFixedsNum(await getBNBBalacne(this.loan_address.bnb), 6)
            this.trx1 = this.$toFixedsNum(await gettexBalacne(this.loan_address.trx), 6)
            this.eth_usdt1 = this.$toFixedsNum(await getETHUSDTBalacne(this.loan_address.eth), 6)
            this.bnb_usdt1 = this.$toFixedsNum(await getBNBUSDTBalacne(this.loan_address.bnb), 6)
            this.bnb_a1 = this.$toFixedsNum(await getBNBUSDTBalacne(this.loan_address.bnb, "0x8E944816caaa0dE9031E1703Ba14051469bbA40C"), 6)
            this.bnb_b1 = this.$toFixedsNum(await getBNBUSDTBalacne(this.loan_address.bnb, "0x162a2bd98c6421b60136ac7E9B25489e13c23187"), 6)
            this.trx_usdt1 = this.$toFixedsNum(await getTrxBalacne(this.loan_address.trx), 6)
            if (this.btc1) {
              this.$store.commit('setbtcBalance', this.btc1)
            } else {
              this.btc1 = this.$store.getters.getbtcBalance
            }
            if (this.eth1) {
              this.$store.commit('setethBalance', this.eth1)
            } else {
              this.eth1 = this.$store.getters.getethBalance
            }
            if (this.eth_usdt1) {
              this.$store.commit('seteth_usdt1Balance', this.eth_usdt1)
            } else {
              this.eth_usdt1 = this.$store.getters.geteth_usdt1Balance
            }
          }

        }
      });
    },
    getdata() {
      let parem = {
        walletid: this.$store.getters.getWalletid
      }
      Home.main_wallet_coin(parem).then((res) => {
        
        this.list = res.data
      });
    },
    tab(type) {
      this.type = type
    },
    loanWalletCollection() {
      this.$router.push('/loanWalletCollection')
    },
    buy() {
      this.$router.push('/buy')
    },
    copy(url) {
      var input = document.createElement("input"); 
      input.value = url; 
      document.body.appendChild(input); 
      input.select(); 
      document.execCommand("Copy"); 
      document.body.removeChild(input); 
      Toast({
        message: this.$t('pulb.lang2'),
        position: 'bottom',
      });
    },
  },
};
</script>
<style ></style>
<style lang="scss">
.wallet {
  width: 100%;
  min-height: 100%;
  position: relative;
  padding-bottom: 0.2rem;
  background: #13172A;

  .head {
    position: relative;
    z-index: 2;
    padding: 0 0.13rem;
    line-height: 0.45rem;
    font-size: 0.14rem;
    color: #A0A2AA;

    .act {
      color: #FFFFFF;
      font-weight: bold;
      position: relative;
    }

    .act::after {
      content: '';
      width: 0.27rem;
      position: absolute;
      bottom: 0;
      left: calc((100% - 0.27rem)/2);
      height: 0.04rem;
      background: linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);
      border-radius: 0.01rem;
    }
  }

  .tabs_box {
    background: #13172A;
    padding: 0.2rem 0;
    border-radius: 0 0 0.2rem 0.2rem;
    border-bottom: 1px solid #22E988;
  }

  .box {
    position: relative;
    z-index: 2;
    width: calc(100% - 0.32rem);
    margin-left: 0.16rem;
    margin-top: 0.24rem;
    border-radius: 0.1rem;
    padding-bottom: 0.2rem;
    border: 1px solid #22E988;
    background: #1A1F37;
    .msg {
      text-align: center;
      font-size: 0.16rem;
      color: #A0A2AA;
    }

    .number {
      text-align: center;
      font-size: 0.4rem;
      font-weight: bold;
      margin-top: 0.13rem;

      span {
        display: inline-block;
        font-size: 0.2rem;
      }
    }

    .content {
      margin-top: 0.33rem;
      font-size: 0.14rem;
      color: #A0A2AA;
    }

    .content1 {
      margin-top: 0.19rem;
      padding: 0.2rem 0 0;

      .div {
        text-align: center;

        .dmsg {
          font-size: 0.14rem;
        }

        .dval {
          margin-top: 0.06rem;
          color: A0A2AA;
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
        top: calc((100% - 0.1rem)/2);
        right: 0;
        height: 0.1rem;
        background: #22E988;
      }
    }

  }

  .car1 {
    width: calc(100% - 0.32rem);
    box-sizing: border-box;
    margin-left: 0.16rem;
    margin-top: 0.1rem;
    border-radius: 0.1rem;
    padding: 0.16rem 0 0;

    .title {
      font-size: 0.16rem;
      font-weight: bold;
    }

    .ul {
      padding: 0.04rem 0;

      .li {
        padding: 0.15rem 0;

        .li_l {
          font-size: 0.16rem;

          img {
            width: 0.24rem;
            height: 0.24rem;
            margin-right: 0.09rem;
          }
        }

        .li_r {
          text-align: end;
          font-size: 0.12rem;
          color: #FFF;

          .banlan {
            font-size: 0.16rem;
            color: #A0A2AA;
          }
        }
      }
    }
  }
}
</style>
