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
        <el-table-column type="index" align="center" width="100"></el-table-column>
        <el-table-column prop="collegeId" align="center" label="学院ID" width="150">
        </el-table-column>
        <el-table-column prop="name" label="章节名字" width="200" align="center">
        </el-table-column>
        <el-table-column prop="id" label="章节ID" width="150" align="center">
        </el-table-column>
        <!--<el-table-column         :show-overflow-tooltip="true"
                                 prop="description" label="章节简介" width="200" align="center">
        </el-table-column>-->
        <el-table-column prop="sort" align="center" label="排序" width="150">
        </el-table-column>
        <el-table-column prop="state" align="center" label="状态" width="150">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="next(scope.row)" type="text" size="small">课程学习</el-button>
            <el-button @click="ppt(scope.row)" type="text" size="small">教学课件</el-button>
            <el-button @click="video(scope.row)" type="text" size="small">微课视频</el-button>
            <el-button @click="pbl(scope.row)" type="text" size="small">PBL教学</el-button>
            <el-button @click="test(scope.row)" type="text" size="small">巩固练习</el-button>
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
  import {Message,MessageBox} from 'element-ui'

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
        chapterID:'',
        noteID:''
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
            //console.log('chapter',res.data.data.chapter);
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
        this.$router.push({path:'/chapterEdit',query:{'operate':this.operate,'collegeId':this.collegeId,'subjectID':this.subjectID,'chapterID':this.chapterID}})
      },
      next(row){
        this.chapterID=row.id;
        this.$router.push({path:'/note',query:{'chapterID':this.chapterID,'subjectID':this.subjectID}});
      },
      ppt(row){
        this.chapterID=row.id;
        this.$router.push({path:'/ppt',query:{'chapterID':this.chapterID,'subjectID':this.subjectID}});
      },
      video(row){
        this.chapterID=row.id;
        this.$router.push({path:'/video',query:{'chapterID':this.chapterID,'subjectID':this.subjectID}});
      },
      pbl(row){
        this.chapterID=row.id;
        this.$router.push({path:'/pbl',query:{'chapterID':this.chapterID,'subjectID':this.subjectID}});
      },
      test(row){
        this.chapterID=row.id;
        this.$router.push({path:'/test',query:{'chapterID':this.chapterID,'subjectID':this.subjectID}});
      },
      deleteClick(row){
        https.fetchPost('http://test.edrmd.com:1443/manage/chapter/delete',{'id':row.id}).then(res=>{
          MessageBox({
            title: '确定删除此项吗',
            message: '这是提示文案'
          });
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
