<template>
  <div class="investmentLog">
    <vHead :title="$t('borrowing.lang18')" :back="back"></vHead>
    <div class="box">
      <van-list v-model:loading="loading" :finished="finished" :immediate-check="false" :finished-text="$t('pulb.lang4')"
        @load="onLoad">
        <vItems :showTitle="false" :list="list" @link="detail"></vItems>
      </van-list>
    </div>
  </div>
</template>

<script>
import Home from "../http/index.js";
import vHead from "../components/vHead.vue";
import vItems from "../components/vItems.vue";
export default {
  name: "investmentLog",
  components: {
    vHead,
    vItems,
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
    detail(id) {
      this.$router.push({
        path:'/bDetail',
        query:{
          id:id
        }
      })
    },
    getdata() {
      let parme= {
        page :this.page
      }
      Home.loanlist(parme).then((res) => {
        this.total = res.data.total
        this.list = res.data.data
      });
    },
    onLoad() {
      this.page++
      let parme = {
        page: this.page
      }
      Home.loanlist(parme).then((res) => {
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
