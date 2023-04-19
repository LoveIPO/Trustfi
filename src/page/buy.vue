<template>
  <div class="buy">
    <vHead :title="$t('wallet.lang5')" :back="back"></vHead>
    <van-tabs v-model:active="active" :before-change="beforeChange">
      <van-tab title="BSC" name="0">
      </van-tab>
      <van-tab title="ETH" name="1">
      </van-tab>
      <van-tab title="Tron" name="2">
      </van-tab>

    </van-tabs>
    <div class="box">
      <div class="select">
        <div class="flex-wrap jb  a-items a">
          <div class="flex-wrap a-items" @click="select(1)" v-if="select1.coin_name">
            <p class="flex-wrap"><img :src="select1.coin_ico" alt="" style="width: 0.24rem;height: 0.24rem;">
            </p>
            <p class="type">{{ select1.coin_name }}</p>
            <p class="flex-wrap" style="margin-left:0.05rem ;"><img src="../assets/img/wallet/jt.png" alt=""
                style="width: 0.08rem;height: 0.04rem;">
            </p>
          </div>
          <div class="flex-wrap a-items" @click="select(1)" v-else>
            <p class="flex-wrap"><img src="../assets/img/wallet/empty.png" alt="" style="width: 0.24rem;height: 0.24rem;">
            </p>
            <p class="type">{{ $t('wallet.lang10') }}</p>
            <p class="flex-wrap" style="margin-left:0.05rem ;"><img src="../assets/img/wallet/jt.png" alt=""
                style="width: 0.08rem;height: 0.04rem;">
            </p>
          </div>

          <p class="balance">{{ $t('wallet.lang11') }}: {{ banance }}</p>
        </div>
        <div class="field ">
          <van-field type="number" v-model="number" :placeholder="$t('wallet.lang12')" :readonly="arr.length > 1" />
        </div>

        <p class="flex-wrap jc icon3"><img src="../assets/img/wallet/icon3.png" alt=""></p>

        <div class="flex-wrap jb  a-items a">
          <div class="flex-wrap a-items" @click="select(2)" v-if="select2.coin_name">
            <p class="flex-wrap"><img :src="select2.coin_ico" alt="" style="width: 0.24rem;height: 0.24rem;">
            </p>
            <p class="type">{{ select2.coin_name }}</p>
            <p class="flex-wrap" style="margin-left:0.05rem ;"><img src="../assets/img/wallet/jt.png" alt=""
                style="width: 0.08rem;height: 0.04rem;">
            </p>
          </div>
          <div class="flex-wrap a-items" v-else @click="select(2)">
            <p class="flex-wrap"><img src="../assets/img/wallet/empty.png" alt="" style="width: 0.24rem;height: 0.24rem;">
            </p>
            <p class="type">{{ $t('wallet.lang10') }}</p>
            <p class="flex-wrap" style="margin-left:0.05rem ;"><img src="../assets/img/wallet/jt.png" alt=""
                style="width: 0.08rem;height: 0.04rem;">
            </p>
          </div>
        </div>
        <div class="field ">
          <van-field type="number" v-model="num" :placeholder="$t('wallet.lang12')" readonly />
        </div>
        <div class="flex-wrap price a-items" v-if="data">
          <p>{{ $t('wallet.lang13') }}：<span>{{ data }}</span></p>
          <p class="flex-wrap" @click="coin_usdt"><img src="../assets/img/wallet/icon2.png" alt=""
              style="width: 0.24rem;height: 0.24rem;">
          </p>
        </div>
        <div class="btn" @click="creditbuy">
          {{ $t('wallet.lang14') }}
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
        <div class="item" v-for="(i, index) in list" :key="index" @click="link(i.id)">
          <div class="title flex-wrap jb a-items">
            <div class="name flex-wrap a-items">
              <p>{{ i.created_at }}</p>
            </div>
            <div class="state flex-wrap a-items">
              <p style="color: #FFA200;" v-if="(i.buy_state == 0 || i.buy_state == 1) && i.is_sell == 2">
                {{ $t('pulb.lang15') }}</p>
              <p style="color: #2EBD87;" v-if="i.buy_state == 2 && i.is_sell == 2">{{ $t('pulb.lang16') }}</p>
              <p style="color: #FFA200;" v-if="(i.sell_state == 0 || i.sell_state == 1) && i.is_sell == 1">
                {{ $t('pulb.lang17') }}</p>
              <p style="color: #2EBD87;" v-if="i.sell_state == 2 && i.is_sell == 1">{{ $t('pulb.lang18') }}</p>
              <p class="right-icon flex-wrap"><img src="../assets/img/invest/rightback.png" alt=""></p>
            </div>
          </div>
          <div class="content flex-wrap  jb">
            <div class="num">
              <div class="flex-wrap a-items">
                <p class="icon flex-wrap a-items"><img :src="i.main_coin_ico" alt=""></p>
                <p class="key">{{ i.main_coin_name }}</p>
              </div>
              <p class="val">{{ i.buy_main_num }}</p>
            </div>
            <div class="income flex-wrap a-items">
              <img src="../assets/img/wallet/line1.png" alt="">
            </div>
            <div class="num text-r">
              <div class="flex-wrap a-items">
                <p class="icon flex-wrap a-items"><img :src="i.credit_coin_ico" alt=""></p>
                <p class="key">{{ i.credit_coin_name }}</p>
              </div>
              <p class="val">{{ i.buy_credit_num > 0 ? i.buy_credit_num : "-" }}</p>
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
import { Dialog, Toast } from 'vant';
import { cheng, jia } from '../assets/script/decimal'
export default {
  name: "App",
  components: {
    vHead,
    Qrcode
  },
  data() {
    return {
      nav: 1,
      active: 0,
      number: "",
      list: [],
      select1: '',
      select2: '',
      data: "",
      price: "",
      arr: [],
    }
  },
  computed: {
    num() {
      return cheng(this.number, this.price)
    },
    banance() {
      let num = 0
      for (let i = 0; i < this.arr.length; i++) {
        num = jia(this.arr[i].surplus_number, num)
      }
      return num
    }
  },
  mounted() {
    if (this.$store.getters.getSelect1) {
      this.arr = JSON.parse(this.$store.getters.getSelect1)
      if (this.arr.length > 0) {
        this.select1 = this.arr[0]
        if (this.arr.length > 1) {
          this.number = this.banance
        }
      }
    }
    if (this.$store.getters.getSelect) {
      this.select2 = JSON.parse(this.$store.getters.getSelect)
    }
    if (this.$store.getters.getSelect1 && this.$store.getters.getSelect) {
      this.coin_usdt()
    }
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
    this.creditlist()
  },
  methods: {
    creditlist() {
      let parem = {
        type: 2,
      }
      Home.creditlist(parem).then((res) => {
        this.list = res.data
      });
    },
    creditbuy() {
      let idarr = []
      this.arr.forEach((item) => {
        idarr.push(item.id)
      })
      let ids = idarr.join(",")
      let parem = {
        loan_id: ids,
        credit_id: this.select2.id,
        amount: this.number,
      }
      Home.creditbuy(parem).then((res) => {
        Toast({
          message: res.msg,
          position: 'bottom',
        });
        if (res.code == 200) {
          this.creditlist()
          this.$store.commit('setSelect1', '')
          this.$store.commit('setSelect', '')
          this.select1 = ''
          this.select2 = ''
          this.arr = []
          this.number = ''
        }
      });
    },
    navtab(type) {
      if (this.nav != type) {
        this.nav = type
      }
    },
    coin_usdt() {
      let parem = {
        main_id: this.select1.coin_type,
        credit_id: this.select2.id,
      }
      Home.coin_usdt(parem).then((res) => {
        this.data = res.data.data
        this.price = res.data.price
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
      this.$router.push('/buyLog')
    },
    select(type) {
      this.$router.push({
        path: '/select',
        query: {
          type: type
        }
      })
    },
    
    beforeChange() {
      Toast({
        message: this.$t('pulb.lang5'),
        position: 'bottom',
      });
      return false
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

      .btn {
        margin: 0.19rem auto 0;
        background: linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);
        text-align: center;
        font-size: 0.14rem;
        line-height: 0.44rem;
        border-radius: 0.05rem;
        color: rgba(19, 23, 42, 1);
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
