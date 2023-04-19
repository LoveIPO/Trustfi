<template>
  <div class="loanWalletCollection">
    <vHead :title="$t('wallet.lang7')" :back="back"></vHead>
    <van-tabs v-model:active="active">
      <van-tab title="BSC" name="0">
        <div class="box">
          <div class="add">
            <p class="tit">{{ $t('wallet.lang8') }}</p>
            <p class="address">{{ bnb }}</p>
          </div>
          <div class="erm_box">
            <div class="erm flex-wrap jc">
              <div id="erw" ref="qrCodeUrl">
                <Qrcode :value="bnb" v-if="bnb" />
              </div>
            </div>
            <div class="btn" @click="copy(bnb)" v-if="bnb">{{ $t('wallet.lang9') }}</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="ETH" name="1">
        <div class="box">
          <div class="add">
            <p class="tit">{{ $t('wallet.lang8') }}</p>
            <p class="address">{{ eth }}</p>
          </div>
          <div class="erm_box">
            <div class="erm flex-wrap jc">
              <div id="erw" ref="qrCodeUrl">
                <Qrcode :value="eth" v-if="eth" />
              </div>
            </div>
            <div class="btn" @click="copy(eth)" v-if="eth">{{ $t('wallet.lang9') }}</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="Tron" name="2">
        <div class="box">
          <div class="add">
            <p class="tit">{{ $t('wallet.lang8') }}</p>
            <p class="address">{{ trx }}</p>
          </div>
          <div class="erm_box">
            <div class="erm flex-wrap jc">
              <div id="erw" ref="qrCodeUrl">
                <Qrcode :value="trx" v-if="trx" />
              </div>
            </div>
            <div class="btn" @click="copy(trx)" v-if="trx">{{ $t('wallet.lang9') }}</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="BTC" name="3">
        <div class="box">
          <div class="add">
            <p class="tit">{{ $t('wallet.lang8') }}</p>
            <p class="address">{{ btc3 }}</p>
          </div>
          <div class="erm_box">
            <div class="erm flex-wrap jc">
              <div id="erw" ref="qrCodeUrl">
                <Qrcode :value="btc3" v-if="btc3" />
              </div>
            </div>
            <div class="btn" @click="copy(btc3)" v-if="btc3">{{ $t('wallet.lang9') }}</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>



  </div>
</template>

<script>
import Home from "../http/index.js";
import vHead from "../components/vHead.vue";
import Qrcode from "../components/Qrcode.vue";
import { Dialog, Toast } from 'vant';
export default {
  name: "App",
  components: {
    vHead,
    Qrcode
  },
  data() {
    return {
      active: 0,
      bnb: "",
      trx: "",
      eth: "",
      btc3: "",
    }
  },
  mounted() {
    this.get_user_info()
  },
  methods: {
    navtab(type) {
      if (this.nav != type) {
        this.nav = type
      }
    },
    back() {
      this.$router.go('-1')
    },
    get_user_info() {
      Home.get_user_info().then((res) => {
        
        this.bnb = res.data.loan_address.bnb
        this.trx = res.data.loan_address.trx
        this.eth = res.data.loan_address.eth
        this.btc3 = res.data.loan_address.btc3
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
<style>
.loanWalletCollection .van-tabs__line {
  background: linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);
}

.loanWalletCollection .van-tab {
  color: #A0A2AA;
  font-weight: 400;
  font-size: 0.14rem;
  line-height: 0.3rem;

}

.loanWalletCollection .van-tabs__wrap {
  background: #13172A;
  padding: 0.2rem 0;
  border-radius: 0 0 0.2rem 0.2rem;
  border-bottom: 1px solid #22E988;
}

.loanWalletCollection .van-tabs__nav {
  background: transparent;
}

.loanWalletCollection .van-tab--active {
  color: #FFF;
}
</style>

<style scoped lang="scss">
.loanWalletCollection {
  width: 100%;
  min-height: 100%;
  background: #13172A;

  .box {
    width: calc(100% - 0.23rem);
    height: 4.24rem;
    margin: 0.1rem auto;
    background-image: url(../assets/img/wallet/box_bg.png);

    .add {
      text-align: center;
      padding: 0.24rem 0.3rem 0;

      .tit {
        font-size: 0.16rem;
        font-weight: bold;
      }

      .address {
        font-size: 0.14rem;
        line-height: 0.2rem;
        margin-top: 0.1rem;
        word-wrap: break-word;
      }
    }

    .erm_box {
      margin-top: 0.53rem;
    }

    .btn {
      width: 2.76rem;
      margin: 0.36rem auto 0;
      background: linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);
      text-align: center;
      font-size: 0.14rem;
      line-height: 0.44rem;
      border-radius: 0.1rem;
      color: rgba(61, 61, 61, 1);
    }
  }










}
</style>
