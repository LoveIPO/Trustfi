<template>
  <div class="home">
    <div class="z-index">
      <div class="head flex-wrap  a-items">
        <p class="flex-con flex-wrap logo"><img src="../assets/img/logo.png" alt=""> </p>
        <p v-if="this.$store.state.account" @click="linkWallet()">{{ $formdata(this.$store.state.account) }}</p>
        <p class="flex-wrap" @click="linkWallet()" v-else><img src="../assets/img/home/h2.png" alt=""></p>
        <p class="flex-wrap" @click="set()" style="margin-left:0.2rem ;"><img src="../assets/img/home/h1.png" alt=""></p>
      </div>
      <div class="notice">
        <div class="notice_box flex-wrap a-items">
          <p class="flex-wrap n_l"><img src="../assets/img/home/h3.png" alt=""></p>
          <div class="flex-con n_text" @click="noticedetail(notice.id)">
            <p class="van-ellipsis" v-if="notice && notice.title">{{ notice.title }}</p>
          </div>
          <p class="flex-wrap n_r" @click="noticelist()"><img src="../assets/img/home/h4.png" alt=""></p>
        </div>
      </div>
      <div class="h_box">
        <div class="nav_box">
          <div class="nav flex-wrap">
            <div class="nav_item flex-con" @click="PDF()">
              <p class="flex-wrap jc"><img src="../assets/img/home/h5.png" alt=""></p>
              <p>{{ $t('home.lang7') }}</p>
            </div>
            <div class="nav_item flex-con" @click="nodeList">
              <p class="flex-wrap jc"><img src="../assets/img/home/h6.png" alt=""></p>
              <p>{{ $t('home.lang2') }}</p>
            </div>
            <div class="nav_item flex-con" @click="buyNode">
              <p class="flex-wrap jc"><img src="../assets/img/home/h7.png" alt=""></p>
              <p>{{ $t('home.lang3') }}</p>
            </div>
            <div class="nav_item flex-con" @click="exchange()">
              <p class="flex-wrap jc"><img src="../assets/img/home/h16.png" alt=""></p>
              <p>{{$t('index.lang1')}}</p>
            </div>
          </div>
          <div class="banner flex-wrap jc">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
              <van-swipe-item v-for="(i, index) in slide" :key="index"><van-image width="3.44rem" height="1.21rem"
                  fit="contain" :src="i.image" @click="banner" /></van-swipe-item>
            </van-swipe>
          </div>

          <div class="nav1">
            <div class="nav1_box flex-wrap jb">
              <div class="nav1_l flex-wrap jb" @click="licai">
                <p>{{ $t('home.lang5') }}</p>
                <p class="flex-wrap a-items"><img src="../assets/img/home/h13.png" alt=""></p>
              </div>
              <div class="nav1_r flex-wrap jb" @click="daikuan">
                <p>{{ $t('home.lang6') }}</p>
                <p class="flex-wrap a-items"><img src="../assets/img/home/h14.png" alt=""></p>
              </div>
            </div>
          </div>

          <div class="nav2">
            <div class="nav2_box flex-wrap jb">
              <div class="nav2_item" @click="wailian(block_explorer)">
                <p class="flex-wra jc"><img src="../assets/img/home/h15.png" alt=""></p>
                <p>{{ $t('home.lang8') }}</p>
              </div>
              <div class="nav2_item" @click="invite">
                <p class="flex-wra jc"><img src="../assets/img/home/h11.png" alt=""></p>
                <p>{{ $t('home.lang9') }}</p>
              </div>
              <div class="nav2_item" @click="helpCenter">
                <p class="flex-wra jc"><img src="../assets/img/home/h12.png" alt=""></p>
                <p>{{ $t('home.lang10') }}</p>
              </div>
            </div>
          </div>



          <div class="tab flex-wrap ja">
            <p :class="{ act: type == 1 }" @click="tab(1)">Swap{{ $t('home.lang11') }}</p>
            <p :class="{ act: type == 2 }" @click="tab(2)">Swap{{ $t('home.lang12') }}</p>
          </div>


          <div class="ranking">
            <div class="ranking_box" v-if="type == 1">
              <div class="ranking_tit flex-wrap ">
                <p class="l">{{ $t('home.lang13') }}</p>
                <p class="c flex-con">{{ $t('home.lang14') }}</p>
                <p class="r  flex-con">{{ $t('home.lang15') }}</p>
              </div>
              <div class="ranlist">
                <div class="ran_item flex-wrap a-items" :class="{ bg: i % 2 == 1 }" v-for="(i, index) in revenue_list"
                  :key="index">
                  <p class="l">{{ i.address }}</p>
                  <p class="c flex-con">{{ i.coin }}</p>
                  <p class="r  flex-con flex-wrap"><span style="background: linear-gradient(141deg, #00FF01 0%, #90FF9F 100%);">{{ i.revenue }}</span></p>
                </div>
              </div>
              <div v-if="revenue_list.length == 0" class="flex-wrap flex-ver jc" style="height:100% ;">
                <van-empty :image="require('../assets/img/empty.png')" :image-size="['1.05rem', '0.79rem']"
                  :description="$t('pulb.lang1')" />
              </div>
            </div>
            <div class="ranking_box" v-if="type == 2">
              <div class="ranking_tit flex-wrap ">
                <p class="l">{{ $t('home.lang16') }}</p>
                <p class="c flex-con">{{ $t('home.lang17') }}</p>
                <p class="r  flex-con">{{ $t('home.lang18') }}</p>
              </div>
              <div class="ranlist">
                <div class="ran_item flex-wrap a-items" :class="{ bg: i % 2 == 1 }" v-for="(i, index) in gain_list"
                  :key="index">
                  <p class="l">{{ i.coin }}</p>
                  <p class="c flex-con">{{ i.price }}</p>
                  <p class="r  flex-con flex-wrap"><span>{{ i.gain }}</span></p>
                </div>
              </div>
              <div v-if="gain_list.length == 0" class="flex-wrap flex-ver jc" style="height:100% ;">
                <van-empty :image="require('../assets/img/empty.png')" :image-size="['1.05rem', '0.79rem']"
                  :description="$t('pulb.lang1')" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Home from "../http/index.js";
