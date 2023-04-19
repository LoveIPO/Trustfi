<template>
  <div class="buy">
    <vHead :title="$t('index.lang1')" :back="back" :right="right" :rightClick="rightClick"></vHead>
    <div class="box">
      <div class="select">
        <div class="flex-wrap jb  a-items a">
          <div class="flex-wrap a-items">
            <p class="flex-wrap"><img :src="type == 1 ? select1.coin_ico : select2.coin_ico" alt=""
                style="width: 0.24rem;height: 0.24rem;">
            </p>
            <p class="type">{{ type == 1 ? select1.coin_name : select2.coin_name }}</p>
          
          </div>

          <p class="balance">{{ $t('wallet.lang11') }}: {{ type == 1 ? select1.balance : select2.balance }}</p>
        </div>
        <div class="field ">
          <van-field type="number" v-model="number" @update:model-value="getd" :placeholder="$t('wallet.lang12')" />
        </div>

        <p class="flex-wrap jc icon3"><img src="../assets/img/wallet/icon3.png" alt="" @click="qiehuan"></p>

        <div class="flex-wrap jb  a-items a">
          <div class="flex-wrap a-items">
            <p class="flex-wrap"><img :src="type == 1 ? select2.coin_ico : select1.coin_ico" alt=""
                style="width: 0.24rem;height: 0.24rem;">
            </p>
            <p class="type">{{ type == 1 ? select2.coin_name : select1.coin_name }}</p>
         
          </div>
        </div>
        <div class="field ">
          <van-field v-model="num" :placeholder="$t('wallet.lang12')" readonly />
        </div>
        <div class="flex-wrap price a-items" v-if="data">
          <p>{{ $t('wallet.lang13') }}：<span>{{ data }}</span></p>
          <p class="flex-wrap" @click="coin_usdt"><img src="../assets/img/wallet/icon2.png" alt=""
              style="width: 0.24rem;height: 0.24rem;">
          </p>
        </div>
        <div class="tilp">{{ $t('index.lang6') }}：{{ balance }} TFV</div>
        <div class="btn" @click="shouquan" v-if="number && number > 0 && ((tfv < number && type == 1) || (usdt < number && type == 2))">
          {{ $t('index.lang7') }}{{ type == 1 ? select1.coin_name : select2.coin_name }}
        </div>
        <div class="btn"
          :class="{ state: number && number > 0 && ((tfv < number && type == 1) || (usdt < number && type == 2)) }"
          @click="creditbuy">
          {{ $t('index.lang2') }}
        </div>
      </div>


      <div class="log">
        <div class="title flex-wrap a-items jb">
          <p>{{ $t('wallet.lang15') }}</p>
          <div class="more flex-wrap a-items" @click="more()">
            <p>{{ $t('pulb.lang19') }}</p>
            <p class="flex-wrap icon a-items"><img src="../assets/img/invest/right.png" alt=""></p>
          </div>
        </div>
      </div>
      <div class="list flex-con">
        <div class="item" v-for="(i, index) in list" :key="index" >
          <div class="title flex-wrap jb a-items">
            <div class="name flex-wrap a-items">
              <p>{{ i.created_at }}</p>
            </div>
            <div class="state flex-wrap a-items">
              <p style="color: #FFA200;" v-if="i.state==1">
                {{ $t('index.lang4') }}</p>
              <p style="color: #2EBD87;" v-else> {{ $t('index.lang5') }}</p>
            </div>
          </div>
          <div class="content flex-wrap  jb">
            <div class="num">
              <div class="flex-wrap a-items">
                <p class="icon flex-wrap a-items"><img :src="i.type == 2 ? select2.coin_ico : select1.coin_ico" alt=""></p>
                <p class="key">{{ i.type == 2 ? select2.coin_name : select1.coin_name }}</p>
              </div>
              <p class="val">{{ i.type == 2 ?i.usdt > 0 ? i.usdt : "-":i.tfv > 0 ? i.tfv : "-" }}</p>
            </div>
            <div class="income flex-wrap a-items">
              <img src="../assets/img/wallet/line1.png" alt="">
            </div>
            <div class="num text-r">
              <div class="flex-wrap a-items">
                <p class="icon flex-wrap a-items"><img :src="i.type == 1 ? select2.coin_ico : select1.coin_ico" alt=""></p>
                <p class="key">{{ i.type == 1 ? select2.coin_name : select1.coin_name }}</p>
              </div>
              <p class="val">{{i.type == 1 ?i.usdt > 0 ? i.usdt : "-":i.tfv > 0 ? i.tfv : "-" }}</p>
            </div>
          </div>
        </div>
        <div v-if="list.length == 0" class="flex-wrap flex-ver jc" style="height:100% ;">
          <van-empty :image="require('../assets/img/empty.png')" :image-size="['1.05rem', '0.79rem']"
            :description="$t('pulb.lang1')" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Home from "../http/index.js";
