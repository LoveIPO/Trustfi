<template>
  <div class="invite">
    <vHead :title="$t('set.lang1')" :back="back"></vHead>
    <div class="box">
      <div class="add">
        <p class="tit">{{$t('set.lang2')}}</p>
        <p class="address ">{{walletid}} <img src="../assets/img/home/copy.png" alt="" @click="copy(walletid)"></p>
      </div>
      <p class="line"></p>
      <div class="erm_box">
        <div class="erm flex-wrap jc">
          <div id="erw" ref="qrCodeUrl">
            <Qrcode :value="walletid" />
          </div>
        </div>
      </div>
     
    </div>
    <div class="btn"><van-button block color="linear-gradient(149deg, #00FF01 0%, #90FF9F 100%)" @click="copy(this.invite_url)" >{{ $t('pulb.lang29') }}</van-button></div>


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
      walletid: this.$store.getters.getWalletid ,
      invite_url:""
    }
  },
  mounted() {
    Home.get_user_info().then((res) => {
      if (res.data.invite_url) {
        this.invite_url = res.data.invite_url
      } else {

      }
    });
  },
  methods: {
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
<style>
</style>

<style scoped lang="scss">
.invite {
  width: 100%;
  height: 100%;

  background: #13172A;
  .box {
    width: calc(100% - 0.23rem);
    height: 4.24rem;
    margin: 0.2rem auto;
    background-image: url(../assets/img/wallet/box_bg.png);
    position: relative;
    .line{
      width: calc(100% - 0.83rem);
      height: 1px;
      position: absolute;
      left: 0.4rem;
      top: 1.1rem;
      border-top: 1px dashed #22E988;
    }
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
        word-break: break-all;
        color: #A0A2AA;
        img{
          width:0.14rem ;
          height: 0.14rem;
          margin-left: 0.1rem;
          margin-top: 0.03rem;
        }
      }
    }

    .erm_box {
      margin-top: 0.93rem;
    }

    .btn {
      width: 2.76rem;
      margin: 0.36rem auto 0;
      background: #FDD71D;
      text-align: center;
      font-size: 0.14rem;
      line-height: 0.44rem;
      border-radius: 0.1rem;
    }
  }


  .btn{
    padding: 0 0.16rem;
  }







}
</style>
