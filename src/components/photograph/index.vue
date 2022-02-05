<!--
* @description
* @fileName index.vue
* @author chenwenquan
* @date 2021/11/11 12:41:10
!-->
<template>
  <!--拍照模态框-->
  <el-dialog width="1065px" title="拍照上传" v-model="visible" :append-to-body="true" @close="visible = false">
  <div class="box">
      <video ref="videoCamera" class="canvas" :width="videoWidth" :height="videoHeight" autoPlay />
      <canvas ref="canvasCamera" class="canvas" :width="videoWidth" :height="videoHeight" />
    </div>
    <div slot="footer">
      <el-button icon="el-icon-camera" size="small" @click="drawImage">
        拍照
      </el-button>
      <el-button v-if="os" icon="el-icon-video-camera" size="small" @click="getCompetence">
        打开摄像头
      </el-button>
      <el-button v-else icon="el-icon-switch-button" size="small" @click="stopNavigator">
        关闭摄像头
      </el-button>
      <el-button icon="el-icon-refresh" size="small" @click="resetCanvas">
        重置
      </el-button>
      <el-button icon="el-icon-circle-close" size="small" @click="complete">
        完成
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { defineComponent, ref, reactive,onMounted,toRefs, getCurrentInstance} from "vue";

// import {  ApiLogglist,Requirechannels,RequireEdition } from "@/api/Interface";
// import {  sevenDAYS, } from "@/utils/unilt";

import { ElMessage } from 'element-plus'
export default {

  setup() {
    const videoCamera = ref(null)
    const canvasCamera = ref(null)
    let visible = ref(false)
    let show_dialog=() => {
        visible.value = true;
      }
    const { proxy, ctx } = getCurrentInstance()
	  const _this = ctx
    const data = reactive({
      os: false, // 控制摄像头开关
      thisVideo: null,
      thisContext: null,
      thisCancas: null,
      videoWidth: 500,
      videoHeight: 400,
      postOptions: [],
      CertCtl: '',
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 项目人员表格数据
      akworkerList: [],
      // 工种类别数据字典
      workerTypeOptions: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        imgSrc: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    })
    const methodsMap =  {
      // 调用摄像头拍照开始
    onTake() {
      show_dialog()
      methodsMap.getCompetence()
    },
    complete() {
      _this.$emit('saveImg', _this.imgSrc)
      visible.value = false
    },
    onCancel() {
      visible.value = false
      /* _this.resetCanvas();*/
      methodsMap.stopNavigator()
    },
    // 调用摄像头权限
    getCompetence() {
      // 必须在model中render后才可获取到dom节点,直接获取无法获取到model中的dom节点
      _this.$nextTick(() => {
        methodsMap.os = false // 切换成关闭摄像头
        data.thisContext = canvasCamera.value.getContext('2d')
        console.log(data.thisContext, canvasCamera.value.getContext('2d'))
        // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
        if (navigator.mediaDevices === undefined) {
          navigator.menavigatordiaDevices = {}
        }
        // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
        // 使用getUserMedia，因为它会覆盖现有的属性。
        // 这里，如果缺少getUserMedia属性，就添加它。
        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function(constraints) {
            // 首先获取现存的getUserMedia(如果存在)
            const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
            // 有些浏览器不支持，会返回错误信息
            // 保持接口一致
            if (!getUserMedia) {
              return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
            }
            // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
            return new Promise(function(resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject)
            })
          }
        }
        const constraints = {
          audio: false,
          video: { width: _this.videoWidth, height: _this.videoHeight, transform: 'scaleX(-1)' }
        }
        navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
          // 旧的浏览器可能没有srcObject
          if ('srcObject' in _this.thisVideo) {
            _this.thisVideo.srcObject = stream
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream)
          }
          _this.thisVideo.onloadedmetadata = function(e) {
            _this.thisVideo.play()
          }
        }).catch(() => {
          _this.$notify({
            title: '警告',
            message: '没有开启摄像头权限或浏览器版本不兼容.',
            type: 'warning'
          })
        })
      })
    },
    // 绘制图片
    drawImage() {
      // 点击，canvas画图
      _this.thisContext.drawImage(_this.thisVideo, 0, 0, _this.videoWidth, _this.videoHeight)
      // 获取图片base64链接
      _this.imgSrc = _this.thisCancas.toDataURL('image/png')
    },
    // 清空画布
    clearCanvas(id) {
      const c = _this.$refs(id)
      const cxt = c.getContext('2d')
      cxt.clearRect(0, 0, c.width, c.height)
    },
    // 重置画布
    resetCanvas() {
      _this.imgSrc = ''
      _this.clearCanvas(canvasCamera.value)
    },
    // 关闭摄像头
    stopNavigator() {
      if (_this.thisVideo && _this.thisVideo !== null) {
        _this.thisVideo.srcObject.getTracks()[0].stop()
        _this.os = true // 切换成打开摄像头
      }
    }
      
    }
    onMounted(() => {
      console.log(canvasCamera)
      data.thisCancas = canvasCamera
      data.thisVideo = videoCamera
    })
    return{
      ...methodsMap,
      ...toRefs(data),
      visible,
      videoCamera,
      show_dialog,
      canvasCamera
    }
  },
}
</script>

<style>
</style>
