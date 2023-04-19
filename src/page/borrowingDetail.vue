<template>
  <div class="borrowingDetail">
    <vHead :title="$t('borrowing.lang6')" :back="back"></vHead>
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
    <div class="box">
      <div class="car1">
        <p class="title">{{ $t('invest.lang15') }}</p>
        <div class="list flex-wrap">
          <div class="li " :class="{ act: num1 == i }" v-for="(i, index) in coin" :key="index"
            @click="selectcoin(i, index)">{{ i }}</div>
        </div>
        <p class="title">{{ $t('borrowing.lang7') }}</p>
        <div class="field border-b">
          <van-field type="number" v-model="number" :placeholder="$t('borrowing.lang8')" clearable clear-icon="close" />
        </div>
        <div class="keji flex-wrap jb">
          <p v-if="num1 == 'USDT'">{{ $t('borrowing.lang9') }}：{{ loan_min }}USDT ~ {{ loan_max }}USDT</p>
          <p v-if="num1 == 'ETH'">{{ $t('borrowing.lang9') }}：{{ eth_loan_min }}ETH ~ {{ eth_loan_max }}ETH</p>
        </div>
      </div>
      <div class="car1">
        <p class="title">{{ $t('borrowing.lang10') }}</p>
        <div class="list flex-wrap">
          <div class="li " :class="{ act: num2 == i }" v-for="(i, index) in list" :key="index"
            @click="selectbzj(i, index)">{{ i * 100 }}%</div>
        </div>
        <div class="bond border-t">
          <p>{{ $t('borrowing.lang11') }}：{{ baozhengjin }}</p>
        </div>
        <div class="flex-wrap jb balance">
          <p>{{ $t('invest.lang18') }}：{{ $toFixedsNum(balance, 8) }}{{ num1 }}</p>
          <p>{{ $formdata(this.$store.state.account) }}</p>
        </div>
      </div>
      <div class="car1">
        <p class="title">{{ $t('borrowing.lang12') }}</p>
        <div class="list flex-wrap">
          <div class="li " :class="{ act: num3 == i }" v-for="(i, index) in list1" :key="index"
            @click="selectday(i, index)">{{ i }}{{ $t('invest.lang12') }}</div>
        </div>
        <div class="bond border-t">
          <p>{{ $t('borrowing.lang13') }}：{{ num3==7?(loan_ratio * 100):(one_day_loan_ratio * 100) }}%</p>
        </div>
      </div>
      <div class="car2">
        <p class="title">{{ $t('borrowing.lang14') }}</p>
        <div class="type flex-wrap a-items jc">
          <p class="flex-wrap icon"><img :src="invest_ico" alt=""></p>
          <p>{{ invest_channel }}</p>
        </div>
        <div class=" flex-wrap a-items" style="margin: 0.14rem 0 0.19rem;">
          <p class="gas " style="margin: 0;">{{ $t('borrowing.lang15') }}：{{ fee }} {{ active == 0 ? 'BNB' : active == 1 ?
            'ETH' : 'TRX' }}</p>
          <p class="help flex-wrap a-items" @click='help(2)'><img src="../assets/img/borrowing/help.png" alt=""
              style="width:0.15rem ;height: 0.15rem;margin-left: 0.08rem;"></p>
        </div>
        <div class="switch flex-wrap jb border-t a-items" v-if="num1 === 'USDT'">
          <div class="help_box flex-wrap a-items">
            <p>{{ $t('borrowing.lang16') }}</p>
            <p class="help flex-wrap a-items" @click='help(1)'><img src="../assets/img/borrowing/help.png" alt=""></p>
          </div>
          <div class="number flex-wrap a-items">
            <p class="color">{{ liquidation_fee }}USDT</p>
            <p class="flex-wrap a-items"><van-switch v-model="checked" size="0.2rem" active-color="rgba(0,0,0,0)"
                inactive-color="rgba(0,0,0,0)" /></p>
          </div>
        </div>

      </div>
      <div class="btn">
        <van-button block color="linear-gradient(149deg, #00FF01 0%, #90FF9F 100%)" @click="invest">{{ $t('pulb.lang8')
        }}</van-button>
      </div>
    </div>
    <van-popup v-model:show="show" position="bottom" closeable close-icon="close" round>
      <div class="popup_box">
        <p class="popup_tit">{{ helpstate == 1 ? $t('borrowing.lang16') : $t('tab.lang6') }}</p>
        <p class="popup_con">
          {{ helpstate == 1 ? liquidation_fee_text : $t('tab.lang7') }}
        </p>
        <div class="button">
          <van-button block color="linear-gradient(149deg, #00FF01 0%, #90FF9F 100%)" @click="show = false">{{
            $t('pulb.lang8') }}</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Home from "../http/index.js";