import vHead from "../components/vHead.vue";
import Qrcode from "../components/Qrcode.vue";
import { getBNBUSDTBalacne, getBNBTFVBalacne, get_TFV_USDT, getex_tfv, sub_TFV_USDT, getactivated, setapprove } from '../DApp/bsc'
import { Dialog, Toast } from 'vant';
import { cheng } from '../assets/script/decimal'
export default {
  name: "App",
  components: {
    vHead,
    Qrcode
  },
  data() {
    return {
      right:{
        state: true,
        icon: require('../assets/img/borrowing/chart.png'),
      },
      type: 1,
      number: "",
      num: "",
      list: [],
      select1: {
        coin_name: 'TFV',
        coin_ico: require('../assets/img/invest/A.png'),
        balance: 0
      },
      select2: {
        coin_name: 'USDT',
        coin_ico: require('../assets/img/invest/usdt.png'),
        balance: 0
      },
      balance: 0,
      data: "",
      price: "",
      tfv: "",
      usdt: "",
      pid: "",
    }
  },
  computed: {
  },
  async mounted() {
    this.getpid()
    this.tfv_exchange_log()
    this.select1.balance = this.$toFixedsNum(await getBNBTFVBalacne(this.$store.getters.getAccount), 6)
    this.select2.balance = this.$toFixedsNum(await getBNBUSDTBalacne(this.$store.getters.getAccount, '0x55d398326f99059fF775485246999027B3197955'), 6)
    this.balance = await getex_tfv(this.$store.getters.getAccount)
    this.tfv = await getactivated(1)
    this.usdt = await getactivated(2)
  },
  methods: {
    rightClick(){
      this.$router.push({
        path: '/charts'
      })
    },
    getpid() {
      Home.get_user_info().then((res) => {
        if (res.code == 200) {
          this.pid = res.data.pid
        }
      });
    },
    async shouquan() {
      setapprove(this.type, async (hash) => {
        if (this.type == 1) {
          this.tfv = await getactivated(1)
        } else {
          this.usdt = await getactivated(2)
        }
      })
    },
    async getd(number) {
      if (!number || number <= 0) {
        this.num = ''
      } else {
        if (this.type == 1) {
          this.num = this.$toFixedsNum(await get_TFV_USDT(number, ['0x8E944816caaa0dE9031E1703Ba14051469bbA40C', '0x55d398326f99059fF775485246999027B3197955']), 8)
        } else {
          this.num = this.$toFixedsNum(await get_TFV_USDT(number, ['0x55d398326f99059fF775485246999027B3197955', '0x8E944816caaa0dE9031E1703Ba14051469bbA40C']), 8)
        }
      }
    },
    qiehuan() {
      if (this.type == 1) {
        this.type = 2
      } else {
        this.type = 1
      }
      this.number = ''
      this.num = ''
    },
    tfv_exchange_log() {
      let parem = {
        type: 2,
      }
      Home.tfv_exchange_log(parem).then((res) => {
        this.list = res.data
      });
    },
    async creditbuy() {
      if (this.number) {
        if (this.number && this.number > 0 && ((this.tfv < this.number && this.type == 1) || (this.usdt < this.number && this.type == 2))) {

        } else {
          let add = this.type == 1 ? ['0x8E944816caaa0dE9031E1703Ba14051469bbA40C', '0x55d398326f99059fF775485246999027B3197955'] : ['0x55d398326f99059fF775485246999027B3197955', '0x8E944816caaa0dE9031E1703Ba14051469bbA40C']
          sub_TFV_USDT(this.number, add, (hash) => {
            console.log(hash)
            this.tfv_exchange(hash)
          })
        }
      }


    },
    navtab(type) {
      if (this.nav != type) {
        this.nav = type
      }
    },
    tfv_exchange(hash) {
      let parem = {
        amount: this.number,
        type: this.type,
        hash: hash
      }
      Home.tfv_exchange(parem).then((res) => {
        Dialog.alert({
          message: res.msg,
        }).then(() => {
          if (res.code == 200) {
            this.number = ''
            this.tfv_exchange_log()
          }
        })
      });
    },
    back() {
      this.$store.commit('setSelect1', '')
      this.$store.commit('setSelect', '')
      this.$router.go('-1')
    },
    link(id) {
      this.$router.push({
        path: '/buyDetail',
        query: {
          id: id
        }
      })
    },
    more() {
      this.$router.push('/exchangeLog')
    },
    select(type) {
      this.$router.push({
        path: '/select',
        query: {
          type: type
        }
      })
    },
    getdata() {
      let getChain = this.$store.getters.getChain
      let parem = {
        type: getChain == 'bsc' ? 3 : getChain == 'eth' ? 2 : getChain == 'trx' ? 4 : ""
      }
      Home.creditindex(parem).then((res) => {
        this.credit_list = res.data.credit_list
        this.loan_list = res.data.loan_list
      });
    },

  },
};
</script>
<style>
.buy .van-tabs__line {
  background: linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);
}

