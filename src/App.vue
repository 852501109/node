
<script>
import { defineComponent, ref, reactive,onMounted,toRefs, getCurrentInstance } from "vue";

// import {  ApiLogglist,Requirechannels,RequireEdition } from "@/api/Interface";
// import {  sevenDAYS, } from "@/utils/unilt";
// 测试下CI/CD
import imgUpload from  './components/imgUpload/imgUpload.vue';
import example from  './components/example.vue';
import { ElMessage } from 'element-plus'
export default defineComponent({

  components: {
    imgUpload,
    example
  },

  props:['toChild'],
  setup(props) {
    const childLogDet = ref();

    const data = reactive({
      valtime:["2021-12-02","2021-12-22"],
      
      Valtag:"",
      Versionnum:"",
      Tablelist:[],
      channelsList:[],
      EditionList:[],
      Vallevel:"",
      majorID:"",
      Valchannel:"",
      totalnum:0,
      pageSizenum:10,
      pageindexnum:1,
      levellist:[
        {value: '0', label: '调试'},
        {value: '1', label: '信息'},
        {value: '2', label: '警告'},
        {value: '3', label: '错误'},
      ] 
    })
    const methodsMap =  {
      //这是默认的开始
      movechild(val){
      
        // data.majorID=val;
        // data.pageindexnum=1;
        // methodsMap.queryFor()
        // //渠道集合
        // methodsMap.Allchannels(val)
        // //版本号集合
        // methodsMap.getEdition(val);
      },
      Allchannels(val){
        // Requirechannels(val).then((res) => {
        //   if(res.code==200){         
        //     data.channelsList =res.data
        //   } 
        // })
        // .catch((error) => {
        //   console.log(error)        
        // })
        // .finally(() => {
        // });
      },
      getEdition(val){
        // RequireEdition(val).then((res) => {
        //   if(res.code==200){
        //     data.EditionList = res.data;
        //   } 
        // })
        // .catch((error) => {   
        //   console.log(error)     
        // })
        // .finally(() => {
        // });
      },
      huntfor(){
        // data.pageindexnum=1;
        // methodsMap.queryFor()
      },
      queryFor(){
        // sevenDAYS();
        // let postdata={
        //   appId:data.majorID,
        //   logLevel:data.Vallevel,
        //   logTag:data.Valtag,
        //   startDate:data.valtime[0],
        //   endDate:data.valtime[1],
        //   pageSize:data.pageSizenum,
        //   pageIndex:data.pageindexnum,
        // }
        // ApiLogglist(postdata).then((res) => {
        //   console.log(res.data)
        //   data.Tablelist= res.data.list;
        //   data.totalnum=res.data.total;
        //   console.log(data.Tablelist)

        //   // ElMessage.success({
        //   //   message: '修改成功！',
        //   //   type: 'success',
        //   //   showClose: true,
        //   //   duration: 1000
        //   // })
        // })
        // .catch((error) => {
        //   data.Tablelist = [];
        // })
        // .finally(() => {
          
        // });
      },
      detailedinfo(val){
        // childLogDet.value.methodchild(val.id);
        // console.log(val)
      },
      selDate(){
        // if(data.valtime==null){
        //   ElMessage({
        //     message:"时间不可为空",
        //     type: 'error',
        //     duration: 2 * 1000
        //   })
        //   return
        // }
        // data.pageindexnum=1;
        // methodsMap.queryFor()
      },
      handleCurrentChange(val){
        // data.pageindexnum=val;
        // methodsMap.queryFor()
        
      },
      
    }
    onMounted(() => {
     // methodsMap.movechild();
      // data.valtime= sevenDAYS()
      // console.log(sevenDAYS())
      //alert(data.valtime)
    })
    return{
      childLogDet,
      ...methodsMap,
      ...toRefs(data),
 
    }
  },
});
</script>

<template>
  <imgUpload/>
  <example/>
</template>