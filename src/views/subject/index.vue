<template>
  <div class="Subject">
    <!--<div class="dashboard-text">name: {{ name }}</div>-->
    <div class="subHead">
      <el-button class="add" @click="handleClick($event)"><i class="el-icon-circle-plus-outline"></i> 添加</el-button>
      <el-select v-model="collegeId" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.collegeId"
          :label="item.name"
          :value="item.collegeId">
        </el-option>
      </el-select>
    </div>
    <div class="collegeInfo">
      <el-table
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row

      >
        <el-table-column type="index" align="center" width="100"></el-table-column>
        <el-table-column prop="sort" align="center" label="排序" width="200">
        </el-table-column>
        <!--<el-table-column prop="collegeId" align="center" label="学院ID" width="150">
        </el-table-column>-->
        <el-table-column prop="name" label="学科名字" align="center">
        </el-table-column>
        <el-table-column prop="id" label="学科ID" align="center" width="300">
        </el-table-column>
        <!--<el-table-column prop="createTime" label="创建时间" width="150" align="center">
        </el-table-column>-->

        <el-table-column align="center" label="操作" width="300">
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
  import {mapGetters} from 'vuex'
  import https from '../../https'
  import {Message} from 'element-ui'

  export default {
    name: 'Subject',
    data(){
      return {
        collegeList:[],
        list:[],
        operate:'',
        collegeId:'',
        options:[],
        selectId:''
      }
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    watch:{
      collegeId(){
        https.fetchPost('http://test.edrmd.com:1443/manage/subject/list',
          {
            'pageSize':10,
            'showPage':1,
            'id':this.collegeId//this.collegeId//'16c1f7938142571'
          }).then(res=>{
          this.list= res.data.data.subject
        }).catch(err=>{
          console.log(err);
        });
      }
    },
    created(){
      //学院
      https.fetchPost('http://test.edrmd.com:1443/manage/college/list',
        {
          'pageSize':10,
          'showPage':1
        }).then(res=>{
          let collegeList=res.data.data.college;
          this.collegeId=collegeList[0].id;
          for(let i=0;i<collegeList.length;i++){
            let cur={'name':collegeList[i].name,'collegeId':collegeList[i].id};
            this.options.push(cur);
          }
      }).catch(err=>{
        console.log(err);
      });

    },
    methods: {
      handleClick(row) {
        this.operate=row.createTime?'edit':'new';
        if(this.operate==='new' && !this.collegeId){
          Message({
            message: '请先选择学院'
          });
          return false
        }
        this.subjectID=row.id;
        this.$router.push({path:'/subjectEdit',query:{'operate':this.operate,'collegeId':this.collegeId,'subjectID':this.subjectID}})
      },
      deleteClick(row){
        https.fetchPost('http://test.edrmd.com:1443/manage/subject/delete',{'id':row.id}).then(res=>{
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
  .Subject{
    margin:20px;

  }
  .Subject .subHead{
    display: flex;
    justify-content: space-between;
  }
  .Subject .collegeInfo{
    margin-top:15px;
  }
  .Subject .add{
    padding:10px 20px;
  }
  .Subject .add span{
    font-size:16px;
  }
</style>
