<template>
  <div class="contactUs">
    <vHead :title="$t('set.lang20')" :back="back"></vHead>
    <div class="box">
      <div class="list">
        <div class="item" v-for="(i, index) in list" :key="index">
          <div class="text flex-wrap a-items jb">
            <p class="msg flex-wrap"><img :src="i.ico" alt=""></p>
            <p class="num flex-wrap a-items flex-con jb">{{i.account}} <img src="../assets/img/home/copy1.png" alt="" @click="copy(i.account)"></p>
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
import { Dialog, Toast } from 'vant';
export default {
  name: "contactUs",
  components: {
    vHead,
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {
    Home.contact_us().then((res) => {
      this.list = res.data
    });
  },
  methods: {
    back() {
      this.$router.go(-1)
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
<style scoped></style>
<style lang="scss">


.contactUs {
  width: 100%;
  min-height: 100%;
  background: #13172A;
  .box {
    padding: 0.1rem 0.13rem;

    .list {
      border-radius: 0.1rem;
      .item {
        padding: 0.18rem 0.14rem;
        border-bottom: 1px solid rgba(45, 208, 143, 0.4);
        .text {
          font-size: 0.14rem;
          .msg{
            margin-right: 0.11rem;
            img{
              width: 0.28rem;
              height: 0.28rem;
            }
          }
          .num {
            color: #fff;

            img {
              width: 0.13rem;
              height: 0.13rem;
            }
          }
        }
      }
    }
  }
}</style>
