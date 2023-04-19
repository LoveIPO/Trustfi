<template>
  <div class="investmentLog">
    <vHead :title="$t('invest.lang7')" :back="back"></vHead>
    <div class="box">
      <van-list v-model:loading="loading" :finished="finished" :immediate-check="false" :finished-text="$t('pulb.lang4')"
        @load="onLoad">
        <vItem :showTitle="false" :list="list" @link="link" ></vItem>
      </van-list>
    </div>
  </div>
</template>

<script>
import Home from "../http/index.js";
import vHead from "../components/vHead.vue";
import vItem from "../components/vItem.vue";
export default {
  name: "investmentLog",
  components: {
    vHead,
    vItem,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      total: 0,
      page: 1
    }
  },
  mounted() {
    this.getdata()
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    link(id) {
      this.$router.push({
        path:'/InvestmentDetails',
        query:{
          id:id
        }
      })
    },
    getdata() {
      let parme= {
        page :this.page
      }
      Home.investlist(parme).then((res) => {
        this.total = res.data.total
        this.list = res.data.data
      });
    },
    onLoad() {
      this.page++
      let parme = {
        page: this.page
      }
      Home.investlist(parme).then((res) => {
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
  },
};
</script>
<style scoped>
</style>
<style lang="scss">


.investmentLog {
    min-height: 100%;
    background: #13172A;
  .box{
    height: calc(100% - 0.55rem);
    padding: 0 0.13rem;
  }
}
</style>
