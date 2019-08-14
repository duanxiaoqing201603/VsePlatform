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
    name:'Problem',
    data(){
      return {
        list:[],
        problemID:''
      }
    },
    created(){
      this.problemID=this.$route.query.id;
      https.fetchPost('http://test.edrmd.com:1443/manage/experiment3d/test/list',
        {
          'pageSize':10,
          'showPage':1,
          'id':this.problemID
        }).then(res=>{
          this.list=res.data.data.test;
        console.log('res.data.data.test',res.data.data.test);
      }).catch(err=>{
        console.log(err);
      })
    },
    methods:{
      handleClick(row){
        this.operate=row.title?'edit':'new';
        this.$router.push({path:'/problemEdit',query:{'operate':this.operate,'practiceID':row.id,'problemID':this.problemID}})
      },
      deleteClick(row){
        https.fetchPost('http://test.edrmd.com:1443/manage/experiment3d/test/delete',{'id':row.id}).then(res=>{
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
