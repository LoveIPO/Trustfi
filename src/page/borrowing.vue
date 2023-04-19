<template>
  <div class="borrowing">
    <vHead :title="$t('tab.lang3')" :back="back" background="transparent" :left="{ state: false }"></vHead>
    <div class="box">
      <p class="msg">{{$t('borrowing.lang1')}}(USDT)</p>
      <p class="number">{{ loan_total }}</p>
      <div class="content flex-wrap">
        <div class="div border-r flex-con">
          <p class="dmsg">{{$t('borrowing.lang2')}}(USDT)</p>
          <p class="dval">{{ pledge_total }}</p>
        </div>
        <div class="div flex-con">
          <p class="dmsg">{{$t('borrowing.lang3')}}(USDT)</p>
          <p class="dval">{{ not_returned }}</p>
        </div>
      </div>
      <div class="btn">
        <van-button block color="linear-gradient(149deg, #00FF01 0%, #90FF9F 100%)" @click="detail">{{$t('borrowing.lang4')}}</van-button>
      </div>
    </div>
    <div class="list_box">

      <vItems :title="$t('borrowing.lang5')" :list="list" @link="logdetail" :more="log"></vItems>
    </div>
  </div>
</template>

<script>
import Home from "../http/index.js";
import vHead from "../components/vHead.vue";
import vItems from "../components/vItems.vue";
import { Dialog, Toast } from 'vant';
export default {
  name: "borrowing",
  components: {
    vHead,
    vItems,
  },
  data() {
    return {
      loan_total: '-',
      not_returned: '-',
      pledge_total: '-',
      checked: false,
      list: []
    }
  },
  mounted() {
    this.getdata()
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    detail() {
      if(!this.$store.getters.getWalletid){
        Toast({
          message: this.$t('pulb.lang26'),
          position: 'bottom',
        });
        return
      }
      this.$router.push('/borrowingDetail')
    },
    logdetail(id) {
      this.$router.push({
        path: '/bDetail',
        query: {
          id: id
        }
      })
    },
    log() {
      if (!this.$store.getters.getWalletid) {
        Toast({
          message: this.$t('pulb.lang26'),
          position: 'bottom',
        });
        return
      } 
      this.$router.push('/borrowingLog')
    },
    getdata() {
      Home.loan().then((res) => {
        if (res.code == 200) {
          this.list = res.data.list
          this.loan_total = res.data.loan_total
          this.not_returned = res.data.not_returned
          this.pledge_total = res.data.pledge_total
        }
      });
    },
  },
};
</script>
<style scoped>
.borrowing .btn .van-button {
  color: #333 !important;
  height: 0.48rem;
  font-size: 0.16rem;
}
</style>
<style lang="scss">


.borrowing {
  width: 100%;
  min-height: 100%;
  position: relative;
  background: #13172A;

  .box {
    position: relative;
    z-index: 2;
    width: calc(100% - 0.26rem);
    margin-left: 0.13rem;
    margin-top: 0.1rem;
    border-radius: 0.1rem;
    padding-bottom: 0.3rem;
    border: 1px solid #22E988;
    background: #1A1F37;

    .msg {
      text-align: center;
      padding-top: 0.22rem;
      font-size: 0.14rem;
    }

    .number {
      text-align: center;
      font-size: 0.4rem;
      font-weight: bold;
      margin-top: 0.13rem;
    }

    .content {
      margin-top: 0.33rem;

      .div {
        text-align: center;

        .dmsg {
          font-size: 0.14rem;
          color: #A0A2AA;
        }

        .dval {
          margin-top: 0.06rem;
          color: #fff;
          font-size: 0.12rem;
        }
      }

      .border-r {
        position: relative;
      }

      .border-r::before {
        content: '';
        width: 1px;
        position: absolute;
        top: 0;
        right: 0;
        height: 0.33rem;
        background: #F5F5F5;
      }
    }

    .btn {
      margin: 0.33rem 0.26rem 0;
    }
  }

  .list_box {
    padding: 0.1rem 0.13rem 0.2rem;
  }
}

</style>
