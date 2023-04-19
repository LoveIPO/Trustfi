<template>
  <div class="pdf">
    <vHead :title="$t('home.lang7')" :back="back"></vHead>
    <div class="box">
      <p class="flex-wrap"><img src="../assets/img/PDF.png" alt=""></p>
    </div>
  </div>
</template>

<script>
import vHead from "../components/vHead.vue";
export default {
  name: "App",
  components: {
    vHead
  },
  data() {
    return {

    }
  },
  
  async mounted() {

  },
  methods: {
    back() {
      this.$router.go(-1)
    },
  },
};
</script>

<style lang="scss">


.pdf {
  width: 100%;
  min-height: 100%;
  background: #13172A;
  .box{
    width: 100%;
    img{
      width: 100%;
    }
  }
}
</style>
