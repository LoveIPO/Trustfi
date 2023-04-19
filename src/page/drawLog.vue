<template>
  <div class="investmentLog">
    <vHead :title="$t('invest.lang43')" :back="back"></vHead>
    <div class="box">
      <van-list v-model:loading="loading" :finished="finished" :immediate-check="false" :finished-text="$t('pulb.lang4')"
        @load="onLoad">
        <vItemDraw :showTitle="false" :list="list"></vItemDraw>
      </van-list>
    </div>
  </div>
</template>

<script>
import Home from "../http/index.js";
import vHead from "../components/vHead.vue";
import vItemDraw from "../components/vItemDraw.vue";
export default {
  name: "investmentLog",
  components: {
    vHead,
    vItemDraw,
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
        type: 1,
      }
      Home.extract_log(parme).then((res) => {
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
      Home.extract_log(parme).then((res) => {
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
  },
};
</script>
<style scoped></style>
<style lang="scss">


.investmentLog {
  width: 100%;
  height: 100%;
  background: #13172A;
  overflow-x: hidden;

  .box {
    height: calc(100% - 0.55rem);
    padding: 0 0.13rem;
    overflow-y: scroll;
    overflow-x: hidden;
    width: calc(100% + 17px);
    padding-right: calc(17px + 0.13rem);
    box-sizing: border-box;
  }
}
</style>
