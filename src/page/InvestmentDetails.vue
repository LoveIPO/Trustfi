<template>
  <div class="InvestmentDetails">
    <vHead :title="$t('invest.lang28')" :back="back"></vHead>
    <div class="car-1">
      <p class="flex-wrap icon jc"><img :src="coin_ico" alt=""></p>
      <p class="name">{{ coin_name }}</p>
      <p class="num">{{ number }}</p>
      <p class="num_text">{{ $t('invest.lang16') }}</p>
      <div class="car_box ">
        <div class="flex-wrap jb cell">
          <p class="color">{{ $t('pulb.lang10') }}</p>
          <p style="color: #2EBD87;" v-if="state == 0">{{ $t('pulb.lang11') }}</p>
          <p style="color: #2EBD87;" v-if="state == 1">{{ $t('pulb.lang12') }}</p>
          <p style="color: #FFA200;" v-if="state == 2">{{ $t('pulb.lang13') }}</p>
          <p v-if="state == 3">{{ $t('pulb.lang14') }}</p>
        </div>
        <div class="flex-wrap jb cell">
          <p class="color">{{ $t('invest.lang29') }}</p>
          <p>{{ created_at }}</p>
        </div>
        <div class="flex-wrap jb cell">
          <p class="color">{{ $t('invest.lang30') }}</p>
          <p>{{ earned_days }}{{ $t('invest.lang12') }}/{{ days }}{{ $t('invest.lang12') }}</p>
        </div>
        <div class="flex-wrap jb cell">
          <p class="color">{{ $t('invest.lang24') }}</p>
          <p>{{ daily_profit }}</p>
        </div>
        <div class="flex-wrap jb cell">
          <p class="color">{{ $t('invest.lang25') }}</p>
          <p>{{ profit }}</p>
        </div>
        <div class="flex-wrap jb cell">
          <p class="color">{{ $t('tab.lang8') }}</p>
          <p>{{ surplus }}</p>
        </div>
        <div class="flex-wrap jb cell">
          <p class="color">{{ $t('invest.lang31') }}</p>
          <p>{{ expire_time }}</p>
        </div>

        <div class="switch flex-wrap jb  a-items">
          <p>{{ $t('invest.lang32') }}</p>
          <p class="flex-wrap a-items">
            <van-switch :model-value="checked" @update:model-value="revote_state" size="0.2rem"
              active-color="rgba(0,0,0,0)" inactive-color="rgba(0,0,0,0)" />
          </p>
        </div>
      </div>
    </div>
    <div class="log" :class="{'mb':(state==2&&days==7||state==1)}">
      <p class="title">{{ $t('invest.lang33') }}</p>
      <ul>
        <van-list v-model:loading="loading" :finished="finished" :immediate-check="false"
          :finished-text="$t('pulb.lang4')" @load="onLoad" v-if="list.length > 0">
          <li class="border" v-for="(i, index) in list" :key="index">
            <div class="msg flex-wrap jb">
              <p>{{ i.msg }}</p>
              <p style="color: #FFA200;">+{{ i.number }}</p>
            </div>
            <p class="time">{{ i.created_at }}</p>
          </li>
        </van-list>
        <div v-if="list.length == 0" class="flex-wrap flex-ver jc" style="height:100% ;">
          <van-empty :image="require('../assets/img/empty.png')" :image-size="['1.05rem', '0.79rem']"
            :description="$t('pulb.lang1')" />
        </div>
      </ul>
    </div>
    <div class="btngtounp flex-wrap jb" v-if="state==2&&days==7">
      <div class="btn"><van-button block color="linear-gradient(149deg, #00FF01 0%, #90FF9F 100%)"
          @click="confirm">{{ $t('tab.lang9') }}</van-button></div>
    </div>
    <div class="btngtounp flex-wrap jb" v-if="state==1&&pid==0">
      <div class="btn"><van-button block color="linear-gradient(149deg, #00FF01 0%, #90FF9F 100%)"
          @click="chehui">{{$t('tab.lang10')}}</van-button></div>
    </div>
  </div>
</template>

