<template>
  <div class="notice">
    <vHead :title="$t('home.lang27')" :back="back"></vHead>
    <div class="box">
      <van-list v-model:loading="loading" :finished="finished" :immediate-check="false" :finished-text="$t('pulb.lang4')"
        @load="onLoad">
        <div class="list">
          <div class="item" v-for="(i, index) in list" :key="index" @click="detail(i.id)">
            <div class="text">
              <p class="msg ">{{ i.title }}</p>
            </div>
            <p class="tiem">{{i.created_at}}</p>
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
  name: "notice",
  components: {
    vHead,
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
    getdata() {
      Home.notice_list().then((res) => {
        this.total = res.data.total
        this.list = res.data.data
      });
    },
    onLoad() {
      this.page++
      let parme = {
        page: this.page
      }
      Home.notice_list(parme).then((res) => {
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
    detail(id) {
      this.$router.push({
        path: './noticeDetail',
        query:{
          id:id
        }
      })
    }
  },
};
</script>
<style scoped></style>
<style lang="scss" scoped>


.notice {
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

      .item {
        padding: 0.18rem 0.14rem;
        margin-bottom: 0.1rem;
        border-bottom: 1px solid rgba(45, 208, 143, 0.4);
        .text {
          font-size: 0.14rem;

          .msg {
            img {
              width: 0.2rem;
              height: 0.12rem;
              margin-left: 0.14rem;
            }
          }

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
