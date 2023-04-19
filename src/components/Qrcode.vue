<template>
  <canvas ref="qrcode" id="canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'
import QRCode from 'qrcode'
const props = defineProps({
  value: {
    type: String,
    default: "chrome://newtab/"
  }
})

const qrcode = ref(null)

onMounted(() => {
  render()
})

const render = () => {
  QRCode.toCanvas(qrcode.value, props.value, (error) => {
    if (error) {
    }
  })
}
</script>
<style lang="scss" >
#canvas{
    width: 1.54rem !important;
    height: 1.54rem !important;
    background: #D8D8D8 !important;
}
</style>