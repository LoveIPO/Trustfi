<template>
  <div class="buylog">
    <vHead :title="$t('index.lang3')" :back="back"></vHead>

    <div class="box">
      <div class="list flex-con">
        <van-list v-model:loading="loading" :finished="finished" :immediate-check="false"
          :finished-text="$t('pulb.lang4')" @load="onLoad">
          <div class="item" v-for="(i, index) in list" :key="index">
            <div class="title flex-wrap jb a-items">
              <div class="name flex-wrap a-items">
                <p>{{ i.created_at }}</p>
              </div>
              <div class="state flex-wrap a-items">
                <p style="color: #FFA200;" v-if="i.state == 1">
                  {{ $t('index.lang4') }}</p>
                <p style="color: #2EBD87;" v-else> {{ $t('index.lang5') }}</p>
              </div>
            </div>
            <div class="content flex-wrap  jb">
              <div class="num">
                <div class="flex-wrap a-items">
                  <p class="icon flex-wrap a-items"><img :src="i.type == 2 ? select2.coin_ico : select1.coin_ico" alt="">
                  </p>
                  <p class="key">{{ i.type == 2 ? select2.coin_name : select1.coin_name }}</p>
                </div>
                <p class="val">{{ i.type == 2 ?i.usdt > 0 ? i.usdt : "-":i.tfv > 0 ? i.tfv : "-" }}</p>
              </div>
              <div class="income flex-wrap a-items">
                <img src="../assets/img/wallet/line1.png" alt="">
              </div>
              <div class="num text-r">
                <div class="flex-wrap a-items">
                  <p class="icon flex-wrap a-items"><img :src="i.type == 1 ? select2.coin_ico : select1.coin_ico" alt="">
                  </p>
                  <p class="key">{{ i.type == 1 ? select2.coin_name : select1.coin_name }}</p>
                </div>
                <p class="val">{{ i.type == 1 ?i.usdt > 0 ? i.usdt : "-":i.tfv > 0 ? i.tfv : "-"  }}</p>
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
      list: [],
      select1: {
        coin_name: 'TFV',
        coin_ico: require('../assets/img/invest/A.png'),
        balance: 0
      },
      select2: {
        coin_name: 'USDT',
        coin_ico: require('../assets/img/invest/usdt.png'),
        balance: 0
      },
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
      Home.tfv_exchange_log(parme).then((res) => {
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
      Home.tfv_exchange_log(parme).then((res) => {
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
