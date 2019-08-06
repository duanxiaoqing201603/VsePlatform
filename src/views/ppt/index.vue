<template>
  <div class="PPT">
    <el-button class="add" @click="handleClick($event)"><i class="el-icon-circle-plus-outline"></i> 添加</el-button>
    <div class="PPTcontent">
      <el-table
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row

      >
        <el-table-column type="index" align="center" width="150">
        </el-table-column>
        <el-table-column prop="name" label="PPT名称" width="250" align="center">
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
  import {Message} from 'element-ui'
  export default {
    name:'Courseware',
    data(){
      return {
        list:[],
        chapterID:'',
        operate:'',
        pptID:''
      }
    },
    created(){
      this.chapterID=this.$route.query.chapterID;
      https.fetchPost('http://test.edrmd.com:1443/manage/ppt/list',
        {
          'pageSize':10,
          'showPage':1,
          'id':this.chapterID
        }).then(res=>{
          console.log('dafjdafja;f',res.data.data);
        this.list=res.data.data.ppt;
      }).catch(err=>{
        console.log(err);
      })
    },
    methods:{
      handleClick(row){
        this.operate=row.name?'edit':'new';
        this.pptID=row.id;
        //console.log('pptID',this.pptID);
        this.$router.push({path:'/pptEdit',query:{'operate':this.operate,'chapterID':this.chapterID,'subjectID':this.subjectID,'pptID':this.pptID}})
      },
      deleteClick(row){
        https.fetchPost('http://test.edrmd.com:1443/manage/ppt/delete',{'id':row.id}).then(res=>{
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
  .PPT{
    margin:20px;
  }
  .PPT .PPTcontent{
    margin-top:15px;
  }
</style>
