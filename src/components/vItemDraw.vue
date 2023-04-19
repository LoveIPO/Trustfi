<template>
  <div class="vItem flex-wrap flex-ver ">
    <div class="log" v-if="showTitle">
      <div class="title flex-wrap a-items jb">
        <p>{{ title }}</p>
        <div class="more flex-wrap a-items" @click="more">
          <p>{{$t('pulb.lang19')}}</p>
          <p class="flex-wrap icon a-items"><img src="../assets/img/invest/right.png" alt=""></p>
        </div>
      </div>
    </div>
    <div class="list flex-con">
      <div class="item" v-for="(i, index) in list" :key="index" @click="link">
        <div class="title flex-wrap jb a-items">
          <div class="name flex-wrap a-items">
            <p class="bticon flex-wrap"><img :src="i.coin_ico" alt=""></p>
            <p>{{i.coin_name}}</p>
          </div>
          <div class="state flex-wrap a-items">
            <p style="color: #2EBD87;" v-if="i.state==2">{{$t('pulb.lang20')}}</p>
            <p style="color: #FFA200;" v-if="i.state<2">{{$t('pulb.lang21')}}</p>
            <p style="color: #F5222D;" v-if="i.state>2">{{$t('pulb.lang22')}}</p>
          </div>
        </div>
        <div class="content flex-wrap ">
          <div class="num">
            <p class="key">{{$t('profit.lang21')}}</p>
            <p class="val">{{i.num}}</p>
          </div>
          <div class="income">
            <p class="key">{{$t('profit.lang22')}}</p>
            <p class="val">{{i.charge}}</p>
          </div>
          <div class="period">
            <p class="key">{{$t('profit.lang23')}}</p>
            <p class="val">{{i.time}}</p>
          </div>
        </div>
      </div>
      <div v-if="list.length == 0" class="flex-wrap flex-ver jc" style="height:100% ;">
        <van-empty :image="require('../assets/img/empty.png')" :image-size="['1.05rem', '0.79rem']"
          :description="$t('pulb.lang1')" />
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'vItem',
  props: {
    title: String,
    showTitle: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      default: []
    },
    more: {
      type: Function,
      default: () => { }
    },
    link: {
      type: Function,
      default: () => { }
    },
  },
  data() {
    return {
      number: ''
    }
  },
  methods: {
  },
}
</script>

<style scoped></style>
<style scoped lang="scss">
.vItem {
  height: 100%;

  .log {
    width: 100%;
    box-sizing: border-box;
    font-size: 0.14rem;
    margin-top: 0.17rem;
  }

  .title {
    font-weight: bold;

    .more {
      font-weight: 100;
      color: #A0A2AA;

      .icon {
        margin-left: 0.09rem;

        img {
          width: 0.07rem;
          height: 0.13rem;
        }
      }
    }
  }

  .list {

    .item {
      background: rgba(26, 31, 55, 1);
      width: 100%;
      box-sizing: border-box;
      padding: 0.17rem 0;
      border-radius: 0.1rem;
      margin-top: 0.16rem;
    }

    .title {
      padding: 0 0.15rem;

      .name {
        font-size: 0.14rem;
        font-weight: bold;

        .bticon {
          margin-right: 0.09rem;

          img {
            width: 0.24rem;
            height: 0.24rem;
          }
        }
      }

      .state {
        font-size: 0.14rem;
        color: #A0A2AA;

        .right-icon {
          margin-left: 0.09rem;

          img {
            width: 0.07rem;
            height: 0.12rem;
          }
        }
      }
    }


    .content {
      margin-top: 0.17rem;
      padding: 0 0.15rem;

      .num {
        flex: 1.5;

        .key {
          color: #A0A2AA;
          font-size: 0.12rem;
        }

        .val {
          margin-top: 0.06rem;
          font-size: 0.14rem;
        }
      }

      .income {
        flex: 1;

        .key {

          color: #A0A2AA;
          font-size: 0.12rem;
        }

        .val {
          margin-top: 0.06rem;
          font-size: 0.14rem;
        }
      }

      .period {
        flex: 1;
        text-align: right;

        .key {
          color: #A0A2AA;
          font-size: 0.12rem;
        }

        .val {
          margin-top: 0.06rem;
          font-size: 0.14rem;
        }
      }

    }


    .time {
      margin-top: 0.15rem;
      padding: 0.14rem 0.15rem 0;
      font-size: 0.12rem;
      color: #A0A2AA;
    }
  }
}
</style>
