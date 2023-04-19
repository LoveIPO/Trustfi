<template>
  <div class="lang">
    <vHead :title="$t('set.lang10')" :back="back"></vHead>
    <div class="box">
      <div class="list">

        <div class="item">
          <div class="text flex-wrap a-items jb" @click="changeEn('en')">
            <p class="msg flex-wrap">English</p>
            <p class="num flex-wrap "><img src="../assets/img/wallet/checked.png" alt="" v-if="lang == 'en'"><img
                src="../assets/img/wallet/check.png" alt="" v-else></p>
          </div>
        </div>
        <div class="item">
          <div class="text flex-wrap a-items jb" @click="changeEn('ja')">
            <p class="msg flex-wrap">日本語</p>
            <p class="num flex-wrap "><img src="../assets/img/wallet/checked.png" alt="" v-if="lang == 'ja'"><img
                src="../assets/img/wallet/check.png" alt="" v-else></p>
          </div>
        </div>
        <div class="item">
          <div class="text flex-wrap a-items jb" @click="changeEn('ms')">
            <p class="msg flex-wrap">Melayu</p>
            <p class="num flex-wrap "><img src="../assets/img/wallet/checked.png" alt="" v-if="lang == 'ms'"><img
                src="../assets/img/wallet/check.png" alt="" v-else></p>
          </div>
        </div>
        <div class="item">
          <div class="text flex-wrap a-items jb" @click="changeEn('km')">
            <p class="msg flex-wrap">កម្ពុជា។</p>
            <p class="num flex-wrap "><img src="../assets/img/wallet/checked.png" alt="" v-if="lang == 'km'"><img
                src="../assets/img/wallet/check.png" alt="" v-else></p>
          </div>
        </div>
        <div class="item">
          <div class="text flex-wrap a-items jb" @click="changeEn('ru')">
            <p class="msg flex-wrap">Русский</p>
            <p class="num flex-wrap "><img src="../assets/img/wallet/checked.png" alt="" v-if="lang == 'ru'"><img
                src="../assets/img/wallet/check.png" alt="" v-else></p>
          </div>
        </div>
        <div class="item">
          <div class="text flex-wrap a-items jb" @click="changeEn('de')">
            <p class="msg flex-wrap">Deutsch</p>
            <p class="num flex-wrap "><img src="../assets/img/wallet/checked.png" alt="" v-if="lang == 'de'"><img
                src="../assets/img/wallet/check.png" alt="" v-else></p>
          </div>
        </div>
        <div class="item">
          <div class="text flex-wrap a-items jb" @click="changeEn('fr')">
            <p class="msg flex-wrap">Français</p>
            <p class="num flex-wrap "><img src="../assets/img/wallet/checked.png" alt="" v-if="lang == 'fr'"><img
                src="../assets/img/wallet/check.png" alt="" v-else></p>
          </div>
        </div>
        <div class="item">
          <div class="text flex-wrap a-items jb" @click="changeEn('zh-TW')">
            <p class="msg flex-wrap">繁体中文</p>
            <p class="num flex-wrap "><img src="../assets/img/wallet/checked.png" alt="" v-if="lang == 'zh-TW'"><img
                src="../assets/img/wallet/check.png" alt="" v-else></p>
          </div>
        </div>
        <div class="item">
          <div class="text flex-wrap a-items jb" @click="changeEn('zh-CN')">
            <p class="msg flex-wrap">简体中文</p>
            <p class="num flex-wrap "><img src="../assets/img/wallet/checked.png" alt="" v-if="lang == 'zh-CN'"><img
                src="../assets/img/wallet/check.png" alt="" v-else></p>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import Home from "../http/index.js";
import vHead from "../components/vHead.vue";
export default {
  name: "lang",
  components: {
    vHead,
  },
  data() {
    return {
      lang: this.$store.getters.getLang,
    }
  },
  mounted() {

  },
  methods: {
    changeEn(e) {
      this.lang = e
      this.$i18n.locale = e;
      sessionStorage.setItem('lang', e)
      this.$store.commit("setLang", e)
      this.back()
    },
    back() {
      this.$router.go(-1)
    },
  },
};
</script>
<style scoped></style>
<style lang="scss">


.lang {
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

          .msg {}

          .num {
            img {
              width: 0.18rem;
              height: 0.18rem;
            }
          }
        }
      }
    }
  }
}</style>
