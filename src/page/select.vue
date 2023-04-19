<template>
  <div class="select">
    <vHead :title="$t('wallet.lang31')" :back="back"></vHead>
    <div class="box" :class="{pb:this.$route.query.type == 1}">
      <div class="list flex-con">
        <div class="item" v-for="(i, index) in list" :key="index">
          <div @click="link(i)">
            <div class="title flex-wrap jb a-items">
              <div class="name flex-wrap a-items">
                <p class="bticon flex-wrap"><img :src="i.coin_ico" alt=""></p>
                <p>{{ i.coin_name }}</p>
              </div>
              <div class="state flex-wrap a-items" v-if="this.$route.query.type == 1">
                <img src="../assets/img/wallet/checked.png" alt="" v-if="ids.indexOf(i.id) >= 0">
                <img src="../assets/img/wallet/check.png" alt="" v-else>
              </div>
              <div class="state flex-wrap a-items" v-if="this.$route.query.type == 2">
                <img src="../assets/img/wallet/checked.png" alt="" v-if="select2.id && select2.id == i.id">
                <img src="../assets/img/wallet/check.png" alt="" v-else>
              </div>
            </div>
            <div class="content flex-wrap border-t" v-if="this.$route.query.type == 1">
              <div class="num">
                <p class="key">{{ $t('wallet.lang32') }}</p>
                <p class="val">{{ i.number }}</p>
              </div>
              <div class="income">
                <p class="key">{{ $t('wallet.lang33') }}</p>
                <p class="val">{{ i.surplus_number }}</p>
              </div>
              <div class="period">
                <p class="key">{{ $t('invest.lang11') }}</p>
                <p class="val">{{ i.days }}{{ $t('invest.lang12') }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="list.length == 0" class="flex-wrap flex-ver jc" style="min-height:60vh ;">
          <van-empty :image="require('../assets/img/empty.png')" :image-size="['1.05rem', '0.79rem']"
            :description="$t('pulb.lang1')" />
        </div>

      </div>

    </div>
    <div class="btn_box" v-if="this.$route.query.type == 1&&list.length>0">
      <div class="btn" @click="comfrim()">
        {{ $t('pulb.lang8') }}
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
      nav: 1,
      active: 0,
      number: "",
      list: [],
      ids: [],
      select1: [],
      select2: [],
      coin_type: ""
    }
  },
  mounted() {
    if(this.$store.getters.getSelect1){
       this.select1 = JSON.parse(this.$store.getters.getSelect1)
       this.select1.forEach((item)=>{
        this.ids.push(item.id)
      })
    } 
    if(this.$store.getters.getSelect){
       this.select2 = JSON.parse(this.$store.getters.getSelect)
    } 
    this.getdata()
  },
  methods: {
    navtab(type) {
      if (this.nav != type) {
        this.nav = type
      }
    },
    comfrim(){
      let message = JSON.stringify(this.select1)
      this.$store.commit('setSelect1', message)
      this.back()
    },
    back() {
      this.$router.go('-1')
    },
    link(i) {

      
      if (this.$route.query.type == 1) {
        if (i.coin_type == this.coin_type || !this.coin_type) {
          if (this.ids.indexOf(i.id) >= 0) {
            this.select1.splice(this.ids.indexOf(i.id), 1);
            this.ids.splice(this.ids.indexOf(i.id), 1);
          } else {
            this.coin_type = i.coin_type
            this.ids.push(i.id)
            this.select1.push(i)
          }
        }
      } else {
        let message = JSON.stringify(i)
        this.$store.commit('setSelect', message)
        this.back()
      }
    },
    getdata() {
      let getChain = this.$store.getters.getChain
      let parem = {
        type: getChain == 'bsc' ? 3 : getChain == 'eth' ? 2 : getChain == 'trx' ? 4 : ""
      }
      Home.creditindex(parem).then((res) => {
        if (this.$route.query.type == 2) {
          this.list = res.data.credit_list
        }
        if (this.$route.query.type == 1) {
          this.list = res.data.loan_list
        }
      });
    },
  },
};
</script>
<style></style>

<style scoped lang="scss">
.select {
  width: 100%;
  min-height: 100%;
  background: #13172A;

  .box {
    padding: 0.1rem 0.13rem ;

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

          .bticon {
            margin-right: 0.09rem;

            img {
              width: 0.21rem;
              height: 0.21rem;
            }
          }
        }

        .state {
          img {
            width: 0.18rem;
            height: 0.18rem;
          }
        }
      }


      .content {
        margin-top: 0.17rem;
        padding: 0.15rem 0.15rem 0;

        .num {
          flex: 1.5;

          .key {
            color: #A0A2AA;
            font-size: 0.12rem;
          }

          .val {
            margin-top: 0.06rem;
            font-size: 0.14rem;
          }
        }

        .income {
          flex: 1;

          .key {

            color: #A0A2AA;
            font-size: 0.12rem;
          }

          .val {
            margin-top: 0.06rem;
            font-size: 0.14rem;
          }
        }

        .period {
          flex: 1;
          text-align: right;

          .key {
            color: #A0A2AA;
            font-size: 0.12rem;
          }

          .val {
            margin-top: 0.06rem;
            font-size: 0.14rem;
          }
        }

      }


      .time {
        margin-top: 0.15rem;
        padding: 0.14rem 0.15rem 0;
        font-size: 0.12rem;
        color: #A0A2AA;
      }
    }


  }
  .pb{
    padding-bottom: 0.7rem;
  }
  .btn_box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0.13rem;
    box-sizing: border-box;
    background: #13172A;

    .btn {
      width: 100%;
      background: linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);
      text-align: center;
      font-size: 0.14rem;
      line-height: 0.44rem;
      border-radius: 0.05rem;
      color: rgba(19, 23, 42, 1);

    }
  }


}
</style>
