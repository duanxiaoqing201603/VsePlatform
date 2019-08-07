<template>
  <div class="College">
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
        <el-table-column prop="id" align="center" label="学院ID" width="150">
        </el-table-column>
        <el-table-column prop="name" label="学院名字" width="110" align="center">
        </el-table-column>
        <el-table-column prop="image" label="图片URL" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="150" align="center">
        </el-table-column>
        <el-table-column prop="homeShow" class-name="status-col" label="是否在首页展现" width="110" align="center">
        </el-table-column>
        <el-table-column prop="sort" align="center" label="排序" width="100">
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
import { mapGetters } from 'vuex'
import https from '../../https'
import {Message} from 'element-ui'

export default {
  name: 'College',
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
    https.fetchPost('http://test.edrmd.com:1443/manage/college/list',
      {
        'pageSize':10,
        'showPage':1
      }).then(res=>{
      this.list=res.data.data.college;
    }).catch(err=>{
      console.log(err);
    })
  },
  methods: {
    handleClick(row) {
      this.operate=row.createTime?'edit':'new';
      this.$router.push({path:'/collegeEdit',query:{'operate':this.operate,'collegeID':row.id}});
    },
    deleteClick(row){
      https.fetchPost('http://test.edrmd.com:1443/manage/college/delete',{'id':row.id}).then(res=>{
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
  .College{
    margin:20px;

  }
  .College .collegeInfo{
    margin-top:15px;
  }
  .College .add span{
    font-size:16px;
  }
</style>
