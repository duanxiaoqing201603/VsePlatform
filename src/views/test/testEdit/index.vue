<template>
  <div class="CollegeEdit">
    <div class="title"><span>{{pageTitle}}</span></div>
    <div class="collegeContent">
      <div class="rowDiv"><span class="smallTitle">题目</span>
        <el-input v-model="testTitle" placeholder="题目"></el-input>
      </div>
      <!--<div class="rowDiv"><span class="smallTitle">章节ID</span>
        <el-input v-model="chapterID" placeholder="章节ID"></el-input>
      </div>
      <div v-if="operate==='edit'" class="rowDiv"><span class="smallTitle">创建时间</span>
        <el-input v-model="createTime" placeholder="创建时间">
        </el-input>
      </div>
      <div class="rowDiv"><span class="smallTitle">学科ID</span>
        <el-input v-model="subjectID" placeholder="学科ID"></el-input>
      </div>-->
      <!--<div v-if="operate==='edit'" class="rowDiv"><span class="smallTitle">测试题ID</span>
        <el-input v-model="id" placeholder="测试题ID"></el-input>
      </div>-->
      <div  class="rowDiv"><span class="smallTitle">答案</span>
        <el-input v-model="answers" placeholder="答案"></el-input>
      </div>
      <div>
        <div class="rowDiv" v-for="(value,index) in options" :key="index"><span class="smallTitle">选项{{index+1}}</span>
          <el-input v-model="options[index]" :placeholder="value">{{options[index]}}</el-input>
        </div>
      </div>
      <div>
        <el-button @click="newAdd">新增一项</el-button><el-button @click="newDel">删除一项</el-button>
      </div>
      <div  class="rowDiv">
        <el-button @click="save" type="primary">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import https from '../../../https'
  import Tinymce from '../../Tinymce'
  import {Message} from 'element-ui'
  export default {
    name:'ChapterEdit',
    components:{
      Tinymce
    },
    data(){
      return {
        operate:'',
        pageTitle:'',
        description:'',
        testTitle:'',
        state:'',
        sort:'',
        subjectID:'',
        chapterID:'',
        createTime:'',
        answers:'',
        options:['','','','','','',''],
        id:''
      }
    },
    created(){
      this.operate=this.$route.query.operate;
      this.pageTitle=this.operate==='edit'?'编辑':'新建';
      this.$route.meta.title=this.pageTitle;
      this.chapterID=this.$route.query.chapterID;
      this.subjectID=this.$route.query.subjectID;
      if(this.$route.query.testID){
        https.fetchPost('http://test.edrmd.com:1443/manage/test/find',{'id':this.$route.query.testID}).then(res=>{
          let data=res.data.data;
          this.createTime=data.createTime;
          this.testTitle=data.title;
          this.id=data.id;
          this.chapterID=data.chapterId;
          this.answers=data.answers;
          this.options=data.options;
          //this.options=this.options.slice(1,this.options.length-1).split(',');
          console.log('options',this.options);
          this.sort=data.sort;
          this.subjectID=data.subjectId;
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    methods:{
      updatedes(el){
        this.description=el;
      },
      save(){
        let params={};
        params.title=this.testTitle;
        params.sort=this.sort;
        params.chapterId=this.chapterID;
        params.id=this.id;
        params.options=this.options;
        params.answers=this.answers;
        //console.log(params.answers.length);
        params.subjectId=this.subjectID;
        console.log(params);
        if(this.id){
          https.fetchPost('http://test.edrmd.com:1443/manage/test/update',params).then(res=>{
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
        }else{
          https.fetchPost('http://test.edrmd.com:1443/manage/chapter/add',params).then(res=>{
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
      newAdd(){
        this.options.push('');
      },
      newDel(){
        this.options.pop();
      }
    }

  }
</script>
<style>
  .CollegeEdit{
    margin:20px;
  }
  .CollegeEdit .title{
    height: 36px;
    border-bottom: solid 1px #d0dee5;
    border-left: solid 1px #d0dee5;
  }
  .CollegeEdit .title span{
    display: block;
    border-bottom:red;
    text-align: center;
    padding:0 10px;
    width:80px;
    height:37px;
    line-height: 37px;
    background:#fff;
    border-top: solid 1px #d0dee5;
    border-right: solid 1px #d0dee5;
  }
  .CollegeEdit .collegeContent{
    margin:30px 0 0 25px;
  }
  .CollegeEdit .collegeContent .rowDiv{
    display: flex;
    margin-bottom:15px;
  }
  .CollegeEdit .collegeContent .smallTitle{
    width:150px;
    height: 40px;
    text-align: left;
    line-height: 40px;
  }
  .CollegeEdit .el-button{
    margin-left: 130px;
    width:150px;
    height:40px;
  }
  .CollegeEdit .el-button span{
    line-height: 0;
  }
</style>
