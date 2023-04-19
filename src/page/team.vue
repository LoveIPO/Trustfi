<template>
  <div class="team">
    <vHead :title="$t('profit.lang10')" :back="back"></vHead>

    <div class="box">
      <div class="teambox">
        <div class="scroll_box" ref="scrollRef">
          <div class="teamlist flex-wrap">
            <p :class="{ 'act': navlist.length == 0 }" @click="my">{{ $t('tab.lang17') }} <van-icon name="arrow"
                v-if="navlist.length > 0" /></p>
            <p :class="{ 'act': index == navlist.length - 1 }" v-for="(i, index) in navlist" :key="index"
              @click="sub(i, index)">
              {{ $formdata(i.invite_code) }} <van-icon name="arrow" v-if="index < navlist.length - 1" /></p>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="item" v-for="(i, index) in list" :key="index" @click="look(i)">
          <div class="text flex-wrap jb">
            <p class="msg flex-wrap a-items">{{ $formdata(i.invite_code) }}
              <img src="../assets/img/team/leve1.png" alt="" v-if="i.level == 1">
              <img src="../assets/img/team/leve2.png" alt="" v-if="i.level == 2">
              <img src="../assets/img/team/leve3.png" alt="" v-if="i.level == 3">
              <img src="../assets/img/team/leve4.png" alt="" v-if="i.level == 4">
              <img src="../assets/img/team/leve5.png" alt="" v-if="i.level == 5">
            </p>
            <p class="num" v-if="i.kpi > 0">{{ i.kpi }}</p>
            <p class="num" style="color: #F6594E;" v-else>{{ $t('profit.lang17') }}</p>

          </div>
          <div class="flex-wrap jb t_box">
            <p class="tiem">{{ i.created_at }}</p>
            <p>{{ $t('tab.lang13') }}： {{ i.valid_user }}</p>
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
  name: "team",
  components: {
    vHead,
  },
  data() {
    return {
      number: '',
      checked: false,
      list: [],
      navlist: []
    }
  },
  mounted() {
    this.getdata(0)
  },
  methods: {
    my() {
      this.getdata(0)
      this.navlist = []
    },
    look(item) {
      this.navlist.push(item)
      this.$nextTick(() => {
        let height = this.$refs.scrollRef.scrollWidth;
        this.$refs.scrollRef.scrollTo(height, 0)
      })
      this.getdata(item.id)
    },
    sub(item, index) {
      this.navlist.splice(index + 1);
      this.getdata(item.id)
    },
    getdata(id) {
      let parem = {
        id: id
      }
      Home.team(parem).then((res) => {
        this.list = res.data
      });
    },
    back() {
      this.$router.go(-1)
    },
  },
};
</script>
<style scoped></style>
<style lang="scss">


.team {
  width: 100%;
  min-height: 100%;
  background: #13172A;

  .teambox {
    width: 100%;
    border: 1px solid #22E988;
    border-radius: 0.1rem;
    background: #053D31;
    box-sizing: border-box;
    padding: 0 0.13rem;

    .scroll_box {
      width: 100%;
      box-sizing: border-box;
      padding: 0.05rem 0;
      overflow-x: scroll;
      overflow-y: hidden;
      display: flex;

      &::-webkit-scrollbar {
        display: none;
      }

      .teamlist {
        p {
          font-size: 0.14rem;
          height: 0.26rem;
          line-height: 0.26rem;
          white-space: nowrap;
        }

        .act {
          color: #00FF01;
        }
      }
    }

  }

  .box {
    padding: 0.1rem 0.16rem;

    .list {

      .item {
        padding: 0.18rem 0;
        margin-bottom: 0.1rem;
        border-bottom: 1px solid rgba(45, 208, 143, 0.4);

        .text {
          font-size: 0.14rem;

          .msg {
            font-weight: bold;

            img {
              width: 0.2rem;
              height: 0.12rem;
              margin-left: 0.14rem;
            }
          }

          .num {
            color: #F4D147;
          }
        }

        .t_box {
          margin-top: 0.1rem;

          .tiem {
            color: #A0A2AA;

          }
        }

      }
    }
  }
}</style>
