<template>
  <div class="vHead " :style="{ background: background }">
    <div class="flex-wrap jb v-box">
      <div class="v-left" v-show="left.state">
        <p class="flex-wrap a-items" @click="back" v-if="left.icon">
          <img :src="left.icon" alt="" />
        </p>
        <p class="flex-wrap a-items" v-if="left.text"
          :style="{ 'font-size': left.fontSize, 'font-weight': left.fontWeight }">
          {{ left.text }}
        </p>
      </div>
      <div class="v-right" v-show="right.state"  @click="rightClick">
        <p class="flex-wrap a-items" v-if="right.icon" @click="linkWallet">
          <img :src="right.icon" alt="" />
        </p>
        <p class="flex-wrap a-items" v-if="right.text"
          :style="{ 'font-size': right.fontSize, 'font-weight': right.fontWeight }">
          {{ account || right.text }}
        </p>
      </div>
    </div>
    <div class="v-title">
      <p>{{ title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vHead',
  props: {
    title: String,
    left: {
      type: Object,
      default: {
        state: true,
        icon: require('../assets/img/back.png'),
        text: "",
        fontSize: "",
        fontWeight: "",
      }
    },
    right: {
      type: Object,
      default: {
        state: false,
        icon: "",
        text: "",
        fontSize: "",
        fontWeight: "",
      }
    },
    background: {
      type: String,
      default: '#13172A'
    },
    back: {
      type: Function,
      default: () => {
      }
    },
    rightClick: {
      type: Function,
      default: () => {
      }
    },

  },
  computed: {
    account() {
      let value = this.$store.getters.getAccount + ""
      if (value) {
        const start = value.slice(0, 6);
        const end = value.slice(-4);
        return `${start}******${end}`;
      } else {
        return false
      }
    }
  },
  methods: {
    linkWallet() {
      this.$emit('linkWallet');
    },
  }
}
</script>
<style scoped lang="scss">
.vHead {
  width: 100%;
  height: 0.45rem;
  position: relative;
  user-select: none;
  .v-box {
    position: relative;
    z-index: 2;
  }

  .v-left {
    height: 0.45rem;

    p {
      height: 0.45rem;
      padding: 0 0.15rem;

      img {
        width: auto;
        height: 0.18rem;
      }
    }
  }

  .v-right {
    height: 0.45rem;
    font-size: 0.26rem;

    p {
      height: 0.45rem;
      padding: 0 0.15rem;

      img {
        width: auto;
        height: 0.18rem;
      }
    }
  }

  .v-title {
    width: 100%;
    height: 0.45rem;
    text-align: center;
    line-height: 0.45rem;
    font-weight: bold;
    font-size: 0.16rem;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
}
</style>
