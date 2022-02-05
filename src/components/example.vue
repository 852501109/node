<!--  -->
<template>
  <div>{{str}}</div>
</template>

<script setup>
import { getCurrentInstance,reactive,ref,toRefs,onBeforeMount,onMounted} from 'vue'
import { useStore } from 'vuex'
let store = useStore()
const str = ref("这是一个字符串")
onBeforeMount(() => {
    console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
    console.log('3.-组件挂载到页面之后执行-------onMounted')
})
</script>
<style scoped>
</style>