<template>
  <div class="noticeDetail">
    <vHead :title="$t('home.lang28')" :back="back"></vHead>
    <div class="box ">
      <div class="nav">
        <p class="title">{{title}}</p>
        <p class="time">{{created_at}}</p>
      </div>
      <div class="content">
        <div v-html="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Home from "../http/index.js";
import vHead from "../components/vHead.vue";
export default {
  name: "noticeDetail",
  components: {
    vHead,
  },
  data() {
    return {
      id: '',
      title: "",
      content: "",
      created_at: "",
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.getdata()
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    getdata() {
      let param = {
        id: this.id
      }
      Home.notice_detail(param).then((res) => {
        this.title = res.data.title
        this.content = res.data.content
        this.created_at = res.data.created_at
      });
    }
  },
};
</script>
<style scoped></style>
<style lang="scss">


.noticeDetail {
  width: 100%;
  min-height: 100%;
  background: #13172A;

  .box {
    padding: 0 0.16rem;

    .nav {
      padding: 0.13rem 0;
      border-bottom: 1px solid rgba(45, 208, 143, 0.4);
      .title {
        font-size: 0.18rem;
      }

      .time {
        font-size: 0.12rem;
        color: #A0A2AA;
        margin-top: 0.13rem;
      }
    }

    .content {
      padding: 0.18rem 0;
      font-size: 0.14rem;
      line-height: 0.2rem;
    }
  }
}
</style>
