<template>
  <div class="PBL">
    <el-button class="add" @click="handleClick($event)"><i class="el-icon-circle-plus-outline"></i> 添加</el-button>
    <div class="PBLcontent">
      <el-table
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row

      >
        <el-table-column type="index" align="center" width="100">
        </el-table-column>
        <el-table-column prop="name" label="PBL名称" width="250" align="center">
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
        pblID:''
      }
    },
    created(){
      this.chapterID=this.$route.query.chapterID;
      https.fetchPost('http://test.edrmd.com:1443/manage/pbl/list',
        {
          'pageSize':10,
          'showPage':1,
          'id':this.chapterID
        }).then(res=>{
        this.list=res.data.data.pbl;
      }).catch(err=>{
        console.log(err);
      })
    },
    methods:{
      handleClick(row){
        this.operate=row.name?'edit':'new';
        this.pblID=row.id;
        this.$router.push({path:'/pblEdit',query:{'operate':this.operate,'chapterID':this.chapterID,'subjectID':this.subjectID,'pblID':this.pblID}})
      },
      deleteClick(row){
        https.fetchPost('http://test.edrmd.com:1443/manage/pbl/delete',{'id':row.id}).then(res=>{
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
  .PBL{
    margin:20px;
  }
  .PBL .PBLcontent{
    margin-top:15px;
  }
</style>
