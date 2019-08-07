<template>
  <div class="Video">
    <el-button class="add" @click="handleClick($event)"><i class="el-icon-circle-plus-outline"></i> 添加</el-button>
    <div class="VideoContent">
      <el-table
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row

      >
        <el-table-column type="index" align="center" width="100">
        </el-table-column>
        <el-table-column prop="name" label="视频名称" width="250" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center">
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>
<script>
  import https from '../../https'
  export default {
    name:'Courseware',
    data(){
      return {
        list:[],
        chapterID:'',
        operate:'',
        videoID:''
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
        this.list=res.data.data.video;
      }).catch(err=>{
        console.log(err);
      })
    },
    methods:{
      handleClick(row){
        this.operate=row.name?'edit':'new';
        this.videoID=row.id;
        this.$router.push({path:'/videoEdit',query:{'operate':this.operate,'chapterID':this.chapterID,'subjectID':this.subjectID,'id':this.videoID}})
      },
      deleteClick(row){
        https.fetchPost('http://test.edrmd.com:1443/manage/video/delete',{'id':row.id}).then(res=>{
          if(res.data.status==='0000'){
            Message({
              message: res.data.message
            });
          }else{
            Message({
              message: res.data.message
            });
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    }

  }
</script>
<style>
  .Video{
    margin:20px;
  }
  .Video .VideoContent{
    margin-top:15px;
  }
</style>