.buy .van-tab {
  color: #A0A2AA;
  font-weight: 400;
  font-size: 0.14rem;
  line-height: 0.3rem;
}

.buy .van-tabs__wrap {
  background: #13172A;
  padding: 0.2rem 0;
  border-radius: 0 0 0.2rem 0.2rem;
  border-bottom: 1px solid #22E988;
}

.buy .van-tabs__nav {
  background: transparent;
}

.buy .van-tab--active {
  color: #FFF;
}

.buy .van-cell {
  background: transparent;
  font-size: 0.14rem;
  line-height: 0.38rem;
  padding: 0.1rem;

}

.buy .van-field__control {
  text-align: right;
}
</style>
<style scoped lang="scss">
.buy {
  width: 100%;
  min-height: 100%;
  background: #13172A;

  .box {
    padding: 0.1rem 0.13rem;

    .select {
      padding: 0.24rem 0.1rem 0.2rem;
      border-radius: 0.1rem;

      .type {
        font-size: 0.14rem;
        font-weight: bold;
        margin-left: 0.08rem;
      }

      .balance {
        font-size: 0.12rem;
        color: RGBA(160, 162, 170, 1);
      }

      .field {
        margin-top: 0.1rem;
        border-bottom: 1px solid rgba(45, 208, 143, 0.4);
      }

      .price {
        font-size: 0.14rem;
        margin-top: 0.12rem;

        span {
          color: #FFA200;
        }

        img {
          width: 0.2rem;
          height: 0.2rem;
          margin-left: 0.12rem;
        }
      }

      .icon3 {
        margin: 0.24rem 0;

        img {
          width: 0.21rem;
          height: 0.21rem;
        }
      }

      .tilp {
        font-size: 0.14rem;
        line-height: 0.2rem;
        margin-top: 0.1rem;
        color: RGBA(160, 162, 170, 1);
      }

      .btn {
        margin: 0.19rem auto 0;
        background: linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);
        text-align: center;
        font-size: 0.14rem;
        line-height: 0.44rem;
        border-radius: 0.05rem;
        color: rgba(19, 23, 42, 1);
      }

      .state {
        background: RGBA(160, 162, 170, 1);
        color: #fff;
      }
    }


    .log {
      width: 100%;
      box-sizing: border-box;
      font-size: 0.14rem;
      margin-top: 0.17rem;
    }

    .title {
      font-weight: bold;

      .more {
        font-weight: 100;
        color: #A0A2AA;

        .icon {
          margin-left: 0.09rem;

          img {
            width: 0.07rem;
            height: 0.13rem;
          }
        }
      }
    }

    .list {

      .item {
        background: #1A1F37;
        width: 100%;
        box-sizing: border-box;
        padding: 0.17rem 0;
        border-radius: 0.1rem;
        margin-top: 0.17rem;
      }

      .title {
        padding: 0 0.15rem;

        .name {
          font-size: 0.14rem;
          font-weight: bold;
        }

        .state {
          font-size: 0.14rem;
          color: #A0A2AA;

          .right-icon {
            margin-left: 0.09rem;

            img {
              width: 0.07rem;
              height: 0.12rem;
            }
          }
        }
      }


      .content {
        margin-top: 0.17rem;
        padding: 0.18rem 0.15rem 0;
        border-top: 1px solid #13172A;

        .num {
          .key {
            font-size: 0.14rem;
          }

          .val {
            margin-top: 0.07rem;
            font-size: 0.14rem;
          }

          .icon {
            margin-right: 0.06rem;

            img {
              width: 0.21rem;
              height: 0.21rem;
            }
          }
        }

        .text-r {
          text-align: right;
        }

        .income {
          img {
            width: 0.48rem;
            height: 0.05rem;
          }

        }
      }
    }
  }
}
</style>
