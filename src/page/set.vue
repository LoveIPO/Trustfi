<template>
  <div class="set">
    <vHead :title="$t('set.lang5')" :back="back"></vHead>
    <div class="box">
      <div class="list">
        <div class="cell flex-wrap a-items jb border-b">
          <div class="flex-wrap a-items l">
            <img src="../assets/img/home/set1.png" alt="">
            <p>{{ $t('set.lang2') }}</p>
          </div>
          <div class="flex-wrap a-items r">
            <p class="clor" v-if="walletid || this.$store.getters.getChain == 'bsc'">{{ $t('set.lang6') }}</p>
            <p @click="bind" v-else>{{ $t('set.lang7') }}</p>
            <img src="../assets/img/invest/rightback.png" alt=""
              v-if="!walletid && this.$store.getters.getChain != 'bsc'">
          </div>
        </div>
        <div class="cell flex-wrap a-items jb border-b">
          <div class="flex-wrap a-items l">
            <img src="../assets/img/home/set2.png" alt="">
            <p>{{ $t('set.lang8') }}</p>
          </div>
          <div class="flex-wrap a-items r">
            <p class="clor" v-if="pid">{{ $t('set.lang6') }}</p>
            <p v-else @click="bindshang">{{ $t('set.lang7') }}</p>
            <img src="../assets/img/invest/rightback.png" alt="" v-if="!pid">
          </div>
        </div>
        <div class="cell flex-wrap a-items jb border-b" @click="myaddress">
          <div class="flex-wrap a-items l">
            <img src="../assets/img/home/set3.png" alt="">
            <p>{{ $t('set.lang9') }}</p>
          </div>
          <div class="flex-wrap a-items r">
            <p></p>
            <img src="../assets/img/invest/rightback.png" alt="">
          </div>
        </div>
        <div class="cell flex-wrap a-items jb border-b" @click="lang">
          <div class="flex-wrap a-items l">
            <img src="../assets/img/home/set4.png" alt="">
            <p>{{ $t('set.lang10') }}</p>
          </div>
          <div class="flex-wrap a-items r">
            <p v-if="$store.getters.getLang == 'en'">English</p>
            <p v-if="$store.getters.getLang == 'ja'">日本語</p>
            <p v-if="$store.getters.getLang == 'ms'">Melayu</p>
            <p v-if="$store.getters.getLang == 'km'">កម្ពុជា។</p>
            <p v-if="$store.getters.getLang == 'ru'">Русский</p>
            <p v-if="$store.getters.getLang == 'de'">Deutsch</p>
            <p v-if="$store.getters.getLang == 'fr'">Français</p>
            <p v-if="$store.getters.getLang == 'zh-TW'">繁体中文</p>
            <p v-if="$store.getters.getLang == 'zh-CN'">简体中文</p>
            <img src="../assets/img/invest/rightback.png" alt="">
          </div>
        </div>
        <div class="cell flex-wrap a-items jb border-b" @click="invite">
          <div class="flex-wrap a-items l">
            <img src="../assets/img/home/set5.png" alt="">
            <p>{{ $t('set.lang1') }}</p>
          </div>
          <div class="flex-wrap a-items r">
            <p></p>
            <img src="../assets/img/invest/rightback.png" alt="">
          </div>
        </div>
        <div class="cell flex-wrap a-items jb " @click="contactUs">
          <div class="flex-wrap a-items l">
            <img src="../assets/img/home/set7.png" alt="">
            <p>{{ $t('set.lang11') }}</p>
          </div>
          <div class="flex-wrap a-items r">
            <p></p>
            <img src="../assets/img/invest/rightback.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model:show="show" closeable close-icon="close" round @open="open">
      <div class="pupupbox">
        <p class="title">{{ $t('set.lang12') }}</p>
        <div class="field flex-wrap a-items">
          <van-field type="text" v-model="val" :placeholder="$t('set.lang12')" />
        </div>
        <div class="btn_group flex-wrap jb">
          <p class="close " @click="show = false">{{ $t('pulb.lang7') }}</p>
          <p class="corfrim" @click="bind_superior">{{ $t('pulb.lang8') }}</p>
        </div>
      </div>
    </van-popup>
    <van-popup v-model:show="showId" closeable close-icon="close" round @open="open">
      <div class="pupupbox">
        <p class="title">{{ $t('set.lang2') }}</p>
        <div class="field flex-wrap a-items">
          <van-field type="text" v-model="value" :placeholder="$t('set.lang14')" />
        </div>
        <div class="btn_group flex-wrap jb">
          <p class="close " @click="showId = false">{{ $t('pulb.lang7') }}</p>
          <p class="corfrim" @click="setWalletid">{{ $t('pulb.lang8') }}</p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Home from "../http/index.js";
