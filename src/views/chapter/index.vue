<template>
  <div class="Subject">
    <!--<div class="dashboard-text">name: {{ name }}</div>-->
    <div class="subHead">
      <el-button class="add" @click="handleClick($event)"><i class="el-icon-circle-plus-outline"></i> 添加</el-button>
      <div>
        <el-select v-model="collegeId" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.collegeId"
            :label="item.name"
            :value="item.collegeId">
          </el-option>
        </el-select>
        <el-select v-model="subjectID" placeholder="请选择">
          <el-option
            v-for="item in optionsSub"
            :key="item.subjectID"
            :label="item.name"
            :value="item.subjectID">
          </el-option>
        </el-select>
      </div>

    </div>
    <div class="collegeInfo">
      <el-table
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column prop="createTime" label="创建时间" width="150" align="center">
        </el-table-column>
        <el-table-column prop="collegeId" align="center" label="学院ID" width="150">
        </el-table-column>
        <el-table-column prop="name" label="章节名字" width="150" align="center">
        </el-table-column>
        <el-table-column prop="id" label="章节ID" width="150" align="center">
        </el-table-column>
        <el-table-column         :show-overflow-tooltip="true"
                                 prop="description" label="章节简介" align="center">
        </el-table-column>
        <el-table-column prop="sort" align="center" label="排序" width="100">
        </el-table-column>
        <el-table-column prop="state" align="center" label="状态" width="100">
        </el-table-column>
        <!--<el-table-column prop="name" label="章节名字" width="150" align="center">
        </el-table-column>
        <el-table-column label="课程学习" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="教学课件" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column label="微课视频" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column label="思维导图" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="PBL教学" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="巩固练习" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>-->
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="next" type="text" size="small">下一级列表</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import https from '../../https'

  export default {
    name: 'Chapter',
    data(){
      return {
        collegeList:[],
        list:[],
        operate:'',
        collegeId:'',
        options:[],
        optionsSub:[],
        subjectID:'',
        chapterID:''
      }
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    watch:{
      collegeId(){
        this.optionsSub=[];
        https.fetchPost('http://test.edrmd.com:1443/manage/subject/list',
          {
            'pageSize':10,
            'showPage':1,
            'id':this.collegeId//this.collegeId//'16c1f7938142571'
          }).then(res=>{
          let subjectList= res.data.data.subject;
          this.subjectID=subjectList[0].id;
          for(let i=0;i<subjectList.length;i++){
            let cur={'name':subjectList[i].name,'subjectID':subjectList[i].id};
            this.optionsSub.push(cur);
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      subjectID(){
        https.fetchPost('http://test.edrmd.com:1443/manage/chapter/list',
          {
            'pageSize':10,
            'showPage':1,
            'id':this.subjectID
          }).then(res=>{
            console.log('chapter',res.data.data.chapter);
          this.list= res.data.data.chapter
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
        this.chapterID=row.id;
        this.$router.push({path:'/chapterEdit',query:{'operate':this.operate,'collegeId':this.collegeId,'chapterID':this.chapterID}})
      },
      next(){
        this.$router.push({path:'/secondTitle'});
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
