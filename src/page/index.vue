<template>
  <div class="index flex-wrap flex-ver">
    <div class="view flex-con" ref="returnTop"><router-view v-if="ishow"  @fathre="updatas"/></div>
    <div class="vTab safe-area-inset-bottom">
      <div class="nav_box flex-wrap ja">
        <div class="nav" :class="{ act: tabIndex == 0 }" @click="tab(0)">
          <p class="icon flex-wrap a-items jc"><img
              :src="tabIndex == 0 ? require('@/assets/img/tab/tab1act.png') : require('@/assets/img/tab/tab1.png')"
              alt=""></p>
          <p>{{ $t('tab.lang1') }}</p>
        </div>
        <div class="nav" :class="{ act: tabIndex == 1 }" @click="tab(1)">
          <p class="icon flex-wrap a-items jc"><img
              :src="tabIndex == 1 ? require('@/assets/img/tab/tab2act.png') : require('@/assets/img/tab/tab2.png')"
              alt=""></p>
          <p>{{ $t('tab.lang2') }}</p>
        </div>
        <div class="nav" :class="{ act: tabIndex == 2 }" @click="tab(2)">
          <p class="icon flex-wrap a-items jc"><img
              :src="tabIndex == 2 ? require('@/assets/img/tab/tab3act.png') : require('@/assets/img/tab/tab3.png')"
              alt=""></p>
          <p>{{ $t('tab.lang3') }}</p>
        </div>
        <div class="nav" :class="{ act: tabIndex == 3 }" @click="tab(3)">
          <p class="icon flex-wrap a-items jc"><img
              :src="tabIndex == 3 ? require('@/assets/img/tab/tab4act.png') : require('@/assets/img/tab/tab4.png')"
              alt=""></p>
          <p>{{ $t('tab.lang4') }}</p>
        </div>
        <div class="nav" :class="{ act: tabIndex == 4 }" @click="tab(4)">
          <p class="icon flex-wrap a-items jc"><img
              :src="tabIndex == 4 ? require('@/assets/img/tab/tab5act.png') : require('@/assets/img/tab/tab5.png')"
              alt=""></p>
          <p>{{ $t('tab.lang5') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'index',
  components: {
  },
  data() {
    return {
      tabIndex: "0",
      ishow: true
    }
  },
  mounted() {
    if (this.$route.path == "/index/home") {
      this.tabIndex = 0
    } else if (this.$route.path == "/index/invest") {
      this.tabIndex = 1
    } else if (this.$route.path == "/index/borrowing") {
      this.tabIndex = 2
    } else if (this.$route.path == "/index/profit") {
      this.tabIndex = 3
    } else if (this.$route.path == "/index/wallet") {
      this.tabIndex = 4
    }
  },
  methods: {
    updatas(type){
      this.tab(type)
    },
    tab(type) {
      if (type == this.tabIndex) {
        return
      } else {
        this.tabIndex = type
        if (type == 0) {
          this.$router.replace('/index/home')
        } else if (type == 1) {
          this.$router.replace('/index/invest')
        } else if (type == 2) {
          this.$router.replace('/index/borrowing')
        } else if (type == 3) {
          this.$router.replace('/index/profit')
        } else if (type == 4) {
          this.$router.replace('/index/wallet')
        }
        this.$nextTick(() => {
          this.ishow = true
          this.$refs.returnTop.scrollTop = 0
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.index {
  width: 100%;
  height: 100%;
  overflow-x: hidden;

  .view {
    overflow-y: scroll;
    overflow-x: hidden;
    width: calc(100% + 17px);
    padding-right: 17px;
    box-sizing: border-box;
  }

  .vTab {
    width: 100%;
    height: 0.49rem;
    position: relative;
    background: #053D31;
    user-select: none;
    padding-bottom: env(safe-area-inset-bottom);
    padding-bottom: constant(safe-area-inset-bottom);

    .nav_box {

      .nav {
        height: 0.49rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0;
        font-size: 0.1rem;
        color: #9BB1AD;

        .icon {
          margin-bottom: 0.02rem;

          img {
            width: 0.2rem;
          }
        }
      }

      .act {
        color:#FFFFFF;
      }
    }
  }
}
</style>
