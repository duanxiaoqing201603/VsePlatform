<template>
  <div class="Video">
    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row

    >
      <el-table-column type="index" align="center" width="150">
      </el-table-column>
      <el-table-column prop="name" label="视频名称" width="250" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
        <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import https from '../../https'
  export default {
    name:'Courseware',
    data(){
      return {
        list:[],
        chapterID:''
      }
    },
    created(){
      this.chapterID=this.$route.query.chapterID;
      https.fetchPost('http://test.edrmd.com:1443/manage/video/list',
        {
          'pageSize':10,
          'showPage':1,
          'id':this.chapterID
        }).then(res=>{
        console.log(res);
        this.list=res.data.data.video;
      }).catch(err=>{
        console.log(err);
      })
    },
    methods:{
      handleClick(){

      }
    }

  }
</script>
<style>
  .Video{
    margin:20px;
  }
</style>
