<template>
  <div class="Test">
    <el-button class="add" @click="handleClick($event)"><i class="el-icon-circle-plus-outline"></i> 添加</el-button>
    <div class="Testcontent">
      <el-table
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row

      >
        <el-table-column type="index" align="center" width="100">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="450" align="center">
        </el-table-column>
        <el-table-column align="center" label="操作">
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
        testID:'',
        subjectID:''
      }
    },
    created(){
      this.chapterID=this.$route.query.chapterID;
      this.subjectID=this.$route.query.subjectID;
      https.fetchPost('http://test.edrmd.com:1443/manage/test/list',
        {
          'pageSize':10,
          'showPage':1,
          'id':this.chapterID
        }).then(res=>{
        this.list=res.data.data.test;
      }).catch(err=>{
        console.log(err);
      })
    },
    methods:{
      handleClick(row){
        this.operate=row.title?'edit':'new';
        this.testID=row.id;
        this.$router.push({path:'/testEdit',query:{'operate':this.operate,'chapterID':this.chapterID,'subjectID':this.subjectID,'testID':this.testID}})
      },
      deleteClick(row){
        https.fetchPost('http://test.edrmd.com:1443/manage/test/delete',{'id':row.id}).then(res=>{
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
  .Test{
    margin:20px;
  }
  .Test .Testcontent{
    margin-top:15px;
  }
</style>
