<template>
  <div class="investment">
    <vHead :title="$t('invest.lang20')" :back="back"></vHead>
    <div class="car-1">
      <p class="title">{{ $t('invest.lang16') }}</p>
      <div class="field border-b">
        <van-field type="number" v-model="number" :placeholder="$t('invest.lang17')" clearable clear-icon="close" />
      </div>
      <div class="box flex-wrap jb">
        <p>{{ $t('invest.lang18') }}：<span>{{ $toFixedsNum(balance, 8) }}</span> {{ coin_name }}</p>
        <p>{{ $formdata(this.$store.state.account) }}</p>
      </div>
      <div class="box2 flex-wrap jb">
        <p>{{ $t('invest.lang21') }}：{{ min }} ~ {{ max }}</p>
      </div>
    </div>
    <div class="car-2">
      <div class="flex-wrap jb cell">
        <p class="color">{{ $t('invest.lang22') }}</p>
        <p>{{ days }}{{ $t('invest.lang12') }}</p>
      </div>
      <div class="flex-wrap jb cell">
        <p class="color">{{ $t('invest.lang23') }}</p>
        <p>{{ profit_ratio * 100 }}%</p>
      </div>
      <div class="flex-wrap jb cell">
        <p class="color">{{ $t('invest.lang24') }}</p>
        <p>{{ ratio }}{{ coin_name }}</p>
      </div>
      <div class="flex-wrap jb cell">
        <p class="color">{{ $t('invest.lang25') }}</p>
        <p>{{ ratios }}{{ coin_name }}</p>
      </div>
      <div class="switch flex-wrap jb border-t a-items">
        <p>{{ $t('invest.lang26') }}</p>
        <p class="flex-wrap a-items"><van-switch v-model="checked" size="0.2rem" active-color="rgba(0,0,0,0)"
            inactive-color="rgba(0,0,0,0)" /></p>
      </div>
    </div>
    <div class="tilp">
      <p>{{ $t('invest.lang27') }}</p>
    </div>
    <div class="btn">
      <van-button block color="linear-gradient(149deg, #00FF01 0%, #90FF9F 100%)" @click="invest">{{ $t('pulb.lang8') }}</van-button>
    </div>
  </div>
</template>

<script>
import Home from "../http/index.js";
import vHead from "../components/vHead.vue";
import { Dialog, Toast } from 'vant';
import { getBanance, sendTransaction, sendTran ,getETHBalacne} from "../DApp/bsc";
import { getTrxBalacne, transactionContract } from "../DApp/trx"
import { cheng } from '../assets/script/decimal';
export default {
  name: "App",
  components: {
    vHead
  },
  data() {
    return {
      number: '',
      days: '',
      profit_ratio: '',
      min: '',
      max: '',
      number: '',
      balance: 0,
      coin_name: '',
      checked: false,
      typeId: "",
      address: "",
      pid:""
    }
  },
  computed: {
    ratio() {
      if (this.number) {
        return cheng(this.number, this.profit_ratio)
      }
      return 0
    },
    ratios() {
      if (this.number) {
        return cheng(cheng(this.number, this.profit_ratio), this.days)
      }
      return 0
    },
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
    back() {
      this.$router.go(-1)
    },
    getdata() {
      let parme = {
        id: this.$route.query.id,
      }
      Home.fast_detail(parme).then((res) => {
        
        if (res.code == 200) {
          this.address = res.data.address
          this.days = res.data.days
          this.profit_ratio = res.data.profit_ratio
          this.max = res.data.max
          this.min = res.data.min
          this.coin_name = res.data.coin_name
          this.typeId = res.data.coin_type
          this.getbalance()
        }
      });
    },
    async getbalance() {
      let getChain = this.$store.getters.getChain
      if (getChain == 'bsc') {
        let result = await getBanance('bsc', this.$store.state.account)
        this.balance = result
      } else if (getChain == 'eth') {
        if(this.coin_name=='ETH'){
          let result = await getETHBalacne(this.$store.state.account)
           this.balance = result
        }else{
          let result = await getBanance('eth', this.$store.state.account)
           this.balance = result
        }
        
      } else if (getChain == 'trx') {
        let result = await getTrxBalacne(this.$store.state.account)
        this.balance = result
      }
    },
    fast_operate(hash) {
      let parme = {
        fast_id: this.$route.query.id,
        amount: this.number,
        hash: hash,
        is_revote: this.checked ? 1 : 2
      }
      Home.fast_operate(parme).then((res) => {
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
      if (Number(this.balance) < this.number) {
        Toast({
          message: this.$t('pulb.lang6'),
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
      if (this.number < this.min || this.number > this.max) {
        Toast({
          message: this.$t('pulb.lang9'),
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
          this.fast_operate(transactionHash)
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
          this.fast_operate(transactionHash)
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
          this.fast_operate(transactionHash)
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
          this.fast_operate(result)
        }
      }
    },
  },
};
</script>
<style >
.investment .field .van-cell {
  padding: 0.13rem 0;
  font-size: 0.16rem;
  background: transparent;
}
.investment .van-switch{
  border: 1px solid #FFF;
}
.investment .van-switch__node{
  background:#FFF ;
}
.investment .van-switch--on {
  border: 1px solid #22E988;
}
.investment .van-switch--on .van-switch__node{
  background:linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);
}
.investment .btn .van-button {
  border-radius: 0.05rem;
  color: #333 !important;
  height: 0.44rem;
}
</style>
<style lang="scss">


.investment {
  width: 100%;
  min-height: 100%;
  background: #13172A;
  .car-1 {
    margin: 0.1rem 0;
    border-radius: 0.1rem;
    padding: 0.15rem 0.18rem;

    .title {
      font-size: 0.16rem;
      font-weight: bold;
    }

    .field {
      margin-top: 0.05rem;
      background: #13172A;
    }

    .box {
      font-size: 0.14rem;
      margin-top: 0.16rem;

      span {
        color: #F0A53F;
      }
    }

    .box2 {
      font-size: 0.14rem;
      margin-top: 0.11rem;
      color: #A0A2AA;
    }

  }

  .car-2 {
    margin: 0 0;
    border-radius: 0.1rem;
    padding: 0.15rem 0.18rem;

    .cell {
      font-size: 0.14rem;
      margin-bottom: 0.15rem;

      .color {

      }
    }

    .switch {
      padding-top: 0.21rem;
      font-size: 0.14rem;
    }
  }

  .tilp {
    padding: 0.12rem 0.13rem;
    font-size: 0.12rem;
    color: #A0A2AA;
  }

  .btn {
    margin: 0.4rem 0.13rem 0.2rem;
  }
}
</style>