import vHead from "../components/vHead.vue"
import investCar from "../components/investCar.vue"
import { Dialog, Toast } from 'vant';
import { getBanance, getBalacne, sendTransaction } from "../DApp/bsc";
import { transactionContract, getTrxBalacne } from "../DApp/trx";
import { cheng, jia } from '../assets/script/decimal';
export default {
  name: "App",
  components: {
    vHead,
    investCar,
  },
  data() {
    return {
      number: "",
      nav: 1,
      active: this.$store.getters.getChain == 'trx' ? 'c' : this.$store.getters.getChain == 'eth' ? 'b' : 'a',
      indexact: '0',
      coin: [],
      checked: false,
      list: [],
      list1: [],
      show: false,
      loan_max: "-",
      loan_min: "-",
      eth_loan_max: "-",
      eth_loan_min: "-",
      balance: "0",
      loan_ratio: "0",
      num1: "",
      num2: "",
      num3: "",
      invest_ico: "",
      invest_channel: "",
      fee: "0",
      liquidation_fee: "0",
      address: "",
      typeId: "",
      helpstate: 1,
      liquidation_fee_text: "",
      one_day_loan_ratio:"",
      pid:""
    }
  },
  computed: {
    baozhengjin() {
      if (this.number && this.num2) {
        return cheng(this.number, this.num2)
      }
      return 0
    }
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
    this.getpid()
    this.getdata()

  },
  methods: {
    getpid() {
      Home.get_user_info().then((res) => {
        if(res.code==200){
          this.pid = res.data.pid
        }
      });
    },
    selectcoin(i) {
      this.num1 = i
      this.getbalance()
    },
    selectbzj(i) {
      this.num2 = i
    },
    selectday(i) {
      this.num3 = i
    },
    async invest() {
      if(!this.pid){
        Toast({
          message: this.$t('pulb.lang28'),
          position: 'bottom',
        });
        return
      }
      if (!this.$store.getters.getWalletid) {
        Toast({
          message: this.$t('pulb.lang26'),
          position: 'bottom',
        });
        return
      }
      let baozhengjin = this.checked ? jia(this.baozhengjin, this.liquidation_fee) : this.baozhengjin
      if (!this.number && this.number <= 0) {
        Toast({
          message: this.$t('pulb.lang9'),
          position: 'bottom',
        });
        return
      }
      if (Number(this.balance) < baozhengjin) {
        Toast({
          message: this.$t('pulb.lang6'),
          position: 'bottom',
        });
        return
      }
      let getChain = this.$store.getters.getChain
      if (getChain == 'bsc') {
        if (this.number % 100 != 0) {
          Toast({
            message: this.$t('pulb.lang9'),
            position: 'bottom',
          });
          return
        }
        sendTransaction('bsc', this.address, baozhengjin + '', (transactionHash) => {
          Toast.clear();
          this.operate(transactionHash)
        }, (confirmation) => {
        }, (receipt) => {
        }, (error) => {
        })
      } else if (getChain == 'eth' && this.typeId == '21') {
        if (this.number % 100 != 0) {
          Toast({
            message: this.$t('pulb.lang9'),
            position: 'bottom',
          });
          return
        }
        sendTransaction('eth', this.address, baozhengjin, (transactionHash) => {
          this.operate(transactionHash)
        }, (confirmation) => {
        }, (receipt) => {
        }, (error) => {
        })
      } else if (getChain == 'eth' && this.typeId == '2') {
        if (Math.floor(this.number * 10) != this.number * 10) {
          Toast({
            message: this.$t('pulb.lang9'),
            position: 'bottom',
          });
          return
        }
        sendTran(this.address, this.number, (transactionHash) => {
          this.operate(transactionHash)
        }, (confirmation) => {
        }, (receipt) => {
        }, (error) => {
        })

      } else if (getChain == 'trx') {
        if (this.number % 100 != 0) {
          Toast({
            message: this.$t('pulb.lang9'),
            position: 'bottom',
          });
          return
        }
        let result = await transactionContract(this.address, baozhengjin)
        if (result) {
          this.operate(result)
        }
      }
    },
    operate(hash) {
      let parme = {
        coin_id: (this.typeId == 21 && this.num1 == 'ETH') ? 2 : this.typeId,
        amount: this.number,
        loan_margin_ratio: this.num2,
        days: this.num3,
        is_liquidation_fee: this.checked ? '1' : 2,
        hash: hash,
      }
      Home.loanoperate(parme).then((res) => {
        Dialog.alert({
          message: res.msg,
        }).then(() => {
          if (res.code == 200) {
            this.number = ''
          }
        })
        
      });
    },
    async getbalance() {
      let getChain = this.$store.getters.getChain

      if (getChain == 'bsc') {
        if (this.num1 == 'USDT') {
          let result = await getBanance('bsc', this.$store.state.account)
          this.balance = result
        }

      } else if (getChain == 'eth') {
        if (this.num1 == 'USDT') {
          let result = await getBanance('eth', this.$store.state.account)
          this.balance = result
        } else {
          let result = await getBalacne(this.$store.state.account)
          this.balance = result
        }

      } else if (getChain == 'trx') {
        if (this.num1 == 'USDT') {
          let result = await getTrxBalacne(this.$store.state.account)
          this.balance = result
        }
      }
    },
    
    beforeChange() {
      Toast({
        message: this.$t('pulb.lang5'),
        position: 'bottom',
      });
      return false
    },
    navtab(type) {
      if (this.nav != type) {
        this.nav = type
      }
    },
    help(type) {
      this.helpstate = type
      this.show = true
    },
    investment() {
      this.$router.push('/investment')
    },
    log() {
      this.$router.push('/investmentLog')
    },
    getdata() {
      Home.loaninfo().then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.liquidation_fee_text = res.data.liquidation_fee_text
          let getChain = this.$store.getters.getChain
          if (getChain == 'bsc') {
            this.num1 = res.data.list.bsc.coin[0]
            this.num2 = res.data.list.bsc.loan_margin_ratio[0]
            this.num3 = res.data.list.bsc.loan_days[0]
            this.coin = res.data.list.bsc.coin
            this.loan_max = res.data.list.bsc.loan_max
            this.loan_min = res.data.list.bsc.loan_min
            this.list1 = res.data.list.bsc.loan_days
            this.list = res.data.list.bsc.loan_margin_ratio
            this.loan_ratio = res.data.list.bsc.loan_ratio
            this.invest_channel = res.data.list.bsc.invest_channel
            this.invest_ico = res.data.list.bsc.invest_ico
            this.fee = res.data.list.bsc.fee
            this.liquidation_fee = res.data.liquidation_fee
            this.address = res.data.list.bsc.address
            this.one_day_loan_ratio = res.data.list.bsc.one_day_loan_ratio
          } else if (getChain == 'eth') {
            this.num1 = res.data.list.eth.coin[0]
            this.num2 = res.data.list.eth.loan_margin_ratio[0]
            this.num3 = res.data.list.eth.loan_days[0]
            this.coin = res.data.list.eth.coin
            this.loan_max = res.data.list.eth.loan_max
            this.loan_min = res.data.list.eth.loan_min
            this.eth_loan_max = res.data.list.eth.eth_loan_max
            this.eth_loan_min = res.data.list.eth.eth_loan_min
            this.list1 = res.data.list.eth.loan_days
            this.list = res.data.list.eth.loan_margin_ratio
            this.loan_ratio = res.data.list.eth.loan_ratio
            this.invest_channel = res.data.list.eth.invest_channel
            this.invest_ico = res.data.list.eth.invest_ico
            this.fee = res.data.list.eth.fee
            this.address = res.data.list.eth.address
            this.liquidation_fee = res.data.liquidation_fee
            this.one_day_loan_ratio = res.data.list.eth.one_day_loan_ratio
          } else if (getChain == 'trx') {
            this.num1 = res.data.list.tron.coin[0]
            this.num2 = res.data.list.tron.loan_margin_ratio[0]
            this.num3 = res.data.list.tron.loan_days[0]
            this.coin = res.data.list.tron.coin
            this.loan_max = res.data.list.tron.loan_max
            this.loan_min = res.data.list.tron.loan_min
            this.list1 = res.data.list.tron.loan_days
            this.list = res.data.list.tron.loan_margin_ratio
            this.loan_ratio = res.data.list.tron.loan_ratio
            this.invest_channel = res.data.list.tron.invest_channel
            this.invest_ico = res.data.list.tron.invest_ico
            this.fee = res.data.list.tron.fee
            this.address = res.data.list.tron.address
            this.liquidation_fee = res.data.liquidation_fee
            this.one_day_loan_ratio = res.data.list.tron.one_day_loan_ratio
          }
          this.getbalance()
        }

      });
    },
    back() {
      this.$router.go(-1)
    },
  },
};
</script>
<style>
.borrowingDetail .van-tabs__line {
  background: linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);
}

