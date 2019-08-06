<template>
  <div class="SecondTitle">
    <el-button class="add" @click="handleClick($event)"><i class="el-icon-circle-plus-outline"></i> 添加</el-button>
    <div class="SecondTitleInfo">
      <el-table
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row

      >
        <el-table-column type="index" align="center" width="150">
        </el-table-column>
        <el-table-column prop="name" label="笔记名称" width="250" align="center">
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
    name:'SecondTitle',
    data(){
      return {
        list:[],
        noteID:'',
        operate:'',
        subjectID:'',
        chapterID:''
      }
    },
    created(){
      this.chapterID=this.$route.query.chapterID;
      this.subjectID=this.$route.query.subjectID;
      https.fetchPost('http://test.edrmd.com:1443/manage/note/list',
        {
          'pageSize':10,
          'showPage':1,
          'id':this.chapterID
        }).then(res=>{
        this.list=res.data.data.note;
      }).catch(err=>{
        console.log(err);
      })
    },
    methods:{
      handleClick(row){
        this.operate=row.name?'edit':'new';
        this.noteID=row.id;
        this.$router.push({path:'/noteEdit',query:{'operate':this.operate,'chapterID':this.chapterID,'subjectID':this.subjectID,'noteID':this.noteID}})
      },
      deleteClick(row){
        https.fetchPost('http://test.edrmd.com:1443/manage/note/delete',{'id':row.id}).then(res=>{
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
  .SecondTitle{
    margin:20px;
  }
  .SecondTitle .add{
    padding:10px 20px;
  }
  .SecondTitle .add span{
    font-size:16px;
  }
  .SecondTitle .SecondTitleInfo{
    margin-top:15px;
  }
</style>
