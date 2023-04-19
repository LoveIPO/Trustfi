<template>
  <div class="bDetail">
    <vHead :title="$t('invest.lang34')" :back="back"></vHead>
    <div class="car-1">
      <p class="flex-wrap icon jc"><img :src="coin_ico" alt=""></p>
      <p class="name">{{ coin_name }}</p>
      <p class="num">{{ number }}</p>
      <p class="num_text">{{ $t('invest.lang35') }}</p>
      <div class="car_box border-t">
        <div class="flex-wrap jb cell">
          <p class="color">{{ $t('index.lang8') }}</p>
          <div class="flex-wrap a-items" style="max-width: 50%;">
            <p>{{ order_id }}</p><img src="../assets/img/wallet/copy.png" alt=""
              v-if="order_id" @click="copy(order_id)" style="width: 0.16rem;height: 0.16rem;margin-left: 0.13rem;">
          </div>
        </div>
        <div class="flex-wrap jb cell">
          <p class="color">{{ $t('pulb.lang10') }}</p>
          <p style="color: #2EBD87;" v-if="state == 0">{{ $t('pulb.lang11') }}</p>
          <p style="color: #2EBD87;" v-if="state == 1">{{ $t('pulb.lang23') }}</p>
          <p style="color: #FFA200;" v-if="state == 2">{{ $t('pulb.lang24') }}</p>
          <p v-if="state == 3">{{ $t('pulb.lang14') }}</p>
          <p style="color: #F5222D;" v-if="state == 4">{{ $t('pulb.lang25') }}</p>
        </div>
        <div class="flex-wrap jb cell">
          <p class="color">{{ $t('invest.lang36') }}</p>
          <p>{{ principal }}</p>
        </div>
        <div class="flex-wrap jb cell">
          <p class="color">{{ $t('invest.lang37') }}</p>
          <p>{{ created_at }}</p>
        </div>
        <div class="flex-wrap jb cell">
          <p class="color">{{ $t('invest.lang38') }}</p>
          <p>{{ borrowed_days }}{{ $t('invest.lang12') }}/{{ days }}{{ $t('invest.lang12') }}</p>
        </div>
        <div class="flex-wrap jb cell">
          <p class="color">{{ $t('invest.lang39') }}</p>
          <p>{{ daily_interest }}</p>
        </div>
        <div class="flex-wrap jb cell">
          <p class="color">{{ $t('invest.lang40') }}</p>
          <p>{{ interest }}</p>
        </div>
        <div class="flex-wrap jb cell">
          <p class="color">{{ $t('invest.lang41') }}</p>
          <p>{{ expire_time }}</p>
        </div>
      </div>
    </div>
    <div class="log" :class="{ 'mb': state == 0 && in_state == 1 }">
      <p class="title">{{ $t('invest.lang42') }}</p>
      <ul>
        <van-list v-model:loading="loading" :finished="finished" :immediate-check="false"
          :finished-text="$t('pulb.lang4')" @load="onLoad" v-if="list.length > 0">
          <li class="border-b" v-for="(i, index) in list" :key="index">
            <div class="msg flex-wrap jb">
              <p>{{ i.msg }}</p>
              <p style="color: #F5222D;">-{{ i.number }}</p>
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
    <div class="btngtounp flex-wrap jb" v-if="state == 0 && in_state == 1">
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
  name: "App",
  components: {
    vHead
  },
  data() {
    return {
      borrowed_days: '',
      coin_ico: '',
      coin_name: '',
      coin_type: '',
      created_at: '',
      daily_interest: '',
      days: '',
      expire_time: '',
      interest: '',
      interest_rate: '',
      number: '',
      principal: '',
      state: '',
      list: [],
      loading: false,
      finished: false,
      total: 0,
      page: 1,
      in_state: "",
      order_id:''
    }
  },
  mounted() {
    this.getdata()
    this.interest_log()
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
          Home.loan_recall(parme).then((res) => {
            
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
    interest_log() {
      let parme = {
        page: this.page,
        id: this.$route.query.id
      }
      Home.interest_log(parme).then((res) => {
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
      Home.interest_log(parme).then((res) => {
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
    getdata() {
      let parme = {
        id: this.$route.query.id
      }
      Home.loandetail(parme).then((res) => {
        
        this.borrowed_days = res.data.borrowed_days
        this.coin_ico = res.data.coin_ico
        this.coin_name = res.data.coin_name
        this.coin_type = res.data.coin_type
        this.created_at = res.data.created_at
        this.daily_interest = res.data.daily_interest
        this.days = res.data.days
        this.expire_time = res.data.expire_time
        this.interest = res.data.interest
        this.interest_rate = res.data.interest_rate
        this.number = res.data.number
        this.principal = res.data.principal
        this.state = res.data.state
        this.in_state = res.data.in_state
        this.order_id = res.data.order_id
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
  },
};
</script>
<style scoped>
.bDetail .field .van-cell {
  padding: 0.13rem 0;
  font-size: 0.16rem;
}

.bDetail .btn .van-button {
  border-radius: 0.1rem;
  color: #333 !important;
  height: 0.44rem;
}
</style>
<style lang="scss">


.bDetail {
  min-height: 100%;
  background: #13172A;

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
    margin: 0.45rem 0.13rem 0.1rem;
    border-radius: 0.1rem;
    padding: 0rem 0.18rem 0.03rem;
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
      border-radius: 0.1rem;
      padding: 0.15rem 0 0;

      .cell {
        font-size: 0.14rem;
        margin-bottom: 0.15rem;

        .color {}
      }

      .switch {
        padding-top: 0.21rem;
        font-size: 0.14rem;
      }
    }
  }



  .log {
    margin: 0 0.13rem;
    padding: 0 0.14rem;
    border-radius: 0.1rem;
    .title {
      font-size: 0.16rem;
      font-weight: bold;
      padding: 0.16rem 0 0;
    }

    ul {
      li {
        padding: 0.18rem 0;

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

  .mb {
    padding-bottom: 0.98rem;
  }
}
</style>