.borrowingDetail .van-tabs__nav {
  background: #13172A;
}

.borrowingDetail .van-tab {
  color: #A0A2AA;
  font-weight: 400;
  font-size: 0.14rem;
  line-height: 0.3rem;
}

.borrowingDetail .van-tab--active {
  color: #FFF;
}

.borrowingDetail .van-button {
  color: #333 !important;
  height: 0.3rem;
  font-size: 0.14rem;
  border-radius: 0.1rem;
  height: 0.44rem;

}

.borrowingDetail .field .van-cell {
  padding: 0.13rem 0;
  font-size: 0.16rem;
  background: transparent;
}
.borrowingDetail .van-popup{
  background: #1A1F37;
}
.borrowingDetail .van-switch{
  border: 1px solid #FFF;
}
.borrowingDetail .van-switch__node{
  background:#FFF ;
}
.borrowingDetail .van-switch--on {
  border: 1px solid #22E988;
}
.borrowingDetail .van-switch--on .van-switch__node{
  background:linear-gradient(149deg, #00FF01 0%, #90FF9F 100%) ;
}
</style>

<style scoped lang="scss">
.borrowingDetail {
  width: 100%;
  min-height: 100%;
  background: #13172A;

  .tabs_box {
    background: #13172A;
    padding: 0.2rem 0;
    border-radius: 0 0 0.2rem 0.2rem;
    border-bottom: 1px solid #22E988;
  }

  .box {
    width: 100%;
    box-sizing: border-box;
    height: 100%;

    .car1 {
      margin-top: 0.1rem;
      border-radius: 0.1rem;
      padding: 0 0.15rem;

      .title {
        font-size: 0.14rem;
        font-weight: bold;
        margin-top: 0.4rem;
      }

      .field {
        margin-top: 0.05rem;
      }

      .keji {
        font-size: 0.12rem;
        margin-top: 0.1rem;
        color: #A0A2AA;
      }

      .list {
        margin: 0.13rem 0;

        .li {
          width: 0.82rem;
          height: 0.36rem;
          text-align: center;
          line-height: 0.36rem;
          margin-right: 0.07rem;
          border-radius: 0.1rem;
          border: 1px solid #22E988;
          color: #90FF9F;
        }

        .act {
          color: #3D3D3D;
          background: linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);
        }

      }

      .bond {
        font-size: 0.12rem;
        padding-top: 0.17rem;
      }

      .balance {
        font-size: 0.12rem;
        color: #A0A2AA;
        margin-top: 0.1rem;
      }
    }

    .car2 {
      margin-top: 0.1rem;
      border-radius: 0.1rem;
      padding: 0.16rem 0.15rem;

      .title {
        font-size: 0.14rem;
        font-weight: bold;
      }

      .type {
        background: #053D31;
        border-radius: 0.1rem;
        font-size: 0.14rem;
        font-weight: bold;
        padding: 0.14rem 0;
        margin: 0.17rem 0 0;

        .icon {
          margin-right: 0.14rem;

          img {
            width: 0.28rem;
            height: 0.28rem;
          }
        }
      }

      .gas {
        font-size: 0.12rem;
        color: #A0A2AA;
        margin: 0.14rem 0 0.19rem;
      }

      .switch {
        padding-top: 0.2rem;
        font-size: 0.14rem;

        .help_box {
          font-weight: bold;

          img {
            margin-left: 0.07rem;
            width: 0.15rem;
            height: 0.15rem;
          }
        }

        .number {
          .color {
            color: #FDD100;
            margin-right: 0.31rem;
          }
        }
      }
    }

    .btn {
      margin: 0.32rem 0 0.24rem;
      padding-bottom: 0.24rem;
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
          color: #9E9E9E;
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


  .btn{
    padding: 0 0.15rem;
  }
  .popup_box {
    padding: 0.23rem 0.13rem;

    .popup_tit {
      font-size: 0.16rem;
      font-weight: bold;
      text-align: center;
    }

    .popup_con {
      margin-top: 0.34rem;
      font-size: 0.14rem;
      font-weight: bold;
      color: #9E9E9E;
      line-height: 0.24rem;
    }

    .button {
      margin-top: 0.29rem;
    }
  }
}
</style>
