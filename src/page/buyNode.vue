<template>
  <div class="buyNode">
    <vHead :title="$t('home.lang2')" :back="back"></vHead>
    <div class="box flex-wrap a-tiems jc">
      <div class="flex-wrap a-tiems">
        <van-empty :image="require('../assets/img/home/nodeicon1.png')" :image-size="['1.05rem', '0.81rem']"
          v-if="state == 2">
          <p class="state">{{ $t('home.lang21') }}</p>
          <p class="price">{{ node_usdt }} USDT</p>
          <p class="msg">{{ $t('home.lang22') }}</p>
          <div class="btn" @click="buy">{{ $t('home.lang23') }}</div>
        </van-empty>
        <van-empty :image="require('../assets/img/home/nodeicon2.png')" :image-size="['1.05rem', '0.81rem']"
          v-if="state == 0">
          <p class="state" style="color: RGBA(160, 162, 170, 1);">{{ $t('home.lang24') }}</p>
        </van-empty>
        <van-empty :image="require('../assets/img/home/nodeicon3.png')" :image-size="['1.05rem', '0.81rem']"
          v-if="state == 1">
          <p class="state" style="color: RGBA(160, 162, 170, 1);">{{ $t('home.lang25') }}</p>
        </van-empty>
      </div>
    </div>
  </div>
</template>

<script>
import Home from "../http/index.js";
import vHead from "../components/vHead.vue";
import { Dialog, Toast } from 'vant';
import { buyNode } from "../DApp/bsc";
import { transactionContract } from "../DApp/trx"
import getnet from '../assets/script/getnet'
export default {
  name: "buyNode",
  components: {
    vHead,
  },
  data() {
    return {
      state: 2,
      toAddress: this.$route.query.address,
      node_usdt: this.$route.query.num
    }
  },
  mounted() {


    this.getdata()
  },
  methods: {
    async buy() {
      if (!this.$store.getters.getWalletid) {
        Toast({
          message: this.$t('pulb.lang26'),
          position: 'bottom',
        });
        return
      }
      Toast.loading({
        message: '',
        forbidClick: true,
        duration: 5000,
        iconSize: '60px',
      });
      let getChain = this.$store.getters.getChain
      if (getChain == 'bsc' || getChain == 'eth') {
        if (await getnet() != getChain) {
          Toast({
            message: this.$t('pulb.lang5'),
            position: 'bottom',
          });
          return
        }
        let result = await buyNode(getChain, this.toAddress, this.node_usdt)
        Toast.clear();
        if (result) {
          this.buy_node(result.transactionHash, getChain)
        } else {
          Toast({
            message: this.$t('pulb.lang6'),
            position: 'bottom',
          });
        }
      } else if (getChain = 'trx') {
        let result = await transactionContract(this.toAddress, this.node_usdt)
        if (result) {
          Toast.clear();
          this.buy_node('110', getChain)
        }
      } else {
        Toast({
          message: this.$t('home.lang26'),
          position: 'bottom',
        });
      }
    },
    buy_node(hash, getChain) {
      let coin_id = getChain == 'bsc' ? '31' : getChain == 'eth' ? '21' : getChain == 'trx' ? '41' : '0'
      let parme = {
        coin_id: coin_id,
        hash: hash,
      }
      Home.buy_node(parme).then((res) => {
        
        Toast({
          message: res.msg,
          position: 'bottom',
        });
        if (res.code == 200) {
          this.state = 0
        }
      });
    },
    getdata() {
      Home.get_user_info().then((res) => {
        
        if (res.code == 200) {
          this.state = res.data.node_state
        }
      });
    },
    back() {
      this.$router.go(-1)
    },
  },
};
</script>
<style >
.buyNode .van-empty__bottom {
  margin-top: 0.16rem;
}
</style>
<style lang="scss">
.buyNode {
  width: 100%;
  height: 100%;
  background: #13172A;

  .box {
    width: 100%;
    height: calc(100% - 0.45rem);
    text-align: center;

    .state {
      color: #A0A2AA;
      font-size: 0.14rem;
    }

    .price {
      font-size: 0.2rem;
      margin-top: 0.12rem;
    }

    .msg {
      font-size: 0.14rem;
      margin-top: 0.05rem;
    }

    .btn {
      width: 3.4rem;
      text-align: center;
      line-height: 0.48rem;
      background: linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);
      margin-top: 0.9rem;
      color: #13172A;
      font-size: 0.16rem;
    }
  }
}
</style>
