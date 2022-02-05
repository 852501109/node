<!--
 * @Author: your name
 * @Date: 2021-12-23 16:19:45
 * @LastEditTime: 2021-12-24 09:33:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \my-vue-app\src\components\HelloWorld.vue
-->
<script setup>
import {reactive, ref, toRefs} from 'vue'
const props = defineProps({
    msg: {
      type: String,
      default: ''
    }
  })  
const name = ref(Jerry)
name.value = 'Tom'
const state = reactive({
  name: 'Jerry',
  sex: '男'
})
state.name = 'Tom'
</script>

<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click=""> {{ state.name }}</button>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
