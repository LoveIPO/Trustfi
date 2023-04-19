<template>
  <div class="investCar">
    <p class="title">{{ $t('invest.lang15') }}</p>
    <div class="list flex-wrap">
      <div class="li " :class="{ act: typeId == i.id }" v-for="(i, index) in list" :key="index" @click="select(i, index)">
        {{ filet(i.name) }}</div>
    </div>
    <p class="title">{{ $t('invest.lang16') }}</p>
    <div class="field border-b">
      <van-field type="number" v-model="number" :placeholder="$t('invest.lang17')" clearable clear-icon="close" />
    </div>
    <div class="box flex-wrap jb">
      <p>{{ $t('invest.lang18') }}：<span>{{ $toFixedsNum(balance, 8) }}</span>{{ typeId == 2 ? 'ETH' : 'USDT' }} </p>
      <p>{{ $formdata(this.$store.state.account) }}</p>
    </div>
    <div class="box2 flex-wrap jb">
      <p>{{ $t('invest.lang11') }}：{{ invest_days }}{{ $t('invest.lang12') }}</p>
      <p>{{ $t('tab.lang4') }}：{{ invest_ratio * 100 }}%</p>
    </div>
    <van-button type="primary" color="linear-gradient(149deg, #00FF01 0%, #90FF9F 100%)" @click="invest()">{{
      $t('invest.lang19') }}</van-button>
  </div>
</template>

<script>
import Home from "../http/index.js";
import { Dialog, Toast } from 'vant';
import { getBanance, sendTransaction, sendTran, getEthBalance, getBalacne } from "../DApp/bsc";
import { getTrxBalacne, transactionContract } from "../DApp/trx"
import getnet from '../assets/script/getnet'
export default {
  name: 'investCar',
  props: {
    msg: String,
    pid: {
      type: String,
      default: 0,
    },
    typeId: {
      type: String,
      default: 0,
    },
    type: {
      type: String,
      default: 0,
    },
    invest_days: String,
    invest_ratio: String,
    address: String,
    extract_fee_ratio: Number,
    list: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      number: '',
      balance: '0',
    }
  },
  async mounted() {
    this.getbalance()
  },
  methods: {
    filet(str) {
      if (str.indexOf("20") != -1) {
        return 'USDT'
      } else {
        return str
      }
    },
    async getbalance(type = 1) {
      let getChain = this.$store.getters.getChain
      if (getChain == 'bsc') {
        let result = await getBanance('bsc', this.$store.state.account)
        this.balance = result
      } else if (getChain == 'eth') {
        if (type == 2) {
          let result = await getBalacne(this.$store.state.account)
          this.balance = result
        } else {
          let result = await getBanance('eth', this.$store.state.account)
          this.balance = result
        }

      } else if (getChain == 'trx') {
        let result = await getTrxBalacne(this.$store.state.account)
        this.balance = result
      }
    },
    async invest() {
      if (!this.pid) {
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
      if (!this.number && this.number <= 0) {
        Toast({
          message: this.$t('pulb.lang9'),
          position: 'bottom',
        });
        return
      }
      if (Number(this.balance) < this.number) {
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
        sendTransaction('bsc', this.address, this.number, (transactionHash) => {
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
        sendTransaction('eth', this.address, this.number, (transactionHash) => {
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
        
        let result = await transactionContract(this.address, this.number)
        if (result) {
          this.operate(result)
        }
      }
    },
    operate(hash) {
      let parme = {
        coin_id: this.typeId,
        amount: this.number,
        hash: hash,
      }
      Home.operate(parme).then((res) => {
        
        Dialog.alert({
          message: res.msg,
        }).then(() => {
          if (res.code == 200) {
            this.number = ''
            this.$emit("reloads")
          }
        })

      });
    },
    async select(val, index) {
      this.$emit('chacnge', val.id)
      this.getba
    },
  }
}
</script>

<style scoped>
.investCar .field .van-cell {
  padding: 0.13rem 0;
  font-size: 0.16rem;
  background: transparent;
}

.investCar .van-button {
  width: 100%;
  margin-top: 0.45rem;
  color: #13172A !important;
  height: 0.48rem;
  font-size: 0.16rem;
}
</style>
<style scoped lang="scss">
.investCar {
  width: 100%;
  background: #13172A;
  box-sizing: border-box;
  padding: 0.17rem 0;
  border-radius: 0.1rem;

  .title {
    font-size: 0.14rem;
    font-weight: bold;
  }

  .list {
    margin: 0.13rem 0;

    .li {
      min-width: 0.82rem;
      height: 0.36rem;
      text-align: center;
      line-height: 0.36rem;
      background-image: url(../assets/img/invest/carbg.png);
      margin-right: 0.07rem;
      padding: 0 0.05rem;
      border-radius: 0.05rem;
      font-size: 0.14rem;
    }

    .act {
      color: #3D3D3D;
      background: linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);
    }

  }

  .field {
    margin-top: 0.05rem;
  }

  .box {
    font-size: 0.12rem;
    margin-top: 0.16rem;

    span {
      color: #F0A53F;
    }
  }

  .box2 {
    font-size: 0.12rem;
    margin-top: 0.11rem;
    color: #A0A2AA;
  }

}
</style>