<script>
import Home from "../http/index.js";
import vHead from "../components/vHead.vue";
import { Dialog, Toast } from 'vant';
export default {
  name: "InvestmentDetails",
  components: {
    vHead
  },
  data() {
    return {
      coin_ico: '',
      coin_name: '0',
      number: '',
      state: '00',
      created_at: '',
      earned_days: '',
      days: '',
      daily_profit: '',
      profit: '',
      expire_time: '',
      checked: false,
      list: [],
      loading: false,
      finished: false,
      total: 0,
      surplus: "",
      pid: "",
      page: 1
    }
  },
  mounted() {
    this.getdata()
    this.investprofit_log()
  },
  methods: {
   
    chehui() {
      Dialog.confirm({
        title: '',
        message: this.$t('tab.lang11'),
      })
        .then(() => {
          let parme = {
            id: this.$route.query.id
          }
          Home.invest_recall(parme).then((res) => {
            
            Toast({
              message: res.msg,
              position: 'bottom',
            });
            if (res.code == 200) {
              setTimeout(() => {
                this.getdata()
               },2000)
            }
          });
        })
        .catch(() => {
        });
    },
    confirm() {
      Dialog.confirm({
        title: '',
        message: this.$t('tab.lang12'),
      })
        .then(() => {
          let parme = {
            id: this.$route.query.id
          }
          Home.profit_extract(parme).then((res) => {
            
            Toast({
              message: res.msg,
              position: 'bottom',
            });
            if (res.code == 200) {
              setTimeout(() => {
                this.getdata()
               },2000)
            }
          });
        })
        .catch(() => {
        });
    },
    back() {
      this.$router.go(-1)
    },
    getdata() {
      let parme = {
        id: this.$route.query.id
      }
      Home.investdetail(parme).then((res) => {
        if (res.code == 200) {
          this.coin_ico = res.data.coin_ico
          this.coin_name = res.data.coin_name
          this.number = res.data.number
          this.state = res.data.state
          this.created_at = res.data.created_at
          this.earned_days = res.data.earned_days
          this.days = res.data.days
          this.daily_profit = res.data.daily_profit
          this.profit = res.data.profit
          this.expire_time = res.data.expire_time
          this.surplus = res.data.surplus
          this.pid = res.data.pid
          if (res.data.is_revote == 1) {
            this.checked = true
          } else {
            this.checked = false
          }
        }
      });
    },
    revote_state(newValue) {
      let parme = {
        id: this.$route.query.id
      }
      Home.revote_state(parme).then((res) => {
        Toast({
          message: res.msg,
          position: 'bottom',
        });
        if (res.code == 200) {
          this.checked = newValue
        }
      });
    },
    investprofit_log() {
      let parme = {
        page: this.page,
        id: this.$route.query.id
      }
      Home.investprofit_log(parme).then((res) => {
        this.total = res.data.total
        this.list = res.data.data
      });
    },
    onLoad() {
      this.page++
      let parme = {
        page: this.page,
        id: this.$route.query.id
      }
      Home.investprofit_log(parme).then((res) => {
        if (res.code == 200) {
          for (let i = 0; i < res.data.data.length; i++) {
            this.list.push(res.data.data[i]);
          }
          this.total = res.data.total
        }
      });

      this.loading = false;

      if (this.list.length >= this.total) {
        this.finished = true;
      }
    },
  },
};
</script>
<style>
.InvestmentDetails .field .van-cell {
  padding: 0.13rem 0;
  font-size: 0.16rem;
}

.InvestmentDetails .btn .van-button {
  border-radius: 0.1rem;
  color: #13172A !important;
  height: 0.48rem;
  font-size: 0.14rem;
}

.InvestmentDetails .out .van-button {
  color: #fff !important;
}

.InvestmentDetails .van-switch {
  border: 1px solid #FFF;
}

.InvestmentDetails .van-switch__node {
  background: #FFF;
}

.InvestmentDetails .van-switch--on {
  border: 1px solid #22E988;
}

.InvestmentDetails .van-switch--on .van-switch__node {
  background: linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);
}
</style>
<style lang="scss">


.InvestmentDetails {
  min-height: 100%;
  background: #13172A;
  position: relative;

  .btngtounp {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 0.15rem 0.16rem;
    background: #1A1F37;
    box-sizing: border-box;

    >div {
      height: 0.48rem;
      line-height: 0.48rem;
      width: 100%;
      text-align: center;
      border-radius: 0.1rem;
    }

    .out {
      border: 1px solid #22E988;
    }
  }

  .car-1 {
    background: #1A1F37;
    margin: 0.45rem 0.16rem 0.1rem;
    border-radius: 0.1rem;
    padding: 0rem 0.18rem 0.19rem;
    border: 1px solid rgba(45, 208, 143, 0.4);

    .icon {
      img {
        width: 0.36rem;
        height: 0.36rem;
        position: relative;
        top: -0.16rem;

      }
    }

    .name {
      text-align: center;
      color: #A0A2AA;
      font-size: 0.12rem;
    }

    .num {
      font-size: 0.26rem;
      text-align: center;
      font-weight: bold
    }

    .num_text {
      text-align: center;
      font-size: 0.12rem;
      color: #A3A5AF;
    }

    .car_box {
      margin-top: 0.21rem;
      padding: 0.15rem 0 0;
      border-top: 1px solid rgba(45, 208, 143, 0.4);

      .cell {
        font-size: 0.14rem;
        margin-bottom: 0.15rem;

        .color {}
      }

      .switch {
        border-top: 1px solid rgba(45, 208, 143, 0.4);
        padding-top: 0.21rem;
        font-size: 0.14rem;
      }
    }
  }


 
  .log {
    margin: 0 0.16rem;
    padding: 0;
    border-radius: 0.1rem;

    .title {
      font-size: 0.16rem;
      font-weight: bold;
      padding: 0.16rem 0 0.1rem;
    }

    ul {

      li {
        padding: 0.18rem 0;
        border-bottom: 1px solid rgba(45, 208, 143, 0.4);

        .msg {
          font-size: 0.14rem;
        }

        .time {
          color: #A0A2AA;
          font-size: 0.12rem;
          margin-top: 0.1rem;
        }
      }
    }
  }
  .mb{
    padding-bottom:  0.98rem;
  }
}
</style>
