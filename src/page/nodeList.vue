<template>
  <div class="nodeList">
    <vHead :title="$t('home.lang20')" :back="back"></vHead>
    <div class="box">
      <div class="list">
        <div class="item" v-for="(i, index) in list" :key="index">
          <div class="text flex-wrap ">
            <p class="msg">{{index +1}}</p>
            <p class="num">{{i.address}}</p>
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
export default {
  name: "nodeList",
  components: {
    vHead,
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {
    Home.node_list().then((res) => {
      
      this.list = res.data
    });
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
  },
};
</script>
<style scoped></style>
<style lang="scss">


.nodeList {
  width: 100%;
  min-height: 100%;
  background: #13172A;
  .box {
    padding: 0.1rem 0.13rem;

    .list {
     
      .item{
        background: #1A1F37;
       border-radius: 0.1rem;
        padding: 0.18rem 0.14rem;
        margin-bottom: 0.1rem;
        .text{
          font-size: 0.14rem;
          .msg{
            font-size: 0.12rem;
            height: 0.2rem;
            line-height: 0.2rem;
            border-radius: 50%;
            background: linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);
            min-width: 0.2rem;
            text-align: center;
            margin-right: 0.11rem;
            color: #000;
          }
        }
      }
    }
  }
}
</style>