import vHead from "../components/vHead.vue";
import { Dialog, Toast } from 'vant';
export default {
  name: "set",
  components: {
    vHead,
  },
  data() {
    return {
      val: '',
      value: '',
      show: false,
      showId: false,
      list: [],
      walletid: "",
      pid: ''
    }
  },
  mounted() {
    this.getdata()
  },
  methods: {
    bind() {
      if (!this.$store.getters.getChain) {
        this.$router.push('/linkWallet')
      } else {
        this.showId = true
      }
    },

    bindshang() {
      if (!this.$store.getters.getChain) {
        this.$router.push('/linkWallet')
        return
      }
      if (!this.$store.getters.getWalletid) {
        Toast({
          message: this.$t('pulb.lang26'),
          position: 'bottom',
        });
        return
      }
      this.show = true
    },
    open() {
      this.val = ''
      this.value = ''
    },
    getdata() {
      Home.get_user_info().then((res) => {
        
        if (res.code == 200) {
          this.pid = res.data.pid
          if (res.data.walletid && this.$store.getters.getChain != 'bsc') {
            this.walletid = res.data.walletid
            this.$store.commit('setWalletid', this.walletid)
          }
        }

      });
    },
    setWalletid() {
      this.showId = false
      let parem = {
        walletid: this.value
      }
      Home.bind_walletid(parem).then((res) => {
        Toast({
          message: res.msg,
          position: 'bottom',
        });
        if (res.code == 200) {
          this.getdata()
        }

      });
    },
    bind_superior() {
      this.show = false
      let parem = {
        walletid: this.val
      }
      Home.bind_superior(parem).then((res) => {

        Toast({
          message: res.msg,
          position: 'bottom',
        });
        if (res.code == 200) {
          this.getdata()
        }
      });
    },
    back() {
      this.$router.go(-1)
    },
    myaddress() {
      if (!this.$store.getters.getChain) {
        this.$router.push('/linkWallet')
        return
      }
      this.$router.push('/myaddress')
    },
    contactUs() {
      this.$router.push('/contactUs')
    },
    invite() {
      if (!this.$store.getters.getChain) {
        this.$router.push('/linkWallet')
        return
      }
      if (this.$store.getters.getWalletid) {
        this.$router.push('/invite')
      } else {
        Toast({
          message: this.$t('pulb.lang26'),
          position: 'bottom',
        });
      }
    },
    lang() {
      this.$router.push('/lang')
    },
    lang() {
      this.$router.push('/lang')
    },
  },
};
</script>
<style >
.set .van-popup__close-icon--top-right {
  top: 0.1rem;
  right: 0.1rem;
}

.set .van-cell {
  background: transparent;
  font-size: 0.14rem;
  line-height: 0.3rem;
  padding: 0.08rem 0.1rem;
  background: rgba(26, 31, 55, 1);

}

.set .van-popup {
  background: RGBA(19, 23, 42, 1);
}
</style>
<style lang="scss">


.set {
  width: 100%;
  height: 100%;
  background: #13172A;

  .box {
    padding: 0.1rem 0.16rem;

    .list {
      border-radius: 0.1rem;
      padding: 0;

      .cell {
        padding: 0.24rem 0;

        .l {
          font-size: 0.14rem;

          img {
            width: 0.24rem;
            height: 0.24rem;
            margin-right: 0.14rem;
          }
        }

        .r {
          font-size: 0.14rem;
          color: #A0A2AA;

          img {
            width: 0.08rem;
            height: 0.15rem;
            margin-left: 0.2rem;
          }

          .clor {
            color: #FFA200;
          }
        }
      }
    }
  }


  .pupupbox {
    width: 2.74rem;
    height: 2.27rem;
    box-sizing: border-box;
    padding: 0.29rem 0.16rem 0.22rem;

    .title {
      text-align: left;
      font-size: 0.16rem;

      font-weight: bold;
    }

    .field {

      border-radius: 0.1rem;
      margin-top: 0.36rem;

      img {
        width: 0.18rem;
        height: 0.18rem;
        margin-right: 0.09rem;
      }
    }

    .btn_group {
      font-size: 0.14rem;
      text-align: center;
      margin-top: 0.29rem;

      .close {
        background: rgba(26, 31, 55, 1);
        line-height: 0.44rem;
        border-radius: 0.1rem;
        width: 1.14rem;
      }

      .corfrim {
        background: linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);
        line-height: 0.44rem;
        border-radius: 0.1rem;
        width: 1.14rem;
        color: rgba(19, 23, 42, 1);
      }
    }
  }
}
</style>
