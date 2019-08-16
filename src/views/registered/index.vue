<template>
  <div class="Register">
    <!--<div class="dashboard-text">name: {{ name }}</div>-->
    <el-button class="add" @click="handleClick($event)"><i class="el-icon-circle-plus-outline"></i> 添加</el-button>
    <div class="collegeInfo">
      <el-table
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row

      >
        <el-table-column type="index" align="center" width="100"></el-table-column>

        <el-table-column prop="name" align="center" label="用户名" width="200">
        </el-table-column>
        <el-table-column prop="university" label="学校名称" align="center">
        </el-table-column>
        <el-table-column align="center" label="操作" width="300" >
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
  import { mapGetters } from 'vuex'
  import https from '../../https'
  import {Message} from 'element-ui'

  export default {
    name: 'Registered',
    data(){
      return {
        list:[],
        operate:''
      }
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    created(){
      https.fetchPost('http://test.edrmd.com:1443/manage/user/register/list',
        {
          'pageSize':10,
          'showPage':1
        }).then(res=>{
        this.list=res.data.data.register;
        console.log(this.list);
      }).catch(err=>{
        console.log(err);
      })
    },
    methods: {
      handleClick(row) {
        this.operate=row.createTime?'edit':'new';
        this.$router.push({path:'/registeredEdit',query:{'operate':this.operate,'registerID':row.id}});
      },
      deleteClick(row){
        https.fetchPost('http://test.edrmd.com:1443/manage/user/register/delete',{'id':row.id}).then(res=>{
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
    },

  }
</script>

<!--<style lang="scss" scoped>-->
<style>
  /*.dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }*/
  .Register{
    margin:20px;

  }
  .Register .collegeInfo{
    margin-top:15px;
  }
  .Register .add span{
    font-size:16px;
  }
</style>
