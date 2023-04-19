<template>
  <div class="drawCar">
    <p class="title">{{$t('invest.lang15')}}</p>
    <div class="list flex-wrap">
      <div class="li " :class="{ act: type == i.id }" v-for="(i, index) in list" :key="index" @click="select(i, index)">
        {{ i.name }}</div>
    </div>
    <p class="title">{{$t('profit.lang21')}}</p>
    <div class="field border-b">
      <van-field type="number" v-model="number" :placeholder="$t('profit.lang24') " clearable clear-icon="close" />
    </div>
    <div class="box flex-wrap jb">
      <p>{{$t('profit.lang25')}}：{{balance}}</p>
      <p>{{$t('profit.lang26')}}：{{extract_fee_ratio * 100}}%</p>
    </div>
    <van-button type="primary" color="linear-gradient(149deg, #00FF01 0%, #90FF9F 100%)" @click="extract">{{$t('profit.lang18')}}</van-button>
  </div>
</template>

<script>
import Home from "../http/index.js";
import { Dialog, Toast } from 'vant';
export default {
  name: 'drawCar',
  props: {
    msg: String,
    type:String,
    balance:String,
    extract_fee_ratio:Number,
    list: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      number: '',
    }
  },
  methods: {
    select(val, index) {
      this.indexact = index
      this.$emit('chacnge',val.id)
    },
    extract() {
      let parem = {
        coin_id: this.type,
        amount: this.number
      }
      Home.extract(parem).then((res) => {
        Toast({
          message: res.msg,
          position: 'bottom',
        });
        if(res.code==200){
          this.$emit('extract')
          this.number=''
        } 
      });
    },
    detail() {
      this.$router.push('/investment')
    }
  }
}
</script>
<style scoped>
.drawCar .field .van-cell {
  padding: 0.13rem 0;
  font-size: 0.16rem;
  background: transparent;
}

.drawCar .van-button {
  width: 100%;
  margin-top: 0.32rem;
  color: #333 !important;
  border-radius: 0.05rem;
  height: 0.45rem;
}
</style>
<style scoped lang="scss">
.drawCar {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0 0.17rem;
  border-radius: 0.1rem;

  .title {
    font-size: 0.16rem;
    font-weight: bold;
    margin-top: 0.4rem;
  }

  .list {
    margin: 0.13rem 0;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    .li {
      min-width: 0.82rem;
      height: 0.36rem;
      text-align: center;
      line-height: 0.36rem;
      margin-right: 0.07rem;
      padding: 0 0.05rem;
      border-radius: 0.05rem;
      border: 1px solid #22E988;
      color: #90FF9F;
    }

    .act {
      color: #3D3D3D;
      background: linear-gradient(149deg, #00FF01 0%, #90FF9F 100%);
    }

  }

  .field {
    margin-top: 0.05rem;
  }

  .box {
    font-size: 0.14rem;
    margin-top: 0.16rem;

    span {
      color: #F0A53F;
    }
  }

  .box2 {
    font-size: 0.14rem;
    margin-top: 0.11rem;
    color: #A0A2AA;
  }

}</style>