import { Dialog, Toast } from 'vant';
import tab from '../page/index.vue'
export default {
  name: "home",
  components: {
    tab
  },
  data() {
    return {
      show: false,
      type: '1',
      btc_node_address: "0",
      eth_node_address: "0",
      gain_list: [],
      node_usdt: "",
      notice: { id: '', title: "" },
      revenue_list: [],
      slide: [],
      tron_node_address: "",
      bsc_node_address: "",
      eth_node_address: "",
      walletid: "",
      audit_report: "",
      block_explorer: "",
      opencode: "",
      website: "",
    };
  },
  created() {
    if(this.$route.query.inviteid){
      this.$store.commit('setinviteid', this.$route.query.inviteid)
    }
  },
  mounted() {
    Home.get_user_info().then((res) => {
      if (res.data.walletid) {
        this.walletid = res.data.walletid
        this.$store.commit('setWalletid', this.walletid)
      } else {
        this.$store.commit('setWalletid', '')
      }
    });
    this.getdata()

  },
  methods: {
    exchange(){
      this.$router.push('/exchange')
    },
    tab(type) {
      this.type = type
    },
    banner() {
      this.$router.push('/banner')
    },
    linkWallet() {
      this.$router.push('/linkWallet')
    },
    nodeList() {
      this.$router.push('/nodeList')
    },
    buyNode() {
      let address
      if (this.$store.getters.getChain == 'bsc') {
        address = this.bsc_node_address
      }
      if (this.$store.getters.getChain == 'eth') {
        address = this.eth_node_address
      }
      if (this.$store.getters.getChain == 'trx') {
        address = this.tron_node_address
      }
      this.$router.push({
        path: '/buyNode',
        query: {
          num: this.node_usdt,
          address: address
        }
      })
    },
    invite() {
      if (!this.$store.getters.getWalletid && this.$store.getters.getChain) {
        Toast({
          message: this.$t('pulb.lang26'),
          position: 'bottom',
        });
        return
      }
      this.$router.push('/invite')
    },
    set() {
      this.$router.push('/set')
    },
    licai() {
      this.$emit("fathre", 1)
    },
    daikuan() {
      this.$emit("fathre", 2)
    },
    noticelist() {
      this.$router.push('/notice')
    },
    noticedetail(id) {
      this.$router.push({
        path: '/noticeDetail',
        query: {
          id: id
        }
      })
    },
    helpCenter() {
      this.$router.push('/helpCenter')
    },
    PDF(){
      this.$router.push('/PDF')
    },
    wailian(url) {
      if (!url) {
        return
      }
      window.location.href = url
    },
    getdata() {
      Home.index().then((res) => {

        this.btc_node_address = res.data.btc_node_address
        this.eth_node_address = res.data.eth_node_address
        this.gain_list = res.data.gain_list
        this.node_usdt = res.data.node_usdt
        this.notice = res.data.notice
        this.revenue_list = res.data.revenue_list
        this.slide = res.data.slide
        this.bsc_node_address = res.data.bsc_node_address
        this.eth_node_address = res.data.eth_node_address
        this.tron_node_address = res.data.tron_node_address
        this.audit_report = res.data.audit_report
        this.block_explorer = res.data.block_explorer
        this.opencode = res.data.opencode
        this.website = res.data.website
        

      });
    },
  },
};
</script>

