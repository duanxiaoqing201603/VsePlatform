<template>
  <div class="CollegeEdit">
    <div class="title"><span>{{pageTitle}}</span></div>
    <div class="collegeContent">
      <div v-if="operate==='edit'"><span>用户ID</span>
        <el-input v-model="studentID" placeholder="用户ID"></el-input>
      </div>
      <div><span>姓名</span>
        <el-input v-model="studentName" placeholder="姓名"></el-input>
      </div>
      <div ><span>学号</span>
        <el-input v-model="studentSno" placeholder="学号"></el-input>
      </div>
      <div><span>学院名称</span>
        <el-input v-model="collegeName" placeholder="学院名称"></el-input>
      </div>
      <div><span>班级名称</span>
        <el-input v-model="className" placeholder="班级名称"></el-input>
      </div>
      <div><span>学年</span>
        <el-input v-model="year" placeholder="学年"></el-input>
      </div>
      <div><span>学期</span>
        <el-input v-model="term" placeholder="学期"></el-input>
      </div>
      <div>
        <el-button @click="save" type="primary">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import https from '../../../https'
  import {Message} from 'element-ui'
  export default {
    name:'SubjectEdit',
    data(){
      return {
        operate:'',
        pageTitle:'',
        studentName:'',
        studentID:'',
        studentSno:'',
        collegeName:'',
        className:'',
        year:'',
        term:'',
        userID:'',
      }
    },
    created(){
      this.operate=this.$route.query.operate;
      this.pageTitle=this.operate==='edit'?'编辑':'新建';
      this.studentID=this.$route.query.studentID;
      this.$route.meta.title=this.pageTitle;
      if(this.$route.query.studentID){
        https.fetchPost('http://test.edrmd.com:1443/manage/user/student/find',{'id':this.$route.query.studentID}).then(res=>{
          let data=res.data.data;
          this.studentName=data.name;
          this.studentID=data.id;
          this.studentSno=data.sno;
          this.collegeName=data.collegeName;
          this.className=data.className;
          this.year=data.year;
          this.term=data.term;
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    methods:{
      save(){
        let params={};
        params.name=this.studentName;
        params.id=this.studentID;
        params.sno=this.studentSno;
        params.collegeName=this.collegeName;
        params.className=this.className;
        params.year=this.year;
        params.term=this.term;
        if(this.studentID){
          https.fetchPost('http://test.edrmd.com:1443/manage/user/student/update',params).then(res=>{
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
          https.fetchPost('http://test.edrmd.com:1443/manage/user/register/add',params).then(res=>{
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
  .CollegeEdit .collegeContent div{
    display: flex;
    margin-bottom:15px;
  }
  .CollegeEdit .collegeContent span{
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
