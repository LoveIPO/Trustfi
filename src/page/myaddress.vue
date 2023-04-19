<template>
  <div class="myaddress">
    <vHead :title="$t('set.lang15')" :back="back"></vHead>
    <div class="box">
      <div class="list">
        <div class="item">
          <div class="text flex-wrap a-items jb">
            <p class="msg">{{$t('set.lang16')}}</p>
            <p class="num flex-wrap a-items">{{bsc_address? $formdata(bsc_address):"-"}}<img src="../assets/img/home/copy1.png" alt="" v-if="bsc_address" @click="copy(bsc_address)"></p>
          </div>
        </div>
        <div class="item">
          <div class="text flex-wrap a-items jb">
            <p class="msg">{{$t('set.lang17')}}</p>
            <p class="num flex-wrap a-items">{{eth_address? $formdata(eth_address):"-"}}<img src="../assets/img/home/copy1.png" alt="" v-if="eth_address"  @click="copy(eth_address)"></p>
          </div>
        </div>
        <div class="item">
          <div class="text flex-wrap a-items jb">
            <p class="msg">{{$t('set.lang18')}}</p>
            <p class="num flex-wrap a-items">{{trx_address? $formdata(trx_address):"-"}}<img src="../assets/img/home/copy1.png" alt="" v-if="trx_address"  @click="copy(trx_address)"></p>
          </div>
        </div>
        <div class="item ">
          <div class="text flex-wrap a-items jb">
            <p class="msg">{{$t('set.lang19')}}</p>
            <p class="num flex-wrap a-items">{{btc_address? $formdata(btc_address):"-"}}<img src="../assets/img/home/copy1.png" alt="" v-if="btc_address"  @click="copy(btc_address)"></p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Home from "../http/index.js";
import vHead from "../components/vHead.vue";
import { Dialog, Toast } from 'vant';
export default {
  name: "myaddress",
  components: {
    vHead,
  },
  data() {
    return {
      bsc_address:"",
      eth_address:"",
      btc_address:"",
      trx_address:"",
    }
  },
  mounted() {
    this.getdata()
  },
  methods: {
    getdata(){
      Home.get_user_info().then((res) => {
          this.bsc_address = res.data.address.bsc_address
          this.eth_address = res.data.address.eth_address
          this.btc_address = res.data.address.btc_address
          this.trx_address = res.data.address.trx_address
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
    back() {
      this.$router.go(-1)
    },
  },
};
</script>
<style scoped></style>
<style lang="scss">


.myaddress {
  width: 100%;
  min-height: 100%;
  background: #13172A;
  .box {
    padding: 0.1rem 0.13rem;

    .list {
      border-radius: 0.1rem;
      padding: 0 0.14rem;
      .item {
        padding: 0.18rem 0;
        border-bottom: 1px solid rgba(45, 208, 143, 0.4);
        .text {
          font-size: 0.14rem;
          .num {
            color: #A0A2AA ;

            img {
              width: 0.16rem;
              height: 0.16rem;
              margin-left: 0.14rem;
            }
          }
        }
      }
    }
  }
}</style>
