
<template>
  <div class="wrapper">
    <photograph ref="photograph" @saveImg="saveImg" />
    <el-dialog :visible.sync="dialogVisible" width="31%" append-to-body>
      <img :src="ewizardClap" class="pan-img" />
    </el-dialog>
    <div class="examphoto-wrapper" :style="{ left: examPhotoList.length > 0 ? '21%' : '35%' }">
      <div>
        <el-upload
          :action="uoploadAction"
          :file-list="examPhotoList"
          :before-upload="onUploadChange"
          style="padding-top: 19px;"
          list-type="picture-card"
          :on-preview="imgPreview"
          :on-remove="imgRemove"
        >
          <div class="examphoto">
            <div @click.stop="onTake()">拍照</div>
            <div>
              <i class="el-icon-plus add" />
              <div class="addtitle">{{ title }}</div>
            </div>
          </div>
        </el-upload>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, reactive, onMounted, toRefs, getCurrentInstance } from "vue";

// import {  ApiLogglist,Requirechannels,RequireEdition } from "@/api/Interface";
// import {  sevenDAYS, } from "@/utils/unilt";

import photograph from '../photograph/index.vue'
import request from './upRequest.js'
export default {

  components: {
    photograph,
  },
  setup() {
    const photograph = ref(null)
    const { proxy, ctx } = getCurrentInstance()
	  const _this = ctx
    
    const data = reactive({
      dialogTeechVisible: false,
      uoploadAction: 'https://jsonplaceholder.typicode.com/posts/',
      // 图片预览
      dialogVisible: false,
      // 图片保存
      examPhotoList: [],
      ewizardClap: ''
    })
    const methodsMap = {
      dataURItoBlob(dataURI) { // 图片转成Buffer
        var byteString = window.atob(dataURI.split(',')[1])
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        var ab = new ArrayBuffer(byteString.length)
        var ia = new Uint8Array(ab)
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
        }
        return new Blob([dataURI], { type: mimeString })
      },
      /**
      * @description: 摄像头完成时拍照
      * @param {String} url:拍照路径
      */
      saveImg(url) {
        console.log(url)
        _this.examPhotoList = []
        _this.examPhotoList.push({ url: url })
        const fd = new FormData()
        fd.append('uploadFile', methodsMap.dataURItoBlob(url))
        console.log(methodsMap.dataURItoBlob(url))
        request({
          url: 'https://jsonplaceholder.typicode.com/posts/',
          method: 'post',
          data: fd
        }).then(res => {
          console.log(res)
        })
      },
      onTake() {
        console.log(photograph.value)
        photograph.value.onTake()
      },
      onUploadChange(file) {
        console.log(file)
      },
      imgRemove(file, fileList) {
        _this.examPhotoList = []
      },
      imgPreview(file) {
        _this.dialogVisible = true
        _this.ewizardClap = file.url
      }
    }
    onMounted(() => {
      console.log(photograph.value)
    })
    return {
      ...methodsMap,
      ...toRefs(data),
      photograph
    }
  },
}
</script>
<style scoped lang="less">
.examphoto-wrapper {
  display: flex;
  position: relative;
  width: 190px;
  .wrapper {
    width: 100%;
  }
  .examphoto {
    display: flex;
    .camera {
      position: absolute;
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
      left: -114%;
      bottom: 47%;
    }
  }
  .add {
    position: absolute;
    left: 76%;
    top: -43%;
  }
  .addtitle {
    text-align: center;
    width: 100px;
    margin-left: 8px;
  }
}
</style>

