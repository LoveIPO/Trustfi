<template>
  <div class="buylog">
    <vHead :title="$t('wallet.lang15')" :back="back"></vHead>

    <div class="box">
      <div class="list flex-con">
        <van-list v-model:loading="loading" :finished="finished" :immediate-check="false"
          :finished-text="$t('pulb.lang4')" @load="onLoad">
          <div class="item" v-for="(i, index) in list" :key="index" @click="link(i.id)">
            <div class="title flex-wrap jb a-items">
              <div class="name flex-wrap a-items">
                <p>{{ i.created_at }}</p>
              </div>
              <div class="state flex-wrap a-items">
                <p style="color: #FFA200;" v-if="(i.buy_state == 0 || i.buy_state == 1) && i.is_sell == 2">
                  {{ $t('pulb.lang15') }}</p>
                <p style="color: #2EBD87;" v-if="i.buy_state == 2 && i.is_sell == 2">{{ $t('pulb.lang16') }}</p>
                <p style="color: #FFA200;" v-if="(i.sell_state == 0 || i.sell_state == 1) && i.is_sell == 1">
                  {{ $t('pulb.lang17') }}</p>
                <p style="color: #2EBD87;" v-if="i.sell_state == 2 && i.is_sell == 1">{{ $t('pulb.lang18') }}</p>
                <p class="right-icon flex-wrap"><img src="../assets/img/invest/rightback.png" alt=""></p>
              </div>
            </div>
            <div class="content flex-wrap border-t jb">
              <div class="num">
                <div class="flex-wrap a-items">
                  <p class="icon flex-wrap a-items"><img :src="i.main_coin_ico" alt=""></p>
                  <p class="key">{{ i.main_coin_name }}</p>
                </div>
                <p class="val">{{ i.buy_main_num }}</p>
              </div>
              <div class="income flex-wrap a-items">
                <img src="../assets/img/wallet/line1.png" alt="">
              </div>
              <div class="num text-r">
                <div class="flex-wrap a-items">
                  <p class="icon flex-wrap a-items"><img :src="i.credit_coin_ico" alt=""></p>
                  <p class="key">{{ i.credit_coin_name }}</p>
                </div>
                <p class="val">{{ i.buy_credit_num > 0 ? i.buy_credit_num : "-" }}</p>
              </div>
            </div>
          </div>
        </van-list>
        <div v-if="list.length == 0" class="flex-wrap flex-ver jc" style="height:100% ;">
          <van-empty :image="require('../assets/img/empty.png')" :image-size="['1.05rem', '0.79rem']"
            :description="$t('pulb.lang1')" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Home from "../http/index.js";
import vHead from "../components/vHead.vue";
import Qrcode from "../components/Qrcode.vue";
export default {
  name: "App",
  components: {
    vHead,
    Qrcode
  },
  data() {
    return {
      loading: false,
      finished: false,
      total: 0,
      page: 1,
      list: []
    }
  },
  mounted() {

    this.getdata()
  },
  methods: {
    getdata() {
      let parme = {
        type: 1

      }
      Home.creditlist(parme).then((res) => {
        this.total = res.data.total
        this.list = res.data.data
      });
    },
    onLoad() {
      this.page++
      let parme = {
        page: this.page,
        type: 1,
      }
      Home.creditlist(parme).then((res) => {
        if (res.code == 200) {
          for (let i = 0; i < res.data.data.length; i++) {
            this.list.push(res.data.data[i]);
          }
          this.total = res.data.total
        }
      });

      this.loading = false;

      if (this.list.length >= this.total) {
        this.finished = true;
      }
    },
    back() {
      this.$router.go(-1)
    },
    link(id) {
      this.$router.push({
        path: '/buyDetail',
        query: {
          id: id
        }
      })
    },
  },
};
</script>
<style></style>

<style scoped lang="scss">
.buylog {
  width: 100%;
  min-height: 100%;
  background: #13172A;

  .box {
    padding: 0.1rem 0.13rem;

    .list {

      .item {
        background: #1A1F37;
        width: 100%;
        box-sizing: border-box;
        padding: 0.17rem 0;
        border-radius: 0.1rem;
        margin-top: 0.1rem;
      }

      .title {
        padding: 0 0.15rem;

        .name {
          font-size: 0.14rem;
          font-weight: bold;
        }

        .state {
          font-size: 0.14rem;
          color: #A0A2AA;

          .right-icon {
            margin-left: 0.09rem;

            img {
              width: 0.07rem;
              height: 0.12rem;
            }
          }
        }
      }


      .content {
        margin-top: 0.17rem;
        padding: 0.18rem 0.15rem 0;

        .num {
          .key {
            font-size: 0.14rem;
          }

          .val {
            margin-top: 0.07rem;
            font-size: 0.14rem;
          }

          .icon {
            margin-right: 0.06rem;

            img {
              width: 0.21rem;
              height: 0.21rem;
            }
          }
        }

        .text-r {
          text-align: right;
        }

        .income {
          img {
            width: 0.68rem;
            height: 0.05rem;
          }

        }
      }
    }
  }
}
</style>
