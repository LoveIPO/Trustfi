<template>
  <div class="profitLog">
    <vHead :title="$t('profit.lang15')" :back="back"></vHead>
    <div class="box">
      <van-list v-model:loading="loading" :finished="finished" :immediate-check="false" :finished-text="$t('pulb.lang4')"
        @load="onLoad">
        <div class="list">
          <div class="item"  v-for="(i, index) in list" :key="index">
            <div class="text flex-wrap jb">
              <p class="msg">{{ i.msg }}</p>
              <p class="num">+{{ i.num }}</p>
            </div>
            <p class="tiem">{{ i.created_at }}</p>
          </div>
        </div>
      </van-list>
      <div v-if="list.length == 0" class="flex-wrap flex-ver jc" style="height:100% ;">
        <van-empty :image="require('../assets/img/empty.png')" :image-size="['1.05rem', '0.79rem']"
          :description="$t('pulb.lang1')" />
      </div>
    </div>
  </div>
</template>

<script>
import Home from "../http/index.js";
import vHead from "../components/vHead.vue";
export default {
  name: "profitLog",
  components: {
    vHead,
  },
  data() {
    return {
      type: this.$route.query.type,
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
        type: this.type

      }
      Home.profit_log(parme).then((res) => {
        if (res.code == 200) {
          this.total = res.data.total
          this.list = res.data.data
        }
      });
    },
    onLoad() {
      this.page++
      let parme = {
        page: this.page,
        type: this.type,
      }
      Home.profit_log(parme).then((res) => {
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


.profitLog {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background: #13172A;
  .box {
    height: calc(100% - 0.55rem);
    padding: 0.1rem 0.13rem;
    overflow-y: scroll;
    overflow-x: hidden;
    width: calc(100% + 17px);
    padding-right: calc(17px + 0.13rem);
    box-sizing: border-box;

    .list {
      padding: 0 0.14rem;
      .item {
        padding: 0.18rem 0;
        border-bottom: 1px solid rgba(45, 208, 143, 0.4);
        .text {
          font-size: 0.14rem;

          .num {
            color: #FFA200;
          }
        }

        .tiem {
          color: #A0A2AA;
          margin-top: 0.1rem;
        }
      }
    }
  }
}
</style>
