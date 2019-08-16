<template>
  <div class="Experiment">
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
        <el-table-column prop="name" label="实验名称" align="center">
        </el-table-column>
        <el-table-column align="center" label="操作" width="300" >
          <template slot-scope="scope">
            <el-button @click="problem(scope.row)" type="text" size="small">练习题管理</el-button>
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
  name: 'Experiment',
  data(){
    return {
      list:[],
      operate:'',

    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created(){
    https.fetchPost('http://test.edrmd.com:1443/manage/experiment3d/base/list',
      {
        'pageSize':10,
        'showPage':1
      }).then(res=>{
      this.list=res.data.data.experiment3d;
    }).catch(err=>{
      console.log(err);
    })
  },
  methods: {
    handleClick(row) {
      this.operate=row.createTime?'edit':'new';
      this.$router.push({path:'/experimentEdit',query:{'operate':this.operate,'experimentID':row.id}});
    },
    deleteClick(row){
      https.fetchPost('http://test.edrmd.com:1443/manage/experiment3d/base/delete',{'id':row.id}).then(res=>{
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
    },
    problem(row){
      this.$router.push({path:'/problem',query:{'id':row.id}});
    }
  }

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
  .Experiment{
    margin:20px;

  }
  .Experiment .collegeInfo{
    margin-top:15px;
  }
  .Experiment .add span{
    font-size:16px;
  }
</style>