<style>
.home .banner .van-image__img {
  border-radius: 0.1rem;
}
</style>
<style lang="scss" scoped>


.home {
  width: 100%;
  min-height: 100%;
  position: relative;
  background: #13172A;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2.6rem;
    background-size: 100% 100%;
    background-image: url(../assets/img/home/homebg.png);
  }

  .z-index {
    position: relative;
    z-index: 2;
  }

  .head {
    padding: 0.18rem 0.12rem 0.34rem;
    justify-content: flex-end;

    .logo {
      img {
        width: 0.83rem;
        height: 0.24rem;
      }
    }

    img {
      width: 0.33rem;
      height: 0.33rem;
    }
  }

  .notice {
    padding: 0 0.16rem;

    .notice_box {
      background-size: 100% 100%;
      background-image: url(../assets/img/home/notice_bg.png);
      height: 0.4rem;
      padding: 0 0.14rem;

      .n_text {
        position: relative;
        height: 0.4rem;

        p {
          position: absolute;
          width: 100%;
          top: 0;
          line-height: 0.4rem;
        }
      }

      .n_l {
        margin-right: 0.08rem;

        img {
          width: 0.16rem;
          height: 0.16rem;
        }
      }

      .n_r {
        margin-left: 0.08rem;

        img {
          width: 0.07rem;
          height: 0.11rem;
        }
      }
    }
  }


  .h_box {
    background: #13172A;
    border-radius: 0.2rem 0.2rem 0 0;
    margin-top: 0.25rem;
    padding: 0.32rem 0;

    .nav_box {
      .nav {
        padding: 0 0.16rem;

        .nav_item {
          font-size: 0.14rem;
          text-align: center;

          img {
            width: 0.6rem;
            height: 0.6rem;
            margin-bottom: 0.19rem;
          }
        }
      }
    }


    .banner {
      padding: 0 0.16rem;
      margin-top: 0.2rem;
      width: 100%;
      height: 1.21rem;
      box-sizing: border-box;

      img {
        width: 3.44rem;
        height: 1.21rem;
      }
    }


    .nav1 {
      width: 100%;
      padding: 0 0.16rem;
      box-sizing: border-box;
      margin-top: 0.16rem;

      .nav1_box {
        width: 100%;

        div {
          height: 0.7rem;
          width: calc(50% - 0.06rem);
          box-sizing: border-box;
          padding: 0 0.1rem;

          p {
            font-size: 0.14rem;
            font-weight: bold;

            img {
              width: 0.49rem;
              height: 0.46rem;
            }
          }
        }

        .nav1_l {
          background-image: url(../assets/img/home/nav1_border.png);
          line-height: 0.7rem;
        }

        .nav1_r {
          background-image: url(../assets/img/home/nav1_border.png);
          line-height: 0.7rem;
        }
      }
    }


    .nav2 {
      width: 100%;
      box-sizing: border-box;
      padding: 0 0.16rem;
      margin-top: 0.16rem;

      .nav2_box {
        .nav2_item {
          width: calc((100% - 0.28rem)/3);
          text-align: center;
          background: #053D31;
          font-size: 0.12rem;
          padding: 0.17rem 0;

          img {
            width: 0.22rem;
            height: 0.22rem;
            margin-bottom: 0.09rem;
          }
        }
      }
    }


    .tab {
      font-size: 0.14rem;
      color: #A0A2AA;
      margin-top: 0.25rem;

      .act {
        color: #FFFFFF;
        font-weight: bold;
        position: relative;
      }

      .act::after {
        content: '';
        position: absolute;
        left: calc((100% - 0.3rem)/2);
        bottom: -0.1rem;
        width: 0.3rem;
        height: 0.04rem;
        background: linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);
      }
    }

    .ranking {
      margin: 0.38rem auto 0.2rem;
      width: calc(100% - 0.32rem);
      box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.06);
      padding: 0.1rem 0.16rem 0.2rem;
      box-sizing: border-box;
       background: #1A1F37;
      .ranking_box {
        .ranking_tit {
          padding: 0.17rem 0;
          color: #A0A2AA;
          font-size: 0.12rem;

          .l {
            flex: 1.5;
          }

          .r {
            text-align: right;
          }
        }

        .ranlist {
          font-size: 0.14rem;

          .ran_item {
            padding: 0.09rem 0;
          }

          .l {
            flex: 1.5;
            font-weight: bold;
          }

          .c {
            font-weight: bold;
            color: #A0A2AA;
          }

          .r {
            justify-content: end;

            span {
              min-width: 0.7rem;
              text-align: center;
              color: #fff;
              background: #EDA63A;
              padding: 0.04rem 0.06rem;
              border-radius: 0.05rem;
            }
          }
        }

        .bg {
          background: #FBFBFB;
        }
      }


    }
  }
}
</style>
