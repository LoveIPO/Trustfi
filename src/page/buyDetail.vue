<template>
  <div class="buyDetail">
    <vHead :title="$t('wallet.lang16')" :back="back"></vHead>

    <div class="box">
      <div class="car">
        <div class="state flex-wrap">
          <p class="icon" v-if="(buy_state == 2 && is_sell == 2) || (sell_state == 2 && is_sell == 1)"><img
              src="../assets/img/wallet/state2.png" alt=""></p>
          <p class="icon"
            v-if="((buy_state == 0 || buy_state == 1) && is_sell == 2) || ((sell_state == 0 || sell_state == 1) && is_sell == 1)">
            <img src="../assets/img/wallet/state1.png" alt="">
          </p>
          <div class="">
            <p class="name" v-if="buy_state == 2 && is_sell == 2">{{$t('wallet.lang17')}}</p>
            <p class="name" v-if="sell_state == 2 && is_sell == 1">{{$t('wallet.lang18')}}</p>
            <p class="name cor" v-if="(buy_state == 0 || buy_state == 1) && is_sell == 2">{{$t('wallet.lang19')}}</p>
            <p class="name cor" v-if="(sell_state == 0 || sell_state == 1) && is_sell == 1">{{$t('wallet.lang20')}}</p>
            <p class="order">{{$t('wallet.lang21')}}：{{ order_id }}</p>
          </div>
        </div>
      </div>

      <div class="car mt-1">
        <p class="title">{{$t('wallet.lang22')}}</p>
        <div class="flex-wrap jb cell">
          <p class="color">{{$t('wallet.lang23')}} </p>
          <p>{{ main_coin_name }}->{{ credit_coin_name }}</p>
        </div>
        <div class="flex-wrap jb cell">
          <p class="color">{{$t('wallet.lang24')}} </p>
          <p>{{ buy_main_num }} {{ main_coin_name }}</p>
        </div>
        <div class="flex-wrap jb cell">
          <p class="color">{{$t('wallet.lang25')}} </p>
          <p>{{ buy_credit_num > 0 ? buy_credit_num + " " + credit_coin_name : "-" }}</p>
        </div>
        <div class="flex-wrap jb cell">
          <p class="color">{{$t('wallet.lang26')}} </p>
          <p>{{ buy_time ? buy_time : "-" }}</p>
        </div>
        <div class="flex-wrap jb cell a-items">
          <p class="color">{{$t('wallet.lang27')}} </p>
          <div class="flex-wrap a-items" style="max-width: 50%;"><p class="van-ellipsis" style="word-break: break-all;">{{ buy_hash ? buy_hash : "-" }} </p><img src="../assets/img/wallet/copy.png" alt=""
              v-if="buy_hash" @click="copy(buy_hash)"></div>
        </div>
      </div>

      <div class="car mt-1">
        <p class="title">{{$t('wallet.lang28')}}</p>
        <div class="flex-wrap jb cell">
          <p class="color">{{$t('wallet.lang23')}} </p>
          <p>{{ is_sell == 1 ? credit_coin_name + '->' + main_coin_name : '-' }}</p>
        </div>
        <div class="flex-wrap jb cell">
          <p class="color">{{$t('wallet.lang24')}} </p>
          <p>{{ sell_credit_num ? sell_credit_num + ' ' + credit_coin_name : "-" }}</p>
        </div>
        <div class="flex-wrap jb cell">
          <p class="color">{{$t('wallet.lang25')}} </p>
          <p>{{ sell_main_num ? sell_main_num + ' ' + main_coin_name : "-" }}</p>
        </div>
        <div class="flex-wrap jb cell">
          <p class="color">{{$t('wallet.lang29')}} </p>
          <p>{{ sell_time ? sell_time : "-" }}</p>
        </div>
        <div class="flex-wrap jb cell a-items">
          <p class="color">{{$t('wallet.lang27')}} </p>
          <div class="flex-wrap a-items" style="max-width: 50%;"><p class="van-ellipsis" style="word-break: break-all;">{{ sell_hash ? sell_hash : "-" }}</p><img src="../assets/img/wallet/copy.png" alt=""
              v-if="sell_hash" @click="copy(sell_hash)"></div>
        </div>
      </div>
    </div>

    <div class="btn" v-if="buy_state == 2 && is_sell == 2" @click="chushou">{{$t('wallet.lang30')}}</div>

  </div>
</template>

<script>
import Home from "../http/index.js";
import vHead from "../components/vHead.vue";
import { Dialog, Toast } from 'vant';
export default {
  name: "App",
  components: {
    vHead
  },
  data() {
    return {
      number: "",
      is_buy: "",
      main_coin_name: "",
      credit_coin_name: "",
      buy_main_num: "",
      buy_credit_num: "",
      buy_time: "",
      buy_hash: "",
      buy_state: "",
      is_sell: "",
      sell_main_num: "",
      sell_credit_num: "",
      sell_time: "",
      sell_hash: "",
      sell_state: "",
      order_id: "",
    }
  },
  mounted() {
    this.getdata()
  },
  methods: {
    getdata() {
      let parme = {
        id: this.$route.query.id
      }
      Home.creditdetail(parme).then((res) => {
        this.is_buy = res.data.is_buy
        this.main_coin_name = res.data.main_coin_name
        this.credit_coin_name = res.data.credit_coin_name
        this.buy_main_num = res.data.buy_main_num
        this.buy_credit_num = res.data.buy_credit_num
        this.buy_time = res.data.buy_time
        this.buy_hash = res.data.buy_hash
        this.buy_state = res.data.buy_state
        this.is_sell = res.data.is_sell
        this.sell_main_num = res.data.sell_main_num
        this.sell_credit_num = res.data.sell_credit_num
        this.sell_time = res.data.sell_time
        this.sell_hash = res.data.sell_hash
        this.sell_state = res.data.sell_state
        this.order_id = res.data.order_id
      });
    },
    chushou() {
      let parem = {
        id: this.$route.query.id
      }
      Home.creditsell(parem).then((res) => {
        Toast({
          message: res.msg,
          position: 'bottom',
        });
        if (res.code == 200) {
          this.getdata()
        }
      });

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
    back() {
      this.$router.go('-1')
    },
  },
};
</script>
<style></style>

<style scoped lang="scss">
.buyDetail {
  width: 100%;
  min-height: 100%;
    background: #13172A;

  .btn {
    width: calc(100% - 0.26rem);
    margin: 0.2rem auto;
    background: linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);;
    text-align: center;
    font-size: 0.14rem;
    line-height: 0.48rem;
    border-radius: 0.1rem;
    color: #13172A;
  }

  .box {
    padding: 0.1rem 0.13rem;

    .mt-1 {
      margin-top: 0.1rem;
    }

    .car {
      padding: 0.2rem 0.14rem;
      border-radius: 0.1rem;
      background: #1A1F37;

      .state {
        .icon {
          margin-right: 0.12rem;

          img {
            width: 0.4rem;
            height: 0.4rem;
          }
        }

        .name {
          font-weight: bold;
          font-size: 0.14rem;
          color: #2EBD87;
        }

        .cor {
          color: #FFA200;
        }

        .order {
          font-size: 0.12rem;
          margin-top: 0.05rem;
        }
      }


      .title {
        font-size: 0.14rem;
        font-weight: bold;
        margin-bottom: 0.03rem;
      }

      .cell {
        margin-top: 0.16rem;
        font-size: 0.14rem;

        .color {
          color: #A0A2AA;
        }

        img {
          width: 0.14rem;
          height: 0.14rem;
          margin-left: 0.1rem;
        }
      }

    }
  }
}
</style>
