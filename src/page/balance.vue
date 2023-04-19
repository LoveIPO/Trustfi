<template>
  <div class="balance">
    <vHead :title="$t('profit.lang5')" :back="back" v-if="type==1"></vHead>
    <vHead :title="$t('profit.lang6')" :back="back" v-if="type==2"></vHead>
    <vHead :title="$t('profit.lang7')" :back="back" v-if="type==3"></vHead>
    <vHead :title="$t('profit.lang8')" :back="back" v-if="type==4"></vHead>
    <div class="box">
      <div class="list">
        <div v-for="(i, index) in list" :key="index" >
          <div class="item  flex-wrap a-items jb"  v-if="type==1&&(i.id==3||i.id==31 ||i.id==32||i.id==33)">
            <div class="text flex-wrap a-items">
              <p class="msg flex-wrap"><img :src="i.ico" alt=""></p>
              <p class="num">{{ i.name}}</p>
            </div>
            <p class="tiem">{{ getbalance(i.id) }}</p>
          </div>
          <div class="item  flex-wrap a-items jb"  v-if="type==2&&(i.id==2||i.id==21)">
            <div class="text flex-wrap a-items">
              <p class="msg flex-wrap"><img :src="i.ico" alt=""></p>
              <p class="num">{{ i.name}}</p>
            </div>
            <p class="tiem">{{ getbalance(i.id) }}</p>
          </div>
          <div class="item  flex-wrap a-items jb"  v-if="type==3&&(i.id==4||i.id==41 )">
            <div class="text flex-wrap a-items">
              <p class="msg flex-wrap"><img :src="i.ico" alt=""></p>
              <p class="num">{{ i.name}}</p>
            </div>
            <p class="tiem">{{ getbalance(i.id) }}</p>
          </div>
          <div class="item  flex-wrap a-items jb"  v-if="type==4&&i.id==1">
            <div class="text flex-wrap a-items">
              <p class="msg flex-wrap"><img :src="i.ico" alt=""></p>
              <p class="num">{{ i.name}}</p>
            </div>
            <p class="tiem">{{ getbalance(i.id) }}</p>
          </div>
        </div>

      </div>
      <div v-if="list.length == 0" class="flex-wrap flex-ver jc" style="min-height:60vh ;">
        <van-empty :image="require('../assets/img/empty.png')" :image-size="['1.05rem', '0.79rem']"
          :description="$t('pulb.lang1')" />
      </div>
    </div>
  </div>
</template>

<script>
import Home from "../http/index.js";
import vHead from "../components/vHead.vue";
export default {
  name: "balance",
  components: {
    vHead,
  },
  data() {
    return {
      number: '',
      type: this.$route.query.type,
      bnb: 0,
      bnb_a: 0,
      bnb_b: 0,
      bnb_usdt: 0,
      btc: 0,
      eth: 0,
      eth_usdt: 0,
      trx: 0,
      trx_usdt: 0,
      list: []
    }
  },
  mounted() {

    
    this.getcoindata()
    this.getdata()
  },
  methods: {
    getbalance(id) {
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
    },
    getcoindata() {
      let parem = {
        walletid: this.$store.getters.getWalletid
      }
      Home.main_wallet_coin(parem).then((res) => {
        
        this.list = res.data
      });
    },
    getdata() {
      Home.get_user_info().then((res) => {
        if (res.code == 200) {
          this.bnb = res.data.account.bnb
          this.bnb_a = res.data.account.bnb_a
          this.bnb_b = res.data.account.bnb_b
          this.bnb_usdt = res.data.account.bnb_usdt
          this.btc = res.data.account.btc
          this.eth = res.data.account.eth
          this.eth_usdt = res.data.account.eth_usdt
          this.trx = res.data.account.trx
          this.trx_usdt = res.data.account.trx_usdt
        }
      });
    },
    back() {
      this.$router.go(-1)
    },
  },
};
</script>
<style  scoped lang="scss">


.balance {
  width: 100%;
  min-height: 100%;
  background: #13172A;
  .box {
    padding: 0.1rem 0.13rem;

    .list {
      border-radius: 0.1rem;
      padding: 0 0.14rem;

      .item {
        padding: 0.23rem 0;
        border-bottom: 1px solid rgba(45, 208, 143, 0.4);
        .text {
          font-size: 0.14rem;

          img {
            width: 0.21rem;
            height: 0.21rem;
            margin-right: 0.09rem;
          }
        }

        .tiem {
          font-size: 0.16rem;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
